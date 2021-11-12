//Code by Sydney Cowling
//This code allows users to play with an oscillator by moving their head.

let osc;
let osc1;

let poseNet;
let poses = [];
let video;

let nosePosition;

function setup(){
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video);

    poseNet.on('pose', function(results) {
        poses = results;
      });

    video.hide();
}

osc1 = new p5.TriOsc();
osc1.amp(.5);

osc1.start();

function draw(){
    image(video, 0, 0, width, height);
    textAlign(CENTER);
    textSize(30);
    rectMode(CENTER);
    rect(windowWidth/2, 90, 1000, 100);
    text("Click for sound. Move your head side to side to play with the oscillator.", windowWidth/ 2, 100);

    if (poses.length > 0) {
        const pose = poses[0].pose;
        const nose = pose.nose;

        nosePosition = nose.x;
        
        let freq = map(nosePosition, 0, windowWidth, 40, 200);
        osc1.freq(freq);

    }
}

function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        console.log("getAudioContext().state" + getAudioContext().state);
    }
};