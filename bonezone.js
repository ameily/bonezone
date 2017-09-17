var bscript = require('bonescript');
var child_process = require('child_process');

var ALARM_PIN = "P8_19";
var APLAY_PATH = "/usr/bin/aplay";

function checkMovement(){
  bscript.digitalRead(ALARM_PIN, function(pin) {
    var sleepTime;
    if(pin.value === 0) {
      console.log("Movement Detected, playing audio");
      playAudio('./audio/Bells-1.wav', function() {
        console.log(">> audio finished, sleeping for 30 seconds");
        setTimeout(checkMovement, 30000);
      });
    } else {
      console.log("No Motion Detected");
      setTimeout(checkMovement, sleepTime);
    }
  });
}

function playAudio(audio, cb) {
  var proc = child_process.spawn(APLAY_PATH, [
    audio
  ], {
    cwd: __dirname,
    shell: false
  });

  console.log('launched aplay: %d', proc.pid);

  proc.on('exit', cb);
}


bscript.pinMode(ALARM_PIN, bscript.INPUT);
setTimeout(checkMovement, 15000); // allows the sensor 15 seconds
