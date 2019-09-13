import React from 'react'

const apiContext = React.createContext({
  items: [],
  incrementYear: () => {},
  decrementYear: () => {},
  addItem: () => {},
  handleClickLogout: () => {},
  doRedirect: () => {},
})

export default apiContext;