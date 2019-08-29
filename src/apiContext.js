import React from 'react'

const apiContext = React.createContext({
  items: [],
  incrementYear: () => {},
  decrementYear: () => {},
  addItem: () => {},
  handleClickLogout: () => {}
})

export default apiContext;