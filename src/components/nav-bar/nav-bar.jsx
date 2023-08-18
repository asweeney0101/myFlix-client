import { Container, Nav, Navbar } from "react-bootstrap";

export const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Movies</Nav.Link>
            <Nav.Link href="#features">My Profile</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      
    </>
  );
};