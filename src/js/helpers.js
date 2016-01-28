// Populates our year dropdown with a list of all the years that
// appear in our dataset. Some of those years may not have values but they appear
// anyway.
function populateYearDropdown(data, indicators, currentYear) {
  var allYears = [];

  data.forEach(function(country) {

    // iterate over each of the indicators we want to find the latest
    // value for the year by finding the data point with that year

   indicators.forEach(function(indicator) {
      if (country[indicator]) {
        var years = country[indicator].reduce(function(current, d) {
          current.push(d.year);
          return current;
        }, []);

        allYears = allYears.concat(years);
      }
    });
  });

  allYears = _.chain(allYears).uniq().sort().value();

  var dropdown = d3.select('#years');
  allYears.forEach(function(year) {
    dropdown.append('option')
      .attr('value', year)
      .property('selected', year === currentYear ? true : '')
      .text(year);
  });

  return dropdown;
}



// Calculates the current values for all indicators for a specific year.
// Adds a "current" property to each country row where the indicator name
// equals the value for that specific year, if one exists. Otherwise it will
// be set to null.
function calcCurrent(data, year, indicators) {

  // for each country in our dataset:
  data.forEach(function(country) {

    // iterate over each of the indicators we want to find the latest
    // value for the year by finding the data point with that year
    indicators.forEach(function(indicator) {

      // create a new property called current that
      // will contain the values for the specific year
      // we are operating in.
      country.current = country.current || {};
      country.current[indicator] = null;

      // if the country has values for this indicator to begin with...
      if (country[indicator]) {
        country[indicator].forEach(function(datum) {
          if (datum.year === year) {
            country.current[indicator] = datum.value;
          }
        });
      }
    });
  });

  return data.filter(function(country){
      return indicators.reduce(function(current, value) {
        return country.current[value] && current;
      }, true);
    });
}


// Finds the extent for a specific indicator accross all years.
// In order to get a consistent extent for our scale (that won't shift as
// we change years,) we need to go through all the years and all the countries
// and find the min and max of those.
function findExtent(data, indicator) {

  var allValues = data.map(function(country) {
    return country[indicator];
  }).reduce(function(current, values) {
    return current.concat(values);
  }, []);

  var extent = d3.extent(allValues, function(d) {
    if (typeof d !== "undefined") {
      return d.value;
    }
  });

  console.log(extent, indicator);
  return extent;
}