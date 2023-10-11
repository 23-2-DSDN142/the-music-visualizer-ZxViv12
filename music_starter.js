
// vocal, drum, bass, and other are volumes ranging from 0 to 100
let oldDrum;
let cat0;
let cat1;
let cat2;
let cat3;
let cat4;
let cat5;
let Cat = [];
let firstRun = true
let catSwitch = 0;

function draw_one_frame(words, vocal, drum, bass, other, counter) {

  if (firstRun){
    rectMode(CENTER);
    imageMode(CENTER);
    cat0 = loadImage('Cat/Cat_0.png');
    cat1 = loadImage('Cat/Cat_1.png');
    cat2 = loadImage('Cat/Cat_2.png');
    cat3 = loadImage('Cat/Cat_3.png');
    cat4 = loadImage('Cat/Cat_4.png');
    cat5 = loadImage('Cat/Cat_5.png');
    
    Cat[0] = cat0;
    Cat[1] = cat1;
    Cat[2] = cat2;
    Cat[3] = cat3;
    Cat[4] = cat4;
    Cat[5] = cat5;

  firstRun = false;
  }

  background(0);

  let drumHight = map(drum, 0, 100, 0, height); //change the last two value
  let vocalHight = map(vocal, 0, 100, 0, height);
  let bassHight = map(bass, 0, 100, 0, height);
  let DrumChangeSpeed = map(drum-oldDrum, -10, 10, -1, 1);
    
    var VocalFrame = int(map(vocal, 0,100, 0,4));
  
//new stuff here

  drumBall(100, drumHight, 15, 15+20*DrumChangeSpeed, words, vocal, drum, bass, other, counter);
  drumBall(400, drumHight, 15, 15+20*DrumChangeSpeed, words, vocal, drum, bass, other, counter);
  
  vocalBall(70, vocalHight-30, 15, 15+20*DrumChangeSpeed, words, vocal, drum, bass, other, counter);
  vocalBall(430, vocalHight-30, 15, 15+20*DrumChangeSpeed, words, vocal, drum, bass, other, counter);
  
  bassBall(50, bassHight, 15, 15, words, vocal, drum, bass, other, counter);
  bassBall(480, bassHight, 15, 15, words, vocal, drum, bass, other, counter);

  star(7,10, 300,100, words, vocal, drum, bass, other, counter);
  star(3,6, 400,400, words, vocal, drum, bass, other, counter);

//____________________________________________________________________________________________________

  if(counter % 10 == 0 && counter != 0){
    catSwitch++
    if (catSwitch>5){
      catSwitch = 0;
    }
  }

  push();
  scale(0.22);
  image(Cat[catSwitch], 1150, 1150);
  pop();

// //Cat__________________________________________________________________________________________________
  
  oldDrum = drum;

  textAlign(CENTER);
  textSize(40);
  fill(200, 200, 0);
  text(words, width/2, height/1.2);
//__________________________________________________________________________________________________
  
  strokeWeight(6);
  let drumMap1 = map(drum, 0, 100, 10, 55);
  let length1 = 50; //variable
  let start1 = 100;
  let end1 = start1 + length1;
  
  let mappedColour2;
  if (drum < 50){
    mappedColour2 = color(153,51,250);
  } 
  else {
    mappedColour2 = color(30,144,255);
  }

  stroke(mappedColour2); //stroke color

  for(let i=1; i <= drumMap1; i++){
    let step1 = i*10;
    line(step1, start1, step1, end1);
  }
//drum line_______________________________________________________________________________________________________

strokeWeight(6);
let vocalMap1 = map(vocal, 0, 100, -10, 55);
let length2 = 10;
let start2 = 160;
let end2 = start2 + length2;

if (vocal < 50){
  mappedColour2 = color(153,51,250);
} 
else {
  mappedColour2 = color(30,144,255);
}

stroke(mappedColour2); //stroke color

for(let i=1; i <= vocalMap1; i++){
  let step1 = i*10;
  line(step1, start2, step1, end2);
}

for(let i=0; i >= -vocalMap1; i--){
  let step1 = i*10;
  line(step1+width, start2+320, step1+width, end2+320);
}

//vocal line_______________________________________________________________________________________________________

strokeWeight(2);
  let drumMap2 = map(drum, 0, 100, 0, 35); //wave hight
  angleMode(DEGREES);

  if (drum < 50){
    mappedColour2 = color(153,51,250);
  } 
  else {
    mappedColour2 = color(30,144,255);
  }
  stroke(mappedColour2); //stroke color

  let offsetDrum = 0;
  push();
  translate(width/2, height/2);
  for(let i=0; i <= 90; i++){
    let progress = map(i, 0, 90, 0, 360);
    let frequency = 5 //wave number
    let sensitivity = 2;  //wave hight
    offsetDrum = drumMap2 * (sin(frequency * progress) + 1) / sensitivity;
    
    line(0, 100, 0, 101+offsetDrum);
    rotate(360/90)
  }
  pop();

}
//drum cicle_______________________________________________________________________________________________________

