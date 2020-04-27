import React from 'react';
import styled from 'styled-components';
import AccessProtection from '../../molecules/AccessProtection';
import WordCloud from './WordCloud';
import { TextField, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PieGraph from './Graph/PieGraph';
import PopNewsList from './NewsList/PopNews';
import AllNewsList from './NewsList/AllNewsList';

const SearchPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.width.page};
  margin: 0 auto;
`;

const ContainWrapper = styled.div`
  margin-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

function SearchPage(props) {
  return (
    <AccessProtection authed={true} redirectPath={'/login'}>
      <SearchPageWrapper>
        <ContainWrapper>
          <WordCloud />
          <PopNewsList />
          <AllNewsList />
          <PieGraph />
        </ContainWrapper>
      </SearchPageWrapper>
    </AccessProtection>
  );
}

export default SearchPage;
