import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Login from './Sign/Login';
import Signup from './Sign/Signup';
import { IoIosMenu } from 'react-icons/io';

const Menunav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직축 가운데로 정렬
  padding: 0.5rem 1.5rem;
  height: 5vh;
`;

const Menuul = styled.ul`
  display: flex;
  padding: 1rem 0 0 0;
  list-style: none;
`;
const NavLink = styled(Link)`
  text-decoration: none;
`;
const Menuli = styled.li`
  padding-left: 1rem;
  font-weight: 600;
  color: rgb(163, 163, 163);
  :hover {
    color: black;
  }
  cursor: pointer;
  @media screen and (max-width: 760px) {
    top: 3rem;
    margin-bottom: 0.6rem;
  }
`;

const MenuDiv = styled.div`
  display: flex;
  position: absolute;
  right: 2rem;
  flex-direction: column;
  align-items: flex-end;
`;
const HamburgerBar = styled.a`
  display: none;
  @media screen and (max-width: 760px) {
    display: block;
    font-size: 3rem;
    color: #bcbcbc;
  }
`;
const MenuColumn = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  @media screen and (max-width: 760px) {
    display: ${({ menu }) => {
      return menu === false ? 'none' : 'flex';
    }};
    font-size: 1.4rem;
    flex-direction: column;
    background-color: white;
  }
`;

function Nav() {
  const managerId = process.env.REACT_APP_MANAGER_ID;
  const history = useHistory();

  const [menu, setMenu] = useState(false); // 반응형 메뉴바

  /* 회원가입 모달 */
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const handleSignupModal = () => {
    setIsSignupModalOpen(false); // backdrop, 확인 클릭하면 닫기
  };
  const handleSignup = () => {
    setIsSignupModalOpen(true); // 회원가입 클릭하면 열기
  };

  /* 로그인 모달 */
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginModal = () => {
    setIsLoginModalOpen(false); // backdrop, 확인 클릭하면 닫기
  };
  const handleLogin = () => {
    setIsLoginModalOpen(true); // 로그인 클릭하면 열기
  };

  /* 로그아웃 */
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        {},
        { withCredentials: true },
      )
      .then(res => {
        localStorage.removeItem('loginUserId');
        history.replace('/');
      });
  };

  return (
    <>
      <Menunav>
        <Menuul>
          {/* 로고 */}
          <NavLink to="/">
            <Menuli>
              <img src="../images/logo.png" alt="" width="110rem" />
            </Menuli>
          </NavLink>

          <MenuDiv>
            <HamburgerBar
              NavLink="#"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <IoIosMenu />
            </HamburgerBar>

            {/* 숨었다 나타났다 메뉴 */}
            <MenuColumn menu={menu}>
              <NavLink to="/select">
                <Menuli>식물추천</Menuli>
              </NavLink>

              {localStorage.getItem('loginUserId') ? (
                <>
                  {/* 로그인 상태 */}
                  {localStorage.getItem('loginUserId') === managerId ? (
                    <>
                      {/* 관리자 */}
                      <NavLink to="/plants">
                        <Menuli>식물등록</Menuli>
                      </NavLink>
                      <Menuli onClick={handleLogout}>로그아웃</Menuli>
                    </>
                  ) : (
                    <>
                      {/* 일반 회원 */}
                      <NavLink to="/users">
                        <Menuli>마이페이지</Menuli>
                      </NavLink>
                      <Menuli onClick={handleLogout}>로그아웃</Menuli>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* 비로그인 상태 */}
                  <Menuli onClick={handleSignup}>회원가입</Menuli>
                  {isSignupModalOpen ? (
                    <Signup
                      handleModal={handleSignupModal}
                      setIsSignupModalOpen={setIsSignupModalOpen}
                    />
                  ) : null}
                  <Menuli onClick={handleLogin}>로그인</Menuli>
                  {isLoginModalOpen ? (
                    <Login
                      handleModal={handleLoginModal}
                      setIsLoginModalOpen={setIsLoginModalOpen}
                    />
                  ) : null}
                </>
              )}
            </MenuColumn>
          </MenuDiv>
        </Menuul>
      </Menunav>
    </>
  );
}
export default Nav;