//balls start_______________________________________________________________________________________________________

function drumBall(x, y, sizeX, sizeY, words, vocal, drum, bass, other, counter) {
  let startColour1 = color(255, 204, 0);
  let endColour1 = color(255, 0, 0);
  let startColour2 = color(0, 0, 255);

  let mapForColour; 
  let mappedColour;

  if (drum < 50){
    mapForColour = map(drum, 0, 50, 0, 1);
    mappedColour = lerpColor(startColour1, endColour1, mapForColour);
  } 
  else {
    mapForColour = map(drum, 50, 100, 0, 1);
    mappedColour = lerpColor(endColour1, startColour2, mapForColour);
  }

  stroke(mappedColour);
  noFill();
  ellipse(x, y, sizeX, sizeY);
}
//drum ball (ball1)________________________________________________________________________

function vocalBall(x, y, sizeX, sizeY, words, vocal, drum, bass, other, counter) {
  let startColour1 = color(255, 204, 0);
  let endColour1 = color(255, 0, 0);
  let startColour2 = color(0, 0, 255);
  
  let mapForColour; 
  let mappedColour;

  if (vocal < 50){
    mapForColour = map(vocal, 0, 50, 0, 1);
    mappedColour = lerpColor(startColour1, endColour1, mapForColour);
  } 
  else {
    mapForColour = map(vocal, 50, 100, 0, 1);
    mappedColour = lerpColor(endColour1, startColour2, mapForColour);
  }

  stroke(mappedColour);
  noFill();
  ellipse(x, y, sizeX, sizeY);
}
//vocal ball (ball2)_______________________________________________________________________

function bassBall(x, y, sizeX, sizeY, words, vocal, drum, bass, other, counter) {
  let startColour1 = color(255, 204, 0);
  let endColour1 = color(255, 0, 0);
  let startColour2 = color(0, 0, 255);
  
  let mapForColour; 
  let mappedColour;

  if (bass < 50){
    mapForColour = map(bass, 0, 50, 0, 1);
    mappedColour = lerpColor(startColour1, endColour1, mapForColour);
  } 
  else {
    mapForColour = map(bass, 50, 100, 0, 1);
    mappedColour = lerpColor(endColour1, startColour2, mapForColour);
  }

  stroke(mappedColour);
  noFill();
  ellipse(x, y, sizeX, sizeY);
}
//bass ball (ball3)________________________________________________________________________

function star(size2, size3, place2, place3, words, vocal, drum, bass, other, counter) {
  let startColour3 = color(255);
  let endColour3 = color(0);
  let startColour4 = color(100);
  
  let mapForColour3; 
  let mappedColour3;

  if (other < 50){
    mapForColour3 = map(other, 0, 50, 0, 1);
    mappedColour3 = lerpColor(startColour3, endColour3, mapForColour3);
  } 
  else {
    mapForColour3 = map(other, 50, 100, 0, 1);
    mappedColour3 = lerpColor(endColour3, startColour4, mapForColour3);
  }

  push();
  translate(place2, place3);
  scale(size2, size3);

  stroke(mappedColour3);
  strokeWeight(1);
  fill(mappedColour3);

  beginShape();
  curveVertex(0,0);
  curveVertex(0,0);
  curveVertex(-2, 13);
  curveVertex(-6, 20);
  curveVertex(-14, 22);
  curveVertex(0, 22);
  curveVertex(0, 22);
  endShape();

  beginShape();
  curveVertex(0, 22);
  curveVertex(0, 22);
  curveVertex(0,0);
  curveVertex(2, 13);
  curveVertex(6, 20);
  curveVertex(14, 22);
  curveVertex(14, 22);
  endShape();

  beginShape();
  curveVertex(0, 22);
  curveVertex(0, 22);
  curveVertex(-14, 22);
  curveVertex(-6, 24);
  curveVertex(-2, 31);
  curveVertex(0, 44);
  curveVertex(0, 44);
  endShape();
  
  beginShape();
  curveVertex(0, 22);
  curveVertex(0, 22);
  curveVertex(14, 22);
  curveVertex(6, 24);
  curveVertex(2, 31);
  curveVertex(0, 44);
  curveVertex(0, 44);
  endShape();

  pop();
}
//star__________________________________________________________________________________________
