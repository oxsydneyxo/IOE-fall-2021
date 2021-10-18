/* 
October 17, 2021 - Sydney Cowling
Code retrieved from 3 Circles 3 Sounds example provided by the course and examples posted to p5js.org.
*/

let osc;
let playing = false;
let serial;
let latestData = "Data not available.";
let splitter;
let button_state = 0,
    light_value = 0,
    pot_value = 0;
let sound;
let osc1, osc2, osc3, fft;

function preload() {
    sound = loadSound('sounds/game_sound.mp3');
}


function setup() {

    createCanvas(windowWidth, windowHeight);


    serial = new p5.SerialPort();

    serial.list();
    console.log("serial.list()   ", serial.list());

    // CHANGE SERIAL PORT YOUR PORT
    serial.open("COM3");

    //CALLBACKS

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

}

// set frequency and type
osc1 = new p5.TriOsc();
osc1.amp(.5);
osc2 = new p5.TriOsc();
osc2.amp(.5);
osc3 = new p5.TriOsc();
osc3.amp(.5);


fft = new p5.FFT();
osc1.start();
osc2.start();
osc3.start();

// We are connected and ready to go
function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// ERROR MESSAGE   
function gotError(theerror) {
    console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string

    trim(currentString); // remove any trailing whitespace

    if (!currentString) return; // if the string is empty, do no more

    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in

    splitter = split(latestData, ','); // split each number using the comma as a delimiter

    button_state = splitter[0];
    light_value = splitter[1];
    pot_value = splitter[2];
}

function gotRawData(thedata) {
    println("gotRawData" + thedata);
}


function draw() {

    background(0);

    strokeWeight(0);
    fill(255);
    textAlign(LEFT);
    textSize(10);
    //text(latestData, 2, 10);

    strokeWeight(0);
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text('Click to start.', windowWidth / 2, 100);
    text('Interact with the button, light sensor and potentiometer to explore.', windowWidth / 2, 130);

    stroke(255);
    strokeWeight(20);

    //change line with potentiometer
    line(windowWidth / 2, windowHeight / 2, windowWidth / 2, pot_value);

    //change line with light sensor value
    line(windowWidth / 2 - 200, windowHeight / 2 + 300, windowWidth / 2 - 200, light_value);

    //if button is pressed, shorten the line height. if not, draw a line
    if (button_state == 1) {
        line(windowWidth / 2 + 200, windowHeight / 2 + 300, windowWidth / 2 + 200, windowHeight / 2);
        sound.play();
    } else {
        line(windowWidth / 2 + 200, windowHeight / 2 + 300, windowWidth / 2 + 200, windowHeight / 2 - 300);
    }

    //Map values to an osc
    var freq2 = map(light_value, 0, width, 40, 880);
    osc2.freq(freq2);

    var freq3 = map(pot_value, 0, width, 40, 880);
    osc3.freq(freq3);

}

//start sound when user clicks
function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        console.log("getAudioContext().state" + getAudioContext().state);
    }
};
