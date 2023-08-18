
import { MovieCard } from "../movie-card/movie-card.jsx";
import { Container, Row, Col } from "react-bootstrap";


export const MovieList = ({ movies }) => {
  
  return (
   
    <Container style={{ padding: "20px", marginTop: "20px" }}>
       <Row className="justify-content-md-center">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          
            <MovieCard movie={movie}/>  

          </Col>
        ))}
      </Row>
   </Container>


   

  );
};
