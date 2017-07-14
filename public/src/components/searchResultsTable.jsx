import React from 'react';
import SmallMovieTile from './smallMovieTile.jsx';

const SearchResultsTable = ({ movies, selectSmallTile }) => {
  let count = 0;
  let arr = [];
  for (var i = 0; i < movies.length; i+=2) {
    const result = (
      <div className="row">
        <div className="col-sm-12">
          <span className="col-sm-6">
            <SmallMovieTile
              key={count += 1}
              selectSmallTile={selectSmallTile}
              movie={movies[i]}
            />
          </span>
          <span className="col-sm-6">
            <SmallMovieTile
              key={count += 1}
              selectSmallTile={selectSmallTile}
              movie={movies[i+1]}
            />
          </span>
        </div>
      </div>
    );
    arr.push(result);
  }


  // const mapped = (
  //   <div className="col-sm-6 search-results">
  //     {
  //       (movies.map(movie =>
  //         <SmallMovieTile
  //           key={count += 1}
  //           selectSmallTile={selectSmallTile}
  //           movie={movie}
  //         />)
  //       )
  //     }
  //   </div>
  // );

  return (
    <div className="col-sm-6">
      {movies.length ? arr : null}
    </div>
  );
};

export default SearchResultsTable;
