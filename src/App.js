import React from 'react'
import {BrowserRouter} from 'react-router-dom' 
import {Navigation} from './components/Navigation';
import {Footer} from './components/Footer';
import {CharactersState} from './context/characters/charactersState';
import {UserState} from './context/user/userState'
import {Routes} from './Routes'

function App() {
  return (
    <UserState>
    <CharactersState>
      <BrowserRouter>
        <Navigation />
        <main className="page-content">
          <Routes />
        </main>
        <Footer />
      </BrowserRouter>
    </CharactersState>
    </UserState>


  )
}

export default App
