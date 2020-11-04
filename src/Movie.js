import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
    <PopularMovie>
        <Link key={movie.id} to={`/React-Movie-Database/${movie.id}`}>
            <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        </Link>
    </PopularMovie>
);

export default Movie;

Movie.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

const PopularMovie = styled.div`
    width: 100%;
    > a {
        width: 100%;
        height: 100%;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
