import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
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
    const [deregister, setDeregister] = useState(false);

    

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    
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
            
                setName(res.Name);
                setUsername(res.Username);
                setPassword(res.Password);
                setEmail(res.Email);
                setBirthday(res.Birthday);
                updateUser(res);
                
                alert("Your account is updated");
           
        });
        return false;
    };



  


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

   

  </> 
 )
};

