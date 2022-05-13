import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Mypage from './pages/Mypage/Mypage';
import Chat from './pages/Plant/Chat';
import InteriorModify from './pages/Plant/InteriorModify';
import InteriorWrite from './pages/Plant/InteriorWrite';
import PlantDetail from './pages/Plant/PlantDetail';
import SearchResult from './pages/Search/SearchResult';
import Select from './pages/Search/Select';
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
  min-height: calc(var(--vh, 1vh) * 100);
`;

const InnerContainer = styled.div`
  //position: relative; // 왜지?
  display: flex;
  justify-content: center;
  min-height: max-content;
  //min-height: calc(var(--vh, 1vh) * 80);

  margin-top: 3rem;
  margin-bottom: 15rem; // footer 공간
`;

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setScreenSize();

  return (
    <Container>
      <Nav />
      <InnerContainer>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/select" component={Select} />
          <Route exact path="/search" component={SearchResult} />
          {/* <Route exact path="/search" component={All} /> */}

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
          <Route exact path="/plants/:id/interiors" component={InteriorWrite} />
          <Route exact path="/interiors/:id" component={InteriorModify} />

          {/* 채팅 */}
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </InnerContainer>
      <Footer />
    </Container>
  );
}

export default App;
