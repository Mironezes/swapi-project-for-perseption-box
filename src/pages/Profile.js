import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Box, Grid, Container } from '@material-ui/core/'
import { userContext } from '../context/user/userContext'

export const Profile = () => {

  const {userData} = useContext(userContext)

  const userName =  userData.name.split(' ')[0]

  let likedList = JSON.parse(localStorage.getItem('likedList'))
  likedList = likedList ? likedList : [];


  return (

    <Box component={'section'} className={'content-area profile'}>
      <Container maxWidth="md">
        <h1 className={'page-title'}>My Profile</h1>
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={'content-area-inner'}
        >
          <Grid item sm={6} xs={12}>
            <h2>Nice to see you, {userName}!</h2>
            <div className={'profile-info'}>
              <span><strong>Email:</strong> {userData.email}</span>
              <span><strong>Facebook ID:</strong> {userData.userID}</span>
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <div className={'profile-liked-list'}>
              <strong>List of liked by you SW characters:</strong>
              <ul>
                { likedList.length > 0 
                  ? likedList.map((item, index) => 
                      <li key={index}>
                        <span>{item.name}</span> <Link to={item.uri}>(link)</Link>
                      </li>)
                  : <li>List is empty</li>
                }
              </ul>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}