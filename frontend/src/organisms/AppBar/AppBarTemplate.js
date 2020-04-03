import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  ul {
    padding: 0;
    list-style-type: none;
  }
`;

function AppBarTemplate({ isLoggedIn }) {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/register">회원가입</Link>
        </li>
      </ul>
      <div>{isLoggedIn ? '로그인중' : '비로그인상태'}</div>
    </StyledNav>
  );
}

export default AppBarTemplate;
