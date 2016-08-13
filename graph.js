class Graph {

  constructor (options){

    var default_options = {
      full_width: false,
      width: 500,
      min_value: -1,
      max_value: 1,
      data_function: function(start, stop, step, callback) {
          var values = [];
          //console.log(start);
        //  console.log(+start)
          start = +start;
          stop = +stop;
          while (start < stop) {
              start += step;
              values.push(Math.random());
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

    this._init()
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

  _init(repeated){
    var _this = this;

    if(this.options.full_width && !repeated){
      var _this = this;
      window.onresize = function(){
        _this.reset();
      }
    }

    var _size = this.options.full_width?$(window).width():this.options.width;

    var from_date = new Date(2013, 8, 1);
    var to_date = Date.now();
    var _delay =  Date.now() - to_date;
    var _step = (to_date - from_date)/_size;
    console.log(_delay);
    console.log(new Date());

    // create new cubism.js context to render
    var graphContext = cubism.context()
        .clientDelay(0)
        .serverDelay(_delay)
        .step(_step)
        .size(_size)
        .stop();

    // create a new metric
    // this allows you to retrieve values from some source
    // this is data-source agnostic, so this does not matter.
    var graphMetric = graphContext.metric(this.options.data_function, this.options.name);

    // here we create a new element and then append it to our
    // parent container. Then we call d3 to select the newly created
    // div and then we can create a chart
    var graphElement = document.createElement("div");
    $(graphElement).attr("id", this._graph_id());
    this.options.container.append(graphElement);
    d3.select(graphElement).call(function(div) {

        div.append("div")
            .attr("class", "axis")
            .call(graphContext.axis().orient("top"));



        div.selectAll(".horizon")
            .data([graphMetric])
          .enter().append("div")
            .attr("class", "horizon")
            .call(graphContext.horizon().extent([_this.options.min_value, _this.options.max_value]));

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
