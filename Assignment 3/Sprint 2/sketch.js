//Code by Sydney Cowling
//This code allows users to choose which body part is highlighted by PoseNet by speaking.

let video;
let input;
let poseNet;
let poses = [];
let speechRec;

function setup(){
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);

    //create speechRec object
    speechRec = new p5.SpeechRec('en-US', gotSpeech); //
    speechRec.start(true, false);
    
    //if speechRec ends of has an error, restart.
    speechRec.onError= restart();
    speechRec.onEnd= restart();
    function restart(){
        speechRec.start;
    }

    function gotSpeech(){
        if(speechRec.resultValue){
            input = speechRec.resultString;
            //console.log(input);
        }
    }

    poseNet = ml5.poseNet(video);

    poseNet.on('pose', function(results) {
        poses = results;
    });

    video.hide();
}


function draw(){
    image(video, 0, 0, width, height);
   
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(50);
    
    fill(0);
    rect(windowWidth/2, 80, 1300, 100);
    fill(255);
    rect(windowWidth/2, 160, 600, 50);

    fill(255);
    text("Say a body part aloud and the computer will highlight it.", windowWidth/2, 100);
    
    noStroke();
    fill(0);
    textSize(30);
    text("Say: ears, eyes, nose, shoulders, or chin.", windowWidth/2, 170);


    if (poses.length > 0) {
        const pose = poses[0].pose;

        //identify poses
        const nose = pose.nose;
        const rightEar = pose.rightEar;
        const leftEar = pose.leftEar;
        const rightEye = pose.rightEye;
        const leftEye = pose.leftEye;
        const leftShoulder = pose.leftShoulder;
        const rightShoulder = pose.rightShoulder;


        fill(213, 0, 143);

        //detects input change and displays a ellipse on top of each body part.
        if(input=="nose"){
            ellipse(nose.x, nose.y, 50);
        }
        else if(input=="ears"){
            ellipse(rightEar.x, rightEar.y, 30);
            ellipse(leftEar.x, leftEar.y, 30);
        }
        else if(input == "eyes"){
            ellipse(rightEye.x, rightEye.y, 40);
            ellipse(leftEye.x, leftEye.y, 40);
        }
        else if(input=="shoulders"){
            ellipse(rightShoulder.x, rightShoulder.y, 40);
            ellipse(leftShoulder.x, leftShoulder.y, 40);
        }
        else if(input=="chin"){
            ellipse(nose.x, nose.y + 120, 40);
        }
    }
}