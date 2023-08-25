import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { movieListBreakpoints } from "../movie-list/movie-list";
import { MovieCard } from "../movie-card/movie-card.jsx";
import "../../_styles.scss"
import "./profile-view.scss"
import "../movie-list/movie-list.scss"



export const ProfileView  = ({ user, movies, token }) => {

    const [name, setName] = useState(user.Name)
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id);
    });
    const [show, setShow] = useState(false);
    const [deregister, setDeregister] = useState(false);

    const data = {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    handleShow = () => setShow(true);
    handleClose = () => setShow(false);

    
    editUser = () => {

        

        fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         }
        
     }).then((response) => response.json())
        .then((res) => {
            if (res.username) {
                localStorage.setItem("user", JSON.stringify(res.username));
                localStorage.setItem("userObject", JSON.stringify(res));
                updateUser(res);
                alert("Your account is updated");
            }
            else {
                alert("Update failed");
            }
        });

    };


    deleteUser = () => {
      fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      })
      .then((response) => {
          if (response.ok) {
              return response.json();
          }
      })
      .then((data) => {
          console.log(data);
          alert("Your account is deleted successfully!");
          updateUser(null);
          localStorage.clear();
          window.location.reload();
      });
    };



 return (
   
  <>
     <Container>
         <Card>
             <Card.Img src={"https://fakeimg.pl/200x200/cccccc/909090?text=Profile+Picture"} />
             <Card.Body>
                <Card.Title>My Profile</Card.Title>
                <Card.Text>
                    Name: {name}<br/>
                    Username: {username}<br/>
                    Email: {email}<br/>
                    Birthday: {birthday}<br/>
                </Card.Text>
                <button className="ajs-button" onClick={handleShow}>Edit Profile</button>
             </Card.Body>
         </Card>    
        
        
            <div className="movieList">
                <Row>
                    <h3>Favorite movies:</h3>
                    {favoriteMovies.map((movie) => (
                    <Col key={movie.id} {...movieListBreakpoints} className="mb-4">
                        <MovieCard movie={movie}/>
                    </Col>
                    ))}
                </Row>
            </div>

     </Container>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
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
            <button className="ajs-button" onClick={editUser} >Submit</button>
            </Form>
        </Modal.Body>
     </Modal>


  </> 
 )
};


