import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import apiContext from '../../apiContext';
import config from '../../config';
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import NavError from '../ErrorBoundaries/NavError';
import AccountError from '../ErrorBoundaries/AccountError';
import AppError from '../ErrorBoundaries/AppError';
import MONTHS from '../../Utils/monthsList';
import AppNav from '../nav/nav';
import Landing from '../landing/landing';
import SingleMonth from '../month/month';
// import EditItem from '../EditItem/edititem';
import TokenService from '../../services/token-service'
import ItemApiService from '../../services/item-api-service'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import MonthsPage from '../../routes/MonthsPage/MonthsPage';
import SingleMonthPage from '../../routes/SingleMonthPage/SingleMonthPage';
import EditPage from '../../routes/EditPage/EditPage';
import EditItem from '../EditItem/EditItem'
import Options from '../options/options';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './app.css';

const initYear = new Date().getFullYear()

class App extends Component {
  state = {
    items: [],
    year: initYear,
    error: null,
  }

  fetchItems = () => {
    this.clearError()
    ItemApiService.getItems()
      .then(this.setItemsList)
      .catch(this.setError)
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  setItemsList = items => {
    this.setState({ items })
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
    console.log(updatedItem);
    this.setState({
      items: this.state.items.map(item =>
        (item.id !== updatedItem.id) ? item : updatedItem
      )
    })
  }

  doRedirect = () => {
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

  handleClickLogout = () => {
    TokenService.clearAuthToken()
    this.props.history.push(`/`);
  }

  render() {
    const value = {
      items: this.state.items,
      year: this.state.year,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      updateItem: this.updateItem,
      setItemsList: this.setItemsList,
      incrementYear: this.incrementYear,
      decrementYear: this.decrementYear,
      doRedirect: this.doRedirect,
      handleClickLogout: this.handleClickLogout,
      setError: this.setError,
      clearError: this.clearError,
      fetchItems: this.fetchItems
    }

    return (

      <apiContext.Provider value={value}>
        <div className='App'>
          <nav className='app__nav'>
            <h1 className="app-title">
              <span className="app-icon"><FontAwesomeIcon icon={faMoon} size={"1x"} /></span>
              Chiclet Yearly Planner
            </h1>
            <NavError>
              <AppNav />
            </NavError>
          </nav>
          <main className='app__main'>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>        
            <PublicOnlyRoute
              exact path='/'
              component = {Landing}
            />
            <PrivateRoute
              exact path='/months'
              component = {MonthsPage}
            />
            <PrivateRoute
              path='/month/:monthId'
              component = {SingleMonthPage}
            />
            <PrivateRoute
              path='/edit/:itemId'
              component = {EditPage}
            />
            <PublicOnlyRoute
              exact path={'/register'}
              component = {RegistrationPage}
            />
            <PublicOnlyRoute
              exact path={'/login'}
              component = {LoginPage}
            />
            <Route
              exact path='/options'
              render={(routeProps) =>
                <Options
                  {...routeProps}
                />
              }
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
          </main>
          <footer role="contentinfo">Footer</footer>
        </div>
      </apiContext.Provider>
    )
  }
}

export default withRouter(App);