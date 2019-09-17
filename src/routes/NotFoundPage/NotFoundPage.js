import React, { Component } from 'react'
import './NotFoundPage.css'
import ramImg from './img/ram-600.jpg'

export default class NotFoundPage extends Component {
  render() {

    return (
      <div className="container--grid-single">
      <section className='NotFoundPage container--1month'>
        <h2>404 - Page not found</h2>
        <p className="notfoundText">Try going back to your previous page.</p>
        <img src={`${ramImg}`} alt="discontented ram"/>
      </section>
      </div>
    )
  }
  
}