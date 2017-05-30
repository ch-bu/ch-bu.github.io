
// Formatives Feedback visualisierung
(function() {
	var width = 900;
	var height = 300;
	var data = [1, 2, 3, 4, 5, 6, 7, 8];
	var svg = d3.select('#writing-complex');
	svg.attr('height', height)
		.attr('width', width);

	// Get ordinal scale for dots
	var scaleOrdinal = d3.scaleBand()
		.domain(data)
		.range([0, width]);

	svg.append('line')
		.attr('x1', 0)
		.attr('x2', width)
		.attr('y1', height / 2)
		.attr('y2', height / 2)
		.style('stroke', '#fff');

/*	svg.selectAll('circle')
		.data(data)
		.enter().append('circle')
		.attr('cx', function(d) {
			return scaleOrdinal(d) + 20;
		})
		.attr('cy', height / 2)
		.attr('fill', '#fff')
		.attr('r', 20);*/

	svg.selectAll('image')
		.data(data)
		.enter().append('image')
		.attr('x', function(d, i) {
			return scaleOrdinal(d);
		})
		.attr('y', height / 2 - 20)
		.attr('xlink:href', 'img/feedback_black.svg')
		.attr('width', 55);
	


})(d3);

// Beispiel für Cohviz
(function() {
	
	var svgHeight = 300;
    var svgWidth = 800;
    var margin = {top: 0, right: 0, bottom: 0, left: 0};
    var voronoi;

    var nodes = [
    	{'id': "Michael"},
    	{'id': "Schule"},
    	{'id': 'Grundschule'},
    	{'id': 'Kind'},
    	{'id': 'Spielzeug'},
    	{'id': 'Lehrerin'},
    	{'id': 'München'}];

    var links = [
    	{'source': 'Michael', 'target': 'Schule'},
    	{'source': 'Schule', 'target': 'Grundschule'},
    	{'source': 'Grundschule', 'target': 'Kind'},
    	{'source': 'Grundschule', 'target': 'Spielzeug'},
    	{'source': 'Lehrerin', 'target': 'München'}
    ];

    // Create svg
    var svg = d3.select('#cohvizexample')
      .attr('width', svgWidth)
      .attr("height", svgHeight);
      // .attr('transform', 'scale(0.5)');

    // Add wrapper for svg
    var g = svg.append('g')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // Overlay svg with rectangle
    var rect = svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('fill', 'red')
      .style('opacity', 0)
      .on('mousemove', mouseMoveHandler)
      .on('mouseleave', mouseLeaveHandler);

    // Call zoom
    svg.call(d3.zoom()
      .scaleExtent([1 / 2, 1.5])
      .on('zoom', zoomed));

    // Init progress bar
    var progressBar = svg.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', 0)
      .style('stroke', 'red')
      .style('stroke-width', '2');

    // Linear scale for progress bar
    var scale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, svgWidth]);

    // Create force simulation
    var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-250))
      .force('link', d3.forceLink(links)
        .distance(80)
        .id(function(d) {
          return d.id;
        }))
      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
      .force('collision', d3.forceCollide().radius(50))
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .stop();

    // Add timeout to process data
    d3.timeout(function() {
      // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
      for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
        simulation.tick();
      }

      // Add links
      var link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr('stroke', '#000');

      // Create g element that stores
      // circles and text and call dragging on it
      var node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('.node')
        .data(nodes)
        .enter().append('g')
        .attr('id', function(d, i) {
          return 'node-' + d.id;
        })
        .attr('class', 'node')
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
        // .on('mouseover', mouseover)
        // .on('mouseout', mouseout);

      // Append circle
      var circle = node.append('circle')
        .attr('r', 10)
        .attr('cx', 0)
        .attr('cy', 0)
/*        .style('fill', function(d, i) {
          return self.colors(self.analyzer.get('word_cluster_index')[d.id]);
        })*/
        .style('fill', function(d) {
        	if (d.id == "Michael" || d.id == "Schule" || d.id == "Grundschule" || d.id == "Kind" || d.id == "Spielzeug") {
        		return '#bb2a6e';
        	} else {
        		return '#6ebb2a';
        	}
        });

      // Append label to node container
      var label = node.append('text')
        .attr('dy', -8)
        .attr('dx', 10)
        .style('opacity', 0.8)
        .attr('text-anchor', 'start')
        .text(function(d) {
          return d.id;
        })
        .style('fill', '#000')
        .style('font-size', '30px');
    });

    function zoomed() {
      g.attr('transform', d3.event.transform);
      rect.attr('transform', d3.event.transform);
    }

	function mouseMoveHandler() {
      // Change text of selected element
      svg.selectAll('text')
        .style('font-weight', 'normal')
        .style('font-size', '16px');

      svg.selectAll('circle')
        .style('stroke', 'none')
        .style('stroke-width', 0);

      // Get data
      var mouse = d3.mouse(this);

      // Find nearest point to mouse coordinate
      var nearestPoint = simulation.find(mouse[0], mouse[1]);

      // Select element that is hovered
      var nodeSelected = g.select('#node-' + nearestPoint.id);
      var nodeData = nodeSelected.data()[0];

      // Change text of selected element
      nodeSelected.select('text')
        .style('opacity', 1)
        .style('font-weight', 'bold')
        .style('font-size', '20px');

      nodeSelected.select('circle')
        .style('stroke', '#000')
        .style('stroke-width', 1);

      /////////////////////////////
      // Highlight words in text //
      /////////////////////////////

      // We need to get the text of the selected word in order
      // to highlight them
      var wordSelected = nearestPoint.id;
    }

	 function mouseLeaveHandler() {
	      // Change text of selected element
	      svg.selectAll('text')
	        .style('font-weight', 'normal')
	        .style('font-size', '16px');

	      svg.selectAll('circle')
	        .style('stroke', 'none')
	        .style('stroke-width', 0);

	      $('#editor-full-medium-editor').find('p').each(function(paragraph) {
	        var textParagraph = $(this).text();
	        // Wrap everything in span elements
	        var spanText = textParagraph.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-/]+)/g, '<span>$1</span>');

	        var jquerySpan = $(spanText);

	        // Generate spans for text
	        $(this).html(jquerySpan);
	        $(this).append('.');
	      });
	    }

})(d3);


