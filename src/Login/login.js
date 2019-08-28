import React, { Component } from 'react'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import TokenService from '../../services/token-service'
// import AuthApiService from '../../services/auth-api-service'
// import { Button, Input } from '../Utils/Utils'
import './login.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

//   handleSubmitJwtAuth = ev => {
//     ev.preventDefault()
//     this.setState({ error: null })
//     const { user_name, password } = ev.target

//     AuthApiService.postLogin({
//       user_name: user_name.value,
//         password: password.value,
//     })
//       .then(res => {
//         user_name.value = ''
//         password.value = ''
//         TokenService.saveAuthToken(res.authToken)
//         this.props.onLoginSuccess()
//       })
//       .catch(res => {
//         this.setState({ error: res.error })
//       })
//   }

handleSubmit = ev =>  {
    ev.preventDefault()
    const { user_name, password } = ev.target
    console.log(user_name);
    const userValid = this.props.users.find(user => user.user_name === user_name.value)
    console.log(userValid)
    const pwValid = this.props.users.find(user => user.password === password.value)
    console.log(pwValid)
    console.log('handlesubmit ran!')
    if(userValid && pwValid) {
        this.setState({
            error: null
        })
        this.props.setLoggedIn(true)
        this.props.doRedirect()
    } else {
        this.props.setLoggedIn(false)
        this.setState({
            error: "Incorrect login credentials."
          })
    }
}

  render() {
    const { error } = this.state
    return (
        <>
        <header role="banner">
            <h2>Sign In</h2>
        </header>
        <div className="container--grid">
            <section className="container--form">
                <form
                    className='entry-form'
                    // onSubmit={this.handleSubmitJwtAuth}
                    onSubmit = {this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='fields'>
                        <label htmlFor='name-input'>User name</label>
                        <input
                        className="entry-form__input"
                        type="text"
                        required
                        name='user_name'
                        id='name-input'>
                        </input>
            
                        <label htmlFor='pw-input'>Password</label>
                        <input 
                        className="entry-form__input"
                        required
                        name='password'
                        type='password'
                        id='pw-input'>
                        </input>
                    </div>
                    <button className="entry-form__submit" type='submit'>Log In</button>
                </form>
            </section>
        </div>
        </>
    )
  }
}