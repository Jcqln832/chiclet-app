import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './edititem.css'

class EditItem extends Component {
  constructor(props) {
    super(props);
    console.log(props.item)
    //capture form inputs here to make a controlled form
    this.state = {
      item: props.item.item,
      itemValid: false,
      formValid: false,
      validationMessages: {
        item: ''
      }
    }
  }

  doRedirect = (itemId) => {
    this.props.history.push(`/month/${this.props.item.index}`);
  }

  itemChanged(item) {
    this.setState({item})
  }

  // Validate item not empty and not too long. Return a message if so
  validateItem(fieldValue) {
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
        return 'item content is required'
    } else if 
     (fieldValue.length > 150) {
        return 'item content exceeds length limit (150)'
    } else {
        return "";
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("clicked!");
    // Get item from state
    const item = this.state.item;
    // Validate before fetch attempt
    this.validateForm(item);
  }

  validateForm(item) {
   const itemMessage = this.validateItem(item);

    this.setState({
      validationMessages: {
        item: itemMessage,
      },
      itemValid: !itemMessage,
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: (this.state.itemValid)
    }, () => this.doFetch());
  }

  doFetch() {
    const url = `${config.API_ENDPOINT}/edit/:itemId`;
    const item = this.state.item;
    const index = this.props.monthIndex

    if(this.state.formValid) {
      console.log(this.state.formValid);
      const options = {
      method: 'PATCH',
      body: JSON.stringify({
          item: item,
          index: index
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }
    console.log(options)

    // put the data into STORE(db)
    fetch(url, options)
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.')
      }
      return res.json()
    })
    .then(data => {
      // clear for next entry
      this.setState({
        item: "",
        }, () => {this.props.editItem(
        {
            // id: 1,
            // item: "First Item",
            // author: "reggie",
            // month: "January",
            // index: 201901
          },
        )}
      );
      console.log("I ran");
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    });
  }
}

  render () {
    const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
    return (
    <>
      <div className="container--title">
            <h2 className="month__year">
                <span className="arrow-back" onClick={()=>this.doRedirect()}><FontAwesomeIcon icon={faChevronLeft} size={"lg"} /></span>
                {this.props.month}
            </h2>
            </div>

      <div className="container--grid">
      <section className="container--1month">
        <div className="month month--single">
        <h2 className="month__title">Update Item</h2>
            <form className="form--edit" onSubmit={e => this.handleSubmit(e)}>
                  <label className="form__label--edit" htmlFor="edit-input">Edit:</label>
                  <input className="form__input--edit" type="text" name="update" id="edit-input" value={this.state.item} onChange={e => this.itemChanged(e.target.value)}/>
                  {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                  {/* <label fsor="complete-input">Complete</label>
                  <input type="radio" name="edit" id="complete"/> */}
                  <button className="form__submit--edit" type="submit">Done</button>
            </form>
            <hr></hr>
        </div>  
      </section>
      </div>
      </>
    )
 }
}

export default withRouter(EditItem);

EditItem.defaultProps = {
  history: {
    goBack: () => {}
  }
}

// EditItem.propTypes = {
//   editItem: PropTypes.func.isRequired
// };