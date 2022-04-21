import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import SearchResult from './pages/SearchResult';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/users/login">
            <Login />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/search">
            <SearchResult />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/users/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
