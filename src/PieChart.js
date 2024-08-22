import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Account A', 'Account B', 'Account C'],
    datasets: [
      {
        label: 'CSPM Cloud Accounts',
        data: [300, 50, 100],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };


  return <Pie ref={chartRef} data={data} />;
};

export default PieChart;
