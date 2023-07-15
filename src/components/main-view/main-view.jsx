import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser? storedUser : null);
   const [token, setToken] = useState(storedToken? storedToken : null);
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   

   if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

   useEffect(() => {
     if (!token) return;

    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
        
      });


  }, [token]);



 if (selectedMovie) {
  return (
    <MovieView movie={selectedMovie} 
    onBackClick={() => setSelectedMovie(null)} />
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

<button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>

  </div>
 ); 
  

};


