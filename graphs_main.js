$(function(){
  var graph1 = new Graph({
    name: "Mr Graph",
    container: $("#graphs"),
    full_width: true,
    max_value: 0.2,
    from_date: Date.parse("13 Jul 2016"),
    to_date: Date.parse("13 Aug 2016"),
    negative_color: "#4595ff",
    show_palette: true
  });

});
