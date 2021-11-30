let soundInput;
let fft;
let video;
let space;

function preload(){
  soundInput = loadSound('assets/OliverTree-Hurt.mp3');
}

function setup() {
  
  createCanvas(500, 900); //Mirror is 5'x 9'
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  colorMode(HSB);
  angleMode(DEGREES);
  
  fft = new p5.FFT(0.9, 64);
  space = 5.8;
}

function draw(){
  image(video, 0, 0, width, height);
  
  //Code retrieved from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
  //By Nishan Chathuranga Wickramarathna.
  let spectrum = fft.analyze();

  //create bars that react to the amp of the song
  for (let i = 0; i < spectrum.length; i++){
    stroke(255);
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 400);

    noStroke();
    fill(255,255,i, 0.9);
    rect(width - (i * space), y, space, height - y, 20, 20, 0, 0);
    rect(i * space, y, space, height - y, 20, 20, 0, 0);
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
