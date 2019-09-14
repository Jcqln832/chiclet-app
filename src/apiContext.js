import React from 'react'

const apiContext = React.createContext({
  items: [],
  incrementYear: () => {},
  decrementYear: () => {},
  addItem: () => {},
  handleClickLogout: () => {},
  doRedirect: () => {},
  updateItem: () => {},
  deleteItem: () => {}
})

export default apiContext;