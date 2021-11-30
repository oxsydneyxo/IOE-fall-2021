let soundInput;
let amp;
let volHistory = [];
let video;
let space;

function preload(){
  soundInput = loadSound('assets/OliverTree-Hurt.mp3');
  //Song retrieved from https://www.youtube.com/watch?v=4IgQLoLqp3A
}

function setup() {
  
  createCanvas(500, 900); //Mirror is 5'x 9'
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  amp = new p5.Amplitude();
}

function draw(){
  image(video, 0, 0, width, height);
  
  //Code retrieved from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
  //By Nishan Chathuranga Wickramarathna.
  let vol = amp.getLevel();
  volHistory.push(vol);
  noFill();
  strokeWeight(2);


    beginShape();
    for (let x = 0; x < volHistory.length; x++){
      stroke(205, 15, 247);
      
      let y = map(volHistory[x], 0, 1, height, width);
      vertex(x,y);
    }
    endShape();

    if(volHistory.length > width) {
      volHistory.splice(0,1);
    }
  //End of retrieved code.
}

//Must include onclick to start sound
function mousePressed() {
  if (soundInput.isPlaying()) {
    soundInput.stop();
  } else {
    soundInput.play();
  }
}
