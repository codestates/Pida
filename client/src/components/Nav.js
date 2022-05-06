import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ConfirmButton } from '../components/Button';
import { Modal, Modal2 } from './Modal';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { IoIosMenu } from 'react-icons/io';

const Menunav = styled.nav`
  //전부 묶어주는 nav
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직축 가운데로 정렬
  padding: 0.5rem 1.5rem;
  min-width: 100%-1.5rem;
  height: 4rem; // 나머지에서 빼줄까???
  border-bottom: 0.1rem solid black;
`;

const Menuul = styled.ul`
  display: flex;
  list-style: none;
  padding: 1rem 0 0 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.li`
  padding: 0 1rem;
  font-weight: 600;
  color: rgb(163, 163, 163);
  :hover {
    color: black;
  }
`;
const Menuli = styled(Logo)`
  @media screen and (max-width: 760px) {
    //margin-top: 10rem;
    top: 3rem;
  }
`;

const Menubar = styled.a`
  display: none;

  @media screen and (max-width: 760px) {
    display: block;
    position: absolute;
    right: 1rem;
    font-size: 2rem;
    color: #bcbcbc;
  }
`;

const MenuColumn = styled.div`
  display: flex;
  @media screen and (max-width: 760px) {
    display: ${({ menu }) => {
      return menu === false ? 'none' : 'flex';
    }};
  }
`;

function Nav() {
  const history = useHistory();

  /* 회원가입 모달 */
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const handleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };
  const handleSignup = () => {
    setIsSignupModalOpen(true);
  };
  /* 로그인 모달 */
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };
  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  /* 로그아웃 모달 */
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const handleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };
  /* 로그아웃 핸들러*/
  const handleLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/logout`,
        {},
        { withCredentials: true },
      )
      .then(res => {
        localStorage.removeItem('loginUserId');
        setIsLogoutModalOpen(true); // 성공 모달
        history.replace('/');
        window.location.reload();
      });
  };
  // const [active, setActive] = useState(false);
  // const handlemenu = () => {
  //   setActive(!active);
  // };

  const [menu, setmenu] = useState(false);

  return (
    <Menunav>
      <Menuul>
        <NavLink to="/">
          <Logo>
            <img src="../images/logo.png" alt="" width="100px" />
          </Logo>
        </NavLink>
        <MenuColumn menu={menu}>
          <NavLink to="/select">
            <Menuli>식물추천</Menuli>
          </NavLink>

          {localStorage.getItem('loginUserId') ? (
            <>
              <NavLink to="/users">
                <Menuli>마이페이지</Menuli>
              </NavLink>

              <Menuli onClick={handleLogout}>로그아웃</Menuli>
              {isLogoutModalOpen ? (
                <Modal handleModal={handleLogoutModal}>
                  <h3>로그아웃에 성공했습니다</h3>
                  <ConfirmButton onClick={handleLogoutModal}>
                    확인
                  </ConfirmButton>
                </Modal>
              ) : null}
            </>
          ) : (
            <>
              <Menuli onClick={handleSignup}>회원가입</Menuli>
              {isSignupModalOpen ? (
                <Modal2 handleModal={handleSignupModal}>
                  <Signup setIsSignupModalOpen={setIsSignupModalOpen} />
                </Modal2>
              ) : null}
              <Menuli onClick={handleLogin}>로그인</Menuli>
              {isLoginModalOpen ? (
                <Modal2 handleModal={handleLoginModal}>
                  <Login setIsLoginModalOpen={setIsLoginModalOpen} />
                </Modal2>
              ) : null}
            </>
          )}
        </MenuColumn>
        <Menubar
          NavLink="#"
          onClick={() => {
            setmenu(!menu);
          }}
        >
          <IoIosMenu />
        </Menubar>
      </Menuul>
    </Menunav>
  );
}
export default Nav;
