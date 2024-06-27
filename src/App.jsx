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
      </header>s
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


/*

 const [indexInicial, setIndixInicial] = useState()

  const siguienteTestimonio = () => {
    setIndixInicial((prevIndice) => (prevIndice + 1) % TrendingMoviesPreview);
    console.log("siguiente")
  };

  const anteriorTestimonio = () => {
    setIndixInicial((prevIndice) => (prevIndice - 1 + testimonios.length) % testimonios.length);
    console.log("atras")
};
          
        <button onClick={anteriorTestimonio}>Anterior</button>
        <button onClick={siguienteTestimonio}>Siguiente</button>
  

*/