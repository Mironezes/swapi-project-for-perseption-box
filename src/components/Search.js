import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import {TextField} from '@material-ui/core/';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import {charactersContext} from '../context/characters/charactersContext'


const useStyles = makeStyles({
  root: {
    background: '#fff',
    borderRadius: 4,
  },
  focused: {
    '& fieldset': {
      borderColor: 'transparent !important' 
    },
    '& label': {
      opacity: 0
    }
  },
});


export const Search = () => {

  const classes = useStyles();

  const {charactersList} = useContext(charactersContext) 

  const history = useHistory()

  const searchList = charactersList.map(character => ({
    name: character.name, 
    url: character.url.replace('http://swapi.dev/api', '')
  }))

  return (
      <Autocomplete 
        classes={{
          root: classes.root, 
          focused: classes.focused, 
          inputFocused: classes.inputFocused
        }}
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
