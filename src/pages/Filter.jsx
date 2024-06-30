import React, { useState, useEffect } from 'react';
import ResultsPage from "../components/ResultsPage";
import SearchComponent from "../components/SearchComponent";
import { useStateContext } from '../context/stateContext';
import '../style/resultspage.css'
function Details() {

  const { searchType, setSearchType  } = useStateContext();
  const { query, setQuery  } = useStateContext();

  return(
    <div>
      <SearchComponent />
      <div className="container-resultPage">
        <ResultsPage />
      </div>
    </div>
  );
}

export default Details;
