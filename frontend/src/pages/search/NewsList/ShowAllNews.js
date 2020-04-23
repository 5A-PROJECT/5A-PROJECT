import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.a`
  /* width: '90%'; */
  /* display: flex; */
  /* flex-direction: column; */
  font-size: 15px;
  font-weight: bold;
  & + & {
    margin-top: 1rem;
  }
  color: black;
  text-decoration: none;
`;

function ShowNewsList(props) {
  const { title, url } = props.news;

  // console.log(props);
  const openNewTab = () => {
    window.open(url);
  };
  return (
    <ItemWrapper href="#" onClick={openNewTab}>
      {title}
    </ItemWrapper>
  );
}

export default ShowNewsList;
