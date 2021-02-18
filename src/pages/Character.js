import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { charactersContext } from '../context/characters/charactersContext'
import {Box, Grid, Container, Breadcrumbs  } from '@material-ui/core/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faHeart as Liked } from '@fortawesome/free-solid-svg-icons'
import { faHeart as LikeIt } from '@fortawesome/free-regular-svg-icons'

export const Character = ({match}) => {

  const {getCharacterProfile, characterProfile: character, characterMovies: character_movies, characterWorld: character_world, characterVehicles: character_vehicles, cleanUpCharacterData} = useContext(charactersContext)

  const characterURI = match.params.name
  
  useEffect(() => {
    getCharacterProfile(characterURI)
    return () => {
      cleanUpCharacterData()
    }
  }, [])



  const [like, setLiked] = useState(false)

  let likedList = JSON.parse(localStorage.getItem('likedList'))
  likedList = likedList ? likedList : [];


  const isCharacterInStorage = () => {
    const value = likedList.filter(item => item.name === character.name).length > 0 ? true : false
    setLiked(value)
  }

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

  
  useEffect(() => {
    isCharacterInStorage()
  })


  return (
    <Box component={'section'} className={'content-area character'}>
      <Container maxWidth="md">
        <h1 className={'page-title'}>{character.name}</h1>

        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/" exact className="breadcrumbs-item root"><FontAwesomeIcon icon={faChevronLeft} /> Back to search</NavLink>
          <span className="breadcrumbs-item active">{character.name}</span>
        </Breadcrumbs>

        <Grid 
          container
          direction="row"
          justify="space-between"
          className={'content-area-inner'}
        >

          <Grid item sm={4} xs={12} className="character-info featured">
            <div className={'image'}>

            </div>
            <div className={'like-it'} onClick={settingLikeStatus}>
                {like
                  ? <strong><FontAwesomeIcon icon={Liked} />  I like {character.name}!</strong> 
                  : <strong><FontAwesomeIcon icon={LikeIt} /> Thumb up the character</strong>
                }
            </div>
          </Grid>

          <Grid item sm={4} xs={12} className="character-info main">
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

          <Grid item sm={4} xs={12} className="character-info additional">
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
      </Container>
    </Box>
  )
}