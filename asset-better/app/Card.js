import React from 'react';

const Card = ({ asset, totalValue, onDelete }) => {
    const assetPercentage = ((asset.homeValue / totalValue) * 100).toFixed(2);

    return (
        <div style={{ 
            position: 'relative',
            padding: '15px',
            width: '190px',
            margin: '10px', 
            color: 'black', 
            border: '1px solid #ccc',
            backgroundColor: 'rgb(255, 253, 250)',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
        }}>
            <button onClick={() => onDelete(asset.id)} style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: '#fefefe', color: 'black', border: 'none' }}>X</button>
            <img src={`/images/${asset.assetType}.jpg`} alt={asset.name} style={{ width: '100%', height: 'auto'}} />
            <h2>{asset.name}</h2>
            <p>Yrly Change Pct: {asset.avgYearlyChange}%</p>
            <p>Portfolio Pct: {assetPercentage}%</p>
        </div>
    );
};

export default Card;