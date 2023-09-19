import { useState } from "react";
import { Button, Form } from "react-bootstrap";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // prevent default behavior of reloading the form
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("Login response: ", data);
          if (res.user) {
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);
            onLoggedIn(res.user, res.token);
            location.replace("/movies");
          } else {
            alert("Please Check your Username or Password");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
        />
      </Form.Group>
      <Button type="submit" style={{ marginTop: '35px' }}>Submit</Button>
    </Form>
  );
};
