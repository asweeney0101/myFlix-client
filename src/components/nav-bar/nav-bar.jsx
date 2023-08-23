import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./nav-bar.scss"

export const NavBar = ({ setUser, setToken }) => {

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        location.replace('/');
      }

  return (
   
    
        <Row className="navigationbar">
          <Col>
            <Link to="/movies"><h2>MyFlix</h2></Link>
          </Col>

          <Col>
          <Link to="/movies" ><h2>Movies</h2></Link>
          </Col>  
            
          <Col>
            <Link to="/profile"><h2>My Profile</h2></Link>
          </Col>  

          <Col>
            <h2 onClick={logout}>Log Out</h2>
          </Col>  
            
            
         
        </Row>
     
      
    
  );
};