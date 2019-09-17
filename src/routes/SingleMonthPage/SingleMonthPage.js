import React, { Component } from 'react'
import apiContext from '../../apiContext'
// import ItemApiService from '../../services/item-api-service'
import MONTHS from '../../Utils/monthsList';
import SingleMonth from '../../components/month/month'


export default class SingleMonthPage extends Component {
  static contextType = apiContext;

  componentDidMount() {
    this.context.fetchItems()
  }

  render() {
    const monthIndex = this.props.match.params.monthId;
    const month = MONTHS.find(month => month.id === monthIndex.slice(4));
    const {items, year, doRedirect} = this.context;
      
    return (
        <SingleMonth 
            doRedirect = {doRedirect}
            year = {year}
            monthName = {month.name}
            monthIndex = {monthIndex}
            monthItems = {items.filter(item => item.index === Number(monthIndex))}
        />
    )
  }
}