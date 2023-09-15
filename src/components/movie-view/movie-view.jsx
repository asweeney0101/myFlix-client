import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "../../_styles.scss"
import "./movie-view.scss";


export const MovieView = ({ movies, updateUser }) => {
  const { movieID } = useParams();
  const [movie] = useState(movies.find((m) => m.id === movieID));
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const storedUserData = localStorage.getItem("user");
  const storedUser = (storedUserData && storedUserData !== "undefined") ? JSON.parse(storedUserData) : null;
  const username = storedUser.Username;
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [isFavorite, setFavorite] = useState(false);
  
  useEffect(() => {
    
    if(storedUser.FavoriteMovies &&  storedUser.FavoriteMovies.includes(movieID) ){
      setFavorite(true);
    }
  }, []);

  function addToFavorites() {
    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username + "/movies/" + movieID,  {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
     }
    })
    .then((response) => response.json())
    .then((res) => {
        updateUser(res);
        setFavorite(true);
        alert("Movie Added to Favorites");
    })
    .catch((error) => {
      console.error("Error Adding to Favorites:", error);
    });
}

function removeFromFavorites() {
  fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username + "/movies/" + movieID,  {
  method: "DELETE",
  headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`
   }
  })
  .then((response) => response.json())
  .then((res) => {
      updateUser(res);
      setFavorite(false);
      alert("Movie Removed from Favorites");
  })
  .catch((error) => {
    console.error("Error Removing from Favorites:", error);
  });
}


    return (
      <Col className="movieView" md={8}>
        
           <Row className="movieViewPoster">
             <img  src={movie.ImagePath} />
           </Row>
           <Row> 
             <h2><span>{movie.Title}</span></h2>
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
           <div>

           { !isFavorite ? (
                  <button className="ajs-button" onClick={addToFavorites}>Add to Favorites</button>
            ) : (
                  <button className="ajs-button" onClick={removeFromFavorites}>Remove From Favorites</button>
            )}

            </div>           
         
        <button className="ajs-button" onClick={goBack}>Back</button>

    
        </Col>
    );
};



