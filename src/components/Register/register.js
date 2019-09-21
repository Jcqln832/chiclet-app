import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'
import './register.css'

export default class Registration extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;
    const { user_name, password, password2 } = ev.target;
    const userValid = user_name.value.length < 20;
    let validPass1;
    let validPass2;
    let validPass3;
    let validPass4;
    let pwError = null;
      
    if (password.value.startsWith(' ') || password.value.endsWith(' ')) {
      pwError = 'Password must not start or end with empty spaces'
      validPass1 = false;
    } else {
      validPass1 =  true;
    }
    // console.log(validPass1)

    if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password.value) === false) {
      pwError = 'Password must contain one upper case, lower case, number and special character'
      validPass2 = false;
    } else {
      validPass2 =  true;
    }
    // console.log(validPass2)

  if ((password.value.length > 20) || (password.value.length < 8)) {
      pwError = "Passwords must be at least 8 characters and not more than 20 characters"
      validPass3 = false;
    } else {
      validPass3 =  true;
    }
    // console.log(validPass3)

  if (password.value != password2.value) {
    pwError = "Passwords must match"
      validPass4 = false;
    } else {
      validPass4 =  true;
    }
    // console.log(validPass4)

    // const pwValid = (password.value === password2.value) && (password.value.length < 20) && (password.value.length >= 8) ? true : false
  const pwValid = validPass1 === true && validPass2 === true && validPass3 === true && validPass4 === true ? true : false
  // console.log(pwValid);

    if(userValid && pwValid) {
      this.setState({ error: null })
        AuthApiService.postUser({
        user_name: user_name.value,
        password: password.value,
        })
        .then(res => {
          user_name.value = ''
          password.value = ''
          TokenService.saveAuthToken(res.authToken)
          this.props.doRedirect()
        })

        // AuthApiService.postLogin({
        //   user_name: user_name.value,
        //   password: password.value,
        // })
        //   .then(res => {
        //     user_name.value = ''
        //     password.value = ''
        //     TokenService.saveAuthToken(res.authToken)
        //     this.props.doRedirect()
        //   })


      //   .then(user => {
      //     user_name.value = ''
      //     password.value = ''
      //     this.props.onRegistrationSuccess()
      //  })
        .catch(res => {
          this.setState({ error: res.error })
        })
    } else {
      this.setState({
        // error: "Passwords must match. Password must be between 8 and 20 charaters. Username must be less than 20 characters. Please try again."
        error: pwError
      })
    }
  }

  render() {
    const { error } = this.state

    return (
      <>
      <header role="banner">
          <h2>Register</h2>
      </header>
      <div className="container--landing">
        <section className="container--form">
          <form
            className='registrationForm'
            onSubmit={this.handleSubmit}
          >
            <div role='alert'>
              {error && <p className='red'>{error}</p>}
            </div>
    
            <label htmlFor='registrationForm__user_name'>User Name</label>
            <input
              className="registrationForm__input"
              name='user_name'
              type='text'
              required
              id='registrationForm__user_name'>
            </input>
        
            <label htmlFor='registrationForm__password'>Password</label>
            <input
              className= "registrationForm__input"
              name='password'
              type='password'
              required
              id='registrationForm__password'>
            </input>

            <label htmlFor='registrationForm__password2'>Re-enter Password</label>
            <input
              className="registrationForm__input"
              name='password2'
              type='password'
              required
              id='registrationForm__password2'>
            </input>
            <button className="registrationForm__submit" type='submit'>Register</button>
            
          </form>
        </section>
      </div>
    </>
    )
  }
}