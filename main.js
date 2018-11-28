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

    // Specify the width and height of our graph
    // as variables so we can use them later.
    // Remember, hardcoding sucks! :)
    var width = 1200;
    var height = 100000;
    var svg = d3.select(graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    var bars = svg.append('g');

    // bars.filter()

    // Our bar chart is going to encode the letter frequency as bar width.
    // This means that the length of the x axis depends on the length of the bars.
    // The y axis should contain A-Z in the alphabet (ordinal data).
    xScale = d3.scale.linear().range([0, width]);
    yScale = d3.scale.ordinal().rangeRoundBands([0, height], 0.3);

    // Tell D3 to create a y-axis scale for us, and orient it to the left.
    // That means the labels are on the left, and tick marks on the right.
    //var yAxis = d3.svg.axis().scale(yScale).orient('left');
    var yAxis = d3.svg.axis().scale(yScale).orient('left');
    var xAxis = d3.svg.axis().scale(xScale).orient('top');
    console.log(yScale);





    d3.csv('movies.csv', function(d) {
        d.budget = +d.budget;
        return d;
    }, function(error, data) {
        // We now have the "massaged" CSV data in the 'data' variable.

        // We set the domain of the xScale. The domain includes 0 up to
        // the maximum frequency in the dataset. This is because


        xScale.domain([0, d3.max(data, function(d) {
            return d.budget;
        })
        ]);

        yScale.domain(data.map(function(d) {

            // if (d.title_year < 2011) {
            //         return d.movie_title;
            //     }
            return d.movie_title;
        }));



        //
        //  year = d3
        // .nest()
        // .key(function(d) { return d.title_year; })
        // .entries(data);

        // console.log(year);
        //
        // yScale.domain([0, data.map(function(d) { return
        //     if ( d.title_year < 2011) {
        //         return d.budget;}
        //          })]);
        bars.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(100, 0)')
            .call(yAxis);
        bars.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(100, 0)')
            .call(xAxis);

        bars.append('g')
            .selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', 100)
            .attr('y', function(d) {
                return yScale(d.movie_title);
            })
            .attr('width', function(d) {
                // xScale will map any number and return a number
                // within the output range we specified earlier.
                return xScale(d.budget);
            })
            .attr('height', function(d) {
                // Remember how we set the yScale to be an ordinal scale
                // with bands from 0 to height? And then we set the domain
                // to contain all the letters in the alphabet?

                if (d.title_year < 2011) {
                    return yScale.rangeBand();
                }

                // return 20;
            });


    });

}