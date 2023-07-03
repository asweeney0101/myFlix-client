import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
   const [movies] = useState([
        {
            "Title": "The Lord of the Rings: The Return of the King",
            "Description": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
            "Genre": {
              "Name": "Fantasy",
              "Description": "Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting."
            },
            "Director": {
              "Name": "Peter Jackson",
              "Bio": "Peter Robert Jackson ONZ KNZM is a New Zealand film director, producer, and screenwriter.",
              "Birth": "1961-10-31",
              "Death": ""
            },
            "ImagePath": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            "Featured": true
          },

          {
            "Title": "Interstellar",
            "Description": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
            "Genre": {
              "Name": "Science Fiction",
              "Description": "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science."
            },
            "Director": {
              "Name": "Christopher Nolan",
              "Bio": "Christopher is a British film director and writer acclaimed for his noirish visual aesthetic and unconventional, often highly conceptual narratives.",
              "Birth": "1970-07-30",
              "Death": ""
            },
            "ImagePath": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            "Featured": true
          },

          {
            "Title": "The Book of Eli",
            "Description": "A post-apocalyptic tale, in which a lone man fights his way across America in order to protect a sacred book that holds the secrets to saving humankind.",
            "Genre": {
              "Name": "Action",
              "Description": "Action film is a genre in which the protagonist or protagonists are thrust into a series of challenges that typically include violence, extended fighting, physical feats, and frantic chases."
            },
            "Director": {
              "Name": "The Hughes Brothers",
              "Bio": "Albert and Allen Hughes, known together professionally as the Hughes brothers, are American film directors and producers.",
              "Birth": "1972-04-01",
              "Death": ""
            },
            "ImagePath": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1H1y9ZiqNFaLgQiRDDZLA55PviW.jpg",
            "Featured": true
          }

   ]);

 const [selectedMovie, setSelectedMovie] = useState(null);

 if (selectedMovie) {
  return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
   ); 
  }

 return (
  <div>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />  
    ))}
  </div>
 ); 
  

};


