import React, { Component } from 'react'
import LoginForm from '../../components/Login/login'


export default class LoginPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

doRedirect = () => {
    this.props.history.push(`/months`);
  }

  render() {
    return (
        <LoginForm
          doRedirect={this.doRedirect}
        />
    )
  }
}
