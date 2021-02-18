import React, {useReducer} from 'react'
import {  
  ADD_CHARACTER_TO_LIST,
  SET_CURRENT_CHARACTER,
  SET_CHARACTER_PROFILE,
  SET_CHARACTER_WORLD,
  SET_CHARACTER_MOVIES,
  SET_CHARACTER_VEHICLES,
  STOP_LOADING, 
  SET_LOADING, 
  CLEAN_UP_CHARACTER_DATA
} from '../actionTypes'
import {charactersContext} from './charactersContext'
import { characterReducer } from './charactersReducer'
import axios from 'axios'

export const CharactersState = ({children}) => {

  const initialState = {
    charactersList: [],
    characterID: '',
    characterWorld: [],
    characterProfile: [],
    characterMovies: [],
    characterVehicles: [],
    loading: false,
    isFetched: false,
  }

  const [state, dispatch] = useReducer(characterReducer, initialState)


  const getCharactersList = async () =>  {
    setLoading()

    const itemsCount = await (await axios.get(`https://swapi.dev/api/people/`)).data.count

    for(let i = 1; i <= itemsCount; i++) {
      if(i === 17) continue
      const response = await axios.get(`https://swapi.dev/api/people/${i}`)
      const profile = response.data

      dispatch({
        type: ADD_CHARACTER_TO_LIST,
        payload: profile
      })
    }

    stopLoading()
  }


  const setCurrentCharacter = id =>  {
    dispatch({
      type: SET_CURRENT_CHARACTER,
      payload: id,
    }) 
  }
  

  const setCharacterProfile = profile =>  {
    dispatch({
      type: SET_CHARACTER_PROFILE,
      payload: profile,
    }) 
  }
  

  const getCharacterProfile = async id =>  {

    const profile = await (await axios.get(`https://swapi.dev/api/people/${id}`)).data
  
    setCharacterProfile(profile)
    getCharacterWorld(profile.homeworld)
    getCharacterMovies(profile.films)
    getCharacterVehicles(profile.vehicles)
  }
  

  const setCharacterWorld = world => {
    dispatch({
      type: SET_CHARACTER_WORLD,
      payload: world,
    }) 
  }
  

  const getCharacterWorld = async worldURL => {
    const world = await axios.get(worldURL)
    setCharacterWorld(world.data)
  }
  

  const setCharacterMovies = movies => {
    return {
      type: SET_CHARACTER_MOVIES,
      payload: movies,
    }
  }
  

  const getCharacterMovies = async moviesURLs=> {
      axios.all(moviesURLs.map(movieURL => axios.get(movieURL))).then(function(movies) {
        movies.map(movie => dispatch(setCharacterMovies(movie.data)))
      })
  }
  

  const setCharacterVehicles = vehicles => {
    return {
      type: SET_CHARACTER_VEHICLES,
      payload: vehicles,
    }
  }
  

  const getCharacterVehicles = async vehiclesURLs=> {
      axios.all(vehiclesURLs.map(vehicleURL => axios.get(vehicleURL))).then(function(vehicles) {
        vehicles.map(vehicle => dispatch(setCharacterVehicles(vehicle.data)))
      })
  }


  const setLoading = () => dispatch({
    type: SET_LOADING
  })

  const stopLoading = () => dispatch({
    type: STOP_LOADING
  })

  const cleanUpCharacterData = () => dispatch({
    type: CLEAN_UP_CHARACTER_DATA
  })


  const {
          characterID, charactersList, characterProfile, characterWorld,  characterVehicles, characterMovies, 
          loading, isFetched
        } = state

        
  return(
    <charactersContext.Provider 
      value={{setLoading, cleanUpCharacterData,
        setCurrentCharacter, getCharacterProfile, getCharactersList, stopLoading,
        charactersList,
        characterID,
        characterProfile,
        characterWorld,
        characterVehicles,
        characterMovies,
        loading, 
        isFetched
      }}>
      {children}
    </charactersContext.Provider>
  )
}