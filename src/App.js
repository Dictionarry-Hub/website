import React, { useState } from 'react';
import RadarChart from './RadarChart';
import "./App.css"
import "./custom-grid.css"

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
          <div className='col-24'>
            <div className="border border-secondary info mt-1">
              <h4 className='mt-3 pl-3'>
                Welcome to the Profile Selector!
              </h4>
              <p className='pl-3'>
                This tool is designed to help you select the best quality profiles for your needs.
                Choose from different levels of quality, efficiency, and compatibility to find your perfect media profile.
              </p>
              <p className='pl-3'>
                To get started, simply choose your preferences in the Metric Selector.
                Based on your selections, the tool will recommend the most suitable profile for you.
              </p>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-9 pt-0">
            <div className="border border-secondary chart me-3">
              <h4 className="mt-3 pl-3">
                Metric Selector
              </h4>
              <div className="d-flex justify-content-center">
                <RadarChart data={data} onDataChange={handleDataChange} />
              </div>
            </div>
          </div>
          <div className='col-15 pt-0 pl-0'>
            <div className=" border border-secondary chart">
              <div>Column A Content (maybe some controls or info here)</div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
