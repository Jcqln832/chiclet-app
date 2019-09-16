import React from 'react'

const apiContext = React.createContext({
  items: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  incrementYear: () => {},
  decrementYear: () => {},
  addItem: () => {},
  handleClickLogout: () => {},
  doRedirect: () => {},
  updateItem: () => {},
  deleteItem: () => {}
})

export default apiContext;