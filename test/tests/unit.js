module("Setup");

test("SVG element exists", 1, function() {
  var parentElement = document.getElementsByClassName('visualization-container')[0];

  equal(parentElement.children.length, 1, "An SVG element exists");
});

module("Scales");

test("Regions were identified and region scale setup correctly", 3, function() {
  var expectedRegions = ["Latin America & Caribbean", "South Asia",
    "Sub-Saharan Africa", "Europe & Central Asia", "Middle East & North Africa",
    "East Asia & Pacific", "North America"];

  equal(regions.length, expectedRegions.length, "There are 7 regions in our dataset");
  deepEqual(regionScale.domain(), expectedRegions);
  deepEqual(regionScale.range(), colors);
});

test("X Scale is set correctly", 2, function() {
  var expectedDomain = [281.908596572129, 119849.293353937];
  var expectedRange = [0, 960];

  deepEqual(xScale.domain(), expectedDomain, "Domain should be " + expectedDomain);
  deepEqual(xScale.range(), expectedRange, "Range should be " + expectedRange);

});

test("Y Scale is set correctly", 2, function() {
  var expectedDomain = [19.5049268292683, 85.1634146341463];
  var expectedRange = [600, 0];

  deepEqual(yScale.domain(), expectedDomain, "Domain should be " + expectedDomain);
  deepEqual(yScale.range(), expectedRange, "Range should be " + expectedRange);

});

test("R Scale is set correctly", 2, function() {
  var expectedDomain = [15393, 1350695000];
  var expectedRange = [4, 40];

  deepEqual(rScale.domain(), expectedDomain, "Domain should be " + expectedDomain);
  deepEqual(rScale.range(), expectedRange, "Range should be " + expectedRange);
});

module("Circles");

test("Circles were created correctly", 1, function() {
  var circles = document.getElementsByTagName('circle');

  equal(circles.length, 185, "There should be 185 circles");
});

test("Circles were correctly colored", 7, function() {
  var circles = document.getElementsByTagName('circle');
  var expectedFills = {
    "rgb(31, 119, 180)": 31,
    "rgb(44, 160, 44)": 45,
    "rgb(140, 86, 75)": 27,
    "rgb(148, 103, 189)": 21,
    "rgb(214, 39, 40)": 50,
    "rgb(227, 119, 194)": 3,
    "rgb(255, 127, 14)": 8
  };

  var fills = {};
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    if ( typeof fills[c.style.fill] === "undefined") {
      fills[c.style.fill] = 0;
    }
    fills[c.style.fill] += 1;
  }

  var fillKeys = Object.keys(fills);
  for (var j = 0; j < fillKeys.length; j++) {
    equal(fills[fillKeys[j]], expectedFills[fillKeys[j]],
      "There should be " + expectedFills[fillKeys[j]] +
      " fills that are of color " + fillKeys[j]);
  }
});

