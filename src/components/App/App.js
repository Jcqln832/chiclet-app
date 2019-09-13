import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import apiContext from '../../apiContext';
import config from '../../config';
import PrivateRoute, {authCheck} from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import NavError from '../ErrorBoundaries/NavError';
import AccountError from '../ErrorBoundaries/AccountError';
import AppError from '../ErrorBoundaries/AppError';
import MONTHS from '../../Utils/monthsList';
// import ITEMS from '../../Utils/itemsList';
// import USERS from '../../Utils/usersList';
import AppNav from '../nav/nav';
import Landing from '../landing/landing';

import SingleMonth from '../month/month';
import EditItem from '../EditItem/edititem';
import TokenService from '../../services/token-service'
import ItemApiService from '../../services/item-api-service'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import MonthsPage from '../../routes/MonthsPage/MonthsPage';
import SingleMonthPage from '../../routes/SingleMonthPage/SingleMonthPage';
import Options from '../options/options';
import './app.css';

const initYear = new Date().getFullYear()

class App extends Component {
  state = {
    items: [],
    year: initYear,
    error: null,
  }

  componentDidMount() {
    this.clearError()
    ItemApiService.getItems()
      .then((items) => {
        this.setState({ items })
        console.log(this.state.items)
      })
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

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

  doRedirect = () => {
    this.props.history.push(`/months`);
  }

  // doLoginRedirect = () => {
  //   this.props.history.push(`/login`);
  // }

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

  // setLoggedIn = (bool) => {
  //   console.log(bool);
  //   this.setState({
  //     isLoggedIn: bool
  //   })
  // }

  // createNewUser = (user) => {
  //   console.log(user);
  //   this.setState({
  //     user: [...this.state.user, user]
  //   })
  //   console.log(this.state.user);
  // }

  handleClickLogout = () => {
    // this.setLoggedIn(false);
    TokenService.clearAuthToken()
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
      handleClickLogout: this.handleClickLogout,
      // prevButton: this.prevButton
    }

    // const prevButton = value.year > new Date().getFullYear();

    return (

      <apiContext.Provider value={value}>
        <div className='App'>
          <nav className='app__nav'>
            <h1 className="app-title"><span className="app-icon"><FontAwesomeIcon icon={faMoon} size={"1x"} /></span>Chiclet Yearly Planner</h1>
            <NavError>
              <AppNav />
            </NavError>
          </nav>
          <main className='app__main'>
            <AppError>
              <Route
                exact path='/'
                component={Landing}
              />
              <PrivateRoute
                path='/months'
                component={MonthsPage}
              />
              <Route
                path='/month/:monthId'
                component = {SingleMonthPage}
                // render={({ match }) => {
                //   const monthIndex = match.params.monthId;
                //   const month = MONTHS.find(month => month.id === monthIndex.slice(4));
                //   const componentProps = {
                //     monthName: month.name,
                //     monthIndex: monthIndex
                //   }
                //   const component = <SingleMonthPage>
                
                //     authCheck(componentProps, component)
                //     {/* <SingleMonthPage
                //       monthName={month.name}
                //       monthIndex={monthIndex}
                //     /> */}
              
                // }
                
              />
              <Route
                path='/edit/:itemId'
                render={({ match }) =>
                  <EditItem
                    item={this.state.items.find(item => item.id === Number(match.params.itemId))}
                    updateItem={value.updateItem}
                    deleteItem={value.deleteItem}
                  />
                }
              />
            </AppError>

            <AccountError>
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              />
              <Route
                path='/options'
                render={(routeProps) =>
                  <Options
                    {...routeProps}
                  />
                }
              />
            </AccountError>
          </main>
          <footer role="contentinfo">Footer</footer>
        </div>
      </apiContext.Provider>
    )
  }
}

export default withRouter(App);