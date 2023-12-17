"use client";
import React, { useEffect } from 'react';
import Card from './Card';

const AssetCards = ({ assets }) => {
  if (!assets || !Array.isArray(assets)) {
    return null;
  }

  const totalValue = assets.reduce((total, asset) => {
    let homeValue = parseFloat(asset.homeValue);
    if (isNaN(homeValue)) {
        console.error('Asset value is not a number:', asset);
        return total;
    }

    return total + homeValue;
  }, 0);

  useEffect(() => {
    console.log('Total value:', totalValue);
  }, [assets]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap', marginLeft: '0.8rem' }}>
      {assets.map((asset, index) => (
        <Card key={index} asset={asset} totalValue={totalValue} />
      ))}
    </div>
  );
};

export default AssetCards;