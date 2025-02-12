import React from 'react';
import { NavLink } from 'react-router-dom';


interface GenreProps {
    genres:string[] ;
}

interface Genreprops2{
    genre:string;
}




const Genre: React.FC<Genreprops2> = ({ genre }) => {
  return (
    <NavLink to={`/genre/${genre}`}>
        <div className="text-sm font-medium text-gray-400 hover:text-gray-100 px-2 sm:py-4 py-2 rounded-md transition duration-150 ease-in-out">
      {genre}
    </div>
    </NavLink>
  );
};

const Genres: React.FC<GenreProps> = ({genres}) => {




  return (
    <div className="bg-gray-900 p-4 rounded-lg px-4">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Genres</h2>
      <div className="grid grid-cols-3 gap-4 items-start justify-start">
        {genres.map((genre) => (
          <Genre key={genre} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default Genres;