import PropTypes from 'prop-types';

import { colors } from '../constants/styles';

function ArrowIcon({ priceChange }) {  
  const isUp = priceChange > 0;
  const color = isUp ? colors.POSITIVE : colors.NEGATIVE;
  const points = isUp ? '8,2 0,16 16,16' : '8,14 0,0 16,0';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16">
      <polygon fill={color} points={points} data-testid="direction_polygon"></polygon>
    </svg>
  );
}
ArrowIcon.propTypes = {
  priceChange: PropTypes.number.isRequired
};

export default ArrowIcon;
