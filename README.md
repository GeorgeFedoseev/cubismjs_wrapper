# Cubism.js wrapper for static data
Wrapper for [Cubism.js](https://square.github.io/cubism/) time series visualization library.  
Written for rendering static data using Cubism.js.  
Also includes auto color palette generation from two main colors.

**Dependencies**: jquery, d3.js, cubism.js

![](https://github.com/TrueGuy/cubismjs_wrapper/raw/master/screenshots/screenshot_1.png)

## Example:

``` javascript
$(function(){

  var graph1 = new Graph({
    name: "Mr Graph",
    container: $("#graphs"),
    full_width: true,
    max_value: 6,
    min_value: -6,
    from_date: Date.parse("13 Jul 2016"),
    to_date: Date.parse("13 Aug 2016"),
    negative_color: "#4595ff",
    show_palette: true,
    data_function: function(start, stop, step, callback) {
      start = +start, stop = +stop;
      var values = [];
      var up = true;
      var current_val = Math.random();
      while (start < stop) {
        if(Math.random()<0.5)
          up = !up;
        current_val += (up?1:-1)*Math.random() * Math.cos(start*Math.random());
        if(current_val > 5)
          current_val = 5;
        else if(current_val < -5)
          current_val = -5;
  
        values.push(current_val);
        start += step;
      }
      callback(null, values);
    }
  }).render();
  
});
```

## All options:
``` javascript
var default_options = {
  full_width: false, // graph resizes with its container
  width: 500, // constant width (works when full_width = false)
  height: 50, // graph height 
  from_date: new Date(2016, 7, 13), // start date
  to_date: Date.now(), // end date
  min_value: -1, 
  max_value: 1,
  graph_class: "graph", // class of created graph <div>
  margin_top: 10, // margin-top of graph <div>
  negative_color: "#ff4d00", // main color for negative values
  positive_color: "#6eff6f", // main color for positive values
  show_palette: false, // show color palette near graph
  data_function: function(start, stop, step, callback) { // start - start date, stop - end date
      var values = [];
      start = +start; // get numeric representation
      stop = +stop;
      while (start < stop) {
          start += step;
          values.push(Math.sin(start*0.01)/1);
      }
      callback(null, values);
  }
}
```

Simple class wrapper for Cubism.js
