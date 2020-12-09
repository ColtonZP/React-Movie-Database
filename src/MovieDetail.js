import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Movie from './Movie';

const W154_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/original';

class MovieDetail extends Component {
    state = {
        movie: {},
        movieCast: [],
        similarMovies: [],
    };

    async componentDidMount() {
        const { match } = this.props;
        try {
            const movieFetch = await fetch(
                `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=e223c8dda88d58c4a35436bfed991d9d&language=en-US`
            );
            const movieCreditsFetch = await fetch(
                `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=e223c8dda88d58c4a35436bfed991d9d&language=en-US`
            );
            const similarMoviesFetch = await fetch(
                `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=e223c8dda88d58c4a35436bfed991d9d&language=en-US`
            );
            const movie = await movieFetch.json();
            let movieCast = await movieCreditsFetch.json();
            movieCast = movieCast.cast.slice(0, 6);
            let similarMovies = await similarMoviesFetch.json();
            similarMovies = similarMovies.results.slice(0, 6);
            this.setState({
                movie,
                movieCast,
                similarMovies,
            });
        } catch (error) {
            // continue
        }
    }

    render() {
        const { movie, movieCast, similarMovies } = this.state;
        return (
            <MovieWrapper>
                <MovieBackdrop
                    backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
                />
                <MovieInfo>
                    <img src={`${W154_PATH}${movie.poster_path}`} alt="" />
                    <div>
                        <h1>{movie.title}</h1>
                        <Rating rating={movie.vote_average}>
                            {movie.vote_average * 10}% Viewer Rating
                        </Rating>
                        <h3>{movie.release_date}</h3>
                        <p>{movie.overview}</p>
                    </div>
                </MovieInfo>
                <h2>Cast</h2>
                <Cast>
                    {movieCast.map((cast) => (
                        <div key={cast.id}>
                            <img
                                src={`${W154_PATH}${cast.profile_path}`}
                                alt={cast.name}
                            />
                            <span>{cast.character}</span>
                            <br />
                            <span>Played by:</span>
                            <br />
                            <span>{cast.name}</span>
                        </div>
                    ))}
                </Cast>
                {similarMovies.length > 0 ? (
                    <h2>Related movies</h2>
                ) : (
                    <h2>No similar movies found</h2>
                )}
                <Similar>
                    {similarMovies.map((cast) => (
                        <Movie key={cast.id} movie={cast} />
                    ))}
                </Similar>
            </MovieWrapper>
        );
    }
}

MovieDetail.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default MovieDetail;

const MovieBackdrop = styled.div`
    width: 100vw;
    height: 50vh;
    background: url(${(props) => props.backdrop}) no-repeat top/cover;
`;

const MovieWrapper = styled.div`
    position: relative;
`;

const Cast = styled.div`
    margin: 0 auto 20px auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
    grid-gap: 20px;
    img {
        width: 100%;
        max-width: 200px;
        display: block;
        margin: 0 auto;
    }
`;

const Similar = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
    grid-gap: 20px;
    img {
        width: 100%;
        max-width: 200px;
        display: block;
        margin: 0 auto;
    }
`;

const MovieInfo = styled.div`
    background: #222;
    text-align: left;
    padding: 0 10%;
    display: flex;
    box-shadow: 0 -15px 15px 0px black;
    > div {
        margin-left: 20px;
    }
    > img {
        position: relative;
        top: -5rem;
    }
`;

const Rating = styled.span`
    position: relative;
    ::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 5px;
        top: -5px;
        background: #a00;
    }
    &:after {
        content: '';
        position: absolute;
        width: ${(props) => props.rating * 10}%;
        height: 5px;
        top: -5px;
        left: 0;
        background: #2bc400;
        box-shadow: 0px 0px 5px #2bc400;
    }
`;
