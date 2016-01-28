// Data year to use.
var year = 2008;

// SVG drawing parameters
var width = 960;
var height = 600;

// Indicator names to use
var rIndicator = "population";
var xIndicator = "income";
var yIndicator = "life_expectancy";

// Colors to map to specific regions
var colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b",
              "#e377c2","#7f7f7f","#bcbd22","#17becf"];

// Empty array to store available regions in
var regions = [];

// Scale variables to use
var rScale, xScale, yScale, regionScale;

// Expected radius for country circles
var radiusRange = [4,40];

// Fetch JSON Data
d3.json("/data/countrydata.json", function(error, data) {

  if (error) {
    console.log(JSON.stringify(error));
  }

  // filter data for the current year
  var currentYearData = calcCurrent(data, year,
    [xIndicator, yIndicator, rIndicator]);

  // populate dropdown with available years
  var yearDropdown = populateYearDropdown(data,
    [xIndicator, yIndicator, rIndicator],
    year);

  // ---========= Your Code Here =========--- //


  // Leave me here!
  if (typeof QUnit !== "undefined") {
    QUnit.start();
  }
});



