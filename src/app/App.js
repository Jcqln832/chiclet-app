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
import './app.css';


const ITEMS = [
  {
    id: 1,
    item: "First Item",
    author: "reggie",
    month: "January",
    index: 201901
  },
  {
    id: 3,
    item: "Another Item",
    author: "reggie",
    month: "January",
    index: 201901
  },
  {
    id: 2,
    item: "Second Item",
    author: "reggie",
    month: "February",
    index: 201902
  },
];

const initYear = new Date().getFullYear()

class App extends Component {
  state = {
    items: ITEMS,
    completed: false,
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
    // console.log(this.state.items);
  }
 
  doRedirect = (itemId) => {
    this.props.history.push(`/months`);
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

  render() {
    const value = {
      items: this.state.items,
      year: this.state.year,
      completed: this.state.completed,
      isLoggedIn: this.state.isLoggedIn,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      incrementYear: this.incrementYear,
      decrementYear: this.decrementYear,
      doRedirect: this.doRedirect
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
          {/* <NoteError> */ }
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
            render ={(routerProps) => {
              const monthIndex = routerProps.match.params.monthId;
              const month = MONTHS.find(month => month.id === monthIndex.slice(4))
              return (
              <SingleMonth
                doRedirect = {value.doRedirect}
                addItem = {value.addItem}
                year = {value.year}
                monthName = {month.name}
                monthIndex = {monthIndex}
                monthItems = {value.items.filter(item => item.index === Number(routerProps.match.params.monthId))}
              />
              )
            }}
          />
          {/* <Route 
            path='/edit/:itemId'
            render ={(routeProps) =>
              <AddFolder
                {...routeProps}
                addFolder = {value.addFolder}
              />
            }
          />
          <Route
            path='/register'
            render = {(routeProps) =>
              <AddNote
                {...routeProps}
                folders={value.folders}
                addNote={value.addNote}
              />
            }
          /> */}
          {/* </NoteError> */}
        </main>
      </div>
      </apiContext.Provider>
    )
  }
}


export default withRouter(App);  