import React, { Component } from 'react';
// import config from '../config';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import ValidationError from '../../ValidationError';
import apiContext from '../../apiContext'
import PropTypes from 'prop-types';
import './edititem.css'
import ItemApiService from '../../services/item-api-service';

class EditItem extends Component {
  constructor(props) {
    super(props);
    // console.log(props.item)
    //capture form inputs here to make a controlled form
    this.state = {
      content: this.props.item.content,
      completed: this.props.item.completed,
      itemValid: false,
      formValid: false,
      validationMessages: {
        item: ''
      }
    }
  }
  static contextType = apiContext;

  // which one to render in the form
  checkboxLabel = () => {
  return this.props.item.completed ?
    <label htmlFor="completed">Incomplete:</label>
    :
    <label htmlFor="completed">Complete:</label>
  }

  handleClickDelete = e => {
    e.preventDefault()
    const itemId = this.props.item.id
    const index = this.props.item.index
    //perform deletion fetch
    ItemApiService.deleteItem(itemId)
    //remove item from app item state
    .then(this.props.deleteItem(itemId))
    //go back to month page
    .then(this.doRedirect(index))
    .catch(this.context.setError)
  }

  //when editing done, go back to the month page
  doRedirect = () => {
    this.props.history.goBack();
  }

  itemChanged(content) {
    this.setState({
      content
    })
    console.log(this.state.item)
  }

  completedChanged() {
    const status = this.state.completed
    this.setState({
      completed: !status
    })
    // this.setState(prevState => ({
    //   completed: !prevState.completed
    // }));
    // console.log(this.state.completed)
  }

  // Validate item not empty and not too long. Return a message if so
  validateItem(updatedItem) {
    updatedItem.content = updatedItem.content.trim();
    if (updatedItem.content.length === 0) {
        return 'item content is required'
    } else if 
     (updatedItem.content.length > 60) {
        return 'item content exceeds length limit (60)'
    } else {
        return "";
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // Get item text and completed from state -- construct udpated item object
    const updatedItem = {
      // id: this.props.item.id,
      content: this.state.content,
      completed: this.state.completed,
      // index: this.props.item.index
    }
    // Validate before fetch attempt
    this.validateForm(updatedItem);
  }

  validateForm(updatedItem) {
    const itemMessage = this.validateItem(updatedItem);

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
    const itemId = this.props.item.id
    const completed = this.state.completed
    const content = this.state.content
    const updatedItem = {
      id: itemId,
      content: content,
      completed: completed
    }

    if(this.state.formValid) {
  
      ItemApiService.updateItem(content, completed, itemId)
      // .then(ItemApiService.getItem(itemId))
      .then(() => this.props.updateItem(updatedItem))
      // .then(this.props.updateItem(updatedItem))
      .then(() => this.setState({
        itemValid: false,
        formValid: false,
        error: "",
      }))
      .then(
        this.doRedirect
        )
      .catch(this.context.setError)
    }
  }

  render () {
    // const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
    return (
    <>
      <div className="container--title">
        <h2 className="month__year">
            <span className="arrow-back" onClick={()=>this.doRedirect()}>
              <FontAwesomeIcon icon={faChevronLeft} size={"lg"} />
            </span>
            {this.props.month}
        </h2>
      </div>

      <div className="container--grid-single">
        <section className="container--1month">
          <div className="month month--single">
            <h2 className="month__title">Update Item</h2>
              <form className="form--edit" onSubmit={e => this.handleSubmit(e)}>
                <label className="form__label--edit" htmlFor="edit-input">Edit:</label>
                <input 
                  name="update" 
                  className="form__input--edit" 
                  type="text"  
                  id="edit-input" 
                  defaultValue={this.state.content} 
                  onChange={e => this.itemChanged(e.target.value)}
                />
                {<ValidationError hasError={!this.state.nameValid} message= {this.state.validationMessages.name}
                />}
                {this.checkboxLabel()}
                <input 
                  name="completed"
                  type="checkbox" 
                  id="completed"
                  onChange={e => this.completedChanged(e.target.value)}/>
                <button className="form__submit--edit" type="submit">Done</button>
              </form>
              <hr></hr>
              <button className="button--delete" type="button" onClick={this.handleClickDelete}>Delete</button>
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
  },
  item: {}
}

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};