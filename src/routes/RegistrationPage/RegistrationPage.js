import React, { Component } from 'react'
import Registration from '../../components/Register/register'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
  // get logged in
    
  //go to months page
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
        <Registration
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
    )
  }
}