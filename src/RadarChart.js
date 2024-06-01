import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import Select from 'react-select';

const RadarChart = () => {
    const [data, setData] = useState([
        { axis: 'Quality', value: 3 },
        { axis: 'Efficiency', value: 3 },
        { axis: 'Compatibility', value: 3 },
    ]);

    const levels = [1, 2, 3, 4, 5];

    const handleLevelChange = (selectedOption, index) => {
        const newData = [...data];
        newData[index].value = selectedOption.value;
        setData(newData);
    };

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const angleSlice = (Math.PI * 2) / data.length;

    const svgRef = useRef(null);

    const scale = d3.scaleLinear().range([0, radius]).domain([0, 5]);

    const getPathCoordinates = (dataPoint) => {
        const angle = angleSlice * dataPoint.index;
        return {
            x: scale(dataPoint.value) * Math.cos(angle - Math.PI / 2),
            y: scale(dataPoint.value) * Math.sin(angle - Math.PI / 2),
        };
    };

    const handlePointClick = (event, index, level) => {
        const newData = [...data];
        newData[index].value = level;
        setData(newData);
    };

    return (
        <div>
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

                    {/* Render level circles */}
                    {levels.map((level) => (
                        <circle
                            key={`level-${level}`}
                            cx={0}
                            cy={0}
                            r={scale(level)}
                            fill="none"
                            stroke="gray"
                        />
                    ))}

                    {/* Render data polygon */}
                    <polygon
                        points={data
                            .map((d, i) => getPathCoordinates({ index: i, value: d.value }))
                            .map((d) => `${d.x},${d.y}`)
                            .join(' ')}
                        fill="rgba(0, 123, 255, 0.5)"
                        stroke="blue"
                    />

                    {/* Render clickable points */}
                    {data.map((d, i) =>
                        levels.map((level) => {
                            const { x, y } = getPathCoordinates({ index: i, value: level });
                            return (
                                <circle
                                    key={`point-${i}-${level}`}
                                    cx={x}
                                    cy={y}
                                    r={5}
                                    fill={d.value === level ? 'blue' : 'lightblue'}
                                    onClick={(event) => handlePointClick(event, i, level)}
                                    style={{ cursor: 'pointer' }}
                                />
                            );
                        })
                    )}
                </g>

                {/* Render axis labels */}
                {data.map((d, i) => {
                    const { x, y } = getPathCoordinates({ index: i, value: 5.5 });
                    return (
                        <text key={`label-${i}`} x={x} y={y} textAnchor="middle" dy="-0.2em">
                            {d.axis}
                        </text>
                    );
                })}
            </svg>
            <div>
                {data.map((d, i) => (
                    <div key={d.axis}>
                        <label>{d.axis}: </label>
                        <Select
                            value={{ value: d.value, label: d.value }}
                            onChange={(selectedOption) => handleLevelChange(selectedOption, i)}
                            options={levels.map((level) => ({ value: level, label: level }))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadarChart;