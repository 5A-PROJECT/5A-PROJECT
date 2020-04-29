import React from 'react';
import MaterialInput from '../../../atoms/Input/MaterialInput';
import MaterialButton from '../../../atoms/Button/MaterialButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@material-ui/core';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${colors.indigo[700]};
  font-weight: bold;
  text-decoration: none;
`;

function AuthFormTemplate({
  username,
  password,
  email,
  handleSubmit,
  handleInputChange,
  type,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <MaterialInput
        label="유저네임"
        value={username}
        name="username"
        type="text"
        onChange={handleInputChange}
        placeholder="유저네임"
        autoFocus
        required
      />
      <MaterialInput
        label="비밀번호"
        value={password}
        name="password"
        type="password"
        onChange={handleInputChange}
        placeholder="비밀번호"
        required
      />
      {type === 'login' && (
        <ButtonWrapper>
          <MaterialButton type="submit">로그인</MaterialButton>
          <StyledLink to="/register">회원가입 전환</StyledLink>
        </ButtonWrapper>
      )}
      {type === 'register' && (
        <>
          <MaterialInput
            value={email}
            label="이메일"
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="이메일"
            required
          />
          <ButtonWrapper>
            <MaterialButton type="submit">회원가입</MaterialButton>
            <StyledLink to="/login">로그인 전환</StyledLink>
          </ButtonWrapper>
        </>
      )}
    </form>
  );
}

export default AuthFormTemplate;
