import React, {useContext, useEffect} from 'react'
import {charactersContext} from '../context/characters/charactersContext'
import {CharacterInfo} from '../components/CharacterInfo'
import {CommentForm} from '../components/CommentForm'
import {NavLink} from 'react-router-dom'
import {Box, Grid, Container, Breadcrumbs  } from '@material-ui/core/'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'



export const Character = ({match}) => {

  const {characterProfile: character, getCharacterProfile, cleanUpCharacterData} = useContext(charactersContext)

  const characterURI = match.params.name
  
  useEffect(() => {
    getCharacterProfile(characterURI)
    return () => {
      cleanUpCharacterData()
    }
  }, [])


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
          direction="column"
          justify="space-between"
          className={'content-area-inner'}
        >

          <CharacterInfo />

          <CommentForm />

        </Grid>
      </Container>
    </Box>
  )
}