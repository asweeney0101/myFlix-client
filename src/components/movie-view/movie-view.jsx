export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
          <div>
            <img src={movie.ImagePath} />
          </div>
          <div> 
            <span>Title: {movie.Title}</span>
          </div>
          <div>
            <span>Director: {movie.Director.Name}</span>
          </div>
          <div> 
            <button onClick = {onBackClick}>Back</button>
          </div>
        </div>
    );
};