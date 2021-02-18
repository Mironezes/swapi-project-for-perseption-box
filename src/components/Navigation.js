import React, {useContext} from 'react'
import { userContext } from '../context/user/userContext'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {Box, Grid, Container } from '@material-ui/core/'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


export const Navigation = () =>  {

  const {FacebookLogIn, FacebookLogOut, isAuthorized} = useContext(userContext)

  const responseFacebook = (response) => {
    FacebookLogIn(response)
  }

  return (
    
      <Box component={'header'} className={'header'}>
        <Container maxWidth="md">
          <Grid 
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <div className={'header-logo'}><Link to="/">SWAPI Project</Link></div>
  
            <nav className={'header-menu'}>
              <NavLink to="/" exact>Home</NavLink>
              {isAuthorized 
                ? <NavLink to="/profile">Profile</NavLink>
                : null
              }
              <NavLink to="/about">About</NavLink>
            </nav>

            <div className={'header-user'}>
              {isAuthorized
                ? <button onClick={FacebookLogOut}>Log out</button>
                : <FacebookLogin
                  appId="183265709827390"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  public_profile
                  render={renderProps => (
                    <button onClick={renderProps.onClick}>Sign in via  <FontAwesomeIcon icon={faFacebook} /></button>
                  )}
                />

              }

            </div>

          </Grid>
        </Container>
      </Box>
  
  )
}
