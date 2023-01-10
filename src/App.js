import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import MoviesListHeading from './components/MoviesListHeading';
import MovieList from './components/MovieList';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
function App() {
  const [movies, setmovies] = useState([])
  const [searchValues, setSearchValues] = useState('')
  const [favourites, setFavourites] = useState([])
  //get movies
  const getMovieRequest = async (searchValues) => {
    const url = `http://www.omdbapi.com/?s=${searchValues}&apikey=d1d012e2`
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setmovies(responseJson.Search);
    }

  }

  useEffect(() => {
    getMovieRequest(searchValues);
  }, [searchValues])
  //retrive items
  useEffect(() =>{
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites)
  },[])
 //add movie
  const addFavouritesMovie = (movie) =>{
    const newFavouritesList = [...favourites, movie]
    setFavourites(newFavouritesList)
    saveToLocalStorage(newFavouritesList)
  }

//remove movie
const removeFavouritesMovie = (movie) =>{
  const newFavouritesList = favourites.filter(
    (favourites) => favourites.imdbID !== movie.imdbID
  );
  setFavourites(newFavouritesList);
  saveToLocalStorage(newFavouritesList)
}
//save to local storage
const saveToLocalStorage = (items) =>{
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
}
  return (

    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesListHeading heading="Movies" />
        <SearchBox searchValues={searchValues} setSearchValues={setSearchValues} />
      </div>
      <div className="row">
        <MovieList movies={movies} handleFavouritesClick = {addFavouritesMovie} favouritesComponent = {AddFavourites}/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MoviesListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList movies={favourites} handleFavouritesClick = {removeFavouritesMovie} favouritesComponent = {RemoveFavourites}/>
      </div>

    </div>






  );
}

export default App;
