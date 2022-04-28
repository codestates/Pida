import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Mypage from './pages/Mypage/Mypage';
import InteriorDetail from './pages/Plant/InteriorDetail';
import InteriorWrite from './pages/Plant/InteriorWrite';
import PlantDetail from './pages/Plant/PlantDetail';
import SearchResult from './pages/Search/SearchResult';
import Select from './pages/Search/Select';
import Main from './pages/Main';

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
          <Route exact path="/interiorDetail">
            <InteriorDetail />
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
