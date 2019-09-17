import React, { Component } from 'react';
// import config from '../config';
import {withRouter} from 'react-router-dom';
import ValidationError from '../../ValidationError';
import apiContext from '../../apiContext';
import PropTypes from 'prop-types';
import './addItem.css'
import ItemApiService from '../../services/item-api-service';
// import MonthItems from '../months/monthitems';

class AddItem extends Component {
  static contextType = apiContext;
  constructor(props) {
    super(props);
    // capture form inputs here to make a controlled form
    this.state = {
      content: "",
      itemValid: false,
      formValid: false,
      error: "",
    }
  }

  itemChanged(content) {
    this.setState({content})
    console.log(this.state.content)
  }

  // Validate item not empty and not too long. Return a message if so.
  validateItem(fieldValue) {
    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
        return 'Item content is required'
    } else if 
     (fieldValue.length > 60) {
        return 'Item content exceeds length limit (60)'
    } else if 
      (this.props.monthItems.length === 6) {
        return 'Item limit reached. Remove an item to add another.'
      }
     else { 
        return false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("clicked!");
    // Get item from state
    const item = this.state.content;
    // Validate before fetch attempt
    this.validateForm(item)
  }

  validateForm(item) {
    const itemMessage =  this.validateItem(item);
    this.setState({
      error: itemMessage,
      itemValid: !itemMessage,
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: (this.state.itemValid)
    }, () => this.doFetch());
  }

   doFetch() {
    const content = this.state.content;
    const month= this.props.month;
    const index = Number(this.props.monthIndex)

    if(this.state.formValid) {
      // console.log(this.state.formValid);
      ItemApiService.postItem(content, index)
      .then(this.context.addItem)
      .then(this.setState({
        content: "",
        itemValid: false,
        formValid: false,
        error: "",
      }))
      .catch(this.context.setError)
  }
}

  render () {
    // const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
    return (
        <section className='AddItem'>
          <form className="form--add" onSubmit={e => this.handleSubmit(e)}>
              <div className="field">
                <label className="form--add__label"htmlFor="item-input">Add an item</label>
                <input className="form--add__input" type="text" name="name" id="item-input" aria-label="new month item" aria-required="true" value={this.state.content} onChange={e => this.itemChanged(e.target.value)}/>
                {<ValidationError hasError={!this.state.itemValid} message={this.state.error}/>}
              </div>
              <button className="form--add__submit" type="submit">
                 + Save
              </button>
          </form>
        </section>
    )
  }
}

export default withRouter(AddItem);

AddItem.defaultProps = {
  history: {
    goBack: () => {}
  }
}