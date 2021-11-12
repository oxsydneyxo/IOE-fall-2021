//Code by Sydney Cowling
//This code tests the accuracy of the speech recognition in P5JS.

let words = ["attack", "late", "regard", "wealthy", "definite", "create", "technology"]; //define array
let index = 0; 
let input; 
let speechRec;

function setup(){
    createCanvas(windowWidth, windowHeight);
    speechRec = new p5.SpeechRec('en-US', gotSpeech); //
    speechRec.start(true, false); //starts and sets to continuous listening
    
    //If the speech recognition ends or encounters an error, restart.
    speechRec.onError= restart();
    speechRec.onEnd= restart();
    function restart(){
        speechRec.start;
    }
    
    //get confidence and input values
    function gotSpeech(){
        if(speechRec.resultValue){
            input = speechRec.resultString;
        }
    }
}



function draw(){
    background(255);
    
    textAlign(CENTER);
    strokeWeight(0.3);
    
    fill(0);
    textSize(30);
    text('Read aloud the word below to test the speech recognition.', windowWidth / 2, 200);
    text('Click to continue onto a new word.', windowWidth / 2, 250);
    text('The computer heard: ', windowWidth/2, 500);
    

    textSize(100);
    text(words[index], windowWidth /2, 400);

    textSize(50);

    if(speechRec.resultValue){
        //if the input value equals the correct word, display the input in green.
        if(input == words[index]){
            fill(50, 138, 48);
            text(input, windowWidth /2, 610);
        }else{ //if the input value does not equal the correct word, display the input in red.
            fill(168, 34, 54);
            text(input, windowWidth/2, 610);
         }
    }
}

//change word and reset variable when screen is clicked.
function mousePressed(){
    index= index+1;
    input = undefined;

    if (index==words.length){
        index=0;
    }
}
