import React from 'react';
import Chart from '../Chart';
import styled from 'styled-components';

const chartList = [
  {
    displayName: '금',
    name: 'Gold',
    url: 'commodities',
  },
  {
    displayName: '유가',
    name: 'Brent Oil',
    url: 'commodities',
  },
  {
    displayName: '구리',
    name: 'Copper',
    url: 'commodities',
  },
  {
    displayName: '달러/원 환율',
    name: 'USD/KRW',
    url: 'currencycross',
  },
];

const HeadChartsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartWrapper = styled.div`
  justify-self: center;
`;

function HeadCharts() {
  return (
    <HeadChartsWrapper>
      {chartList.map(({ url, name, displayName }, idx) => (
        <ChartWrapper key={idx}>
          <Chart
            width="200"
            height="150"
            url={url}
            params={{ name }}
            displayName={displayName}
          />
        </ChartWrapper>
      ))}
    </HeadChartsWrapper>
  );
}

export default HeadCharts;
