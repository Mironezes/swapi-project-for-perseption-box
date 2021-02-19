import React, {useContext, useState, useEffect} from 'react'
import {charactersContext} from '../context/characters/charactersContext'
import {Grid} from '@material-ui/core/'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart as Liked} from '@fortawesome/free-solid-svg-icons'
import {faHeart as LikeIt} from '@fortawesome/free-regular-svg-icons'
import {CharacterImage} from '../components/CharacterImage'

export const CharacterInfo = () => {

  const {characterProfile: character, characterMovies: character_movies, characterWorld: character_world, characterVehicles: character_vehicles} = useContext(charactersContext)
   
  const [like, setLiked] = useState(false)

  let likedList = JSON.parse(localStorage.getItem('likedList'))
      likedList = likedList ? likedList : [];
      
      
  const isCharacterInStorage = () => {
    const value = likedList.filter(item => item.name === character.name).length > 0 ? true : false
    setLiked(value)
  }
      
  useEffect(() => {
    isCharacterInStorage()
  })


  const settingLikeStatus = () => {
    const characterData = {
      name: character.name,
      uri: character.url.replace('http://swapi.dev/api', '')
    }
      
    if(like === false) {
      setLiked(true)
      likedList.push(characterData)
      localStorage.setItem('likedList', JSON.stringify(likedList))
    }
    else {
      setLiked(!like)
      const updatedList = likedList.filter(item => item.name !== characterData.name)
      localStorage.setItem('likedList', JSON.stringify(updatedList))
    }
  }
        

  return (
    <Grid 
      container
      direction="row"
      justify="space-between"
      className={'character-info-block'}
    >
      <Grid item md={4} sm={12} xs={12} className="character-info featured">
        <div className={'image'}>
            <CharacterImage character={character} />
        </div>
        <div className={'like-it'} onClick={settingLikeStatus}>
            {like
              ? <strong><FontAwesomeIcon icon={Liked} />  I like {character.name}!</strong> 
              : <strong><FontAwesomeIcon icon={LikeIt} /> Thumb up the character</strong>
            }
        </div>
      </Grid>


      <Grid item md={4} sm={6} xs={6} className="character-info main">
        <h2>Main info</h2>
        <span><strong>Birth year:</strong> {character.birth_year}</span>
        <span><strong>Gender:</strong> {character.gender}</span>
        <span><strong>Native planet:</strong> {character_world.name}</span>
        <span><strong>Height:</strong> {character.height}</span>
        <span><strong>Mass:</strong> {character.mass}</span>
        <span><strong>Hair color:</strong> {character.hair_color}</span>
        <span><strong>Skin color:</strong> {character.skin_color}</span>
        <span><strong>Eye color:</strong> {character.eye_color}</span>
      </Grid>

      <Grid item md={4} sm={6} xs={6} className="character-info additional">
      <div className="character-info-category">
        <h3>Vehicles</h3>
        <ul>
          {(character_vehicles.length > 0) ? character_vehicles.map((vehicle, id) => <li key={id}>{vehicle.name}:{vehicle.model}</li>) : <li>Unknown</li>}
        </ul>
      </div>

      <div className="character-info-category">
        <h3>Movies</h3>
        <ul>
          {character_movies.map((movie, id) => <li key={id}>{movie.title}</li>)}
        </ul>
      </div>
      </Grid>
    </Grid>
  )
}