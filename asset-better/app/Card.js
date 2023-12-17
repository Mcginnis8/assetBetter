import React from 'react';

const Card = ({ asset, totalValue }) => {
    const assetPercentage = ((asset.homeValue / totalValue) * 100).toFixed(2);

    return (
        <div style={{ 
            width: '180px',
            margin: '10px', 
            color: 'black', 
            border: '1px solid #ccc',
            backgroundColor: 'rgb(255, 253, 250)',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
        }}>
            <img src={`/images/${asset.assetType}.jpg`} alt={asset.name} style={{ width: '100%', height: 'auto'}} />
            <h2>{asset.name}</h2>
            <p>Yrly Change Pct: {asset.avgYearlyChange}%</p>
            <p>Portfolio Pct: {assetPercentage}%</p>
        </div>
    );
};

export default Card;