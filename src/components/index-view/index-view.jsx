import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { Container, Row, Button } from "react-bootstrap";


export const IndexView = ({ setView, view, setUser, setToken }) => {
 
 
  return (
   
    <Container style={{ border: "1px solid black", padding: "20px", borderRadius: "5px", maxWidth: "750px" }}>
    
    <Row className="justify-content-md-center mb-4" style={{ display: 'flex', flexDirection: 'row', padding: "10px" }}>
      <Button style={{ flex: 1 }} variant={view === "login" ? "primary" : "light"} onClick={() => setView("login")}>
        Log In
      </Button>
      <Button style={{ flex: 1 }} variant={view === "signup" ? "primary" : "light"} onClick={() => setView("signup")}>
        Sign Up
      </Button>
    </Row>

    <Row className="justify-content-md-center">
      {view === "login" ? (
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            setView("movies"); 
          }}
        />
      ) : (
        <SignupView onSignUp={() => setView("login")} />
      )}


    </Row>
  </Container>

  );
};