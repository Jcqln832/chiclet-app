import React from 'react'

const apiContext = React.createContext({
  items: [],
  completed: false,
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
})

export default apiContext;