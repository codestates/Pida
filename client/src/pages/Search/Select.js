import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SelectButton } from '../../components/Button';
import { ContainerRow, UDContainer } from '../../components/Container';

const QuestionDiv = styled.div`
  padding: 0rem 0 3rem 0;
  font-size: 2.3rem;
  font-weight: 600;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;
const Image = styled.img`
  padding: 0 1rem 0 1rem;
  width: 12rem;
  height: 16rem;
  @media screen and (max-width: 760px) {
    padding: 1rem 1rem 0 1rem;
  }
`;
const HoverBox = styled.div`
  // 배경
  position: absolute;
  top: 0;
  margin: 0 1rem 0 1rem;
  width: 12rem;
  height: 16rem;
  background-color: black;
  opacity: 0;
  transition: 0.5s ease;
  :hover {
    opacity: 0.5;
  }
  @media screen and (max-width: 760px) {
    margin: 1rem 1rem 0 1rem;
  }
  // 글자
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
`;

function Select() {
  const history = useHistory();

  const [isStartPage, setIsStartPage] = useState(true);
  const handleStart = () => {
    setIsStartPage(false);
  };
  const [isQ1, setIsQ1] = useState(true);
  const [isQ2, setIsQ2] = useState(true);
  const [isQ3, setIsQ3] = useState(true);

  const [select, setSelect] = useState({
    size: null,
    space: null,
    species: null,
  });
  const [isNavigate, setIsNavigate] = useState(false);
  const handleSelect = key => e => {
    setSelect({ ...select, [key]: e.target.id }); // 검색 조건 설정하고
    if (key === 'size') setIsQ1(false);
    if (key === 'space') setIsQ2(false);
    if (key === 'species') {
      setIsQ3(false);
      setIsNavigate(true); // useEffect 실행해 검색 결과 페이지로 이동
    }
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: '/search',
        state: select,
      });
      setIsNavigate(false);
    }
  }, [isNavigate]);

  return (
    <>
      {isStartPage ? (
        <UDContainer>
          <QuestionDiv>나의 공간에 어울리는 식물 찾기</QuestionDiv>
          <SelectButton onClick={handleStart}>시작</SelectButton>
        </UDContainer>
      ) : (
        <>
          {isQ1 ? (
            <UDContainer>
              <QuestionDiv>
                Q1. 어떤 크기의 반려 식물을 찾고 있나요?
              </QuestionDiv>
              <span>
                <ContainerRow>
                  <div style={{ position: 'relative' }}>
                    <Image src="../images/select/큰.png" />
                    <HoverBox onClick={handleSelect('size')} id="1">
                      큰
                    </HoverBox>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Image src="../images/select/작은.png" />
                    <HoverBox onClick={handleSelect('size')} id="2">
                      작은
                    </HoverBox>
                  </div>
                </ContainerRow>
              </span>
            </UDContainer>
          ) : (
            <>
              {isQ2 ? (
                <UDContainer>
                  <QuestionDiv>
                    Q2. 어떤 공간을 꾸밀 반려 식물을 찾고 있나요?
                  </QuestionDiv>
                  <span>
                    <ContainerRow style={{ margin: '1rem' }}>
                      <div style={{ position: 'relative' }}>
                        <Image src="../images/select/가구.png" />
                        <HoverBox onClick={handleSelect('space')} id="1">
                          가구
                        </HoverBox>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Image src="../images/select/바닥.png" />
                        <HoverBox onClick={handleSelect('space')} id="2">
                          바닥
                        </HoverBox>
                      </div>
                    </ContainerRow>
                    <ContainerRow style={{ margin: '1rem' }}>
                      <div style={{ position: 'relative' }}>
                        <Image src="../images/select/벽.png" />
                        <HoverBox onClick={handleSelect('space')} id="3">
                          벽
                        </HoverBox>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Image src="../images/select/천장.png" />
                        <HoverBox onClick={handleSelect('space')} id="4">
                          천장
                        </HoverBox>
                      </div>
                    </ContainerRow>
                  </span>
                </UDContainer>
              ) : (
                <>
                  {isQ3 ? (
                    <UDContainer>
                      <QuestionDiv>
                        Q3. 어떤 종류의 반려 식물을 찾고 있나요?
                      </QuestionDiv>
                      <span>
                        <ContainerRow style={{ margin: '1rem' }}>
                          <div style={{ position: 'relative' }}>
                            <Image src="../images/select/꽃.png" />
                            <HoverBox onClick={handleSelect('species')} id="1">
                              꽃이
                              <br />
                              피는
                            </HoverBox>
                          </div>
                          <div style={{ position: 'relative' }}>
                            <Image src="../images/select/비꽃.png" />
                            <HoverBox onClick={handleSelect('species')} id="2">
                              잎이
                              <br />
                              많은
                            </HoverBox>
                          </div>
                        </ContainerRow>
                        <ContainerRow style={{ margin: '1rem' }}>
                          <div style={{ position: 'relative' }}>
                            <Image src="../images/select/선인장.png" />
                            <HoverBox onClick={handleSelect('species')} id="3">
                              선인장
                            </HoverBox>
                          </div>
                          <div style={{ position: 'relative' }}>
                            <Image src="../images/select/다육.png" />
                            <HoverBox onClick={handleSelect('species')} id="4">
                              다육이
                            </HoverBox>
                          </div>
                        </ContainerRow>
                      </span>
                    </UDContainer>
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
export default Select;
