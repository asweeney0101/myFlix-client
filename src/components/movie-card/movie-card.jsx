import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
       <div
         onClick={() => {
           onMovieClick(movie);
       }}
      >
       {movie.Title}
       </div>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired, // Title instead of title
    ImagePath: PropTypes.string.isRequired, // ImagePath instead of image
    Director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};