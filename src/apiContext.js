import React from 'react'

const apiContext = React.createContext({
  items: [],
  completed: false,
  deleteItem: () => {},
  addItem: () => {},
  handleClickLogout: () => {}
})

export default apiContext;