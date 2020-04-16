import React from 'react';
import PortfolioCard from '../PortfolioCard';
import styled from 'styled-components';
import { colors } from '@material-ui/core';
import ReturnRatio from '../../../../molecules/ReturnRatio';
import MaterialChip from '../../../../atoms/Chip/MaterialChip';
import { withRouter } from 'react-router-dom';

const ItemWrapper = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    margin-bottom: 0.5rem;
  }

  .date {
    align-self: flex-end;
    color: ${colors.grey[400]};
    font-size: 0.7rem;
  }
`;

const TagWrapper = styled.div`
  display: flex;
`;

function PortfolioListItem(props) {
  const { id, name, totalProfit, date, tags } = props.portfolio;
  const { history } = props;
  const goToPortfolio = () => {
    history.push(`portfolio/${id}`);
  };
  return (
    <PortfolioCard>
      <ItemWrapper onClick={goToPortfolio}>
        <div>
          <h2 className="name">{name}</h2>
          <TagWrapper>
            {tags.map((tag) => (
              <MaterialChip
                key={tag.id}
                label={tag.tag}
                size="small"
                variant="outlined"
              />
            ))}
          </TagWrapper>
        </div>
        <div>
          <h4>총 수익률 </h4>
          <ReturnRatio ratio={totalProfit.now} />
        </div>
        <div>
          <h4>전일 대비 </h4>
          <ReturnRatio ratio={totalProfit.prev} />
        </div>

        <div className="date">{date}</div>
      </ItemWrapper>
    </PortfolioCard>
  );
}

export default withRouter(PortfolioListItem);
