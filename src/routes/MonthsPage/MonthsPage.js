import React, { Component } from 'react'
import apiContext from '../../apiContext'
import ItemApiService from '../../services/item-api-service';
import Months from '../../components/months/months'


export default class MonthsPage extends Component {
  static contextType = apiContext

  componentDidMount() {
    this.context.clearError()
    ItemApiService.getItems()
      .then(this.context.setItemsList)
      .catch(this.context.setError)
  }

  render() {
    const year = Number(this.context.year)
    const prevButton = this.context.year > new Date().getFullYear();
    return (
        <Months 
            items= {this.context.items} 
            year={year}
            prevButton = {prevButton}
        />
    )
  }
}