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
  const { chartData } = useChartData(selectedPeriod);
  
  return (
    <>
      <PeriodsButtons>
        {periods.map(({ label, amount, units }) => (
          <PeriodButton
            key={`${amount}-${units}`}
            isSelected={amount === selectedPeriod.amount && units === selectedPeriod.units}
            onClick={() => setSelectedPeriod({ amount, units })}
          >
            {label}
          </PeriodButton>
        ))}
      </PeriodsButtons>
      <LineChart width={1800} height={300} data={chartData}>
        <Line type="monotone" dataKey="Volume" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" />
        <YAxis />
      </LineChart>
    </>
  );
}

const PeriodsButtons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px auto;
`;

const PeriodButton = styled.div`  
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  padding: 5px 10px;
  border: ${({ isSelected }) => isSelected ? 'none' : `1px solid ${colors.GREY2}`};
  background-color: ${({ isSelected }) => isSelected ? colors.BLACK : 'transparent'};
  color: ${({ isSelected }) => isSelected ? colors.BRAND_GREEN : 'inherit'};
`;

export default OverviewChart;
