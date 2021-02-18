import React, {useContext} from 'react'
import {TextField} from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { charactersContext } from '../context/characters/charactersContext'
import {useHistory} from 'react-router-dom';


export const Search = () => {
  const {charactersList} = useContext(charactersContext) 

  const history = useHistory()

  const searchList = charactersList.map(character => ({
    name: character.name, 
    url: character.url.replace('http://swapi.dev/api', '')
  }))

  return (
      <Autocomplete 
        className={'search-panel'}
        options={searchList}
        getOptionLabel={(character) => character.name}
        style={{ width: '100%'}}
        onChange={(event, newInputValue) => {
          history.push(newInputValue.url)
        }}
        autoSelect={true}
        renderInput={(params) => <TextField 
          {...params} 
          label="Search by name..." 
          variant="outlined" 
        />}
      />
  )
}
