//Jannatul Rakib Joy 103799644
import React, { useState, useRef, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme } from '@material-ui/core';
import * as d3 from 'd3';

// Create a dark theme using Material-UI's createTheme
const darkTheme = createTheme({
    palette: {
        type: 'dark', // Set the theme type to dark
    },
});

function MainComponent() {
    const [version, setVersion] = useState('');

    // Handle changes when a different version is selected
    const handleChange = (event) => {
        setVersion(event.target.value);
    };

    const ref = useRef();

    useEffect(() => {
        // Data for the pie chart
        const data = [
            { name: 'V1', value: 30 },
            { name: 'V2', value: 25 },
            { name: 'V3', value: 20 },
            { name: 'V4', value: 15 },
            { name: 'V5', value: 10 },
        ];

        // Array of gradient colors for the pie chart slices
        const gradientColors = [
            ['#00BFFF', '#1E90FF'],
            ['#FF5252', '#FFEB3B'],
            ['#388E3C', '#C8E6C9'],
            ['#009688', '#00BCD4'],
            ['#C0CA33', '#FFEB3B']
        ];

        // Dimensions for the pie chart
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        // Create an SVG element using D3 and attach it to the ref
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Create gradient definitions for each data point
        const gradientDefs = svg.append('defs');

        data.forEach((d, i) => {
            const gradient = gradientDefs.append('linearGradient')
                .attr('id', `gradient${i}`);

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', gradientColors[i][0]);

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', gradientColors[i][1]);
        });

        // Define pie chart layout and arc generator functions
        const pie = d3.pie().value(d => d.value);
        const path = d3.arc().outerRadius(radius).innerRadius(0);
        const labelArc = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

        // Create pie chart arcs
        const arc = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        // Add path elements for each arc with gradient fill
        arc.append('path')
            .attr('d', path)
            .attr('fill', (d, i) => `url(#gradient${i})`);

        // Add text labels to the pie chart slices
        arc.append('text')
            .attr('transform', d => `translate(${labelArc.centroid(d)})`)
            .attr('dy', '.35em')
            .text(d => d.data.name)
            .style('fill', '#fff')
            .style('font-size', '12px')
            .style('text-anchor', 'middle');

    }, []);

    return (
        // Wrap the component in a dark theme using ThemeProvider
        <ThemeProvider theme={darkTheme}>
            <Grid container spacing={3} style={{ width: '80%', margin: '3% auto', backgroundColor: darkTheme.palette.background.default }}>
                {/* Dropdown for version selection */}
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="version-label">Version</InputLabel>
                        <Select
                            labelId="version-label"
                            id="version-dropdown"
                            value={version}
                            onChange={handleChange}
                            label="Version"
                        >
                            {/* Menu items for different versions */}
                            <MenuItem value="V1">V1</MenuItem>
                            <MenuItem value="V2">V2</MenuItem>
                            <MenuItem value="V3">V3</MenuItem>
                            <MenuItem value="V4">V4</MenuItem>
                            <MenuItem value="V5">V5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* SVG container for the pie chart */}
                <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <svg ref={ref}></svg>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default MainComponent;
