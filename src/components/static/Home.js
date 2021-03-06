import React from 'react'
import MovieList from './MovieList'

const Home = ({ movies, setMovies, movieList, setFilteredMovies }) => {

  const handleRemoveMovie = (id) => {
    const updatedList = movies.filter(m => !(m.id === id))
    setMovies(updatedList)
    setFilteredMovies(updatedList)
  }

  return (
    <div>
      <h1 style={{margin: "0px", paddingTop: "20px", color: "blue"}}>Welcome To World Of Movies!</h1>
      <MovieList 
        setFilteredMovies={setFilteredMovies} 
        setMovies={setMovies} 
        movieList={ movieList }
        handleRemoveMovie={handleRemoveMovie}
      />
    </div>
  )
}

export default Home