import React, { useState } from "react";
import genres from '../Utility/genreid'; // Import the genres array

function Watchlist({ watchlist, handleremovefromwatchlist }) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Convert genres array to a mapping object
  const genreMapping = genres.reduce((acc, genre) => {
    acc[genre.name] = genre.id;
    return acc;
  }, {});

  const filteredMovies = watchlist.filter((movieObj) => {
    const matchesSearch = movieObj.original_title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === 'All Genres' ||
      (movieObj.genre_ids && movieObj.genre_ids.includes(genreMapping[selectedGenre]));

    return matchesSearch && matchesGenre;
  });

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.name : '';
    }).join(', ');
  };

  return (
    <>
      <div className="flex justify-center flex-wrap mb-8 mt-4">
        {['All Genres', ...Object.keys(genreMapping)].map((genre) => (
          <div
            key={genre}
            className={`flex justify-center items-center rounded-xl h-[3rem] w-[9rem] text-center font-bold mx-6 my-2 cursor-pointer ${
              selectedGenre === genre ? 'bg-blue-700 text-white' : 'bg-gray-300 text-white'
            }`}
            onClick={() => handleGenreChange(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
      <div className="flex justify-center m-4">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search for movie"
          className="bg-gray-200 h-[3rem] w-[18rem] outline-none px-4"
        />
      </div>

      <div className="rounded border border-gray-200 m-4">
        <table className="w-full text-center text-gray-500">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movieObj) => (
              <tr key={movieObj.id} className="border-b-2">
                <td className="flex items-center px-6 py-4">
                  <img
                    className="h-[6vh] w-[10vh]"
                    src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                    alt={movieObj.original_title}
                  />
                  <div className="mx-8">{movieObj.original_title}</div>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td>{getGenreNames(movieObj.genre_ids)}</td>
                <td
                  className="text-red-400 cursor-pointer"
                  onClick={() => handleremovefromwatchlist(movieObj)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
