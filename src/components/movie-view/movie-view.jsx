export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie)
    return (
        <div>
          <div>
            <img src={movie.ImagePath} />
          </div>
          <div> 
            <span>Title: {movie.Title}</span>
          </div>
          <div>
            <span>Director: {movie.Director}</span>
          </div>
          <div> 
            <button onClick = {onBackClick}>Back</button>
          </div>
        </div>
    );
};