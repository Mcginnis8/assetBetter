import React, { useState } from 'react';

const InflationToggle = ({ dispatchFormValues }) => { // Add dispatchFormValues as a prop
  const [isAdjustedForInflation, setIsAdjustedForInflation] = useState(false);

  const handleToggle = () => {
    setIsAdjustedForInflation(!isAdjustedForInflation);
    dispatchFormValues({ type: 'ADJUST_FOR_INFLATION' });
  };

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={isAdjustedForInflation} 
          onChange={handleToggle}
          style={{ filter: 'brightness(70%)' }}
        />
        <span style={{ color: 'black' }}>Adjust for inflation</span>
      </label>
    </div>
  );
};

export default InflationToggle;