import React, { Component } from 'react';
import styled from 'styled-components';
import NewMovie from './NewMovie';
import Movie from './Movie';

class MoviesList extends Component {
    state = {
        nowPlayingMovies: [],
        nowPlayingPage: 1,
        popularMovies: [],
    };

    async componentDidMount() {
        const { nowPlayingPage } = this.state;
        try {
            const nowPlaying = await fetch(
                `${'https://api.themoviedb.org/3/movie/now_playing?api_key=e223c8dda88d58c4a35436bfed991d9d&language=en-US&region=US&sort_by=release_date.desc&include_adult=false&page='}${nowPlayingPage}`
            );
            const nowPlayingMovies = await nowPlaying.json();
            const popular = await fetch(
                `${'https://api.themoviedb.org/3/trending/movie/day?api_key=e223c8dda88d58c4a35436bfed991d9d'}`
            );
            const popularMovies = await popular.json();
            this.setState({
                nowPlayingMovies: nowPlayingMovies.results,
                popularMovies: popularMovies.results,
            });
        } catch (error) {
            // continue
        }
    }

    async componentDidUpdate() {
        const { nowPlayingPage } = this.state;
        try {
            const nowPlaying = await fetch(
                `${'https://api.themoviedb.org/3/movie/now_playing?api_key=e223c8dda88d58c4a35436bfed991d9d&language=en-US&region=US&sort_by=release_date.desc&include_adult=false&page='}${nowPlayingPage}`
            );
            const nowPlayingMovies = await nowPlaying.json();
            this.setState({
                nowPlayingMovies: nowPlayingMovies.results,
            });
        } catch (error) {
            // continue
        }
    }

    changePage = function (pageValue) {
        if (pageValue === 'next') {
            if (this.state.nowPlayingPage < 5) {
                this.setState((prevState) => ({
                    nowPlayingPage: prevState.nowPlayingPage + 1,
                }));
            } else if (this.state.nowPlayingPage === 5) {
                this.setState({
                    nowPlayingPage: 1,
                });
            }
        } else if (pageValue === 'prev') {
            if (this.state.nowPlayingPage > 1) {
                this.setState((prevState) => ({
                    nowPlayingPage: prevState.nowPlayingPage - 1,
                }));
            } else if (this.state.nowPlayingPage === 1) {
                this.setState({
                    nowPlayingPage: 5,
                });
            }
        }
    };

    render() {
        const { nowPlayingMovies, nowPlayingPage, popularMovies } = this.state;
        return (
            <div>
                <h1>New Movies</h1>
                <NewMovieGrid>
                    {nowPlayingMovies.map((movie) => (
                        <NewMovie key={movie.id} movie={movie} />
                    ))}
                </NewMovieGrid>
                <div>
                    <PageControl onClick={() => this.changePage('prev')}>
                        Prev
                    </PageControl>
                    <span>{`Page ${nowPlayingPage} of 5`}</span>
                    <PageControl onClick={() => this.changePage('next')}>
                        Next
                    </PageControl>
                </div>
                <h1>Popular Movies</h1>
                <MovieGrid>
                    {popularMovies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </MovieGrid>
            </div>
        );
    }
}

export default MoviesList;

const NewMovieGrid = styled.div`
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
`;

const MovieGrid = styled.div`
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 20px;
`;
const PageControl = styled.button`
    background-color: transparent;
    margin: 0 10px;
    font-size: 16px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    border: 2px solid white;
    border-radius: 5px;
    padding: 2px 6px;
    :hover {
        cursor: pointer;
        color: coral;
        border-color: coral;
    }
`;
