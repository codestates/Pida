import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Mypage from './pages/Mypage/Mypage';
import Chat from './pages/Plant/Chat';
import InteriorDetail from './pages/Plant/InteriorDetail';
import InteriorModify from './pages/Plant/InteriorModify';
import InteriorWrite from './pages/Plant/InteriorWrite';
import PlantDetail from './pages/Plant/PlantDetail';
import SearchResult from './pages/Search/SearchResult';
import Select from './pages/Search/Select';
import All from './pages/All';
import Main from './pages/Main';
import Callback from './components/Callback';

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
          <Route exact path="/all">
            <All />
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
          <Route exact path="/interiorDetail">
            <InteriorDetail />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/interiorWrite">
            <InteriorWrite />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/interiorModify">
            <InteriorModify />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/users">
            <Mypage />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/callback">
            <Callback />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
