import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import apiContext from '../apiContext';
// import config from '../config';
// import NavError from '../ErrorBoundaries/NavError';
// import NoteError from '../ErrorBoundaries/NoteError';
import MONTHS from '../monthList';
import AppNav from '../nav/nav';
import Landing from '../landing/landing';
import Months from '../months/months';
import SingleMonth from '../month/month';
import EditItem from '../EditItem/edititem';
import Registration from '../Register/register';
import Login from '../Login/login';
import './app.css';


const ITEMS = [
  {
    id: 1,
    item: "First Item",
    author: "reggie",
    month: "January",
    completed: false,
    index: 201901
  },
  {
    id: 2,
    item: "Second Item",
    author: "reggie",
    month: "February",
    completed: false,
    index: 201902
  },
  {
    id: 3,
    item: "Another Item",
    author: "reggie",
    month: "January",
    completed: false,
    index: 201901
  },
];

const USERS = [
  {
    id: 111,
    user_name: "harryP",
    password: "fluffy",
  },
  {
    id: 222,
    user_name: "RonW",
    password: "wormtail"
  }
];

const initYear = new Date().getFullYear()

class App extends Component {
  state = {
    items: ITEMS,
    users: USERS,
    year: initYear,
    isLoggedIn: false
  }

  // componentDidMount() {
  //   Promise.all([
  //     fetch(`${config.API_ENDPOINT}/months`),
  //   ])
  //     .then((monthsRes) => {
  //       if (!monthsRes.ok) {
  //         return monthsRes.json().then(e => Promise.reject(e))
  //       }
  //       return 
  //         monthsRes.json()
  //     })
  //     .then((items) => {
  //       this.setState({ items })
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     })
  // }

  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    })
  }

  addItem = (item) => {
    console.log(item);
    this.setState({
      items: [...this.state.items, item]
    })
    console.log(this.state.items);
  }

  updateItem = updatedItem => {
    this.setState({
      items: this.state.items.map(item =>
        (item.id !== updatedItem.id) ? item : updatedItem
      )
    })
  }
 
  doRedirect = (itemId) => {
    this.props.history.push(`/months`);
  }

  doLoginRedirect = () => {
    this.props.history.push(`/login`);
  }

  incrementYear = () => {
    this.setState({
      year: this.state.year + 1
    })
  }

  decrementYear = () => {
    this.setState({
      year: this.state.year - 1
    })
  }

  setLoggedIn = (bool) => {
    console.log(bool);
    this.setState({
      isLoggedIn: bool
    })
  }

  createNewUser = (user) => {
    console.log(user);
    this.setState({
      users: [...this.state.users, user]
    })
    console.log(this.state.users);
  }

  handleClickLogout = () => {
    this.setLoggedIn(false);
    this.props.history.push(`/`);
  }


  render() {
    const value = {
      items: this.state.items,
      users: this.state.users,
      year: this.state.year,
      completed: this.state.completed,
      isLoggedIn: this.state.isLoggedIn,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      updateItem: this.updateItem,
      incrementYear: this.incrementYear,
      decrementYear: this.decrementYear,
      doRedirect: this.doRedirect,
      createNewUser: this.createNewUser,
      handleClickLogout: this.handleClickLogout
    }

    const prevButton = value.year > new Date().getFullYear();
  
    return (
    <apiContext.Provider value={value}>
      <div className='App'>
        <nav className='app__nav'>
          <h1 className="app-title"><span className="app-icon"><FontAwesomeIcon icon={faMoon} size={"1x"}/></span>Chiclet Yearly Planner</h1>
          {/* <NavError> */}
            <Route 
              path='/' 
              render = {() =>
                <AppNav isLoggedIn = {value.isLoggedIn} />
              }
            />
          {/* </NavError> */}
        </nav>
        <main className='app__main'>
          <Route
            exact path='/'
            component = {Landing}
          />
          <Route
            path='/months'
            render ={() =>
              <Months 
                items= {value.items} 
                year={value.year}
                prevButton = {prevButton}
              />
            }
          />
          <Route
            path='/month/:monthId'
            render ={(routeProps) => {
              const monthIndex = routeProps.match.params.monthId;
              const month = MONTHS.find(month => month.id === monthIndex.slice(4))
              console.log(month);
              return (
              <SingleMonth
                doRedirect = {value.doRedirect}
                addItem = {value.addItem}
                year = {value.year}
                monthName = {month.name}
                monthIndex = {monthIndex}
                monthItems = {value.items.filter(item => item.index === Number(monthIndex))}
              />
              )
            }}
          />
          <Route 
            path='/edit/:itemId'
            render ={(routeProps) => 
              <EditItem
                item = {this.state.items.find(item => item.id === Number(routeProps.match.params.itemId))}
                updateItem = {value.updateItem}
                deleteItem = {value.deleteItem}
              />
            }
          />
          <Route
            path='/register'
            render = {(routeProps) =>
              <Registration
                userslength = {value.users.length}
                createNewUser = {value.createNewUser}
                doLoginRedirect = {this.doLoginRedirect}
              />
            }
          />
          <Route
          path='/login'
          render = {(routeProps) =>
            <Login
              {...routeProps}
              setLoggedIn = {this.setLoggedIn}
              doRedirect = {this.doRedirect}
              users = {value.users}
            />
          } 
        />
        </main>
        <footer role="content-info">Footer</footer>
      </div>
      </apiContext.Provider>
    )
  }
}

export default withRouter(App);  