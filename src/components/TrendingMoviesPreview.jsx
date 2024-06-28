import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/movie.css'; // Asegúrate de importar el archivo CSS

const API_KEY = 'c84b15de02b182bd760ca972c743c53f'; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb

const TrendingMoviesPreview = () => {
  const [movies, setMovies] = useState([]);
  //const [ststartIndexart, setStartIndex] = useState(0) 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
        console.log("res",res.data.results)
        setMovies(res.data.results)
        setMovies(res.data.results.slice(0, 5)); // Limitar el número de películas a 5  // AQUI DECIA (props.start, props.end) EN VEZ DE (0, 8)
        //console.log(res.data.results.slice(0, 5))
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();
  }, [])

  
 

  // const siguienteTestimonio = () => {
  //   setStartIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 5)); // Asegurarse de no exceder el límite
  //   console.log("siguiente")
  // };

  // const anteriorTestimonio = () => {
  //   //setIndixInicial((prevIndice) => (prevIndice - 1 + 20) % 20);
  //   console.log("atras")
  // };
  
  return (
    <div id="trendingPreview">
      <h2 >Trending Movies Today</h2>
      <div className='container-carrusel'>
        <div className="trendingPreview-movieList">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
              />
              <p>{ movie.title }</p>
              <p>{ movie.vote_average }</p>
            </div>
          ))}
        </div>
        
          {/* <button onClick={anteriorTestimonio}>Anterior</button>
          <button onClick={siguienteTestimonio}>Siguiente</button> */}
        
      </div>
    </div>
  );
};

export default TrendingMoviesPreview;
