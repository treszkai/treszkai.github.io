/*jshint esversion: 6 */
/*globals d3:false */

(function () {
"use strict";

var global_vars = ['pdfGenerator'];

var svg = d3.select('svg#chart'),
    svgWidth = 600, // svg.style(svg) - 'px'
    svgHeight = 600,
    margin = {left: 50, right: 20, top: 20, bottom: 20},
    plots = [],
    lines = [],
    plotHeight = 150,
    plotWidth = svgWidth - margin.left - margin.right,
    plotPadding = 30,
    sqrt2PI = Math.sqrt(2 * Math.PI);

function pdfGenerator(loc, scale) {
	return x => 1 / (sqrt2PI * scale) * Math.exp(-0.5 * Math.pow((x-loc)/scale, 2) );
}

var muX1 = -1, sig1 = 1, var1 = sig1 * sig1,
	muX2 = 3, sig2 = 2, var2 = sig2 * sig2,
	muZ = muX1 + muX2, varZ = var1 + var2, sigZ = Math.sqrt(varZ);

var pX1 = pdfGenerator(muX1, sig1),
	pX2 = pdfGenerator(muX2, sig2),
    pX2m_gen = z => pdfGenerator(z-muX2, sig2),
	pX1pX2m_gen = z => (x => pX1(x) * pX2m_gen(z)(x)),
	pZ = pdfGenerator(muZ, sigZ);

// create data
var xMin = -5, xMax = 5, epsilon = 0.01,
    xData = d3.range(xMin, xMax + epsilon, 0.25),
    x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, plotWidth]),
    y = d3.scaleLinear()
        .domain([0, 0.5])
        .range([plotHeight, 0]),
    lineGenerator = function (fn) {
      return d3.line()
        .x(d => x(d))
        .y(d => y(fn(d)))
        .curve(d3.curveBasis); },
    xAxis = d3.axisBottom(x)
        .tickValues(d3.range(xMin, xMax + epsilon)),
    yAxis = d3.axisRight(y)
        .tickValues(d3.range(0, 0.45, 0.1))
        .tickSize(plotWidth+20);

function customXAxis(g) {
    g.call(xAxis);
    g.select(".domain").remove();
}

function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line")
        .style("stroke", "#777")
        .style("stroke-dasharray", "2,2");
    g.selectAll(".tick text")
        .attr("x", "0")
        .style("text-anchor", "start")
        .attr("dx", "0px")
        .attr("dy", "-0.35em");
}

// Create plots
for (var i = 0; i < 3; i++) {
    plots[i] = svg.append('g')
        .attr("transform", `translate(${margin.left},${margin.top + plotPadding * i+ plotHeight * i})`);

    plots[i].append("g").attr("class", "axis axis-x")
      .attr("transform", `translate(0,${plotHeight})`)
      .call(customXAxis);

    plots[i].append("g").attr("class", "axis axis-y")
        .attr("transform", "translate(-20,0)")
        .call(customYAxis);
}

plots[0].append("path").attr("class", "graph")
    .attr("d", lineGenerator(pX1)(xData));

plots[0].append("path").attr("class", "graph")
    .attr("d", lineGenerator(pX2)(xData))
    .style("stroke", "crimson")
    .style("stroke-opacity", 0.5)
    .style("stroke-dasharray", 3);

plots[0].append("path").attr("class", "graph").attr("id", "pX2m")
    .attr("d", lineGenerator(pX2m_gen(0))(xData))
    .style("stroke", "crimson");

plots[1].append("path").attr("class", "graph")
    .attr("d", lineGenerator(pX1pX2m_gen(0))(xData))
    .style("stroke", "purple")
    .style("fill", "purple")
    .style("fill-opacity", 0.5);

plots[2].append("path").attr("class", "graph")
    .attr("d", lineGenerator(pZ)(xData));

// Create fancy things on bottom plot
var focusZ = plots[2].append("g").attr("class", "focus")
    .attr("transform", `translate(${x(0)},${y(pZ(0))})`); // TODO move to updateZlabel

focusZ.append("circle")
    .attr("r", 4.5);

var labelZtext = focusZ.append("text")
    .attr("dy","-1em");
labelZtext.append("tspan")
    .style("font-style", "italic")
    .text("p");
labelZtext.append("tspan").attr("class", "sub")
    .style("font-style", "italic")
    .style("baseline-shift", "sub") // TODO move to sub class CSS
    .style("font-size", "0.75em")
    .text("Z");
labelZtext.append("tspan").attr("class", "secondhalf")
    .attr("dx", "0.1em");

function updateZLabel(x0,y0) {
    labelZtext.select("tspan.secondhalf").text(`(${formatNumber(x0)}) = ${formatNumber(y0)}`);
}
updateZLabel(0, pZ(0));

plots[2].append("rect").attr("class", "overlay")
    .attr("width", plotWidth)
    .attr("height", plotHeight)
    .on("mousemove", handleMouseMoveZ);

function handleMouseMoveZ() {
    var x0 = x.invert(d3.mouse(this)[0]),
        y0 = pZ(x0);
    focusZ.attr("transform", `translate(${x(x0)},${y(y0)})`);
    updateZLabel(x0, y0);
    plots[0].select("#pX2m")
        .attr("d", lineGenerator(pX2m_gen(x0))(xData));
    plots[1].select(".graph")
        .attr("d", lineGenerator(pX1pX2m_gen(x0))(xData));

    // Maximum of pX1pX2 is at x = (muX1 * sig2 ** 2 + (x0 - muX2) * sig1 ** 2) / (sig1 ** 2 + sig2 ** 2) );
    // TODO: change sig1 and sig2 to var1 and var2
}

global_vars.map(v => {eval(`window.${v} = ${v}`);});

function formatNumber(num) {
    return num.toFixed(2).replace('-', '–');
}

}) ();

// TODO:
/*
 - Have one lineGenerator per chart: it knows the scales but not the function
 - Fill the area under pX1pX2m and put a vertical bar at pZ under the cursor
 - Put the value of the area (i.e. pZ(z)) under the mode of pX1pX2m
*/
