var data = [4, 8, 15, 16, 23, 42];

var chart = d3.select(".chart");
var bar = chart.selectAll("div");
var barUpdate = bar.data(data);
var newBar = barUpdate.enter().append("div");
newBar.style("width", function(d) {return d * 10 + "px";});
newBar.text(function(d) {return d});