(function() {
	var width = 600;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 100};
	var svg = d3.select('#mtgstudy2')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var data = [{'x': 'Draft', 'y': 2.48, 'group': ''}]

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft', 'Revision'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 4])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Anzahl der Kohäsionslücken")
	    .attr('font-size', '12');


	innerContainer.append('circle')
		.attr('cy', y(2.48))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(3.52))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.24))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(1.86))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(2.48))
		.attr('y2', y(3.52))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(2.24))
		.attr('y2', y(1.86))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('text')
		.attr('x', x('Revision') + x.bandwidth() / 2 + 25)
		.attr('y', y(1.86) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')
	
	innerContainer.append('text')
		.attr('x', x('Revision') + x.bandwidth() / 2 + 25)
		.attr('y', y(3.52) )
		.text('Kein Feedback')
		.style('fill', '#bb2a6e')


})(d3);


(function() {
	var width = 600;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 100};
	var svg = d3.select('#mtgstudy2global')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var data = [{'x': 'Draft', 'y': 2.48, 'group': ''}]

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft', 'Revision'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 3.5])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Prinzipienorientierung")
	    .attr('font-size', '12');

	// Concept Map
	innerContainer.append('circle')
		.attr('cy', y(1.43))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.74))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(1.43))
		.attr('y2', y(2.74))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('text')
		.attr('x', x('Revision') + x.bandwidth() / 2 + 25)
		.attr('y', y(2.74) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')

	// Cmap
	innerContainer.append('circle')
		.attr('cy', y(1.76))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(1.86))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(1.76))
		.attr('y2', y(1.86))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('text')
		.attr('x', x('Revision') + x.bandwidth() / 2 + 25)
		.attr('y', y(1.86) )
		.text('Kein Feedback')
		.style('fill', '#bb2a6e')
	


})(d3);

