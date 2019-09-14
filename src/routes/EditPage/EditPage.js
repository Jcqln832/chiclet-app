import React, { Component } from 'react'
import apiContext from '../../apiContext'
import EditItem from '../../components/EditItem/EditItem'

export default class EditPage extends Component {
  static contextType = apiContext;

  render() {
    const {items, updateItem, deleteItem} = this.context;
    console.log(items)
    console.log(updateItem)

    return (
        <EditItem
            item = {items.find(item => item.id === Number(this.props.match.params.itemId))}
            updateItem = {updateItem}
            deleteItem = {deleteItem}
        />
    )
  }
}