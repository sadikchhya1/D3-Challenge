
var width = parseFloat(d3.select('#scatter').style('width'));
var height = 0.66 * width;

var svg = d3
    .select('#scatter')
    .append('svg')
    .style('width', width)
    .style('height', height)
    .attr('class', 'chart')
    .style('border', '2px solid black')
    .style('border-radius', '12px');

var xText = svg.append('g').attr('transform', `translate(${width / 2},${.98 * height})`);

xText
    .append('text')
    .text('In Poverty (%)')
    .attr('class', 'aText active x')
    .attr('data-id', 'poverty');

var yText = svg.append('g').attr('transform', `translate(20,${height / 2})rotate(-90)`);

yText
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('class', 'aText active y')
    .attr('data-id', 'healthcare');

var chart = svg.append('g').attr('transform', `translate(${.10 * width},${.85 * height})`);
var xScaleLoc = chart.append('g');
var yScaleLoc = chart.append('g');
var circles = chart.append('g');

showGraph();

function showGraph() {

    var xSelect = d3.selectAll('.x').filter('.active').attr('data-id');
    var ySelect = d3.selectAll('.y').filter('.active').attr('data-id');

    d3.csv('assets/data/data.csv').then(data => {

        var xmin = d3.min(data.map(obj=> +obj[xSelect]));
        var xmax = d3.max(data.map(obj=> +obj[xSelect]));

        var ymin = d3.min(data.map(obj=> +obj[ySelect]));
        var ymax = d3.max(data.map(obj=> +obj[ySelect]));

        var xScaler = d3.scaleLinear().domain([.95*xmin,xmax]).range([0,.80*width]);
        var yScaler = d3.scaleLinear().domain([.75*ymin,ymax]).range([0,-.75*height]);

        xScaleLoc.call(d3.axisBottom(xScaler));
        yScaleLoc.call(d3.axisLeft(yScaler));

        var circle = circles.selectAll('g').data(data).enter();
        circle
            .append('circle')
            .attr('r',.02*width)
            .attr('class','stateCircle')
            .attr('cx',d=>xScaler(d[xSelect]))        
            .attr('cy',d=>yScaler(d[ySelect]));        

        circle
            .append('text')
            .text(d=>d.abbr)
            .attr('class','stateText')
            .attr('dx',d=>xScaler(d[xSelect]))        
            .attr('dy',d=>yScaler(d[ySelect])+5);        

    });
};