// ***************** Mind the gap study 3. local cohesion 
(function() {
	var width = 600;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 150};
	var svg = d3.select('#mtgstudy3local')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var data = [{'x': 'Draft', 'y': 2.48, 'group': ''}]

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft', 'Revision', 'Transfer'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 5.5])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Lokale Kohäsionslücken")
	    .attr('font-size', '12');

	// Concept Map
	innerContainer.append('circle')
		.attr('cy', y(4.00))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(1.46))
		.attr('cx', x('Transfer') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(4))
		.attr('y2', y(2))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Revision') + x.bandwidth() / 2)
		.attr('x2', x('Transfer') + x.bandwidth() / 2)
		.attr('y1', y(2))
		.attr('y2', y(1.46))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('text')
		.attr('x', x('Transfer') + x.bandwidth() / 2 + 25)
		.attr('y', y(1.46) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')

	// no Feedback
	innerContainer.append('circle')
		.attr('cy', y(4.43))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(4.93))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(4.71))
		.attr('cx', x('Transfer') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(4.43))
		.attr('y2', y(4.93))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');
	
	innerContainer.append('line')
		.attr('x1', x('Revision') + x.bandwidth() / 2)
		.attr('x2', x('Transfer') + x.bandwidth() / 2)
		.attr('y1', y(4.93))
		.attr('y2', y(4.71))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('text')
		.attr('x', x('Transfer') + x.bandwidth() / 2 + 25)
		.attr('y', y(4.71) )
		.text('Kein Feedback')
		.style('fill', '#bb2a6e')
	


})(d3);


// ***************** Mind the gap study 3. local cohesion 
(function() {
	var width = 600;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 150};
	var svg = d3.select('#mtgstudy3global')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft', 'Revision', 'Transfer'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 3])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Prinzipienorientierung")
	    .attr('font-size', '12');

	// Concept Map
	innerContainer.append('circle')
		.attr('cy', y(2.46))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.88))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.81))
		.attr('cx', x('Transfer') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(2.46))
		.attr('y2', y(2.88))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Revision') + x.bandwidth() / 2)
		.attr('x2', x('Transfer') + x.bandwidth() / 2)
		.attr('y1', y(2.88))
		.attr('y2', y(2.81))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('text')
		.attr('x', x('Transfer') + x.bandwidth() / 2 + 25)
		.attr('y', y(2.81) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')

	// no Feedback
	innerContainer.append('circle')
		.attr('cy', y(2.00))
		.attr('cx', x('Draft') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.21))
		.attr('cx', x('Revision') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(2.25))
		.attr('cx', x('Transfer') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft') + x.bandwidth() / 2)
		.attr('x2', x('Revision') + x.bandwidth() / 2)
		.attr('y1', y(2.0))
		.attr('y2', y(2.21))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');
	
	innerContainer.append('line')
		.attr('x1', x('Revision') + x.bandwidth() / 2)
		.attr('x2', x('Transfer') + x.bandwidth() / 2)
		.attr('y1', y(2.21))
		.attr('y2', y(2.25))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('text')
		.attr('x', x('Transfer') + x.bandwidth() / 2 + 25)
		.attr('y', y(2.25) )
		.text('Kein Feedback')
		.style('fill', '#bb2a6e')
	


})(d3);


