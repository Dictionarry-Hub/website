import React, { useRef } from 'react';
import * as d3 from 'd3';
import Select from 'react-select';
import './RadarChart.css';

const RadarChart = ({ data, onDataChange }) => {
    const levels = [1, 2, 3, 4, 5, 6];

    const handleLevelChange = (selectedOption, index) => {
        const newData = [...data];
        newData[index].value = selectedOption.value;
        onDataChange(newData); // Call the onDataChange prop with the updated data
    };

    const width = 500;
    const height = 500;
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
            y: outerRadius * Math.sin(angle - Math.PI / 2) + 50, // Add an offset to move the label down
        };
    };

    const handlePointClick = (event, index, level) => {
        const newData = [...data];
        newData[index].value = level;

        const polygonPath = d3.select(svgRef.current).select('polygon');
        const darkBluePoints = d3.select(svgRef.current).selectAll('.dark-blue-point');

        // Calculate the new points with the clicked point expanded
        const newPoints = newData
            .map((d, i) => getPathCoordinates({ index: i, value: d.value }))
            .map((d) => `${d.x},${d.y}`)
            .join(' ');

        // Animate the polygon to the new shape
        polygonPath
            .transition()
            .duration(200) // Reduced duration for faster animation
            .attr('points', newPoints)
            .on('end', () => {
                onDataChange(newData);
            });

        // Animate the dark blue points
        darkBluePoints
            .data(newData)
            .transition()
            .duration(200) // Reduced duration for faster animation
            .attr('cx', (d, i) => getPathCoordinates({ index: i, value: d.value }).x)
            .attr('cy', (d, i) => getPathCoordinates({ index: i, value: d.value }).y);
    };

    return (
        <div className="radar-chart">
            <svg ref={svgRef} width={width} height={height}>
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    {/* Render axis lines */}
                    {data.map((d, i) => (
                        <line
                            key={`axis-${i}`}
                            x1={0}
                            y1={0}
                            x2={getPathCoordinates({ index: i, value: 5 }).x}
                            y2={getPathCoordinates({ index: i, value: 5 }).y}
                            stroke="black"
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
                                    fill="black"
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
                                    fill="black"
                                    fontSize="12px"
                                >
                                    {d.axis}
                                </text>
                            );
                        }
                    })}

                    {/* Render outer circle */}
                    <circle cx={0} cy={0} r={scale(5)} fill="none" stroke="#eee" />

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
                                        className="clickable-point" // Add the className here
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
                            fill={d.value === data[i].value ? 'blue' : 'lightblue'}
                            className="dark-blue-point"
                        />
                    ))}
                </g>
            </svg>
            <div className="radar-chart-controls">
                {data.map((d, i) => (
                    <div key={d.axis}>
                        <label>{d.axis}: </label>
                        <Select
                            className="select"
                            value={{ value: d.value, label: d.value }}
                            onChange={(selectedOption) => handleLevelChange(selectedOption, i)}
                            options={levels.map((level) => ({ value: level, label: level })).slice(0, 5)}
                            isDisabled={d.value === 6}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadarChart;
