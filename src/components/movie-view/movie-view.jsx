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
        </Row> 
        <button className="ajs-button" onClick={goBack}>Back</button>
    
        </Col>
    );
};



