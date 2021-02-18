import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom' 
import {Home} from './pages/Home'
import {About} from './pages/About'
import {Character} from './pages/Character'
import {Profile} from './pages/Profile'
import { userContext } from './context/user/userContext'

export const Routes = () =>  {

  const {isAuthorized} = useContext(userContext)

  return(
    <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/about" component={About} />
    {isAuthorized 
      ? <Route path="/profile" component={Profile} />
      : null   
    }
    <Route path="/people/:name" component={Character} />

    <Redirect to="/" />
    </Switch>
  )
}

