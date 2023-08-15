import { useEffect, useState } from "react";
import { LogoutButton } from "../logout-button/logout-button.jsx";

import { IndexView } from "../index-view/index-view.jsx";
import { MovieList } from "../movie-list/movie-list.jsx";
import { MovieView } from "../movie-view/movie-view.jsx"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
   const storedUserData = localStorage.getItem("user");
   const storedUser = (storedUserData && storedUserData !== "undefined") ? JSON.parse(storedUserData) : null;
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser? storedUser : null);
   const [token, setToken] = useState(storedToken? storedToken : null);
   const [movies, setMovies] = useState([]);

   const [view, setView] = useState("login");
   

   useEffect(() => {
    if (token) {
    fetch("https://ajs-movie-api-598adfef849b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromAPI = data.map((movie) => {
           
          return {
            id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Director: movie.Director.Name,
            Genre: movie.Genre.Name,
            Description: movie.Description,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
    }
  }, [token]);




    return (
       <>
        
        { user ? <LogoutButton 
           setUser = {setUser}
           setToken = {setToken}
         /> : <> </> } 

      <BrowserRouter>
      <Routes>

       <Route 
       path="/"
       element={ 
        <IndexView 
         setView = {setView}
         view = {view}
         setToken = {setToken}
         setUser = {setUser} 
        
        
        /> 
        } />

       <Route
       path="/movies"
       element={
        <MovieList movies={movies} 
        setToken = {setToken}
        setUser = {setUser} 
               
        /> 
       } />
       
       

       <Route
        path="/movies/:movieID"
        element={
          <MovieView movies={movies} />} 
       />

      </Routes>

       
      </BrowserRouter>
      </>
    );
  
};
