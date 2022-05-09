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
import AddPlant from './pages/Plant/Management/AddPlant';
import ModifyPlant from './pages/Plant/Management/ModifyPlant';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/select" component={Select} />
          <Route exact path="/search" component={SearchResult} />
          <Route exact path="/search/all" component={All} />

          {/* 소셜 로그인 */}
          <Route exact path="/callback" component={Callback} />

          {/* 마이페이지 */}
          <Route exact path="/users" component={Mypage} />

          {/* 식물 관리자 */}
          <Route exact path="/plants" component={AddPlant} />
          <Route exact path="/plants/:id/modify" component={ModifyPlant} />

          {/* 식물 상세 */}
          <Route exact path="/plants/:id" component={PlantDetail} />

          {/* 인테리어 */}
          {/* <Route exact path="/interiors/:id" component={InteriorDetail} /> */}
          <Route exact path="/plants/:id/interiors" component={InteriorWrite} />
          <Route exact path="/interiors/:id" component={InteriorModify} />

          {/* 채팅 */}
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
