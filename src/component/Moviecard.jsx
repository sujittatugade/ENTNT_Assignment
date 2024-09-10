import React from "react";

function Moviecard({ poster_path, name, handleaddtoatchlist, movieObj, handleremovefromwatchlist, watchlist = [] }) {
  function isContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[40vh] w-[170px] relative bg-cover bg-center flex flex-col justify-between rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {isContain(movieObj) ? (
        <div className="flex flex-row-reverse m-2">
        <div className="bg-gray-900/60 rounded-lg p-1" onClick={() => handleremovefromwatchlist(movieObj)}>
          &#10060;
        </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse m-2">
          <div className="bg-gray-900/60 rounded-lg p-1" onClick={() => handleaddtoatchlist(movieObj)}>
            &#128525;
          </div>
        </div>
      )}
      <div className="absolute bottom-0 text-center text-white pb-0 w-full">
        <div className="inline-block bg-gray-900/60 px-0 py-2 rounded-xl w-full">
          {name}
        </div>
      </div>
    </div>
  );
}

export default Moviecard;
