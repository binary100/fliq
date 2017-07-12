import React from 'react';
import ResultsTileBar from './ResultsTileBar.jsx';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies }) => {
  const mapped = (
    <div>
      {movies.map((movie) => <SmallMovieTile movie={movie} />)}
    </div>
  );


  return (
    <div>
      {movies.length ? mapped : null}
    </div>
  );
};

export default SearchResultsTable;
