import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../movie-card/movie-card.scss";


export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movieCard">
      <Card className="h-100">
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
  }).isRequired
};