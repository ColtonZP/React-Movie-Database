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
            <Link to={`/${movie.id}`}>Learn More</Link>
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
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    display: block;
    background: rgba(255, 239, 217, 0.8);
    height: 100%;
    width: 100%;
    text-align: left;
    transition: opacity 0.3s ease-in-out;
    overflow: scroll;
    top: 0;
    opacity: 0;
    > h1,
    > p {
        color: black;
    }
    > h1 {
        margin: 0;
    }
    > a {
        display: inline-block;
        background: coral;
        border-radius: 5px;
        padding: 5px 10px;
    }
`;

const MovieDiv = styled.div`
    position: relative;
    width: 100%;
    :hover {
        /* z-index: 2; */
        /* > img {
      z-index: 3;
    } */
        > div {
            opacity: 1;
        }
    }
`;

const Poster = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
`;
