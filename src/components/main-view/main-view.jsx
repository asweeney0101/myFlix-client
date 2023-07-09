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
        const moviesFromAPI = data.map((doc) => {
          console.log('Doc:', doc);  
          return {
            id: doc._id,
            Title: doc.Title,
            ImagePath: doc.ImagePath,
            Director: doc.Director.Name,
            Genre: doc.Genre.Name,
            Description: doc.Description,
            Featured: doc.Featured,
          };
        });
        setMovies(moviesFromAPI);
        console.log(movies);
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


