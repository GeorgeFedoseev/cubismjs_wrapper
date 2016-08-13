class Graph {

  constructor (options){

    var default_options = {
      full_width: false,
      width: 500,
      from_date: new Date(2016, 7, 13),
      to_date: Date.now(),
      min_value: -1,
      max_value: 1,
      negative_color: "#ff4d00",
      positive_color: "#6eff6f",
      show_palette: false,
      data_function: function(start, stop, step, callback) {
          var values = [];
          //console.log(start);
        //  console.log(+start)
          start = +start; // get numeric representation
          stop = +stop;
          while (start < stop) {
              start += step;
              values.push(Math.sin(start*0.01)/1);
          }
          callback(null, values);
      }
    };

    this.options = $.extend({}, default_options, options);

    if(!this._check_options()){
      return;
    }

    console.log("Hello im Graph "+this.options.name);
    console.log("My element id is #"+this._graph_id());
  }

  render(){
    this._init();
  }

  _check_options() {
    if(this.options.name == undefined || this.options.name == ""){
      console.error("Graph must have name");
      return false;
    }

    if(this.options.container == undefined || this.options.container.length < 1){
      console.error("Graph must have container parameter");
      console.log("Container count = "+this.options.container.length);
      return false;
    }

    return true;
  }

  _graph_id(){
    return $.trim(this.options.name).replace(" ", "_");
  }

  _horizon_colors(negative_color, positive_color){

    var colors = [
      ColorLuminance(negative_color, -0.5),
      ColorLuminance(negative_color, -0.35),
      ColorLuminance(negative_color, -0.2),
      ColorLuminance(negative_color, 0.3),

      ColorLuminance(positive_color, 0.3),
      ColorLuminance(positive_color, -0.2),
      ColorLuminance(positive_color, -0.35),
      ColorLuminance(positive_color, -0.5)
    ];

    if(this.options.show_palette){
      var palette = $("<div>");
      this.graph_div.prepend(palette);
      palette.html("");
      // output color palette
      for(var k in colors){
        var c = colors[k];
        var color_element = $("<div>");
        color_element.css({
          width: 10,
          height: 10,
          display: "inline-block",
          "margin-right": 5,
          "background": c
        });

        palette.append(color_element);
      }
    }

    console.log("Palette: "+colors);

    return colors
  }

  _init(repeated){
    var _this = this;

    if(this.options.full_width && !repeated){
      var _this = this;
      window.onresize = function(){
        _this.reset();
      }
    }

    var _size = this.options.full_width?this.options.container.width():this.options.width;

    var from_date = this.options.from_date;
    var to_date = this.options.to_date;
    var _delay =  Date.now() - to_date;
    var _step = (to_date - from_date)/_size;
    //console.log(_delay);
  //  console.log(new Date());

    // create new cubism.js context to render
    var graphContext = cubism.context()
        .clientDelay(0)
        .serverDelay(_delay)
        .step(_step)
        .size(_size)
        .stop();

    var graphMetric = graphContext.metric(this.options.data_function, this.options.name);

    // here we create a new element and then append it to our
    // parent container. Then we call d3 to select the newly created
    // div and then we can create a chart
    var graphElement = document.createElement("div");
    $(graphElement).attr("id", this._graph_id());
    this.graph_div = $(graphElement);
    this.options.container.append(graphElement);
    d3.select(graphElement).call(function(div) {
        div.append("div")
            .attr("class", "axis")
            .call(graphContext.axis().orient("top"));

        div.selectAll(".horizon")
            .data([graphMetric])
          .enter().append("div")
            .attr("class", "horizon")
            .call(graphContext.horizon()
                    .colors(_this._horizon_colors(_this.options.negative_color, _this.options.positive_color ))
                    .extent([_this.options.min_value, _this.options.max_value])
          );

        div.append("div")
            .attr("class", "rule")
            .call(graphContext.rule());
    });
  }

  _remove(){
    $("#"+this._graph_id()).remove()
  }

  reset(){
    this._remove();
    this._init(true);
  }

}


function ColorLuminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
