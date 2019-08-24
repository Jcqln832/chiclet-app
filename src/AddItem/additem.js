import React, { Component } from 'react';
import config from '../config';
import {withRouter} from 'react-router-dom';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './addItem.css'

class AddItem extends Component {
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
    const item = this.state.item;
    const month= this.props.month;
    const index = this.props.monthIndex

    if(this.state.formValid) {
      console.log(this.state.formValid);
    const options = {
      method: 'POST',
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

   this.props.addItem(
        {
            id: "",
            item: item,
            author: "signedinUser",
            month: month,
            index: Number(index)
          }
    )
}

    // put the data into STORE(db)
    // fetch(url, options)
    // .then(res => {
    //   if(!res.ok) {
    //     throw new Error('Something went wrong, please try again later.')
    //   }
    //   return res.json()
    // })
    // .then(data => {
    //   // clear for next entry
    //   this.setState({
    //     item: "",
    //     }, () => {this.props.addItem(  //add item from database into app state (incudling auto incremented item id#)
    //     {
    //         // id: data.id,
    //         // item: "data.item",
    //         // author: "data.author",
    //         // month: "data.month",
    //         // index: data.index
    //       },
    //     )}
    //   );
    //   console.log("I ran");
    // })
    // .catch(err => {
    //   this.setState({
    //     error: err.message
    //   });
    // });
//   }
}

  render () {
    const error = this.state.error ? <div className="error">{this.state.error}</div> : "";
    return (
        <section className='AddItem'>
            { error }
            <form className="form--add" onSubmit={e => this.handleSubmit(e)}>
            
                <div className="field">
                    <label class="form--add__label"htmlFor="item-input">Add an item</label>
                    <input class="form--add__input" type="text" name="name" id="item-input" aria-label="new month item" aria-required="true" onChange={e => this.itemChanged(e.target.value)}/>
                    {<ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>}
                </div>
                <button class="form--add__submit" type="submit">
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

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired
};