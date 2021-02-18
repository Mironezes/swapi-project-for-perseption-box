import {
    SET_USER_DATA,
    REMOVE_USER_DATA,
  } from "../actionTypes"

const handlers = {
  [SET_USER_DATA]: (state, {payload}) => ({...state, userData: {...state.userData, ...payload}, isAuthorized: true}),

  [REMOVE_USER_DATA]: state => ({...state, userData: [], isAuthorized: false }),
  
  DEFAULT: state => state
}

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state,action)
}