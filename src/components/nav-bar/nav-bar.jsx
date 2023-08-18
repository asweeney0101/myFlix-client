import { Container, Nav, Navbar } from "react-bootstrap";
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
    <>
      <Navbar >
        <Container>
          <Navbar.Brand href="/movies">MyFlix</Navbar.Brand>
          <Nav className="fs-4">
            <Nav.Link href="/movies" >Movies</Nav.Link>
            <Nav.Link href="#features">My Profile</Nav.Link>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
};