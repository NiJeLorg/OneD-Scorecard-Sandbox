/*
* this script sets up crosslet for the Kirwan map
*/

// format functions
var percentFormat = d3.format(",.1");
var numberFormat = d3.format(",.2");
var dollarFormat = d3.format("$,.0f");

var config = {
  map: {
    leaflet: {
		url: "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",    // backup in case stamen layer doesn't work  
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    },
    view: {
      center: [42.5,-83.0],
      zoom: 9
    },
    geo: {
      url: "assets/topojson/detroit_region_fips_4326.geojson",
      name_field: "FIPS",
      id_field: "FIPS"
    }
  },
  data: {
    version: "1.0",
    id_field: "FIPS"
  },
  dimensions: {
      kirwanIndex: {
        title: "Kirwan Institute Opportunity Index",
        data: {
          dataSet: "data/kirwanData.csv",
		  method: d3.csv,		
          field: "COMP",
  		  colorscale: d3.scale.linear().domain([1, 10, 20]).range([ "#1b7837", "#f7f7f7", "#762a83" ]).interpolate(d3.cie.interpolateLab)  
  	    },
  		format: {
  			short: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
  			long: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
			input: function(){return Math.round},
  			axis: function(){return function(d) {return numberFormat(d3.round(d, 2))}}, 
  		} 
      }, 
      highSchoolCompletion: {
        title: "High School Completion Rate",
        data: {
          dataSet: "data/kirwanData.csv",
		  method: d3.csv,		
          field: "EDU4",
  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#d94f26"]).interpolate(d3.cie.interpolateLab)   
  	    },
  		format: {
  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
			input: function(){return Math.round},
  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  		} 
      }, 
      medianHHIncome: {
        title: "Median Household Income",
        data: {
          dataSet: "data/kirwanData.csv",
		  method: d3.csv,		
          field: "EE2",
  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#a6c0d0"]).interpolate(d3.cie.interpolateLab)   
  	    },
  		format: {
  			short: function(){return function(d) {return dollarFormat(d)}},
  			long: function(){return function(d) {return dollarFormat(d)}},
  			axis: function(){return function(d) {return dollarFormat(d)}},
  		} 
      }, 
      vacantProperty: {
        title: "Percent Vacant Property",
        data: {
          dataSet: "data/kirwanData.csv",
		  method: d3.csv,		
          field: "N1",
  		  colorscale: d3.scale.linear().domain([1, 20]).range([ "white", "#f5a91d"]).interpolate(d3.cie.interpolateLab)   
  	    },
  		format: {
  			short: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  			long: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
			input: function(){return Math.round},
  			axis: function(){return function(d) {return percentFormat(d3.round(d, 1)) + "%"}},
  		} 
      }, 
	  
  }, // close dimensions
  
  defaults: {
	colorscale: d3.scale.linear().domain([1, 10, 20]).range([ "#1b7837", "#f7f7f7", "#762a83" ]).interpolate(d3.cie.interpolateLab),  
    order: ["highSchoolCompletion", "medianHHIncome", "vacantProperty", "kirwanIndex"],
    active: "kirwanIndex"
  },
};

var comboBoxInnerHtml = "<form class=\"form-inline\" role=\"form\"><div class=\"form-group\"><select id=\"selectEducation\" class=\"form-control mapDropdown\"><option value='ED1'>Childhood Poverty</option><option value='ED2'>High School Dropout Rate</option><option value='ED3'>Persons 16-19 No HS Diploma, Unemployed</option><option value='ED4' selected='selected'>High School Completion</option><option value='ED5'>Reading Proficiency</option><option value='ED6'>Math Proficiency</option><option value='ED7'>Student Poverty</option></select></div><div class=\"form-group\"><select id=\"selectEconomy\" class=\"form-control mapDropdown\"><option value='EE1'>Public Assistance Rate</option><option value='EE2' selected='selected'>Median Household Income</option><option value='EE3'>Unemployment Rate</option><option value='EE4'>Percentage Change in Jobs Within 5 Mile Radius</option></select></div><div class=\"form-group\"><select id=\"selectNeighborhood\" class=\"form-control mapDropdown\"><option value='N1' selected='selected'>Vacant Property</option><option value='N2'>Property Values</option><option value='N3'>Homeownership rates</option><option value='N4'>Poverty Rates</option><option value='N5'>Percentage Population Change</option></select></div></form>";

console.log(config);
a=new crosslet.MapView($("#onedMap"),config);

// clear comboBox variable
var comboBoxInnerHtml = '';