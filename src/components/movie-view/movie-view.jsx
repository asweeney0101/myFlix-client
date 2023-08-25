import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "../../_styles.scss"
import "./movie-view.scss";


export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const [movie] = useState(movies.find((m) => m.id === movieID));
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
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
         
        <button className="ajs-button" onClick={goBack}>Back</button>
    
        </Col>
    );
};



