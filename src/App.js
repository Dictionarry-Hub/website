import React, { useState } from 'react';
import RadarChart from './RadarChart';
import "./App.css"

function App() {
  const [data, setData] = useState([
    { axis: 'Quality', value: 3 },
    { axis: 'Compatibility', value: 3 },
    { axis: 'Efficiency', value: 3 }
  ]);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <>
      <div className='container-fluid nav'>
        <div className='container'>
          <div className="row">
            <div className="col-12 title">
              <h1>Dictionarry</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 border border-secondary info">
            <h4>
              Welcome to the Profile Selector!
            </h4>

          </div>
        </div>
        <div className="row">
          <div className="col-md-5 border border-secondary chart border border-secondary">
            <RadarChart data={data} onDataChange={handleDataChange} />
          </div>
          <div className="col-md-7">
            <div>Column A Content (maybe some controls or info here)</div>
          </div>

        </div>
      </div>
    </>

  );
}

export default App;
