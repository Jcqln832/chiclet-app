import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import apiContext from '../apiContext';
// import config from '../config';
// import NavError from '../ErrorBoundaries/NavError';
// import NoteError from '../ErrorBoundaries/NoteError';
import AppNav from '../nav/nav';
import Year from '../year/year';
import './app.css';


const ITEMS = {
  "January": [
    "first item",
    "second item"
  ],
  "February": [
    "first item",
    "second item"
  ],
  "March": [
    "first item",
    "second item"
  ]
};

const initYear = new Date().getFullYear()

class App extends Component {
  state = {
    items: ITEMS,
    completed: false,
    year: initYear
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

  doRedirect = (itemId) => {
    this.props.history.push(`/`)
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
      completed: this.state.completed,
      year: this.state.year,
      addItem: this.addItem,
      deleteItem: this.deleteItem,
      incrementYear: this.incrementYear,
      decrementYear: this.decrementYear,
      doRedirect: this.doRedirect
    }
    
    return (

    <apiContext.Provider value={value}>
      <div className='App'>
        <nav className='app__nav'>
          <h1 className="app-title">Chiclet Yearly Planner</h1>
          {/* <NavError> */}
            <Route 
                path='/' 
                component = {AppNav}
            />
          {/* </NavError> */}
        </nav>
        <main className='app__main'>
          {/* <NoteError> */
          <Route
            path='/'
            component = {Year}
          />
          /*
          <Route
            exact path='/'
            render ={(routerProps) =>
              <NoteListMain 
                notes = {value.notes}
              />
            }
          />
          <Route
            path='/folder/:folderId'
            render ={(routerProps) =>
              <NoteListMain 
                notes = {value.notes.filter(note => note.folderId === Number(routerProps.match.params.folderId))}
              />
            }
          />
          <Route
            path='/note/:noteId'
            render ={(routerProps) =>
              <NotePageMain 
                note = {value.notes.find(note => note.id === Number(routerProps.match.params.noteId))}
              />
            }
          />
          <Route 
            path='/add-folder'
            render ={(routeProps) =>
              <AddFolder
                {...routeProps}
                addFolder = {value.addFolder}
              />
            }
          />
          <Route
            path='/add-note'
            render = {(routeProps) =>
              <AddNote
                {...routeProps}
                folders={value.folders}
                addNote={value.addNote}
              />
            }
          />
          </NoteError> */}
        </main>
      </div>
      </apiContext.Provider>
    )
  }
}


export default withRouter(App);  