$(document).ready(function() {

  var thermostat = new Thermostat();
  updateTemperature();
  displayWeather("london");

  $("#temperature-up").click(function(){
    thermostat.up();
    updateTemperature();
  });

  $("#temperature-down").click(function(){
    thermostat.down();
    updateTemperature();
  });

  $("#temperature-reset").click(function(){
    thermostat.resetTemperature();
    updateTemperature();
  });

  // toggle power saving mode
  var psmMode = true;

  function powerSavingOn() {
    psmMode = true;
    thermostat.switchPowerSavingModeOn();
    updateTemperature();
    $("#power-saving-status").text("on");
    pauseAudioHighVoltage();
    $(".power_saving_text").css("background-image", 'url(images/forest.jpg)');
    $(".powersaving_button").css("background-color", '#4CAF50');
  };

  function powerSavingOff() {
    psmMode = false;
    thermostat.switchPowerSavingModeOff();
    updateTemperature();
    $("#power-saving-status").text("off");
    playAudioHighVoltage();
    $(".power_saving_text").css("background-image", 'url(images/fire.gif)');
    $(".powersaving_button").css("background-color", 'red');
  };

  $(".powersaving_button").click(function(){
    if (psmMode){
      powerSavingOff();
    }
    else {
      powerSavingOn();
    };
    console.log('psmMode: ' + psmMode);
  })

  // handle temperature display
  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  }

  $("#current-city").change(function() {
    var city = $("#current-city").val();
    displayWeather(city);
  });

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  }


  // setup music

  var musicHighVoltage = document.getElementById("musicHighVoltage");
  var firstPlayHighVoltage = true;
  function playAudioHighVoltage() {
    if (firstPlayHighVoltage){
      firstPlayHighVoltage = false
      musicHighVoltage.currentTime = 13;
    }
    musicHighVoltage.play();
  }

  function pauseAudioHighVoltage() {
    musicHighVoltage.pause();
  }

  $(window).on('resize', function(){ // make sure the picture is always in a nice place
    $('.power_saving_text').css("background-position", "right bottom");
  });
  $('.power_saving_text').css("background-position", "right bottom"); // this needs to be here and not in css, otherwise it won't go in the right place


  // just to make sure this runs properly
  powerSavingOn();
})