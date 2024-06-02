import React, { useState } from 'react';
import RadarChart from './RadarChart';

const generateCTFFlag = (data) => {
  const sum = data.reduce((total, d) => total + d.value, 0);
  const flagPrefix = 'Profile{';
  const flagSuffix = '}';
  const randomString = Math.random().toString(36).slice(2, 8);
  const flag = `${flagPrefix}${sum}_${randomString}${flagSuffix}`;
  return flag;
};

function App() {
  const [data, setData] = useState([
    { axis: 'Quality', value: 3 },
    { axis: 'Compatibility', value: 3 },
    { axis: 'Efficiency', value: 3 }
  ]);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const ctfFlag = generateCTFFlag(data);

  return (
    <div>
      <h1>Profile Selector v3 Concept</h1>
      <RadarChart data={data} onDataChange={handleDataChange} />
      <div className="ctf-flag-display">
        <h3>Recommended Quality Profile:</h3>
        <p>{ctfFlag}</p>
      </div>
    </div>
  );
}

export default App;