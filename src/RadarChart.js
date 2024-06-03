import React, { useRef } from 'react';
import * as d3 from 'd3';
import './RadarChart.css';

const combinationMatrix = [
    { Quality: 5, Efficiency: 1, Compatibility: 1 },
    { Quality: 4, Efficiency: 2, Compatibility: 2 },
    { Quality: 4, Efficiency: 3, Compatibility: 2 },
    { Quality: 4, Efficiency: 4, Compatibility: 3 },
    { Quality: 3, Efficiency: 2, Compatibility: 5 },
    { Quality: 3, Efficiency: 1, Compatibility: 2 },
    { Quality: 2, Efficiency: 3, Compatibility: 5 },
    { Quality: 2, Efficiency: 5, Compatibility: 4 },
    { Quality: 2, Efficiency: 3, Compatibility: 5 },
    { Quality: 1, Efficiency: 3, Compatibility: 5 },
    { Quality: 1, Efficiency: 4, Compatibility: 4 },
    { Quality: 1, Efficiency: 1, Compatibility: 5 },
];

const RadarChart = ({ data, onDataChange }) => {

    const levels = [1, 2, 3, 4, 5, 6];

    const width = 420;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const angleSlice = (Math.PI * 2) / data.length;

    const svgRef = useRef(null);

    const scale = d3.scaleLinear().range([0, radius * 0.8]).domain([0, 6]);

    const getPathCoordinates = (dataPoint) => {
        const angle = angleSlice * dataPoint.index;
        return {
            x: scale(dataPoint.value) * Math.cos(angle - Math.PI / 2),
            y: scale(dataPoint.value) * Math.sin(angle - Math.PI / 2),
        };
    };

    const getLabelCoordinates = (index) => {
        const angle = angleSlice * index;
        const outerRadius = scale(6.5); // Increased the radius for labels
        return {
            x: outerRadius * Math.cos(angle - Math.PI / 2),
            y: outerRadius * Math.sin(angle - Math.PI / 2),
        };
    };

    const getQualityLabelCoordinates = () => {
        const angle = angleSlice * data.findIndex(d => d.axis === 'Quality');
        const outerRadius = scale(7); // Adjust the radius as needed
        return {
            x: outerRadius * Math.cos(angle - Math.PI / 2),
            y: outerRadius * Math.sin(angle - Math.PI / 2) + 35, // Add an offset to move the label down
        };
    };

    const handlePointClick = (event, index, level) => {
        const newData = [...data];
        newData[index].value = level;

        const updatedData = updateOtherAxes(newData, index);

        const polygonPath = d3.select(svgRef.current).select('polygon');
        const darkBluePoints = d3.select(svgRef.current).selectAll('.dark-blue-point');

        const newPoints = updatedData
            .map((d, i) => getPathCoordinates({ index: i, value: d.value }))
            .map((d) => `${d.x},${d.y}`)
            .join(' ');

        polygonPath
            .transition()
            .duration(200)
            .attr('points', newPoints)
            .on('end', () => {
                onDataChange(updatedData);
            });

        darkBluePoints
            .data(updatedData)
            .transition()
            .duration(200)
            .attr('cx', (d, i) => getPathCoordinates({ index: i, value: d.value }).x)
            .attr('cy', (d, i) => getPathCoordinates({ index: i, value: d.value }).y);
    };

    const updateOtherAxes = (data, clickedIndex) => {
        const updatedData = [...data];
        const clickedAxis = updatedData[clickedIndex].axis;
        const clickedValue = updatedData[clickedIndex].value;

        const matchingCombination = combinationMatrix.find(
            (combination) => combination[clickedAxis] === clickedValue
        );

        if (matchingCombination) {
            updatedData.forEach((d, i) => {
                if (i !== clickedIndex) {
                    const availableValue = matchingCombination[d.axis];
                    if (availableValue !== d.value) {
                        updatedData[i].value = availableValue;
                    }
                }
            });
        }

        return updatedData;
    };

    return (
        <div className="radar-chart">
            <svg ref={svgRef} width={width} height={height} className='chart'>
                <defs>
                    <radialGradient id="chartGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#495057" stopOpacity="0.6" />
                        <stop offset="20%" stopColor="#343a40" stopOpacity="0.5" />
                        <stop offset="40%" stopColor="#2c3035" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#23272b" stopOpacity="0.3" />
                        <stop offset="80%" stopColor="#1c1f23" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#15181b" stopOpacity="0.1" />
                    </radialGradient>
                </defs>
                <g transform={`translate(${width / 2}, ${height / 2})`}>

                    {levels.slice(0, 5).map((level) => (
                        <circle
                            key={`gradient-circle-${level}`}
                            cx={0}
                            cy={0}
                            r={scale(level)}
                            fill="url(#chartGradient)"
                            className={`gradient-circle level-${level}`}
                        />
                    ))}

                    {/* Render inner circles */}
                    {levels.slice(0, 5).map((level) => (
                        <circle
                            key={`circle-${level}`}
                            cx={0}
                            cy={0}
                            r={scale(level)}
                            fill="none"
                            stroke="#eee"
                            className='innerCircle circleLine'
                        />
                    ))}

                    {/* Render axis lines */}
                    {data.map((d, i) => (
                        <line
                            key={`axis-${i}`}
                            x1={0}
                            y1={0}
                            x2={getPathCoordinates({ index: i, value: 5 }).x}
                            y2={getPathCoordinates({ index: i, value: 5 }).y}
                            stroke="#4c566a"
                        />
                    ))}

                    {/* Render axis labels */}
                    {data.map((d, i) => {
                        if (d.axis === 'Quality') {
                            const { x, y } = getQualityLabelCoordinates();
                            return (
                                <text
                                    key={`label-${i}`}
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fill="white"
                                    fontSize="12px"
                                >
                                    {d.axis}
                                </text>
                            );
                        } else {
                            const { x, y } = getLabelCoordinates(i);
                            return (
                                <text
                                    key={`label-${i}`}
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fill="white"
                                    fontSize="12px"
                                >
                                    {d.axis}
                                </text>
                            );
                        }
                    })}

                    {/* Render outer circle */}
                    <circle cx={0} cy={0} r={scale(5)} fill="none" stroke="#eee" className='outerCircle circleLine' />

                    {/* Render data polygon */}
                    <polygon
                        points={data
                            .map((d, i) => getPathCoordinates({ index: i, value: d.value }))
                            .map((d) => `${d.x},${d.y}`)
                            .join(' ')}
                        stroke="blue"
                        fill="rgba(135, 206, 235, 0.1)"  // Added a fill color for visibility
                    />

                    {/* Render clickable points */}
                    {data.map((d, i) =>
                        levels.map((level) => {
                            if (level <= 5) {
                                const { x, y } = getPathCoordinates({ index: i, value: level });
                                return (
                                    <circle
                                        key={`point-${i}-${level}`}
                                        cx={x}
                                        cy={y}
                                        r={5}
                                        fill={'lightblue'}
                                        onClick={(event) => handlePointClick(event, i, level)}
                                        style={{ cursor: 'pointer' }}
                                        className="clickable-point"
                                    />
                                );
                            }
                            return null;
                        })
                    )}

                    {/* Render dark blue points */}
                    {data.map((d, i) => (
                        <circle
                            key={`dark-blue-point-${i}`}
                            cx={getPathCoordinates({ index: i, value: d.value }).x}
                            cy={getPathCoordinates({ index: i, value: d.value }).y}
                            r={5}
                            fill={d.value === data[i].value ? '#1e88e5' : 'lightblue'}
                            className="dark-blue-point"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default RadarChart;