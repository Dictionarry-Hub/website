import React, { useState, useEffect } from 'react';
import RadarChart from './RadarChart';
import "./App.css"
import "./custom-grid.css"
// Import JSON data
import qualityData from './quality.json';
import efficiencyData from './efficiency.json';
import compatibilityData from './compatibility.json';

function App() {
  const [data, setData] = useState([
    { axis: 'Quality', value: 3, currentProfile: '1080p Encode' },
    { axis: 'Compatibility', value: 4, currentProfile: '1080p Encode' },
    { axis: 'Efficiency', value: 2, currentProfile: '1080p Encode' }
  ]);
  const [qualityInfo, setQualityInfo] = useState({});
  const [efficiencyInfo, setEfficiencyInfo] = useState({});
  const [compatibilityInfo, setCompatibilityInfo] = useState({});
  const [selectedProfile, setSelectedProfile] = useState('1080p Encode');

  const handleDataChange = (newData) => {
    setData(newData);
    setSelectedProfile(newData[0].currentProfile);
  };

  useEffect(() => {
    const qualityValue = data.find(d => d.axis === 'Quality').value;
    const efficiencyValue = data.find(d => d.axis === 'Efficiency').value;
    const compatibilityValue = data.find(d => d.axis === 'Compatibility').value;

    const qualityDetails = qualityData.find(item => item.level === qualityValue);
    const efficiencyDetails = efficiencyData.find(item => item.level === efficiencyValue);
    const compatibilityDetails = compatibilityData.find(item => item.level === compatibilityValue);

    setQualityInfo(qualityDetails || {});
    setEfficiencyInfo(efficiencyDetails || {});
    setCompatibilityInfo(compatibilityDetails || {});
  }, [data]);

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
        <div className="row custom-row">
          <div className="col-9 pt-0">
            <div className="border border-secondary chart me-3 custom-chart">
              <div className="custom-chart-header">
                <h4 className="mt-3 ml-3">Metric Selector</h4>
              </div>
              <div className="custom-chart-content">
                <RadarChart data={data} onDataChange={handleDataChange} />
              </div>
            </div>
          </div>
          <div className='col-15 pt-0 pl-0 d-flex flex-column'>
            <div className="border border-secondary chart mb-3 metric custom-metric">
              <div className="d-flex mt-3 mb-3 pl-3">
                <h4 className="mr-2">Quality: {qualityInfo.name}</h4>
              </div>
              <p className="pl-3">{qualityInfo.description}</p>
            </div>
            <div className="border border-secondary chart mb-3 metric custom-metric">
              <div className="d-flex mt-3 mb-3 pl-3">
                <h4 className="mr-2">Efficiency: {efficiencyInfo.name}</h4>
              </div>
              <p className="pl-3">{efficiencyInfo.description}</p>
            </div>
            <div className="border border-secondary chart mb-3 metric custom-metric bottom-metric">
              <div className="d-flex mt-3 mb-3 pl-3 pb">
                <h4 className="mr-2">Compatibility: {compatibilityInfo.name}</h4>
              </div>
              <p className="pl-3">{compatibilityInfo.description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <div className="border border-secondary info">
              <h4 className="text-center">Selected Profile: {selectedProfile}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;