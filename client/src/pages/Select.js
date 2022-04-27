import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UDContainer } from '../components/Container';
import { SelectButton } from '../components/Button';

const QuestionDiv = styled.div`
  padding: 0rem 0 3rem 0;
  font-size: 2.3rem;
  font-weight: 600;
`;

const Image = styled.img`
  padding: 0 1rem 0 1rem;
  width: 12rem;
  height: 16rem;
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
    setSelect({ ...select, [key]: e.target.name }); // 검색 조건 설정하고
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
                <Image
                  src="../images/select/큰.png"
                  onClick={handleSelect('size')}
                  name="큰"
                />
                <Image
                  src="../images/select/작은.png"
                  onClick={handleSelect('size')}
                  name="작은"
                />
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
                    <Image
                      src="../images/select/가구.png"
                      onClick={handleSelect('space')}
                      name="가구"
                    />
                    <Image
                      src="../images/select/바닥.png"
                      onClick={handleSelect('space')}
                      name="바닥"
                    />
                    <Image
                      src="../images/select/벽.png"
                      onClick={handleSelect('space')}
                      name="벽"
                    />
                    <Image
                      src="../images/select/천장.png"
                      onClick={handleSelect('space')}
                      name="천장"
                    />
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
                        <Image
                          src="../images/select/꽃.png"
                          onClick={handleSelect('species')}
                          name="꽃"
                        />
                        <Image
                          src="../images/select/비꽃.png"
                          onClick={handleSelect('species')}
                          name="비꽃"
                        />
                        <Image
                          src="../images/select/선인장.png"
                          onClick={handleSelect('species')}
                          name="선인장"
                        />
                        <Image
                          src="../images/select/다육.png"
                          onClick={handleSelect('species')}
                          name="다육"
                        />
                      </span>
                    </UDContainer>
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
