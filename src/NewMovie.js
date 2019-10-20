import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const POSTER_PATH = 'http://image.tmdb.org/t/p/original';

const Movie = ({ movie }) => (
  <MovieDiv>
    <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    <NewMovieCard>
      <h1>{movie.title}</h1>
      <p>{`${movie.overview}`}</p>
      <Link to={`/React-Movie-Database/${movie.id}`}>Learn More</Link>
    </NewMovieCard>
  </MovieDiv>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const NewMovieCard = styled.div`
  position: absolute;
  top: -10px;
  padding-left: calc(100% + 20px);
  box-sizing: border-box;
  text-align: center;
  display: none;
  background: #ffefd9;
  min-width: 250%;
  height: calc(100% + 20px);
  box-shadow: 0 0 15px 5px black;
  text-align: left;
  transition: width .3s ease-in-out;
  overflow: hidden;
  > h1 {
    white-space: nowrap;
  }
  > h1, > p, > a {
    color: black;
  }
  > a {
    width: calc(60% - 20px);
    display: block;
    position: absolute;
    box-shadow: 0px 0px 15px 25px #ffefd9;
    background: #ffefd9;
    bottom: 10px;
    transition: color .3s ease-in-out;
    :hover {
      color: coral;
    }
  }
`;

const MovieDiv = styled.div`
  position: relative;
  width: calc(100%/7);
  margin: 10px calc(100%/14);
  :nth-child(4n+1) {
    margin-left: 0;
  }
  :nth-child(4n+4) {
    margin-right: 0;
    > div {
      right: -10px;
      padding-right: calc(100% + 20px);
      padding-left: 0;
      text-align: right;
      padding-left: 10px;
      > a {
        left: 0;
      }
    }
  }
   :not(:nth-child(4n+4)) {
    > div {
      left: -10px;
      padding-right: 10px;
     }
  }
  :hover {
    z-index: 2;
    > img {
      z-index: 3;
    }
    > div {
      display: block;
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;
