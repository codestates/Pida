import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GithubCallback from './components/Sign/GithubCallback';
import KakaoCallback from './components/Sign/KakaoCallback';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ModifyInterior from './pages/Interior/ModifyInterior';
import WriteInterior from './pages/Interior/WriteInterior';
import Mypage from './pages/Mypage/Mypage';
import AddPlant from './pages/Plant/Management/AddPlant';
import ModifyPlant from './pages/Plant/Management/ModifyPlant';
import PlantDetail from './pages/Plant/PlantDetail';
import SearchPlants from './pages/Search/SearchPlants';
import Select from './pages/Search/Select';
import FindFlorists from './pages/FindFlorists';
import Main from './pages/Main';

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: calc(var(--vh, 1vh) * 100);
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: max-content;

  padding-bottom: 24rem;
  margin-top: 3rem;
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
          <Route exact path="/search" component={SearchPlants} />

          {/* 소셜 로그인 */}
          <Route exact path="/githubcallback" component={GithubCallback} />
          <Route exact path="/kakaocallback" component={KakaoCallback} />

          {/* 마이페이지 */}
          <Route exact path="/users" component={Mypage} />

          {/* 식물 관리자 */}
          <Route exact path="/plants" component={AddPlant} />
          <Route exact path="/plants/:id/modify" component={ModifyPlant} />

          {/* 식물 상세 */}
          <Route exact path="/plants/:id" component={PlantDetail} />

          {/* 인테리어 */}
          <Route exact path="/plants/:id/interiors" component={WriteInterior} />
          <Route exact path="/interiors/:id" component={ModifyInterior} />

          {/* 주변 꽃집 찾기 */}
          <Route exact path="/florists" component={FindFlorists} />
        </Switch>
        <Footer />
      </InnerContainer>
    </Container>
  );
}

export default App;
