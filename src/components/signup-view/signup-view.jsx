import{ useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = ({ onSignUp }) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();


    const data = {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }})
       .then((res) => {
       if (res.ok) {
         alert("Signup successful");
         onSignUp();
       } else {
        alert("Signup failed");
       }
     });
  };

  return (
  
    
    <Form onSubmit={handleSubmit} >
     
     <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formUserName">
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

    <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => {
            if(password !== confirmPassword){
              setPasswordError("Passwords do not match");
            } else {
              setPasswordError('');
            }
          }}
          required
          minLength="6"
        />
        {passwordError && <div style={{color: 'red'}}>{passwordError}</div>}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" style={{ marginTop: '35px' }}>Submit</Button>
    </Form>
   
  );
};
