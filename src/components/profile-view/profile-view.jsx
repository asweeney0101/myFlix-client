import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";


export const ProfileView  = ({ user, movies }) => {

   
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    // const [deregister, setDeregister] = useState(false);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id);
    });
    
   console.log(favoriteMovies);

 return (
    <Card>
        <Card.Img src={"https://fakeimg.pl/200x200/cccccc/909090?text=Profile+Picture"} />
        <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text>Username: {username}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>Birthday: {birthday}</Card.Text>
            <Row>
            <h3>Favorite movies:</h3>
            {favoriteMovies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={4}>
                    <MovieCard movie={movie}/>
                </Col>
            ))}
        </Row>
        </Card.Body>
    </Card>
  )

 };


 // const data = {
    //     username: username,
    //     password: password,
    //     email: email,
    //     birthday: birthday
    // };



//   user, movies, token




       

      
//     fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username, {
//         method: "PUT",
//         body: JSON.stringify(data),
//         headers: {
//            "Content-Type": "application/json",
//            Authorization: `Bearer ${token}`
//          }
        
//     }).then((response) => response.json())
//         .then((res) => {
//             if (res.username) {
//                 localStorage.setItem("user", JSON.stringify(res.username));
//                 localStorage.setItem("userObject", JSON.stringify(res));
//                 updateUser(res);
//                 alert("Your account is updated");
//             }
//             else {
//                 alert("Update failed");
//             }
//         });

// };


// deleteUser = () => {
//       fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username, {
//           method: "DELETE",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`
//           }
//       })
//       .then((response) => {
//           if (response.ok) {
//               return response.json();
//           }
//       })
//       .then((data) => {
//           console.log(data);
//           alert("Your account is deleted successfully!");
//           updateUser(null);
//           localStorage.clear();
//           window.location.reload();
//       });
// };




