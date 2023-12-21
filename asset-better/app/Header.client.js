'use client';
import React, { useContext, useEffect, useState } from 'react';
import FormValuesContext from './FormValuesContext.client';

const HeaderContent = () => {
  const { formValues } = useContext(FormValuesContext);
  const [totalHomeValue, setTotalHomeValue] = useState(0);
  const [latestAvgYearlyChange, setLatestAvgYearlyChange] = useState(0);
  const [projectedYearlyProfit, setProjectedYearlyProfit] = useState(0);

  useEffect(() => {
    const total = formValues && formValues.length > 0 ? formValues.reduce((sum, item) => sum + Number(item.homeValue), 0) : 0;
    setTotalHomeValue(total);
    const latestChange = formValues && formValues.length > 0 ? formValues.reduce((sum, item) => sum + (Number(item.avgYearlyChange) * Number(item.homeValue) / total), 0) : 0;
    const roundedLatestChange = parseFloat(latestChange.toFixed(2));
    setLatestAvgYearlyChange(roundedLatestChange);
    const projectedProfit = parseFloat((total * roundedLatestChange / 100).toFixed(2));
    setProjectedYearlyProfit(projectedProfit);
  }, [formValues]);


  return (
    <h1 style={{ color: 'black', fontWeight: 'bold', height: '150px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Total Asset Value: ${totalHomeValue}<br></br>Avg Yearly Change: {latestAvgYearlyChange}%<br></br>Current Yearly Profit: ${projectedYearlyProfit}
    </h1>
  );
};

const Header = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <HeaderContent /> : null;
};

export default Header;