import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movie from './component/Movie';
import Watchlist from './component/Watchlist';
import Banneer from './component/Banneer';

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddToWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem('moviesApp', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
    console.log(newWatchlist);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchlist);
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchlist));
  };
  
  useEffect(() => {
    // Load watchlist from localStorage on component mount
    const moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (moviesFromLocalStorage) {
      setWatchlist(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={
              <>
                <Banneer />
                <Movie 
                  handleaddtoatchlist={handleAddToWatchlist} 
                  handleremovefromwatchlist={handleRemoveFromWatchlist} 
                  watchlist={watchlist} 
                />
              </>
            } 
          />
          <Route 
            path='/watchlist' 
            element={
              <Watchlist 
                watchlist={watchlist} 
                handleremovefromwatchlist={handleRemoveFromWatchlist} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
