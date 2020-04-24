import React from 'react';
import styled from 'styled-components';
import AccessProtection from '../../molecules/AccessProtection';
import CompanyTable from '../predict/CompanyTable/index';
import HeadCharts from './HeadCharts';
import MainChart from './MainChart';
import Table from '../predict/Table/index';

const PredictPageWrapper = styled.div`
  max-width: ${({ theme }) => theme.width.page};
  margin: 0 auto;
  padding: 0 1rem;
`;

function PredictPage(props) {
  return (
    <AccessProtection authed={true} redirectPath={'/login'}>
      <PredictPageWrapper>
        <HeadCharts />
        <MainChart />
        {/* <CompanyTable /> */}
        <Table />
      </PredictPageWrapper>
    </AccessProtection>
  );
}

export default PredictPage;
