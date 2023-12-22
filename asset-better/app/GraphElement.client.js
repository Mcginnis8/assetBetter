'use client';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css'

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title);

const GraphElement = ({ assets }) => {
    const chartRef = useRef(null);
    const [selectedRange, setSelectedRange] = useState(20); // Default range is 20 years
  
    useEffect(() => {
      if (!assets || !Array.isArray(assets)) {
        return;
      }
  
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
      }
  
      const ctx = document.getElementById('myChart').getContext('2d');
      const currentYear = new Date().getFullYear();
      const labels = Array.from({length: selectedRange + 1}, (_, i) => currentYear + i);
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
        borderColor: 'rgb(255, 216, 74)',
        fill: false,
      };
      datasets.push(totalLine);

      const vwToPixel = (value) => {
        return value * window.innerWidth / 100;
      }
  
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Assets over time',
              font: {
                size: vwToPixel(2.5),
              },
              color: 'black',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Years',
                font: {
                  size: vwToPixel(1.5),
                },
                color: 'black',
              },
            },
            y: {
              title: {
                display: true,
                text: 'USD$',
                font: {
                  size: vwToPixel(1.5),
                },
                color: 'black',
              },
            },
          },
        },
      });
    }, [assets, selectedRange]);
    
    return (
        <>
          <select className={styles.selectDropdown} value={selectedRange} onChange={e => setSelectedRange(Number(e.target.value))}>
            <option value={5}>5 years</option>
            <option value={10}>10 years</option>
            <option value={20}>20 years</option>
            <option value={30}>30 years</option>
            <option value={50}>50 years</option>
          </select>
          <canvas id="myChart" style={{ width: '90%', height: '90%', aspectRatio: 'auto'}}></canvas>
        </>
      );
  };

export default GraphElement;