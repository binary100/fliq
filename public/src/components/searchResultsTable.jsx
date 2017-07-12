import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies }) => {
  let count = 0;
  const mapped = (
    <div>
      {movies.map(movie => <SmallMovieTile key={count += 1} movie={movie} />)}
    </div>
  );

  return (
    <div>
      {movies.length ? mapped : null}
    </div>
  );
};

export default SearchResultsTable;
