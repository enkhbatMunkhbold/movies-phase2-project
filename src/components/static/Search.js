import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const Search = ({ movies, setMovies }) => {
  const classes = useStyles()
  const [searchMovie, setSearchMovie] = useState(null)
  const api_key = process.env.REACT_APP_KEY

  const handleAddMovie = (m) => {
    const movieData = {
      name: m.Title,
      img_link: m.Poster,
      genre: m.Genre,
      year: Number(m.Year),
      rating: m.Ratings[0].Value,
      favorite: false
    }

    fetch(`http://localhost:3001/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(movieData)
    }).then( res => res.json())
      .then(foundMovie => setMovies([...movies, foundMovie]))
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!movies.includes(searchMovie)){
      fetch(`http://www.omdbapi.com/?t=${searchMovie}&apikey=${api_key}`)
      .then(res => res.json())
      .then(movieData => handleAddMovie(movieData))
    }    
    e.target.reset()  
    console.log("Movies:", movies)
  }

  const handleClick = (e) => {
    setSearchMovie(e.target.value);
  } 
  return (
    <div className={classes.search}>  
    <form onSubmit={handleSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
        <InputBase
          placeholder="Search???"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleClick}
        />
    </form>  
    </div>
  )
}

export default Search