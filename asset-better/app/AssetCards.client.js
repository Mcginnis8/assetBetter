"use client";
import React from 'react';
import Card from './Card';

const AssetCards = ({ assets, dispatchFormValues }) => {
  if (!assets || !Array.isArray(assets)) {
    return null;
  }

  const handleDelete = (id) => {
    dispatchFormValues({ type: 'DELETE_ASSET', id });
  };

  const totalValue = assets.reduce((total, asset) => {
    let homeValue = parseFloat(asset.homeValue);
    if (isNaN(homeValue)) {
        console.error('Asset value is not a number:', asset);
        return total;
    }

    return total + homeValue;
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap'}}>
      {assets.map((asset, index) => (
    <Card key={`${asset.id}-${index}`} asset={asset} totalValue={totalValue} onDelete={handleDelete} />
    ))}
    </div>
  );
};

export default AssetCards;