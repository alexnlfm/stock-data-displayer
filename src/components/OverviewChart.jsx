import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import useChartData from "../customHooks/useChartData";
import { colors, BORDER_RADIUS } from '../constants/styles';

const periods = [
  { label: '1 day', amount: 1, units: 'days' },
  { label: '1 week', amount: 1, units: 'weeks' },
  { label: '1 month', amount: 1, units: 'months' },
  { label: '1 quater', amount: 1, units: 'quarters' },
  { label: '1 year', amount: 1, units: 'years' }
];

function OverviewChart() {
  const [selectedPeriod, setSelectedPeriod] = useState({ amount: 1, units: 'days' });
  const { chartData, isLoading } = useChartData(selectedPeriod);
  console.log('chartData', chartData);
  
  return (
    <>
      <PeriodsButtons>
        {periods.map(({ label, amount, units }) => {
          const isSelected = amount === selectedPeriod.amount && units === selectedPeriod.units;
          return (
            <PeriodButton
              key={`${amount}-${units}`}
              isSelected={isSelected}
              onClick={() => setSelectedPeriod({ amount, units })}
            >
              {(isSelected && isLoading) ? 'Loading...' : label}
            </PeriodButton>
          )
        })}
      </PeriodsButtons>
      <ChartContainer>
        <LineChart width={1400} height={400} data={chartData}>
          <Line type="monotone" dataKey="Close" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Date" />
          <YAxis />
        </LineChart>
      </ChartContainer>
    </>
  );
}

const PeriodsButtons = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px auto;
`;

const PeriodButton = styled.div`  
  width: 70px;
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  padding: 5px 10px;
  text-align: center;
  border: ${({ isSelected }) => isSelected ? 'none' : `1px solid ${colors.GREY2}`};
  background-color: ${({ isSelected }) => isSelected ? colors.BLACK : 'transparent'};
  color: ${({ isSelected }) => isSelected ? colors.BRAND_GREEN : 'inherit'};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default OverviewChart;
