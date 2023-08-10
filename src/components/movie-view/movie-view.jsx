import { Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useEffect, useState } from "react";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState(movies.find((m) => m.id === movieID));

console.log(movie);
    return (
      <Col md={8}>
        <Row style={{flex:1, padding: '10px'}}>
          <Row>
            <img style={{maxWidth: '400px'}} src={movie.ImagePath} />
          </Row>
          <Row> 
            <span>{movie.Title}</span>
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
              <Link to={`/movies`}>
        <Button className="back-button">Back</Button>
      </Link>
          </Row>
        </Row>
        </Col>
    );
};



