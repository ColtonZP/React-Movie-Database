import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <Link key={movie.id} to={`/React-Movie-Database/${movie.id}`}>
    <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    <Title>{movie.title}</Title>
  </Link>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const Title = styled.span`
  display: block;
`;
