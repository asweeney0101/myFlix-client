import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

import { Container, Row, Col, Button } from "react-bootstrap";


export const MovieList = ({ movies }) => {
 

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
