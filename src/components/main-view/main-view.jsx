import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
   const [movies, setMovies] = useState([ ]);



   useEffect(() => {
    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        const moviesFromAPI = data.map((movie) => {
          console.log('Movie:', movie);  
          return {
            id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Director: movie.Director.Name,
            Genre: movie.Genre.Name,
            Description: movie.Description,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromAPI);
        
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
      });
  }, []);

 const [selectedMovie, setSelectedMovie] = useState(null);

 if (selectedMovie) {
  return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
   ); 
  }

 return (
  <div>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />  
    ))}
  </div>
 ); 
  

};


