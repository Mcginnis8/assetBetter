'use client';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title } from 'chart.js';
import { useEffect, useRef } from 'react';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

const GraphElement = ({ assets }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      if (!assets || !Array.isArray(assets)) {
        return;
      }
  
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
      }
  
      const ctx = document.getElementById('myChart').getContext('2d');
      const currentYear = new Date().getFullYear();
      const labels = Array.from({length: 31}, (_, i) => currentYear + i);
      const datasets = assets.map(asset => ({
        label: asset.name,
        data: labels.map(x => parseFloat(asset.homeValue * Math.pow((1 + asset.avgYearlyChange / 100), (x - currentYear))).toFixed(2)),
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false,
      }));
      const totalLine = {
        label: 'Total',
        data: labels.map((_, i) => parseFloat(datasets.reduce((total, dataset) => total + parseFloat(dataset.data[i]), 0).toFixed(2))),
        borderColor: 'red',
        fill: false,
      };
      datasets.push(totalLine);
  
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Assets over time',
              font: {
                size: 40,
                color: 'black',
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Years',
                font: {
                  size: 30,
                  color: 'black',
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'USD$',
                font: {
                  size: 30,
                  color: 'black',
                },
              },
            },
          },
        },
      });
    }, [assets]);
  
    return <canvas id="myChart" style={{ width: '70vw', height: '15vh', marginTop: '1rem' }}></canvas>;

  };

export default GraphElement;