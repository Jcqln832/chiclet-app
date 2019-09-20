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
    // const { history } = this.props
    // history.push('/login')

  
  }

  doRedirect = user => {
    const { history } = this.props
    history.push('/months')
  }

  render() {
    return (
        <Registration
          doRedirect={this.doRedirect}
        />
    )
  }
}