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
      item: this.props.item.item,
      completed: this.props.item.completed,
      itemValid: false,
      formValid: false,
      validationMessages: {
        item: ''
      }
    }
  }

  checkboxLabel = () => {
  return this.props.item.completed ?
    <label htmlFor="completed">Incomplete:</label>
    :
    <label htmlFor="completed">Complete:</label>
  }

  doRedirect = () => {
    this.props.history.push(`/month/${this.props.item.index}`);
  }

  itemChanged(item) {
    this.setState({
      item: item })
      console.log(this.state.item)
  }

  completedChanged() {
    // this.setState({
    //   completed: !(this.state.completed) 
    // })
    // console.log(this.state.completed)
    this.setState(prevState => ({
      completed: !prevState.completed
    }));
    console.log(this.state.completed)
  }

  // Validate item not empty and not too long. Return a message if so
  validateItem(updatedItem) {
    console.log(updatedItem.item)
    updatedItem.item = updatedItem.item.trim();
    if (updatedItem.item.length === 0) {
        return 'item content is required'
    } else if 
     (updatedItem.item.length > 60) {
        return 'item content exceeds length limit (60)'
    } else {
        return "";
    }
  }

  handleClickDelete = e => {
    e.preventDefault()
    const itemId = this.props.item.id
    this.props.deleteItem(itemId)
    this.doRedirect()
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("clicked!");
    // Get item text and completed from state -- construct udpated item object
    const updatedItem = {
      id: this.props.item.id,
      item: this.state.item,
      completed: this.state.completed,
      month: this.props.item.month,
      index: this.props.item.index
    }
    // Validate before fetch attempt
    this.validateForm(updatedItem);
  }

  validateForm(updatedItem) {
   const itemMessage = this.validateItem(updatedItem);

   this.props.updateItem(updatedItem);
   this.doRedirect();

  //   this.setState({
  //     validationMessages: {
  //       item: itemMessage,
  //     },
  //     itemValid: !itemMessage,
  //   }, this.formValid );
  // }

  // formValid() {
  //   this.setState({
  //     formValid: (this.state.itemValid)
  //   }, () => this.doFetch());
  // }

  // doFetch() {
  //   const url = `${config.API_ENDPOINT}/edit/:itemId`;
  //   const item = this.state.item;
  //   const index = this.props.monthIndex

  //   if(this.state.formValid) {
  //     console.log(this.state.formValid);
  //     const options = {
  //     method: 'PATCH',
  //     body: JSON.stringify({
  //         item: item,
  //         index: index
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   }
  //   console.log(options)

  //   // put the data into STORE(db)
  //   fetch(url, options)
  //   .then(res => {
  //     if(!res.ok) {
  //       throw new Error('Something went wrong, please try again later.')
  //     }
  //     return res.json()
  //   })
  //   .then(data => {
  //     // clear for next entry
  //     this.setState({
  //       item: "",
  //       }, () => {this.props.updateItem(
  //       {
  //           // id: 1,
  //           // item: "First Item",
  //           // author: "reggie",
  //           // month: "January",
  //           // index: 201901
  //         },
  //       )}
  //     );
  //     console.log("I ran");
  //   })
  //   .catch(err => {
  //     this.setState({
  //       error: err.message
  //     });
  //   });
  // }
}

  render () {
    const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
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

      <div className="container--grid">
        <section className="container--1month">
          <div className="month month--single">
            <h2 className="month__title">Update Item</h2>
              <form className="form--edit" onSubmit={e => this.handleSubmit(e)}>
                <label className="form__label--edit" htmlFor="edit-input">Edit:</label>
                <input className="form__input--edit" type="text" name="update" id="edit-input" defaultValue={this.state.item} onChange={e => this.itemChanged(e.target.value)}/>
                {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                {this.checkboxLabel()}
                <input type="checkbox" id="completed" name="completed" onChange={e => this.completedChanged(e.target.value)}/>
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
  }
}

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};