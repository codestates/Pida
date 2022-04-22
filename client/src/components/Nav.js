import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Menunav = styled.nav`
  display: flex;
  align-items: center; // 수직축 가운데로 정렬

  padding: 0 0 0 1.5rem;
  width: 98.2vw;
  height: 4rem;
  border-bottom: 0.1rem solid black;
`;

const Menuul = styled.ul`
  display: flex;
  align-items: center;

  padding: 1rem 0 0 1rem;
  list-style: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const Menuli = styled.li`
  padding: 0 1rem;
  font-weight: 600;
  color: rgb(163, 163, 163);
  :hover {
    color: black;
  }
`;

function Nav() {
  return (
    <Menunav className="menubar">
      <img src="../images/logo.png" alt="" width="100px" />
      <Menuul>
        <NavLink to="/">
          <Menuli>홈</Menuli>
        </NavLink>

        {/* ? 로그인 전 */}
        <NavLink to="/users/signup">
          <Menuli>회원가입</Menuli>
        </NavLink>
        <NavLink to="/users/login">
          <Menuli>로그인</Menuli>
        </NavLink>
        {/* : 로그인 후 */}
        <NavLink to="/users/likes">
          <Menuli>마이페이지</Menuli>
        </NavLink>
        <NavLink to="/users/logout">
          <Menuli>로그아웃</Menuli>
        </NavLink>
      </Menuul>
    </Menunav>
  );
}
export default Nav;
