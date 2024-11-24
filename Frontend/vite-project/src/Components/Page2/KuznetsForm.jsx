import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Grafic from './grafic';

const KuznetsForm = () => {
  const [countries] = useState({
    'Austria': 'AUT',
    'Belarus': 'BLR',
    'Belgium': 'BEL',
    'Bosnia and Herzegovina': 'BIH',
    'Bulgaria': 'BGR',
    'Croatia': 'HRV',
    'Czech Republic': 'CZE',
    'Denmark': 'DNK',
    'Estonia': 'EST',
    'Finland': 'FIN',
    'France': 'FRA',
    'Germany': 'DEU',
    'Greece': 'GRC',
    'Hungary': 'HUN',
    'Iceland': 'ISL',
    'Ireland': 'IRL',
    'Italy': 'ITA',
    'Latvia': 'LVA',
    'Lithuania': 'LTU',
    'Luxembourg': 'LUX',
    'Moldova': 'MDA',
    'Montenegro': 'MNE',
    'Netherlands': 'NLD',
    'North Macedonia': 'MKD',
    'Norway': 'NOR',
    'Poland': 'POL',
    'Portugal': 'PRT',
    'Romania': 'ROU',
    'Russia': 'RUS',
    'Serbia': 'SRB',
    'Slovakia': 'SVK',
    'Slovenia': 'SVN',
    'Spain': 'ESP',
    'Sweden': 'SWE',
    'Switzerland': 'CHE',
    'Ukraine': 'UKR',
    'United Kingdom': 'GBR'
  });

  const [indicators] = useState({
    "EN.GHG.CO2.PC.CE.AR5": "CO2 emissions (metric tons per capita)",
    "EN.ATM.PM25.MC.M3": "PM2.5 air pollution (micrograms per cubic meter)",
    "EN.GHG.ALL.PC.CE.AR5": "Greenhouse gas emissions (metric tons per capita)",
    "ER.H2O.FWTL.K3": "Biodiversity loss (km³ of freshwater per year)"
  });

  const [selectedCountry, setSelectedCountry] = useState('Austria');
  const [selectedIndicator, setSelectedIndicator] = useState('EN.GHG.CO2.PC.CE.AR5');
  const [gdpVector, setGdpVector] = useState([]);
  const [envVector, setEnvVector] = useState([]);

  console.log({
    country: selectedCountry,
    indicators: selectedIndicator
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/api/get_data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        country: countries[selectedCountry],
        indicators: {
          "NY.GDP.PCAP.PP.CD": "GDP per capita, PPP (current international $)",
          [selectedIndicator]: indicators[selectedIndicator]
        }
      })
    });

    const data = await response.json();
    if (response.ok) {
      setGdpVector(data.gdp_vector || []);
      setEnvVector(data.env_indicator_vector || []);
      console.log("e bine boss")
      console.log(data.gdp_vector)
    } else {
      console.log("nu e bine")
      console.error(data.error);
    }
  };

  const chartData = {
    labels: gdpVector,
    datasets: [
      {
        label: indicators[selectedIndicator],
        data: envVector,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };



  return (
    <div>
      <h1>Generate the Kuznets Curve</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select a country:</label>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
            {Object.entries(countries).map(([country, code]) => (
              <option key={code} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Select the indicator for the vertical axis:</label>
          <select value={selectedIndicator} onChange={(e) => setSelectedIndicator(e.target.value)}>
            {Object.entries(indicators).map(([indicator, description]) => (
              <option key={indicator} value={indicator}>{description}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>Generate Curve</button>
      </form>

      {/* {gdpVector.length > 0 && envVector.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2>Kuznets Curve Graph</h2>
          <Line data={chartData} />
        </div>
      )} */}
    

    <Grafic gdpVector={gdpVector} envVector={envVector}/>

    </div>
  );
};

export default KuznetsForm;