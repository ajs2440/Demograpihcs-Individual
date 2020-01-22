var margin = {top: 30, right: 30, bottom: 90, left: 80},
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  
// append the svg object to the body of the page
var svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

dataPromise
  .then(setupMyDat)
  .then(myBarChart);

function setupMyDat(data) {
  return data.sort(function (b, a) {
    return a.StudentCount - b.StudentCount;
  })
}

function myBarChart(data) {
  console.log("I was called");
  // X axis
  var x = d3.scaleBand()
    .domain(data.map(function (d) { return d.ClassLevel; }))
    .range([0, width])
    .padding(0.1);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 200])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.ClassLevel); })
    .attr("y", function (d) { return y(0); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(0); })
    .attr("fill", "#20b3a2")

  // Animation
  svg.selectAll("rect")
    .transition()
    .duration(1000)
    .attr("y", function (d) { return y(d.StudentCount); })
    .attr("height", function (d) { return height - y(d.StudentCount); })
}