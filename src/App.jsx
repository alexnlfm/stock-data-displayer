import { useState } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import { colors } from './constants/colors';

const staticAppleStockData = {
  companyName: 'Apple Inc.',
  tickerSymbol: 'AAPL',
  stockExchangeName: 'Nasdaq - US',
  currentPrice: 189.93,
  priceChange: -0.09,
  percentChange: 0.05,
  lastUpdated: '2024-05-18T12:00:00Z'
};

const navigationTabs = [
  {
    id: 'overview-chart',
    title: 'Overview Chart'
  },
  {
    id: 'historical-data',
    title: 'Historical Data'
  }
];

function App() {
  const [currentTab, setCurrentTab] = useState(navigationTabs[0].id);
  function handleTabClick(e) {
    // TODO: Fix issue of redundant focusing on div (text cursor blinking on click)
    const { id } = e.target;
    setCurrentTab(id);
  }
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>      
      <Header stockData={staticAppleStockData} />
      <StyledNav>
        {navigationTabs.map(tab => (
          <StyledTab key={tab.id} id={tab.id} isSelected={tab.id === currentTab} onClick={handleTabClick}>
            {tab.title}
          </StyledTab>
        ))}
      </StyledNav>
      {currentTab === 'overview-chart' && (<div>Overview Chart</div>)}
      {currentTab === 'historical-data' && (<div>Historical Data</div>)}
    </div>
  )
}

// ---------------------- Styled components ----------------------

const StyledNav = styled.nav`
  display: flex;
  border-bottom: 1px solid ${colors.GREY1};
  margin-bottom: 20px;
`;

const StyledTab = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  background-color: ${({ isSelected }) => isSelected ? colors.BLACK : 'transparent'};
  color: ${({ isSelected }) => isSelected ? colors.SELECTED_TEXT : 'inherit'};
  font-weight: ${({ isSelected }) => isSelected ? 500 : 400};
`;

export default App
