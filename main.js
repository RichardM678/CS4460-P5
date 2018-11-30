// Your browser will call the onload() function when the document
// has finished loading. In this case, onload() points to the
// start() method we defined below. Because of something called
// function hoisting, the start() method is callable on line 6
// even though it is defined on line 8.
window.onload = start;

// This is where all of our javascript code resides. This method
// is called by "window" when the document (everything you see on
// the screen) has finished loading.


function start() {
    // Select the graph from the HTML page and save
    // a reference to it for later.
    var graph = document.getElementById('graph');

    d3.csv('movies.csv', function(d) {
       
    });
    


    // Specify the width and height of our graph
    // as variables so we can use them later.
    // Remember, hardcoding sucks! :)
    var width = 1500;
    var height = 10000;
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    var bars = svg.append('g');
    var bar2 = svg.append('g');

    // bars.filter()

    // Our bar chart is going to encode the letter frequency as bar width.
    // This means that the length of the x axis depends on the length of the bars.
    // The y axis should contain A-Z in the alphabet (ordinal data).
    xScale = d3.scale.linear().range([0, width/2]);
    yScale1 = d3.scale.ordinal().rangeRoundBands([0, height/20], 0.3);
    yScaleSecond = d3.scale.ordinal().rangeRoundBands([0, height/20], 0.3);

    xScale2 = d3.scale.linear().range([0, width/2]);
    yScale2 = d3.scale.ordinal().rangeRoundBands([0, height/20], 0.3);
    yScaleSecond2 = d3.scale.ordinal().rangeRoundBands([0, height/20], 0.3);
    // Tell D3 to create a y-axis scale for us, and orient it to the left.
    // That means the labels are on the left, and tick marks on the right.
    //var a =  d3.csv('movies.csv' , function(d){console.log(d);});
    

    d3.csv('movies.csv', function(d) {
        d.budget = +d.budget;
        d.gross = +d.gross;
        return d;
  
    }, function(error, data) {
        // We now have the "massaged" CSV data in the 'data' variable.

        // We set the domain of the xScale. The domain includes 0 up to
        // the maximum frequency in the dataset. This is because
        data1 = data.filter(function (d) {return d.title_year == 2010 && d.gross > 120051787}); //170051787
        data1.sort(function(x, y) {return d3.descending(x.gross, y.gross);});

        xScale.domain([0, d3.max(data1, function(d) {
            return d.gross; })
        ]);

        yScale1.domain(data1.map(function(d) {
            return d.movie_title;
        }));

        yScaleSecond.domain(data1.map(function(d) {
            return d.genres;
        }));

        // xScaleSecond.domain(data.map(function(d) {

        //     return d.genres;
        // }));

        var yAxis = d3.svg.axis().scale(yScale1).orient('left');

        var xAxis = d3.svg.axis().scale(xScale).orient('top');

        var yAxisSecond = d3.svg.axis().scale(yScaleSecond).orient('right');
        // var xAxisSecond = d3.svg.axis().scale(xScaleSecond).orient('top');
        
        //
        //  year = d3
        // .nest()
        // .key(function(d) { return d.title_year; })
        // .entries(data);

        // console.log(year);

        bars.append('text')
            .style("font-size","40px")
            .text('2010')
            .attr('transform', 'translate(50, 50)');

        bars.append('text')
            .style("font-size","40px")
            .text('Genres')
            .attr('transform', 'translate(1000, 50)');

        bars.append('g')
            .attr('class', 'y axis2')
            .attr('transform', 'translate(1000, 50)')
            .call(yAxisSecond);
        
        bars.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(200, 50)')
            .call(yAxis);

        bars.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(200, 50)')
            .call(yAxis);

        bars.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(200, 50)')
            .call(xAxis);

        bars.append('g')
            .selectAll('.bar')
            .data(data1)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('transform', 'translate(100,50)')
            .attr('x', 100)
            .attr('y', function(d) {
                return yScale1(d.movie_title);
            })
            .attr('width', function(d) {
                return xScale(d.gross);
            })
            .attr('height', function(d) {
                return yScale1.rangeBand();
            });



        // 2011 
        data2 = data.filter(function (d) {return d.title_year == 2011 && d.gross >= 169705587});
        data2.sort(function(x, y) {return d3.descending(x.gross, y.gross);});

        xScale2.domain([0, d3.max(data2, function(d) {
            return d.gross; })
        ]);

        yScale2.domain(data2.map(function(d) {
            return d.movie_title;
        }));

        yScaleSecond2.domain(data2.map(function(d) {
            return d.genres;
        }));

        var yAxis2 = d3.svg.axis().scale(yScale2).orient('left');

        var xAxis2 = d3.svg.axis().scale(xScale2).orient('top');

        var yAxisSecond2 = d3.svg.axis().scale(yScaleSecond2).orient('right');

        bar2.append('text')
            .style("font-size","40px")
            .text('2011')
            .attr('transform', 'translate(50, 1050)');

        bar2.append('text')
            .style("font-size","40px")
            .text('Genres')
            .attr('transform', 'translate(1000, 1050)');

        bar2.append('g')
            .attr('class', 'y axis2')
            .attr('transform', 'translate(1000, 1050)')
            .call(yAxisSecond2);
        
        bar2.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(200, 1050)')
            .call(yAxis2);

        bar2.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(200, 1050)')
            .call(yAxis2);

        bar2.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(200, 1050)')
            .call(xAxis2);

        bar2.append('g')
            .selectAll('.bar')
            .data(data2)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('transform', 'translate(100,1050)')
            .attr('x', 100)
            .attr('y', function(d) {
                return yScale2(d.movie_title);
            })
            .attr('width', function(d) {
                return xScale2(d.gross);
            })
            .attr('height', function(d) {
                return yScale2.rangeBand();
            });
    });

}