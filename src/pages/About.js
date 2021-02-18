import React from 'react'
import {Box, Grid, Container } from '@material-ui/core/'

export const About = () => {

  return (
    <Box component={'section'} className={'content-area about'}>
      <Container maxWidth="md">
        <h1 className={'page-title'}>About this App</h1>
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} className={'content-area-inner'} >
          <p>Current application version: <strong>1.1.0</strong></p>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}