import { Button, Row } from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie)
    return (
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
            <Button style={{maxWidth: '100px', marginLeft: '10px'}} onClick = {onBackClick}>Back</Button>
          </Row>
        </Row>
    );
};



