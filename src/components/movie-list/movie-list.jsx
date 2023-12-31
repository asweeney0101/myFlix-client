import "./movie-list.scss"
import { MovieCard } from "../movie-card/movie-card.jsx";
import { Container, Row, Col } from "react-bootstrap";

export const movieListBreakpoints= { xs: 12, md: 6, lg: 4, xxl:3};

export const MovieList = ({ movies }) => {
  
  return (
   
    <Container className="movieList">

       <Row>
       <h3>All Movies:</h3>
        {movies.map((movie) => (
          <Col key={movie.id} {...movieListBreakpoints} className="mb-4">
          
            <MovieCard movie={movie}/>  

          </Col>
        ))}
      </Row>
   </Container>


   

  );
};



