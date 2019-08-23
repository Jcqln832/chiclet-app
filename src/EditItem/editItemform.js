import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './editItem.css'

class EditItemForm extends Component {
  constructor(props) {
    super(props);
    //capture form inputs here to make a controlled form
    this.state = {
      item: "",
      itemValid: false,
      formValid: false,
      validationMessages: {
        item: ''
      }
    }
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
   const itemMessage =  this.validateItem(item);

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
    const url = `${config.API_ENDPOINT}/month/:monthId`;
    const month= this.props.month;
    const item = this.state.item;
    const index = this.props.monthIndex

    if(this.state.formValid) {
      console.log(this.state.formValid);
      const options = {
      method: 'PATCH',
      body: JSON.stringify({
          item: item,
          month: month,
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

      <div class="container--grid">
      <section class="container--1month">
        <div class="month month--single">
            <form className="form--edcit" onSubmit={e => this.handleSubmit(e)}>
                  <label for="edit-input">Edit</label>
                  <input type="text" name="update" id="edit-input" placeholder="selected item"/>
                  {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                  <label for="complete-input">Complete</label>
                  <input type="radio" name="edit" id="complete"/>
                  <button type="submit">Done</button>
            </form>
        </div>  
      </section>
      </div>
    )
 }
}

export default withRouter(AddItem);

EditItem.defaultProps = {
  history: {
    goBack: () => {}
  }
}

EditItem.propTypes = {
  editItem: PropTypes.func.isRequired
};