import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main';
import Select from './pages/Select';
import SearchResult from './pages/SearchResult';
import Mypage from './pages/Mypage/Mypage';
import PlantDetail from './pages/PlantDetail';
import InteriorWrite from './pages/InteriorWrite';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/select">
            <Select />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/search">
            <SearchResult />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/plantDetail">
            <PlantDetail />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/interiorWrite">
            <InteriorWrite />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/users">
            <Mypage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
