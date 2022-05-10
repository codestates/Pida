import { RightContainer, TransContainer } from '../components/Container';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const MainDivGreen = styled.span`
  top: 30px;
  left: 30px;
  color: #3ba914;
  font-size: 3.3rem;
  font-weight: 570;
  letter-spacing: 0.3rem;
`;

const MainDivBlack = styled.span`
  font-size: 3.3rem;
  font-weight: 570;
  letter-spacing: 0.3rem;
`;

const MainPida = styled.div`
  margin-left: 25rem;
  color: #3ba914;
  font-size: 5.3rem;
  font-weight: 600;
  letter-spacing: 0.5rem;
  @media screen and (max-width: 760px) {
    margin-left: 14rem;
  }
`;

const MainButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  border: none;
  margin-top: 3rem;

  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(163, 163, 163);
  letter-spacing: 0.5rem;
  :hover {
    color: black;
  }
`;

const MainItem = styled.div`
  flex-wrap: nowrap;
`;

function Main() {
  const history = useHistory();

  const handleSelect = () => {
    history.replace('/select');
  };
  const handleAll = () => {
    history.replace('/search/all');
  };
  const handleSerchFlower = () => {
    history.replace('/map');
  };

  return (
    <>
      <TransContainer style={{ minHeight: '87vh', alignItems: 'center' }}>
        <div>
          <img src="../images/mainImage.png" width="400rem"></img>
        </div>
        <div style={{ display: 'flex', textAlign: 'center' }}>
          <div style={{ paddingTop: '3rem' }}>
            <MainDivGreen>당신의 플</MainDivGreen>
            <MainDivBlack>랜테리어,</MainDivBlack>
            <MainPida>"Pida"</MainPida>
            <div style={{ alignItems: 'center', float: 'right' }}>
              <RightContainer>
                <div>
                  <MainButton onClick={handleSelect}>
                    나의 플랜테리어 취향 찾기 →
                  </MainButton>
                </div>
                <div>
                  <MainButton
                    onClick={handleAll}
                    style={{ margin: '1rem 0 0 0' }}
                  >
                    "피다" 식물 보기 →
                  </MainButton>
                </div>
                <div>
                  <MainButton
                    onClick={handleSerchFlower}
                    style={{ margin: '1rem 0 0 0' }}
                  >
                    주변 꽃집 찾기 →
                  </MainButton>
                </div>
              </RightContainer>
            </div>
          </div>
        </div>
      </TransContainer>
    </>
  );
}
export default Main;
