import React from 'react'

const apiContext = React.createContext({
  items: [],
  completed: false,
  deleteItem: () => {},
  addItem: () => {},
})

export default apiContext;