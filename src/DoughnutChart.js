import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const chartRef = useRef(null);
  
  // State for checkboxes
  const [connected, setConnected] = useState(true);
  const [notConnected, setNotConnected] = useState(true);

  // Assume these are the base numbers of connected and not connected accounts
  const baseConnectedCount = 2;
  const baseNotConnectedCount = 2;

  // Function to calculate the total number of cloud accounts
  const calculateTotal = () => {
    let total = 0;
    if (connected) total += baseConnectedCount;
    if (notConnected) total += baseNotConnectedCount;
    return total;
  };

  const total = calculateTotal();

  const data = {
    labels: [], // No labels for the chart
    datasets: [
      {
        label: 'CSPM Cloud Accounts',
        data: [
          connected ? baseConnectedCount : 0, 
          notConnected ? baseNotConnectedCount : 0 
        ],
        backgroundColor: [
          '#6495ED', '#d6eaf8',
        ],
        borderColor: [
          '#6495ED',
          '#d6eaf8',
        ],
        borderWidth: 1,
        cutout: '70%',
        rotation: 180,
      },
    ],
  };

  // Plugin to display total in the center of the doughnut chart
  const totalPlugin = {
    id: 'totalPlugin',
    beforeDraw: (chart) => {
      const { width } = chart;
      const { ctx } = chart;
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Total: ${total}`, width / 2, chart.chartArea.height / 2);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '200px' }}>
        <Doughnut ref={chartRef} data={data} plugins={[totalPlugin]} />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            checked={connected}
            onChange={(e) => setConnected(e.target.checked)}
            style={{ 
              appearance: 'none', 
              width: '20px', 
              height: '20px', 
              backgroundColor: connected ? '#6495ED' : 'white', 
              border: connected ? '1px solid #6495ED' : '1px solid black',
              borderRadius: '3px',
              marginRight: '8px' 
            }} 
          />
            <label  style={{ fontSize:'15px' }}>
            Connected ({connected ? baseConnectedCount : 0})
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="checkbox" 
            checked={notConnected}
            onChange={(e) => setNotConnected(e.target.checked)}
            style={{ 
              appearance: 'none', 
              width: '20px', 
              height: '20px', 
              backgroundColor: notConnected ? '#d6eaf8' : 'white', 
              border: notConnected ? '1px solid #d6eaf8' : '1px solid black',
              borderRadius: '3px',
              marginRight: '8px' 
            }} 
          />
          <label  style={{ fontSize:'15px' }}>
            Not Connected ({notConnected ? baseNotConnectedCount : 0})
          </label>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
