import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import axios from "axios";
import "../style/resultspage.css";

const constant_genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const API_KEY = "fbd275a080fd3aac51146bb6a6946f33";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

function ResultsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");

  const { searchType, setSearchType, query, setQuery, id, setId } =
    useStateContext();

  useEffect(() => {
    // Fetch movies based on the user's search query
    const fetchData = async () => {
      try {
        const genresParams = getGenres(); // Asume que esto devuelve un string formateado para URL

        // Condición para saber si se selecciono un genero
        if (genre.length > 0) {
          const response = await tmdbApi.get(`/discover/${searchType}`, {
            params: {
              with_genres: genre,
              page,
            },
          });
          setData(response.data.results);
          return;
        } else {
          const response = await tmdbApi.get(`/search/${searchType}`, {
            params: {
              query,
              page,
            },
          });
          setData(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching discover results:", error);
        throw error;
      }
    };

    fetchData();
  }, [index, page, searchType, query, genre]); // Asegúrate de que 'genre' se actualice correctamente en getGenres

  function getGenres() {
    if (genre.length > 0) {
      return `&with_genres=${genre}`; // &with_genres=1,2
    } else {
      return "";
    }
  }

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

  // Manejar el seleccionardor para obtener el genero
  const handleSelect = (e) => {
    if (genre.includes(e.target.value + ",")) {
      setGenre(genre.replace(e.target.value + ",", ""));
      return;
    }

    setGenre(genre + e.target.value + ",");
  };

  const newData = data.slice(index, index + 10);
  console.log(newData)
  return (
    <div className="container">
      {/* Selection para seleccionar el genero */}
      Seleccione el genero:
      <select onClick={handleSelect}>
        {constant_genres.map((element) => (
          <option key={element.id} value={element.id}>
            {element.name}
          </option>
        ))}
      </select>
      <span>Generos seleccionados: </span>
      {/* // imprimir genero seleccionado, no por numero si no por nombre */}
      <div>
        {genre.split(",").map((element) => {
          if (element === "") return;
          return (
            <p key={element}>
              {
                constant_genres.find((genre) => genre.id === parseInt(element))
                  .name
              }
            </p>
          );
        })}
      </div>
      <div className="container-carrusel">
        <div className="Movie">
          {newData.map((element) => (
            <div key={element.id} className="">
              <img
                className="movie-images"
                src={
                  `https://image.tmdb.org/t/p/w300${element.poster_path}` +
                  `https://image.tmdb.org/t/p/w300${element.profile_path}`
                }
                alt={element.title}
                onClick={() => (
                  setId(element.id), navigate(`/${searchType}/${element.id}/${element.title || element.name}`)
                )}
              />
              <div className="info-container">
                <h3>{element.title || element.name}</h3>
                <p>{element.release_date || element.first_air_date}</p>
              </div>
              <p className="title">{element.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="next-previous-container">
        <button className="previous-page" onClick={previousPage}>
          Previous
        </button>
        <button className="next-page" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
  
export default ResultsPage;
