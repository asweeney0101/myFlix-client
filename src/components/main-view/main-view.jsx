import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { IndexView } from "../index-view/index-view.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
   const storedUserData = localStorage.getItem("user");
   const storedUser = (storedUserData && storedUserData !== "undefined") ? JSON.parse(storedUserData) : null;
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser? storedUser : null);
   const [token, setToken] = useState(storedToken? storedToken : null);
   const [movies, setMovies] = useState([]);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [view, setView] = useState("login");
   

   useEffect(() => {
    if (token) {
    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
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
        console.error("Error fetching movies:", error);
      });
    }
  }, [token]);



  if (!user) {
    return (

      <BrowserRouter>
      <Routes>
       <Route 
       path="/"
       >
        <IndexView>

        </IndexView>
       </Route>

      </Routes>
      </BrowserRouter>
    );
  }

  


 if (selectedMovie) {
  return (
    <Col md={8} style={{ }}>
      <MovieView movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} />
    </Col>
      ); 
  }

  return (
    <>
      <Row className="justify-content-md-center">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />  
          </Col>
        ))}
      </Row>
      
      <Row className="justify-content-md-center">
        <Button 
          style={{maxWidth: '300px'}}
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
        </Button>
      </Row>
    </>
  );
  

};


