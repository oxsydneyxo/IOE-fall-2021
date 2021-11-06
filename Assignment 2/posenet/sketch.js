// Code sourced from examples provided in class.
// This program creates a square of ellipses around a users face. 

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
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

   
    fill(213, 0, 143);
   

     // Create an ellipse bellow chin
    const nose = pose.nose;
    ellipse(nose.x, nose.y + 100, 20);

    //Create an ellipse on the forehead.
    ellipse(nose.x, nose.y - 100, 20);

    // Create an ellipse for the right ear
    const rightEar = pose.rightEar;
    ellipse(rightEar.x, rightEar.y, 20, 20);

    // Create an ellipse for the left ear
    const leftEar = pose.leftEar;
    ellipse(leftEar.x, leftEar.y, 20, 20);

    // Create an ellipse in each corner of face
    
    ellipse(leftEar.x, leftEar.y+100, 20, 20);
    ellipse(leftEar.x, leftEar.y=100, 20, 20);

    ellipse(rightEar.x, rightEar.y+100, 20, 20);
    ellipse(rightEar.x, rightEar.y-100, 20, 20);
  }
}