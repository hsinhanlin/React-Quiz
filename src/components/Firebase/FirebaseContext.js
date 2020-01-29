import React from 'react'

export const FirebaseContext = React.createContext(null)
export const useFirebase = () => React.useContext(FirebaseContext)
