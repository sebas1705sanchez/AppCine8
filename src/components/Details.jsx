import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchComponent from "./SearchComponent";
import { useStateContext } from '../context/stateContext';
import '../style/details.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/sectionCard.css'; // Asegúrate de importar el archivo CSS

function Details() {
  const navigate = useNavigate();

  const [information, setInformation] = useState(null);
  const [recomendations, setRecomendations] = useState([]);

  const { type, ID } = useParams();

  const { searchType, setSearchType, id, setId } = useStateContext();

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  
    // Funcion para mostrar los 10 resultados siguientes
    const nextPage = () => {
      if (index === 0) {
        setIndex(index + 10);
      } else {
        setPage(page + 1);
        setIndex(0);
      }
    };
  
    // Funcion para mostrar los 10 resultados anteriores
    const previousPage = () => {
      if (page === 1 && index === 0) {
        return;
      } else if (index === 10) {
        setIndex(index - 10);
      } else {
        setPage(page - 1);
        setIndex(10);
      }
    };

  useEffect(() => {
    fetchData();
  }, [id]);


  useEffect(() => {
    // Set searchType only if type is defined
    if (type) {
      setSearchType(type);
    }
  }, [type]);

  useEffect(() => {
    if(ID) {
      setId(ID); 
    }
  }, [ID, id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${searchType}/${id}`, {
        params: {
          api_key: 'fbd275a080fd3aac51146bb6a6946f33',
          language: 'es'
        }
      });
      setInformation(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };  

  useEffect(() => {
    const fetchRecomendations = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/${searchType}/${ID}/similar`, {
          params: {
            api_key: 'fbd275a080fd3aac51146bb6a6946f33',
            language: 'es'
          }
        });
        setRecomendations(res.data.results.slice(index, index+5));
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchRecomendations();
  }, [index, page, ID])

  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w400${path}`;
  };

  return (
    
    <div className="details">
      <SearchComponent />
      {information && (
        <div className="details-container">
          <div>
            <h1>{information.title || information.name}</h1>
            <img src={getImageUrl(information.poster_path) || getImageUrl(information.profile_path)} alt={information.id} />
            
            <p>{information.overview}</p>
          </div>
          <div className="genres">
          {searchType !== "person" && (<h3>Géneros:</h3>)}
            {information.genres && information.genres.map((genre, index) => (
              <p key={index}>{genre.name}</p>
            ))}

          </div>
          
          {searchType === "person" && (
            <div>
              <h3>Detalles:</h3>
              {information.biography ? <p><strong>Biografía:</strong> {information.biography}</p> : ""}
              {information.birthday ? <p><strong>Fecha de nacimiento:</strong> {information.birthday}</p> : ""}
              {information.deathday ? <p><strong>Fecha de muerte:</strong> {information.deathday}</p> : ""}
              {
                information.also_known_as ? (
                  <div>
                    <h3>Ver más Personas</h3>
                    {information.also_known_as.map((element) => (
                      <p>{element}</p>
                    ))}
                  </div>
                ) : (
                  ""
                )
              }

            </div>
          )}
        </div>
      )}
      <div>
        <div className="trendingPreview-movieList">
              {recomendations.map((recomendation) => (
                <div key={recomendation.id} className="movie-container">
                  <img
                    className="movie-img"
                    src={`https://image.tmdb.org/t/p/w300${recomendation.backdrop_path}`}
                    alt={recomendation.title}
                    onClick={() => (setId(recomendation.id), setSearchType(searchType), navigate(`/${searchType}/${recomendation.id}/${recomendation.title || recomendation.name}`))}
                  />
                  <p>{recomendation.title}</p>
                  <p>{recomendation.vote_average}</p>
                </div>
              ))}
        </div>
        <div className='next-previous-container'>  
        <button className="previous-page" onClick={previousPage}>Previous</button>
        <button className="next-page" onClick={nextPage}>Next</button>
      </div>     
      </div>

    </div>
  );
}

export default Details;

