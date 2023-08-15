
import { MovieCard } from "../movie-card/movie-card.jsx";
import { Row, Col, Button} from "react-bootstrap";




export const MovieList = ({ movies, setUser, setToken }) => {
 
  // const logout = () => {
  //   setUser(null);
  //   setToken(null);
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   location.replace('/');
  // }

  return (
   
    <>
    
 
    <Row className="justify-content-md-center">
      {movies.map((movie) => (
        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          
          <MovieCard movie={movie}/>  

        </Col>
      ))}
    </Row>
    

    
  
  </>


  );
};
