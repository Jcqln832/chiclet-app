import React, { Component } from 'react'
import apiContext from '../../apiContext'
import EditItem from '../../components/EditItem/EditItem'

export default class EditPage extends Component {
  static contextType = apiContext;

  render() {
    return (
        <EditItem
            item = {this.context.items.find(item => item.id === Number(this.props.match.params.itemId))}
            updateItem = {this.context.updateItem}
            deleteItem = {this.context.deleteItem}
        />
    )
  }
}