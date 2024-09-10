import React, { useEffect, useState } from 'react';
import Moviecard from './Moviecard';
import axios from 'axios';
import Strip from './Strip';

function Movie({ handleaddtoatchlist, handleremovefromwatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPage] = useState(1);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPage(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPage(pageNo + 1);
  };

  useEffect(() => {
    console.log("Fetching movies for page:", pageNo);
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=341f4600175eb1860e91ae8f6fefec1a&language=en-US&page=${pageNo}`)
      .then((res) => {
        setMovies(res.data.results);
        console.log("Movies fetched:", res.data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [pageNo]);

  return (
    <div className='p-4'>
      <div className='text-center font-bold text-xl mt-2'>
        Trending Movies
      </div>
      <div className='flex justify-around flex-row flex-wrap pt-4 gap-10'>
        {movies.map((movieObj) => (
          <Moviecard 
            key={movieObj.id} 
            movieObj={movieObj}
            poster_path={movieObj.poster_path} 
            name={movieObj.original_title} 
            handleaddtoatchlist={handleaddtoatchlist}
            handleremovefromwatchlist={handleremovefromwatchlist}
            watchlist={watchlist}  // Ensure watchlist is passed down here
          />
        ))}
      </div>
      <Strip pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Movie;
