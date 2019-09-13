import React, { Component } from 'react'
import Registration from '../../components/Register/register'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
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