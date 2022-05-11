import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Mypage from './pages/Mypage/Mypage';
import Chat from './pages/Plant/Chat';
import InteriorModify from './pages/Plant/InteriorModify';
import InteriorWrite from './pages/Plant/InteriorWrite';
import PlantDetail from './pages/Plant/PlantDetail';
import SearchResult from './pages/Search/SearchResult';
import Select from './pages/Search/Select';
import All from './pages/All';
import Main from './pages/Main';
import GithubCallback from './components/GithubCallback';
import KakaoCallback from './components/KakaoCallback';
import AddPlant from './pages/Plant/Management/AddPlant';
import ModifyPlant from './pages/Plant/Management/ModifyPlant';
import KakaoMap from './pages/Mypage/KakaoMap';

import styled from 'styled-components';
const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  height: max-content;
  //min-height: 800px;

  // margin-bottom: 200px;
  margin-top: 2rem;
  @media screen and (max-width: 760px) {
    margin-top: 6.2rem;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <div>
          <Nav />
          <InnerContainer>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/select" component={Select} />
              <Route exact path="/search?" component={SearchResult} />
              <Route exact path="/search" component={All} />

              {/* 소셜 로그인 */}
              <Route exact path="/githubcallback" component={GithubCallback} />
              <Route exact path="/kakaocallback" component={KakaoCallback} />

              {/* 마이페이지 */}
              <Route exact path="/users" component={Mypage} />

              <Route exact path="/map" component={KakaoMap} />

              {/* 식물 관리자 */}
              <Route exact path="/plants" component={AddPlant} />
              <Route exact path="/plants/:id/modify" component={ModifyPlant} />

              {/* 식물 상세 */}
              <Route exact path="/plants/:id" component={PlantDetail} />

              {/* 인테리어 */}
              <Route
                exact
                path="/plants/:id/interiors"
                component={InteriorWrite}
              />
              <Route exact path="/interiors/:id" component={InteriorModify} />

              {/* 채팅 */}
              <Route exact path="/chat" component={Chat} />
            </Switch>
          </InnerContainer>
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
