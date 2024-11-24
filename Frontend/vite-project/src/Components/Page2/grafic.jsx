import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import createModel from './createModel';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const Grafic = ({ gdpVector, envVector }) => {
  const [regressionData, setRegressionData] = useState([]);
  const [truncatedGDP, setTruncatedGDP] = useState([]);
  const [truncatedEnv, setTruncatedEnv] = useState([]);

  useEffect(() => {
    if (gdpVector.length === 0 || envVector.length === 0) {
      console.warn("Data vectors are empty. Graph will not be displayed.");
      return;
    }

    // Truncăm vectorii pentru a avea aceeași dimensiune
    const minLength = Math.min(gdpVector.length, envVector.length);
    const truncatedGDP = gdpVector.slice(0, minLength);
    const truncatedEnv = envVector.slice(0, minLength);

    setTruncatedGDP(truncatedGDP);
    setTruncatedEnv(truncatedEnv);

    const model = createModel();

    const dataPoints = truncatedGDP.map((x, index) => ({ x, y: truncatedEnv[index] }));
    model.fit(dataPoints, [2]);

    const regressionPoints = truncatedGDP.map(x => ({
      x,
      y: model.estimate(2, x),
    }));

    setRegressionData(regressionPoints);
  }, [gdpVector, envVector]);

  if (gdpVector.length === 0 || envVector.length === 0) {
    return <p style={{ textAlign: 'center' }}>Please provide valid data to display the graph.</p>;
  }

  const chartData = {
    labels: truncatedGDP, // Folosim vectorii trunchiați
    datasets: [
      {
        label: 'Real Data (GDP vs CO2 Emissions)',
        data: truncatedEnv.map((y, index) => ({ x: truncatedGDP[index], y })),
        borderColor: 'rgba(0,250,154,1)',
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0)',
        pointRadius: 5,
      },
      {
        label: 'Polynomial Regression',
        data: regressionData,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(152,251,152,0.2)',
        fill: false,
        borderWidth: 2,
        lineTension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'GDP vs CO2 Emissions with Polynomial Regression',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'linear',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '1000px', height: '800px', margin: '0 auto', border: '1px solid #ddd' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default Grafic;
