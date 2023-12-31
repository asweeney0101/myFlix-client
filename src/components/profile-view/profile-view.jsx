import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
import { movieListBreakpoints } from "../movie-list/movie-list";
import { MovieCard } from "../movie-card/movie-card.jsx";
import "../../_styles.scss"
import "./profile-view.scss"
import "../movie-list/movie-list.scss"



export const ProfileView  = ({ user, movies, token, updateUser }) => {

    const [name, setName] = useState(user.Name);
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
    
  

    const handleShowDelete = () => setShow(true);
    const handleCloseDelete = () => setShow(false);

    
    function editUser() {
        
        const data = {
            Name: name,
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        console.log(data);

        fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         }
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
       
            fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + res.Username, {
        method: "GET",
        
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         }
        })
        .then((response) => response.json())
        .then((res) => {
            setName(res.Name);
                setUsername(res.Username);
                setPassword(res.Password);
                setEmail(res.Email);
                setBirthday(res.Birthday);
                updateUser(res);
                
                alert("Your account is updated");
        })

                
           
        });
        return false;
    };


    function deleteUser() {
        fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/users/" + username,  {
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
        .then(() => {
            alert("Your account is deleted successfully!");
            updateUser(null);
            localStorage.clear();
            location.replace('/');
        })
       
      }



 return (
   
  <>



                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                />

               <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                    
                    minLength="6"
                />
     

     
                <input
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
                 

          
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />

                <input
                     type="text"
                     value={birthday}
                     onChange={(e) => setBirthday(e.target.value)}                     
                />
            <button onClick={editUser} >Submit</button>


            <div>
                <button className={`ajs-button ajs-button-red`} onClick={handleShowDelete} >Delete Account</button>
            </div>


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

            <Modal show={show} onHide={handleCloseDelete}>
                 <Modal.Header closeButton>
                    <Modal.Title>Delete Your Account?</Modal.Title> 
                 </Modal.Header>
                 <Modal.Body>
                    <Modal.Title>This is Irreversible</Modal.Title>
                 </Modal.Body>
                 <Modal.Footer>
                   <button className={`ajs-button ajs-button-red`} onClick={deleteUser}>
                     Yes, Delete my Account
                   </button>
                  
                 </Modal.Footer>
            </Modal>







  </> 
 )
};

