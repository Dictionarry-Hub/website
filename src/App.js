import React, { useState, useEffect } from 'react';
import RadarChart from './RadarChart';
import "./App.css"
import "./custom-grid.css"
// Import JSON data
import qualityData from './quality.json';
import efficiencyData from './efficiency.json';
import compatibilityData from './compatibility.json';

const combinationMatrix = [
  { Quality: 5, Efficiency: 1, Compatibility: 1, Profile: '2160p Remux' },
  { Quality: 4, Efficiency: 2, Compatibility: 2, Profile: '2160p Encode' },
  { Quality: 4, Efficiency: 2, Compatibility: 3, Profile: '2160p WEB' },
  { Quality: 4, Efficiency: 4, Compatibility: 3, Profile: '1080p HDR Encode' },
  { Quality: 3, Efficiency: 2, Compatibility: 4, Profile: '1080p Encode' },
  { Quality: 3, Efficiency: 1, Compatibility: 2, Profile: '1080p Remux' },
  { Quality: 2, Efficiency: 3, Compatibility: 5, Profile: '1080p WEB' },
  { Quality: 2, Efficiency: 5, Compatibility: 3, Profile: '1080p HEVC' },
  { Quality: 2, Efficiency: 3, Compatibility: 4, Profile: '720p Encode' },
  { Quality: 1, Efficiency: 3, Compatibility: 5, Profile: 'SD Encode' },
  { Quality: 1, Efficiency: 4, Compatibility: 3, Profile: 'Minimal' },
  { Quality: 1, Efficiency: 1, Compatibility: 5, Profile: 'Compatible' },
];

function App() {
  const [data, setData] = useState([
    { axis: 'Quality', value: 3 },
    { axis: 'Compatibility', value: 4 },
    { axis: 'Efficiency', value: 2 }
  ]);
  const [qualityInfo, setQualityInfo] = useState({});
  const [efficiencyInfo, setEfficiencyInfo] = useState({});
  const [compatibilityInfo, setCompatibilityInfo] = useState({});
  const [selectedProfile, setSelectedProfile] = useState('1080p Encode');

  const handleDataChange = (newData) => {
    setData(newData);

    // Find the selected profile based on the updated data
    const selectedCombination = combinationMatrix.find(
      (combination) =>
        combination.Quality === newData.find((d) => d.axis === 'Quality').value &&
        combination.Efficiency === newData.find((d) => d.axis === 'Efficiency').value &&
        combination.Compatibility === newData.find((d) => d.axis === 'Compatibility').value
    );

    setSelectedProfile(selectedCombination ? selectedCombination.Profile : '');
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

    // Find the selected profile based on the default data
    const defaultSelectedCombination = combinationMatrix.find(
      (combination) =>
        combination.Quality === data.find((d) => d.axis === 'Quality').value &&
        combination.Efficiency === data.find((d) => d.axis === 'Efficiency').value &&
        combination.Compatibility === data.find((d) => d.axis === 'Compatibility').value
    );

    setSelectedProfile(defaultSelectedCombination ? defaultSelectedCombination.Profile : '');
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
        <div className="row">
          <div className="col-9 pt-0">
            <div className="border border-secondary chart me-3">
              <div className="d-flex justify-content-center">
                <RadarChart data={data} onDataChange={handleDataChange} />
              </div>
            </div>
          </div>
          <div className='col-15 pt-0 pl-0'>
            <div className=" border border-secondary chart mb-3 metric">
              <div className="d-flex mt-3 mb-3 pl-3">
                <h4 className="mr-2">Quality: {qualityInfo.name}</h4>
              </div>
              <p className="pl-3">{qualityInfo.description}</p>
            </div>
            <div className=" border border-secondary chart mb-3 metric">
              <div className="d-flex mt-3 mb-3 pl-3">
                <h4 className="mr-2">Efficiency: {efficiencyInfo.name}</h4>
              </div>
              <p className="pl-3">{efficiencyInfo.description}</p>
            </div>
            <div className=" border border-secondary chart mb-3 metric">
              <div className="d-flex mt-3 mb-3 pl-3">
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