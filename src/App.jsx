import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TrendingMoviesPreview from './components/TrendingMoviesPreview '
import TrendingTVPreview from './components/TrendingTVPreview '
import TrendingPeoplePreview from './components/TrendingPeoplePreview '

function App() {

  return (
    <div className="className">
      <header>
        <h1>Peliculas</h1>
      </header>
      <main>
        <TrendingMoviesPreview 
        start = {2}
        end = {5}/>
  
        <TrendingTVPreview />
        <TrendingPeoplePreview />
      </main>
    </div>
  )
}

export default App
