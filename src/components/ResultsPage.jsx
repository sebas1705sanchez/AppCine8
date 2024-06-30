import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/stateContext';
import { useParams } from 'react-router-dom';
import '../style/resultspage.css'

function ResultsPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(1);

    const { type, search } = useParams();

    const { searchType, setSearchType, query, setQuery, id, setId } = useStateContext();

    useEffect(() => {
        // Fetch movies based on the user's search query
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/${searchType}?api_key=fbd275a080fd3aac51146bb6a6946f33&query=${query}&page=${page}`
                );
                const data2 = await response.json();
                setData(data2.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [index, page, searchType, query]);

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
        }
        else if (index === 10) {
            setIndex(index - 10);
        } else {
            setPage(page - 1);
            setIndex(10);
        }
    };


    const newData = data.slice(index, index + 10);
    return (
        <div className="container">
            <div className="container-carrusel">
                <div className="Movie">
                    {newData.map((element) => (
                        <div key={element.id} className="img-container">
                            <img className="movie-images"
                                src={`https://image.tmdb.org/t/p/w300${element.poster_path}` + `https://image.tmdb.org/t/p/w300${element.profile_path}`}
                                alt={element.title}
                                onClick={() => (setId(element.id), navigate(`/id/${searchType}/${element.id}`))}
                            />
                            <div className="info-container">
                                <h3>{element.title}</h3>
                                <p>{element.release_date}</p>
                            </div>
                            <p className="title">{element.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="previousPage" onClick={previousPage}>Previous</button>
            <button className="nextPage" onClick={nextPage}>Next</button>
        </div>

    );
}



export default ResultsPage;
