$(function(){
  var last = NaN;
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

  var graph2 = new Graph({
    name: "Mrs. Graph",
    container: $("#graphs"),
    full_width: true,
    max_value: 6,
    min_value: -6,
    from_date: Date.parse("13 May 2012"),
    to_date: Date.parse("13 Aug 2016"),
    negative_color: "#ff7745",
    positive_color: "#4bb645",
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
