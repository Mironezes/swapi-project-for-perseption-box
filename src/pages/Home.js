import React from 'react'
import {Grid, Container} from '@material-ui/core/';
import { CharactersList } from '../components/CharactersList'
import { Search } from '../components/Search'

export const Home = () => {

  return (
    <Grid container >
    <Container maxWidth="md">
      <h1 className={'page-title'}>Star Wars Characters</h1>
      <Search />
      <CharactersList />
    </Container>
    </Grid>
  )
}