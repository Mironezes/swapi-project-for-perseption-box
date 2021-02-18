import React, {useReducer} from 'react'
import {  
  SET_USER_DATA,
  REMOVE_USER_DATA,
} from '../actionTypes'
import {userContext} from './userContext'
import {userReducer} from './userReducer'

export const UserState = ({children}) => {

  const initialState = {
    userData: {},
    likedList: [],
    isAuthorized: false,
    isLiked: false,
  }


  const [state, dispatch] = useReducer(userReducer, initialState)


  const FacebookLogIn = async (user) =>  {
      dispatch({
        type: SET_USER_DATA,
        payload: user
      })
  }


  const FacebookLogOut = () => dispatch({
    type: REMOVE_USER_DATA
  })


  const {userData, isAuthorized} = state

    
  return(
    <userContext.Provider 
      value={{FacebookLogIn, FacebookLogOut, userData, isAuthorized,
      }}>
      {children}
    </userContext.Provider>
  )
}