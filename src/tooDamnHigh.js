
function TooDamnHigh() {
  this.high_text = "the temperature is already at max";
  this.low_text = "the temperature is already at min";

  this.image = $("img#damn");
  this.container = $("div.damnContainer")
  this.container_height = 300;
  this.container_width = 400;
  // this._setContainerSize(this.container_height, this.container_width);
}

TooDamnHigh.prototype = {
  _setContainerSize: function(height, width){
    this.container.css('width', width + 'px');
    this.container.css('height', height + 'px');
  },
  Batman: function() {
    this._setContainerSize(1, 1);
    this._damnSpin();
    this.image.animate({
      width: "" + this.container_width,
      height: "" + this.container_height
    },
    {
      duration: 2000,
      queue: false,
      complete: function() {this.container.stop()}
    });
  },
  _damnSpin: function() {
    // controls the spinning by setting or unsetting animation-name
    console.log('container:' + this.container);
    var damnDiv = this.container
    startBatmanning(damnDiv);
    function startBatmanning(damnDiv){
      damnDiv.animate({ deg: '+= 180'},
      {
        duration: 100,
        step: function(now) {
          damnDiv.css({ transform: 'rotate(' + now + 'deg)'})
        },
        queue: false,
        done: startBatmanning(damnDiv),
      })
    }
    // var div = this.container
    // function startSpinning(){
    //   div.animate({ deg: '+= 180'}, 100);
    //   div.animate({ deg: '+= 180'}, 100, startAnimation);
    // }
  },
  damnPosition: function () {
    this._damnPositionWidth();
    this._damnPositionHeight();
  },
  _damnPositionHeight: function (){
    var window_height = $(window).height();
    var damn_height = this.container_height;
    this.container.css('top', (window_height - damn_height) / 2);
  },
  _damnPositionWidth: function (){
    var window_width = $(window).width();
    // console.log(window_width);
    var damn_width = this.container_width;
    // console.log((window_width - damn_width) / 2);
    this.container.css('left', (window_width - damn_width) / 2);
  },
}