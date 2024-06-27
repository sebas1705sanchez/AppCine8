import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [information, setInformation] = useState(null);

  const Id = 32;
  const type = "person"; 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${type}/${Id}`, {
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

  const getImageUrl = (path) => {
    if (!path) {
      return '';
    }
    return `https://image.tmdb.org/t/p/w400${path}`;
  };



  return (
    <div className="details">
      <h1>Detalles:</h1>
      {information && (
        <div>
          <img src={getImageUrl(information.poster_path) || getImageUrl(information.profile_path)} alt={information.id}/>
          <h2>{information.title || information.name}</h2>
          <p>{information.overview}</p>
          {type !== "person" && (<h3>Géneros:</h3>)}
          <div>
          {information.genres && information.genres.map((genre, index) => (
            <p key={index}>{genre.name}</p>
          ))}

          </div>
          {type === "person" && (
            <div>
              <h3>Detalles:</h3>
                {information.biography?<p><strong>Biografía:</strong> {information.biography}</p> : "" }
                {information.birthday? <p><strong>Fecha de nacimiento:</strong> {information.birthday}</p> : "" }
                {information.deathday? <p><strong>Fecha de muerte:</strong> {information.deathday}</p> : "" }
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
    </div>
  );
}

export default App;

