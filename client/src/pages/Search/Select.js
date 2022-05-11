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
    padding: 1rem 1rem 0 2rem;
  }
`;

const TextDiv = styled.div`
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

const TextBox = styled.div`
  position: absolute;
  margin: 0 1rem 0 0rem;

  width: 12rem;
  height: 16rem;
  top: 0%;
  left: 7%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: black;
  :hover {
    opacity: 0.5;
  }
  @media screen and (max-width: 760px) {
    margin: 1rem 1rem 0 1rem;
  }
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
    size: '',
    space: '',
    species: '',
  });
  const [isNavigate, setIsNavigate] = useState('');
  const handleSelect = key => e => {
    console.log(e.target.id);
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
                    <TextBox onClick={handleSelect('size')} id="1">
                      <TextDiv>큰</TextDiv>
                    </TextBox>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Image src="../images/select/작은.png" />
                    <TextBox onClick={handleSelect('size')} id="2">
                      <TextDiv>작은</TextDiv>
                    </TextBox>
                  </div>
                </ContainerRow>
              </span>
            </UDContainer>
          ) : (
            <>
              {isQ2 ? (
                <div style={{ margin: '1rem' }}>
                  <UDContainer>
                    <QuestionDiv>
                      Q2. 어떤 공간을 꾸밀 반려 식물을 찾고 있나요?
                    </QuestionDiv>
                    <span>
                      <ContainerRow style={{ margin: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                          <Image src="../images/select/가구.png" />
                          <TextBox onClick={handleSelect('space')} id="1">
                            <TextDiv>가구</TextDiv>
                          </TextBox>
                        </div>
                        <div style={{ position: 'relative' }}>
                          <Image src="../images/select/바닥.png" />
                          <TextBox onClick={handleSelect('space')} id="2">
                            <TextDiv>바닥</TextDiv>
                          </TextBox>
                        </div>
                      </ContainerRow>
                      <ContainerRow style={{ margin: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                          <Image src="../images/select/벽.png" />
                          <TextBox onClick={handleSelect('space')} id="3">
                            <TextDiv>벽</TextDiv>
                          </TextBox>
                        </div>
                        <div style={{ position: 'relative' }}>
                          <Image src="../images/select/천장.png" />
                          <TextBox onClick={handleSelect('space')} id="4">
                            <TextDiv>천장</TextDiv>
                          </TextBox>
                        </div>
                      </ContainerRow>
                    </span>
                  </UDContainer>
                </div>
              ) : (
                <>
                  {isQ3 ? (
                    <div style={{ margin: '1rem' }}>
                      <UDContainer>
                        <QuestionDiv>
                          Q3. 어떤 종류의 반려 식물을 찾고 있나요?
                        </QuestionDiv>
                        <span>
                          <ContainerRow style={{ margin: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                              <Image src="../images/select/꽃.png" />
                              <TextBox onClick={handleSelect('species')} id="1">
                                <TextDiv>꽃이 피는</TextDiv>
                              </TextBox>
                            </div>
                            <div style={{ position: 'relative' }}>
                              <Image src="../images/select/비꽃.png" />
                              <TextBox onClick={handleSelect('species')} id="2">
                                <TextDiv>잎이 많은</TextDiv>
                              </TextBox>
                            </div>
                          </ContainerRow>
                          <ContainerRow style={{ margin: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                              <Image src="../images/select/선인장.png" />
                              <TextBox onClick={handleSelect('species')} id="3">
                                <TextDiv>선인장</TextDiv>
                              </TextBox>
                            </div>
                            <div style={{ position: 'relative' }}>
                              <Image src="../images/select/다육.png" />
                              <TextBox onClick={handleSelect('species')} id="4">
                                <TextDiv>다육이</TextDiv>
                              </TextBox>
                            </div>
                          </ContainerRow>
                        </span>
                      </UDContainer>
                    </div>
                  ) : null}
                </>
              )}
              :
            </>
          )}
          :
        </>
      )}
    </>
  );
}
export default Select;
