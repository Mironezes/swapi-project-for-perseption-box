import {
    ADD_CHARACTER_TO_LIST,
    SET_CURRENT_CHARACTER,
    SET_CHARACTER_PROFILE,
    SET_CHARACTER_WORLD,
    SET_CHARACTER_VEHICLES,
    SET_CHARACTER_MOVIES,
    SET_LOADING, 
    STOP_LOADING,
    CLEAN_UP_CHARACTER_DATA,
  } from "../actionTypes"

const handlers = {
  [ADD_CHARACTER_TO_LIST]: (state, {payload}) => ({...state, charactersList: [...state.charactersList, payload]}),

  [SET_CURRENT_CHARACTER]: (state, {payload}) => ({...state, characterID: payload }),
  [SET_CHARACTER_PROFILE]: (state, {payload}) => ({...state, characterProfile: payload }),

  [SET_CHARACTER_VEHICLES]: (state, {payload}) => ({...state, characterVehicles: [...state.characterVehicles, payload]  }),
  [SET_CHARACTER_WORLD]: (state, {payload}) => ({...state, characterWorld: payload }),
  [SET_CHARACTER_MOVIES]: (state, {payload}) => ({...state, characterMovies: [...state.characterMovies, payload] }),

  [SET_LOADING]: state => ({...state, loading: true }),
  [STOP_LOADING]: state => ({...state, loading: false, isFetched: true }),

  [CLEAN_UP_CHARACTER_DATA]: state => (
    {...state, characterProfile: [], characterVehicles: [], 
      characterWorld: [], characterMovies: []
    }),
  
  DEFAULT: state => state
}

export const characterReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state,action)
}