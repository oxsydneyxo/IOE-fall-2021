// Code sourced from examples provided in class and The Coding Train.
// This program creates keypoints and a skeleton over the body.

let video;
let poseNet;
let poses = [];
let skeleton;


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
    skeleton = poses[0].skeleton;

  
  if (poses.length > 0) {
//Code sorced from The Coding Train: https://github.com/CodingTrain/website/blob/main/learning/ml5/7.1_posenet/P5/sketch.js

    //loop through the keypoints and draw an ellipse on them
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255, 0, 0);
      ellipse(x, y, 16, 16);
    }

    //loop through the skeletal points and connect them with lines
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);

      //End of The Coding Train sourced code
    }
  }
}
}
