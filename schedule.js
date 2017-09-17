
// var play = require('play').Play();
var child_process = require('child_process');

var WAIT_SECONDS_LOW  = 10;
var WAIT_SECONDS_HIGH = 30;
var CHOICES = [
    './audio/May God Have Mercy on your Soul.wav',
    './audio/Bells-1.wav'
];
var VLC_PATH = "C:\\Program Files (x86)\\VideoLan\\VLC\\vlc.exe";

function playVlc(audio, cb) {
    var vlc = child_process.spawn(VLC_PATH, [
        '--play-and-exit',
        audio
    ], {
        cwd: __dirname,
        shell: false
    });

    console.log('launched vlc: %d', vlc.pid);

    vlc.on('exit', cb);
}


function schedule() {
    var waitDiff = WAIT_SECONDS_HIGH - WAIT_SECONDS_LOW;
    var waitSeconds = Math.floor(Math.random() * waitDiff) + WAIT_SECONDS_LOW;
    var choiceIndex = Math.floor(Math.random() * CHOICES.length);
    var audio = CHOICES[choiceIndex];

    console.log('schedule: %d', waitSeconds);

    setTimeout(function() {
        console.log('wake up, playing audio %s', audio);
        // play.sound(audio, schedule);
        playVlc(audio, schedule);
    }, waitSeconds * 1000);
}

schedule();
