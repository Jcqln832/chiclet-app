import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './register.css'

export default class Registration extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

//   handleSubmit = ev => {
//     ev.preventDefault()
//     console.log('handlesubmit ran!')
//     const { user_name, password, password2} = ev.target
//     console.log(user_name.value);
//     const userValid = user_name.value.length < 40
//     console.log(userValid)
//     // console.log(password.value);
//     // console.log(password2.value);
//     // console.log(password.value === password2.value)
//     // console.log(password.value.length < 40);
//     // console.log(password.value.length >= 8);
//     // pwvalue = password.value === password2.value;
//     // pwlength = password.value.length < 40;
//     const pwValid = (password.value === password2.value) && (password.value.length < 40) && (password.value.length >= 8) ? true : false
//     console.log(pwValid)
    
//     if(userValid && pwValid) {
//         this.setState({
//             error: null
//         })
//         const user = {
//           id: this.props.usersLength + 1,
//           user_name: user_name.value,
//           password: password.value
//         }
//         this.props.createNewUser(user)
//         this.props.doLoginRedirect()
//     } else {
//         // this.props.setLoggedIn(false)
//         this.setState({
//             error: "Invalid username or password. Please try again."
//         })
//     }
// }

handleSubmit = ev => {
  ev.preventDefault()
  const { user_name, password, password2 } = ev.target
  const userValid = user_name.value.length < 40;
  const pwValid = (password.value === password2.value) && (password.value.length < 30) && (password.value.length >= 8) ? true : false

  if(userValid && pwValid) {
    this.setState({ error: null })
      AuthApiService.postUser({
       user_name: user_name.value,
       password: password.value,
      })
      .then(user => {
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
     })
      .catch(res => {
        this.setState({ error: res.error })
      })
  } else {
    this.setState({
      error: "Passwords must match. Password must be between 8 and 30 charaters. Username must be less than 40 characters. Please try again."
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