/*
var width = 960;
var height = 1160;
//Define map projection

var projection = d3.geo.mercator();

//Define path generator
var path = d3.geo.path()
                 .projection(projection);
//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
//Load in GeoJSON data
d3.json("https://raw.githubusercontent.com/nayanseth/analyticsWindowualisation/master/pima.json", function(json) {
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .style("fill", "steelblue");
});
*/

/*var width = 960,
    height = 1160;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("https://raw.githubusercontent.com/nayanseth/analyticsWindowualisation/master/pima.json", function(error, topology) {
  if (error) return console.error(error);
  svg.append("path")
      .datum({type: "FeatureCollection", features: features})
      .attr("d", d3.geo.path());
});

function mercator(coordinates) {
  return [
    coordinates[0] / 360,
    (-180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + coordinates[1] * Math.PI / 360))) / 360
  ];
}
*/

var width = 1024;
var height = 768;
//Define map projection

var analyticsWindow = d3.select("#analyticsWindow").append("svg")
      .attr("width", width).attr("height", height);
//Load in GeoJSON data
d3.json("https://raw.githubusercontent.com/nayanseth/Visualisation/master/pima.json", function(json) {

var center = d3.geo.centroid(json)
var scale  = 125;
var offset = [width/2, height/2];
var projection = d3.geo.mercator();

var path = d3.geo.path().projection(projection);
  // using the path determine the bounds of the current map and use
  // these to determine better values for the scale and translation
  var bounds  = path.bounds(json);
  var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
  var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
  var scale   = (hscale < vscale) ? hscale : vscale;
  //var offset  = [width - (bounds[0][0] + bounds[1][0])/2, height - (bounds[0][1] + bounds[1][1])/2];

  // new projection
  projection = d3.geo.mercator().center(center)
                                .scale(scale).translate(offset);
  path = path.projection(projection);

  // add a rectangle to see the bound of the svg
  analyticsWindow.append("rect").attr('width', width).attr('height', height).style('stroke', 'black').style('fill', 'none');

  //Bind data and create one path per GeoJSON feature
  analyticsWindow.selectAll("path").data(json.features).enter().append("path").attr("d", path).style("fill", "orange").style("stroke-width", "1").style("stroke", "black")
});
