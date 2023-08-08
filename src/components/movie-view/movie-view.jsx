import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const movieToShow = movies.find((m) => m.id === movieID);

  if (!movieToShow) return <div>No movie found!</div>;
  
    return (
      <Col md={8}>
        <Row style={{flex:1, padding: '10px'}}>
          <Row>
            <img style={{maxWidth: '400px'}} src={movieToShow.ImagePath} />
          </Row>
          <Row> 
            <span>{movieToShow.Title}</span>
          </Row>
          <Row>
            <span>Director: {movie.Director}</span>
          </Row>
          <Row>
            <span>Genre: {movie.Genre}</span>
          </Row>
          <Row>
            <span>Description: {movie.Description}</span>
          </Row>
          <Row> 
              <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
          </Row>
        </Row>
        </Col>
    );
};



