import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies, selectSmallTile }) => {
  let count = 0;
  const mapped = (
    <div>
      {
        (movies.map(movie =>
          <SmallMovieTile
            key={count += 1}
            selectSmallTile={selectSmallTile}
            movie={movie}
          />)
        )
      }
    </div>
  );

  return (
    <div>
      {movies.length ? mapped : null}
    </div>
  );
};

export default SearchResultsTable;
