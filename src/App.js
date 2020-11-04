import React from 'react';
import {
    BrowserRouter as HashRouter,
    Route,
    Switch,
    Link,
} from 'react-router-dom';
import styled from 'styled-components';
// import './App.css';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const App = () => (
    <HashRouter>
        <div className="App">
            <Header>
                <Link to="/">The Movie Database</Link>
            </Header>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={MoviesList}
                />
                <Route
                    path="/:id"
                    render={(props) => (
                        <MovieDetail key={Date.now()} {...props} />
                    )}
                />
            </Switch>
        </div>
    </HashRouter>
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
