import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies, selectSmallTile }) => {
  let count = 0;
  let arr = [];
  for (var i = 0; i < movies.length; i += 2) {
    const result = (
      <div>
        <div>
          <span className="col-sm-6">
            <SmallMovieTile
              key={count += 1}
              showButtons
              selectSmallTile={selectSmallTile}
              movie={movies[i]}
            />
          </span>
          <span className="col-sm-6">
            <SmallMovieTile
              key={count += 1}
              showButtons
              selectSmallTile={selectSmallTile}
              movie={movies[i+1]}
            />
          </span>
        </div>
      </div>
    );
    arr.push(result);
  }

  return (
    <div className="col-sm-6 search-table">
        {movies.length ? arr : null}
    </div>
  );
};

export default SearchResultsTable;
