//Jannatul Rakib Joy 103799644
import React, { useRef } from 'react';
import * as d3 from 'd3';
import { Typography } from '@material-ui/core';
import "./AuditReport.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const PieChart = ({ data, selectedData, onSegmentClick }) => {
    const ref = useRef(null);
    const tooltipRef = useRef(null);

    const gradients = [
        ['#0A192F', '#0F3460', '#136AA5'], // Deep Blue Shades
        ['#0D2538', '#12404F', '#165C66'], // Indigo Shades
        ['#0C2A42', '#0E4759', '#12646F'], // Teal Shades
        ['#081C29', '#0C3847', '#0F5566'], // Ocean Blue Shades
        ['#082E44', '#104B5C', '#136B7F'], // Cerulean Shades
    ];
    
    

    
    


    return (
        <div position="relative">
            {/* SVG for the main pie chart */}
            <svg ref={ref} width="400" height="400"></svg>
    
            {/* Tooltip */}
            <div
                ref={tooltipRef}
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                }}
            ></div>
    
            {/* Render selected data */}
            {selectedData && (
                <div>
                    {selectedData.map((d, idx) => (
                        <div key={idx} className='chart_card_parent'>
    
                            {/* SVG for the bottom chart */}
                            <svg
                                style={{ width: '400px', height: '400px' }}
                                className='bottom_chart'
                            >
                                <g transform={`translate(200, 200)`}>
                                    <path
                                        d={d3.arc()
                                            .outerRadius(200)
                                            .innerRadius(0)({ startAngle: 0, endAngle: 2 * Math.PI })}
                                        fill={
                                            gradients[data.findIndex(
                                                dataItem => dataItem.name === d.name
                                            )][0]
                                        }
                                    ></path>
                                    {/* Display value in the center of the bottom chart */}
                                    <text
                                        x="0"
                                        y="0"
                                        dy=".35em"
                                        text-anchor="middle"
                                        fill="white"
                                        font-size="24px"
                                    >
                                        {d.value}%
                                    </text>
                                </g>
                            </svg>
    
                            {/* Card displaying detailed information */}
                            <Card
                                className='card_data'
                                sx={{
                                    boxShadow: '20px 20px 50px 10px pink inset',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">
                                        Details for {d.name}
                                    </Typography>
                                    <Typography>
                                        <strong>Vulnerabilities:</strong>{' '}
                                        {d.vulnerabilities}
                                    </Typography>
                                    <Typography>
                                        <strong>Solutions:</strong> {d.solutions}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}    
export default PieChart;