// ***************** ff local
(function() {
	var width = 1000;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 150};
	var svg = d3.select('#fflocal')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var dataNoFeedback = [0.24, 0.20, 0.27, 0.24];
	var dataOutline = [0.23, 0.19, 0.25, 0.22];
	var dataCMap = [0.25, 0.18, 0.25, 0.21];

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft Training 1', 'Revision Training 1', 'Draft Training 2', 'Revision Training 2'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 1])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Ratio nicht-kohäsive vs. alle Sätze")
	    .attr('font-size', '12');

	// Concept Map
	innerContainer.append('circle')
		.attr('cy', y(dataCMap[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[0]))
		.attr('y2', y(dataCMap[1]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[1]))
		.attr('y2', y(dataCMap[2]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[2]))
		.attr('y2', y(dataCMap[3]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataCMap[3]) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')

	// Outline
	innerContainer.append('circle')
		.attr('cy', y(dataOutline[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[0]))
		.attr('y2', y(dataOutline[1]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[1]))
		.attr('y2', y(dataOutline[2]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[2]))
		.attr('y2', y(dataOutline[3]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataOutline[3]) - 15)
		.text('Outline Feedback')
		.style('fill', '#bb772a')

	// No Feedback
	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[0]))
		.attr('y2', y(dataNoFeedback[1]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[1]))
		.attr('y2', y(dataNoFeedback[2]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[2]))
		.attr('y2', y(dataNoFeedback[3]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataNoFeedback[3]) - 15)
		.text('General Feedback')
		.style('fill', '#bb2a6e')

})(d3);


