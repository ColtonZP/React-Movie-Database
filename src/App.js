import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
// import './App.css';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const App = () => (
	<Router>
		<div className="App">
			<Header>
				<Link to="/React-Movie-Database/">
					The Movie Database
				</Link>
			</Header>
			<Switch>
				<Route exact path="/React-Movie-Database/" component={MoviesList} />
				<Route
					path="/React-Movie-Database/:id"
					render={props => <MovieDetail key={Date.now()} {...props} />}
				/>
			</Switch>
		</div>
	</Router>
);

export default App;

const Header = styled.header`
    font-size: 32px;
    background-color: #111;
    padding: 40px;
    > a {
        border: 4px solid white;
        padding: 10px 20px;
        border-radius: 5px;
    }
`;
