import React, { useState, useEffect } from 'react';

import ResultsPage from "../components/ResultsPage";
import SearchComponent from "../components/SearchComponent";
import { useStateContext } from '../context/stateContext';

function Details() {

  const { searchType, setSearchType  } = useStateContext();
  const { query, setQuery  } = useStateContext();



  const  [page, setPage] = useState(1);
  const  [index, setIndex] = useState(0);

  const changePage = () => {
    if (index === 0){
        setIndex(index + 10);
    }else{
        setIndex(0);
        setPage(page + 1);
    }
  }
  return(
    <div>
      <SearchComponent/>
      <div>
        <ResultsPage page={page} type={searchType} search={query} index={index}/>
        <button onClick={changePage}>Next</button>
      </div>
    </div>
  );
}

export default Details;
