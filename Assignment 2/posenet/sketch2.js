// Code sourced from examples provided in class.
// This program creates a square around a users face. 

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

   
    stroke(213, 0, 143);
   

    const rightEar = pose.rightEar;
    const leftEar = pose.leftEar;

    // Top line
    line(rightEar.x, rightEar.y-100, leftEar.x, leftEar.y-100);

    // Bottom Line
    line(rightEar.x, rightEar.y+100, leftEar.x, leftEar.y+100);
   
    // Right Line
    line(leftEar.x, leftEar.y+100, leftEar.x, leftEar.y-100);

    // Left line
    line(rightEar.x, rightEar.y+100, rightEar.x, rightEar.y-100);
  }
}