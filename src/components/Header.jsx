import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { isEqual } from 'lodash';

import ArrowIcon from './ArrowIcon';
import { colors } from '../constants/styles';

function Header({ stockData }) {
  const {
    companyName,
    tickerSymbol,
    stockExchangeName,  
    currentPrice,
    priceChange,
    percentChange,
    lastUpdated
  } = stockData;
  const isPositive = priceChange > 0;
  const dateStr = useMemo(
    () => moment(lastUpdated).format('MMMM DD,YYYY HH:mm'),
    [lastUpdated]
  );

  return (
    <HeaderCard>
      <LeftSection>
        <Row mb={15}>
          <CompanyName>{companyName}</CompanyName>
        </Row>
        <Row>
          <GreySpan mr={10}>{tickerSymbol}</GreySpan>
          <GreySpan>({stockExchangeName})</GreySpan>
        </Row>
      </LeftSection>
      <Section>
        <PriceChangeData>
          <ArrowIcon priceChange={priceChange}/>
          <CurrentPrice>{currentPrice}</CurrentPrice>
          <ChangeData isPositive={isPositive}>{isPositive ? '+' : ''}{priceChange}</ChangeData>
          <ChangeData isPositive={isPositive}>({isPositive ? '+' : '-'}{percentChange}&#37;)</ChangeData>
        </PriceChangeData>
        <Row>
          <GreySpan>As of {dateStr}</GreySpan>
        </Row>
      </Section>
    </HeaderCard>
  );
}
Header.propTypes = {
  stockData: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    tickerSymbol: PropTypes.string.isRequired,
    stockExchangeName: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    priceChange: PropTypes.number.isRequired,
    percentChange: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired
  }).isRequired
};


// ---------------------- Styled components ----------------------

const HeaderCard = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 16px 21px;
  margin: 15px 0 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 6px 0px;
  border-radius: 10px;
`;

const Section = styled.div`
  width: 50%;
  padding: 0 21px;
`;
const LeftSection = styled(Section)`
  border-right: 1px solid ${colors.GREY1};
`;

const CompanyName = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const GreySpan = styled.span`
  color: ${colors.GREY2};
  margin-right: ${({ mr }) => mr || 0}px;
`;

const Row = styled.div`
  display:flex;
  align-items: center;
  margin-bottom: ${({ mb }) => mb || 0}px;
`;

const PriceChangeData = styled(Row)`
  width: 37%;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CurrentPrice = styled.span`
  font-size: 32px;
  font-weight: 700;
  margin-right: 5px;
`;

const ChangeData = styled.span`
  color: ${({ isPositive }) => isPositive ? colors.POSITIVE : colors.NEGATIVE};
  font-size: 18px;
`;

const MemoizedHeader = memo(Header, (oldProps, newProps) => isEqual(oldProps.stockData, newProps.stockData));

export default MemoizedHeader;
