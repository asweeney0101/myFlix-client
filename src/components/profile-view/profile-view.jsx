import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";


export const ProfileView  = ({ user, movies }) => {

    const [name, setName] = useState(user.Name)
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [deregister, setDeregister] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id);
    });
    
    const data = {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    };

    handleShow = () => setShow(false);
    handleClose = () => setShow(true);

    
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
            <button>Edit Profile</button>
        </Card.Body>

        <Container className="movieList">
             <Row>
                 <h3>Favorite movies:</h3>
                 {favoriteMovies.map((movie) => (
                   <Col key={movie.id} >
                       <MovieCard movie={movie}/>
                   </Col>
                  ))}
             </Row>
          </Container>
    </Card>
  )

 };



//  {...movieListBreakpoints}