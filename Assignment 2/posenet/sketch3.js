// Code sourced from examples provided in class.
// This program creates a green filter over the side of the viewfinder that the user is not.

let video;
let poseNet;
let poses = [];


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2);


  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);
   
    const nose = pose.nose;

    //if nose is in one half of the screen...
    if (nose.x >= 320){
      //create a rectangle with a green, transparent fill - left
      fill('rgba(0,255,0, 0.25)');
      rect(0,0,320,480);
    }else{
      //create a rectangle with a green, transparent fill - right
      rect(320,0,320,480);
    }

  }
}
