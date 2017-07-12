import React from 'react';
import ResultsTileBar from './ResultsTileBar.jsx';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies }) => {
  const mapped = movies.map((movie) => <SmallMovieTile movie={movie} />);

  return (
    <div>
      {movies.length ? mapped : null}
    </div>
  );
};

export default SearchResultsTable;
