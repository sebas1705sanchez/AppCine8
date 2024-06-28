import '../css/Home.css'
import TrendingMoviesPreview from './TrendingMoviesPreview'
import TrendingTVPreview from './TrendingTVPreview'
import TrendingPeoplePreview from './TrendingPeoplePreview'
import Buscar from './Buscar'
import SearchComponent from './SearchComponent'

function Home() {

  return (
    <div className="className">
      <header>
        <h1>Peliculas</h1>
        
        <SearchComponent />
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

export default Home


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