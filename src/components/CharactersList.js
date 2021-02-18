import React, {useContext, useEffect,} from 'react'
import {Grid, Card, CardContent, CardActions} from '@material-ui/core/';
import { charactersContext } from '../context/characters/charactersContext'
import {Link} from 'react-router-dom'
import {Spinner} from '../components/Loader'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export const CharactersList = () => {

  const {getCharactersList, charactersList: characters, loading , isFetched, stopLoading} = useContext(charactersContext)

  characters.sort(function(a, b) {
    if (a.name < b.name)
     return -1;
    if (a.name > b.name)
     return 1;
    return 0; 
   });

   useEffect(() => {
    stopLoading()

    if(!isFetched) {
      getCharactersList()
     }
  }, [])

 return (

  <>
    {loading
    ?
      <Spinner/>
    :
    <Grid container spacing={2}>
      {characters.map((character, id) => {
        const profileURI = character.url.replace('http://swapi.dev/api', '')
        return (
          <Grid item sm={4} xs={12}  key={id}>
              <Card className={'character-card'}>
              <CardContent>
                <h2>{character.name}</h2>
                <span>Gender: {character.gender}</span>
                <span>Birth: {character.birth_year}</span>
              </CardContent>
              <CardActions>
                <Link to={`${profileURI}`} className={'character-card__button'}>Details</Link>
              </CardActions>
            </Card>
          </Grid>

        )
      })}         
    </Grid>
    }
  </>
  )
}