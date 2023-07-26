import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";

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
        console.error("Error fetching movies:", error);
      });
  }, []);



  if (!user) {
    return (
      <Container style={{ border: "1px solid black", padding: "20px", borderRadius: "5px", maxWidth: "750px" }}>
        <Row className="justify-content-md-center mb-4" style={{ display: 'flex', flexDirection: 'row', padding: "10px" }}>
          <Button style={{ flex: 1 }} variant={view === "login" ? "primary" : "light"} onClick={() => setView("login")}>
            Log In
          </Button>
          <Button style={{ flex: 1 }} variant={view === "signup" ? "primary" : "light"} onClick={() => setView("signup")}>
            Sign Up
          </Button>
        </Row>
        <Row className="justify-content-md-center">
          {view === "login" ? (
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          ) : (
            <SignupView onSignUp={() => setView("login")} />
          )}
        </Row>
      </Container>
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


