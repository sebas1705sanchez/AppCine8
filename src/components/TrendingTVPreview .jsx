import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/sectionCard.css';  // Asegúrate de importar el archivo CSS

const API_KEY = 'c84b15de02b182bd760ca972c743c53f'; // Recuerda reemplazar 'tu_api_key' con tu clave de API de TMDb


/* componente */
const TrendingTVPreview = () => {
  const [tvShows1, setTvShows1] = useState([]); 
  const [tvShows2, setTvShows2] = useState([]); /* Valor y la fomra de actualizar el valor con el useEstate */

  useEffect(() => { /* Debe recibir el código para ejecutar y la lista de dependencias   //como minimo se ejecuta una vez*/

    console.log
    const fetchTvShows = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`);
        setTvShows1(res.data.results.slice(0,5));
        setTvShows2(res.data.results.slice(6,11)); // Limitar el número de programas de TV a 5
      } catch (error) {
        console.error('Error fetching trending TV shows:', error);
      }
    };

    fetchTvShows();
  }, []); /* Este array se pasa de forma opcional, si no se le pasa el código dentro de useEffect se va a ejecutar cada que se renderice el componente*/

  console.log("tvShows")
/*   console.log(tvShows) */


  return (
    <div id="trendingTvPreview">
      <div className="trendingPreview-container">
        <h2>Trending TV Shows Today</h2>
        <div className="trendingPreview-movieList">
          {tvShows1.map((tvShow) => (
            <div key={tvShow.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
                alt={tvShow.name}
              />
              <p>{tvShow.name}</p>{/* Nombre de la pelicula */}
              <p>{tvShow.vote_average}</p>{/* Fecha de estreno */}
            </div>
          ))}
        </div>

        <div className="trendingPreview-movieList">
          {tvShows2.map((tvShow) => (
            <div key={tvShow.id} className="movie-container">
              <img
                className="movie-img"
                src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`}
                alt={tvShow.name}
              />
              <p>{tvShow.name}</p>{/* Nombre de la pelicula */}
              <p>{tvShow.vote_average}</p>{/* Fecha de estreno */}
            </div>
          ))}
        </div>
      </div>    
    </div>
  );

};

export default TrendingTVPreview;