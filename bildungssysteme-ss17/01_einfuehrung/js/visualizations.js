
var slides = document.getElementsByClassName('slides')[0];
var width = slides.offsetWidth;
var width = 1000;
var height = slides.offsetHeight;
var height = 500;
var margin = {top: 30, bottom: 30, left: 30, right: 30};
var heightInner = height - margin.top - margin.bottom;
var widthInner = width - margin.left - margin.right;


/****************************
 * Local cohesion hypothesis
 ****************************/
var dataLocal = [{treatment: 'Concept Map', value: 1.86, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 3.52, color: '#80Bd9E'}];

var svgLocal = d3.select('#localcohesionvis')
	.attr('width', width)
	.attr('height', height);

var gLocal = svgLocal.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xLocal = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(dataLocal.map(function(d) { return d.treatment; }));

var yLocal = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 6]);

var xAxisLocal = d3.axisBottom(xLocal);
var yAxisLocal = d3.axisLeft(yLocal);

gLocal.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxisLocal);

gLocal.append('g')
	.call(yAxisLocal)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Local cohesion gaps in revised text");

gLocal.selectAll('rect')
	.data(dataLocal)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xLocal(d.treatment); })
	.attr('y', function(d) { return yLocal(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xLocal.bandwidth())
	.attr('height', function(d) { return heightInner - yLocal(d.value); });


/****************************
 * global cohesion hypothesis
 ****************************/
var dataglobal = [{treatment: 'Concept Map', value: 2.74, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 1.95, color: '#80Bd9E'}];

var svgglobal = d3.select('#globalcohesionvis')
	.attr('width', width)
	.attr('height', height);

var gglobal = svgglobal.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xglobal = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(dataglobal.map(function(d) { return d.treatment; }));

var yglobal = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 4]);

var xAxisglobal = d3.axisBottom(xglobal);
var yAxisglobal = d3.axisLeft(yglobal);

gglobal.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxisglobal);

gglobal.append('g')
	.call(yAxisglobal)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Principle orientation");

gglobal.selectAll('rect')
	.data(dataglobal)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xglobal(d.treatment); })
	.attr('y', function(d) { return yglobal(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xglobal.bandwidth())
	.attr('height', function(d) { return heightInner - yglobal(d.value); });


/****************************
 * understandability cohesion hypothesis
 ****************************/
var dataunderstandability = [{treatment: 'Concept Map', value: 3.86, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 2.9, color: '#80Bd9E'}];

var svgunderstandability = d3.select('#understandabilityvis')
	.attr('width', width)
	.attr('height', height);

var gunderstandability = svgunderstandability.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xunderstandability = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(dataunderstandability.map(function(d) { return d.treatment; }));

var yunderstandability = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 5]);

var xAxisunderstandability = d3.axisBottom(xunderstandability);
var yAxisunderstandability = d3.axisLeft(yunderstandability);

gunderstandability.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxisunderstandability);

gunderstandability.append('g')
	.call(yAxisunderstandability)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Understandability");

gunderstandability.selectAll('rect')
	.data(dataunderstandability)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xunderstandability(d.treatment); })
	.attr('y', function(d) { return yunderstandability(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xunderstandability.bandwidth())
	.attr('height', function(d) { return heightInner - yunderstandability(d.value); });

/****************************
 * transferlocal cohesion hypothesis
 ****************************/
var datatransferlocal = [{treatment: 'Concept Map', value: 1.46, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 4.71, color: '#80Bd9E'}];

var svgtransferlocal = d3.select('#transferlocalvis')
	.attr('width', width)
	.attr('height', height);

var gtransferlocal = svgtransferlocal.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xtransferlocal = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(datatransferlocal.map(function(d) { return d.treatment; }));

var ytransferlocal = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 6]);

var xAxistransferlocal = d3.axisBottom(xtransferlocal);
var yAxistransferlocal = d3.axisLeft(ytransferlocal);

gtransferlocal.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxistransferlocal);

gtransferlocal.append('g')
	.call(yAxistransferlocal)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("local cohesion gaps");

gtransferlocal.selectAll('rect')
	.data(datatransferlocal)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xtransferlocal(d.treatment); })
	.attr('y', function(d) { return ytransferlocal(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xtransferlocal.bandwidth())
	.attr('height', function(d) { return heightInner - ytransferlocal(d.value); });


/****************************
 * transferglobal cohesion hypothesis
 ****************************/
var datatransferglobal = [{treatment: 'Concept Map', value: 2.81, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 2.25, color: '#80Bd9E'}];

var svgtransferglobal = d3.select('#transferglobalvis')
	.attr('width', width)
	.attr('height', height);

var gtransferglobal = svgtransferglobal.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xtransferglobal = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(datatransferglobal.map(function(d) { return d.treatment; }));

var ytransferglobal = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 5]);

var xAxistransferglobal = d3.axisBottom(xtransferglobal);
var yAxistransferglobal = d3.axisLeft(ytransferglobal);

gtransferglobal.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxistransferglobal);

gtransferglobal.append('g')
	.call(yAxistransferglobal)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("principle orientation");

gtransferglobal.selectAll('rect')
	.data(datatransferglobal)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xtransferglobal(d.treatment); })
	.attr('y', function(d) { return ytransferglobal(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xtransferglobal.bandwidth())
	.attr('height', function(d) { return heightInner - ytransferglobal(d.value); });

/****************************
 * transfercomprehensibility cohesion hypothesis
 ****************************/
var datatransfercomprehensibility = [{treatment: 'Concept Map', value: 3.31, color: '#F98866'},
	{treatment: 'Keine Concept Map', value: 2.71, color: '#80Bd9E'}];

var svgtransfercomprehensibility = d3.select('#transfercomprehensibilityvis')
	.attr('width', width)
	.attr('height', height);

var gtransfercomprehensibility = svgtransfercomprehensibility.append('g')
	.attr('width', widthInner)
	.attr('height', heightInner)
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xtransfercomprehensibility = d3.scaleBand()
	.rangeRound([0, widthInner])
	.padding(0.05)
	.domain(datatransfercomprehensibility.map(function(d) { return d.treatment; }));

var ytransfercomprehensibility = d3.scaleLinear()
	.range([heightInner, 0])
	.domain([0, 5]);

var xAxistransfercomprehensibility = d3.axisBottom(xtransfercomprehensibility);
var yAxistransfercomprehensibility = d3.axisLeft(ytransfercomprehensibility);

gtransfercomprehensibility.append('g')
	.attr('transform', 'translate(0,' + heightInner + ')')
	.call(xAxistransfercomprehensibility);

gtransfercomprehensibility.append('g')
	.call(yAxistransfercomprehensibility)
	.append("text")
    .attr('fill', 'white')
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("comprehensibility");

gtransfercomprehensibility.selectAll('rect')
	.data(datatransfercomprehensibility)
	.enter().append('rect')
	.attr('class', 'bar')
	.attr('x', function(d) { return xtransfercomprehensibility(d.treatment); })
	.attr('y', function(d) { return ytransfercomprehensibility(d.value); })
	.attr('fill', function(d) { return d.color; })
	.attr('width', xtransfercomprehensibility.bandwidth())
	.attr('height', function(d) { return heightInner - ytransfercomprehensibility(d.value); });