// ***************** ff global
(function() {
	var width = 1000;
	var height = 600;
	var margin = {top: 40, bottom: 40, left: 40, right: 150};
	var svg = d3.select('#ffglobal')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	var dataNoFeedback = [1.38, 1.48, 1.81, 1.86];
	var dataOutline = [1.43, 1.58, 1.93, 2.05];
	var dataCMap = [1.37, 1.47, 1.86, 1.93];

	// Create inner container to hold the bar chart
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var x = d3.scaleBand()
	  .domain(['Draft Training 1', 'Revision Training 1', 'Draft Training 2', 'Revision Training 2'])
	  .range([0, width])
	  .paddingInner(0.1)
	  .paddingOuter(0.1);

	var y = d3.scaleLinear()
	  .domain([0, 3])
	  .range([height, 0]);

	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y)
	  .ticks(4);

	// Append xAxis
	innerContainer.append('g')
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis);

	// Append yAxis
	innerContainer.append('g')
	  .call(yAxis)
	  .append("text")
	    .attr('fill', '#fff')
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Prinzipienorientierung")
	    .attr('font-size', '12');

	// Concept Map
	innerContainer.append('circle')
		.attr('cy', y(dataCMap[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataCMap[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#6ebb2a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[0]))
		.attr('y2', y(dataCMap[1]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[1]))
		.attr('y2', y(dataCMap[2]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataCMap[2]))
		.attr('y2', y(dataCMap[3]))
		.style('fill', '#6ebb2a')
		.style('stroke', '#6ebb2a');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataCMap[3]) )
		.text('Concept Map Feedback')
		.style('fill', '#6ebb2a')

	// Outline
	innerContainer.append('circle')
		.attr('cy', y(dataOutline[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataOutline[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb772a')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[0]))
		.attr('y2', y(dataOutline[1]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[1]))
		.attr('y2', y(dataOutline[2]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataOutline[2]))
		.attr('y2', y(dataOutline[3]))
		.style('fill', '#bb772a')
		.style('stroke', '#bb772a');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataOutline[3]) - 15)
		.text('Outline Feedback')
		.style('fill', '#bb772a')

	// No Feedback
	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[0]))
		.attr('cx', x('Draft Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[1]))
		.attr('cx', x('Revision Training 1') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[2]))
		.attr('cx', x('Draft Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('circle')
		.attr('cy', y(dataNoFeedback[3]))
		.attr('cx', x('Revision Training 2') + x.bandwidth() / 2)
		.style('fill', '#bb2a6e')
		.attr('r', 10);

	innerContainer.append('line')
		.attr('x1', x('Draft Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[0]))
		.attr('y2', y(dataNoFeedback[1]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('line')
		.attr('x1', x('Revision Training 1') + x.bandwidth() / 2)
		.attr('x2', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[1]))
		.attr('y2', y(dataNoFeedback[2]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');

	innerContainer.append('line')
		.attr('x1', x('Draft Training 2') + x.bandwidth() / 2)
		.attr('x2', x('Revision Training 2') + x.bandwidth() / 2)
		.attr('y1', y(dataNoFeedback[2]))
		.attr('y2', y(dataNoFeedback[3]))
		.style('fill', '#bb2a6e')
		.style('stroke', '#bb2a6e');


	innerContainer.append('text')
		.attr('x', x('Revision Training 2') + x.bandwidth() / 2 + 25)
		.attr('y', y(dataNoFeedback[3]))
		.text('General Feedback')
		.style('fill', '#bb2a6e')

})(d3);


(function() {
	var width = 1200;
	var height = 600;
	
	var margin = {top: 40, bottom: 40, left: 100, right: 150};
	
	var svg = d3.select('#design')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);
	
	var innerContainer = svg.append('g')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var scaleY = d3.scaleBand()
		.domain(['Concept Map', 'Concept Map integriert',
			'Text integriert', 'Kontrollgruppe'])
		.range([0, 250]);

	var scaleX = d3.scaleBand()
		.domain(['Demografischer Fragebogen', 'Vorwissenstest',
			'ELVES', 'Draft verfassen',
			'Revision schreiben', 'Feedback zum Tool'])
		.range([0, width]);

	innerContainer.selectAll('text')
		.data(['Concept Map', 'Concept Map integriert',
			'Text integriert', 'Kontrollgruppe'])
		.enter().append('text')
		.attr('x', scaleX('Revision schreiben') - 20)
		.attr('y', function(d) {
			return scaleY(d);
		})
		.text(function(d) {
			return d;
		});

	var demo = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('Demografischer Fragebogen') + 
				',' + (height / 2) + ')';
		});

	demo.append('image')
		.attr('xlink:href', 'img/demo.svg')
		.attr('width', 100);

	demo.append('text')
		.attr('y', 140)
		.attr('x', -50)
		.text('Demografischer Fragebogen');
	
	var vorwissen = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('Vorwissenstest') + 
				',' + (height / 2) + ')';
		});

	vorwissen.append('image')
		.attr('xlink:href', 'img/vorwissen.svg')
		.attr('width', 100);

	vorwissen.append('text')
		.attr('y', 140)
		.attr('x', 30)
		.text('Vorwissenstest');

	var elves = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('ELVES') + 
				',' + (height / 2) + ')';
		});
	
	elves.append('image')
		.attr('xlink:href', 'img/book.svg')
		.attr('width', 100);

	elves.append('text')
		.attr('dy', -10)
		.attr('dx', 20)
		.text('ELVES');

	var draft = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('Draft verfassen') + 
				',' + (height / 2) + ')';
		});
	
	draft.append('image')
		.attr('xlink:href', 'img/pencil.svg')
		.attr('width', 100);

	draft.append('text')
		.attr('dy', 140)
		.attr('dx', -20)
		.text('Draft verfassen');

	var revision = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('Revision schreiben') + 
				',' + (height / 2) + ')';
		});
	
	revision.append('image')
		.attr('xlink:href', 'img/revision.svg')
		.attr('width', 100);

	revision.append('text')
		.attr('dy', -10)
		.attr('dx', -20)
		.text('Revidieren');

	var feedback = innerContainer.append('g')
		.attr('transform', function() {
			return 'translate(' + scaleX('Feedback zum Tool') + 
				',' + (height / 2) + ')';
		});
	
	feedback.append('image')
		.attr('xlink:href', 'img/feedback.svg')
		.attr('width', 100);

	feedback.append('text')
		.attr('dy', 140)
		.attr('dx', -20)
		.text('Feedback zum Tool');

/*	innerContainer.append('line')
		.attr('x1', 0)
		.attr('x2', width)
		.attr('y1', height - 50)
		.attr('y2', height - 50)
		.style('fill', '#fff');*/
	var data = Array.apply(null, {length: 100}).map(Number.call, Number);
	
	var scaleTime = d3.scaleLinear()
		.domain([0, 99])
		.range([-margin.left, width]);

/*	innerContainer.selectAll('image')
		.data(data)
		.enter().append('image')
		.attr('x', function(d, i) {
			return scaleTime(d);
		})
		.attr('y', height - 70)
		.attr('xlink:href', 'img/timer.svg')
		.attr('width', 15)
		.style('fill', 'green');*/
	

})(d3);