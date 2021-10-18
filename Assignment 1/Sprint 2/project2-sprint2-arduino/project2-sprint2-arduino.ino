//Sydney Cowling
//code sorced from the Three Sensor Example provided through the course


//Define sensors
#define button 4
int light_sensor = A3;
int potentiometer = A0;
int button_state = 0;
int sensors[3];

void setup() {
  Serial.begin(9600);
  pinMode(button, INPUT);
  pinMode(potentiometer, INPUT);
  pinMode(light_sensor,  INPUT);
}

void loop() {

  button_state = digitalRead(button);
  sensors[0] = button_state;
  
  int raw_light = analogRead(light_sensor); // read the raw value from light_sensor pin (A3)
  int light = map(raw_light, 0, 1023, 0, 255); // map value to 1, 100
  sensors[1] = light;

  int sensor_value = analogRead(potentiometer);
  int value = map(sensor_value, 0, 1023, 0, 1920);
  sensors[2]= value;

  for(int i = 0; i < 3; i++){

    int sensorValue = sensors[i];
    
    Serial.print(sensorValue);
    if (i==2){
      Serial.println();
    }else{
      Serial.print(",");
    }
  }
  delay(100);
}
