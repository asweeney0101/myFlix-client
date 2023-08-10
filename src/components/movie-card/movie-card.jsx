import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
    <Card className="h-100" style={{ cursor: "pointer"}} onClick={() => onMovieClick(movie)} >
      <Card.Img variant="top" src={movie.ImagePath} />
      
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
      </Card.Body>
     
    </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired, 
    ImagePath: PropTypes.string.isRequired, 
    Director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};