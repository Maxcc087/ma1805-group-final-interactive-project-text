//////global

//////game control
var stage = 0; //keeps track of which function to run

//player
var p1X = 400; //p1 for player 1
var p1Y = 375;
var pWidth = 50;
var pHeight = 100;

//boxes (platforms) ---- for Level 1
var b1X = 200; //b1 for box 1
var b1Y = 280;
var b2X = 600;
var b2Y = 280;
var b3X = 500;
var b3Y = 120;
var bWidth = 200;
var bHeight = 40;

//boxes (platforms) ---- for Level 2
var b4X = 200; 
var b4Y = 280;
var b5X = 400; 
var b5Y = 260;
var b6X = 700; 
var b6Y = 200;
var b7X = 150; 
var b7Y = 100;

//coins ---- for Level 1
var c1X = 600; //c1 for coin 1
var c1Y = 380;
var c2X = 600;
var c2Y = 235;
var c3X = 500;
var c3Y = 75;
var c4X = 200;
var c4Y = 240;
var cWidth = 30;
var cHeight = 30;

//coins ---- for Level 2
var c5X = 600; 
var c5Y = 380;
var c6X = 230; 
var c6Y = 240;
var c7X = 400; 
var c7Y = 220;
var c8X = 720; 
var c8Y = 160;
var c9X = 160; 
var c9Y = 60;
var c10X = 450; 
var c10Y = 220;

//cctv ---- for Level 1
var g1X = 200; //g1 for cctv
var g1Y = 375;
var g2X = 550;
var g2Y = 75;
var gWidth = 50;
var gHeight = 100;

//moving cctv
var g1Position = 200;
var g2Position = 550;
var gSpeed = 3;
var g1Direction = 1;
var g1Distance = 200;
var g2Direction = -1;
var g2Distance = 90;

//cctv ---- for Level 2
var g3X = 550;
var g3Y = 375;
var g4X = 200;
var g4Y = 210;
var g5X = 150;
var g5Y = 30;
var g6X = 700;
var g6Y = 130;

//moving cctv ---- for level 2
var g3Position = 550;
var g3Direction = -1;
var g3Distance = 125;
var g4Position = 200;
var g4Direction = -1;
var g4Distance = 40;
var g5Position = 150;
var g5Direction = 1;
var g5Distance = 50;
var g6Position = 700;
var g6Direction = 1;
var g6Distance = 50;

//counters ---- for level 1
var score = 0;
var lives = 2;
var totalTime; //total time of program running
var splashTime; //amount of time on splashscreen only
var gameTime; //amount of time ingame only
var timeLimit = 20; //how much do you have to suceed

//counters ---- for level 2
var score2 = 0;
var lives2 = 3;
var gameTime2 = 20; //amount of time in level 2

//gravity
var jump = false; //are we jumping?
var direction = 1; //the force of gravity in the y direction
var velocity = 2; //speed of player
var jumpPower = 15; //the energy or strength of player
var fallingSpeed = 4; //equal to velocity
var minHeight = 365; //height of ground
var maxHeight = 50; //height of sky
var jumpCounter = 0; //keeps track of how much we are jumping

//multimedia
var royalholllowaybear;
var platform;
var landscape;
var jumpSound;
var royalFont;
var coin;
var coinSound;
var cctv;
var lifeSound;
var winSound;
var loseSound;
var themeSong;



//////setup
function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  themeSong.play();
}

//////draw
function draw() {
  keyPressed();
  keyTyped();
  gravity();
  totalTime = millis(); //start timer

  if(stage == 0){
    splash();
  }

  if(stage == 1){
    level1();
  }

  if(stage == 2){
    winScreen();
  }

  if(stage == 3){
    loseScreen();
  }

  if(stage == 4){
    level2();
  }

  if(mouseIsPressed == true && stage != 4){
    stage = 1;
  }
}

//////splash
function splash() {
  splashTime =  totalTime; //begin splashscreen timer
  background(150, 230, 240);
  image(landscape, width/2, height/2, width, height);

  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(50);
  text('ESCAPE THE CCTV', width/2, 120);

  //instruction
  text('HOW TO PLAY:', width/2, 240);
  text('USE ARROW KEYS TO MOVE LEFT RIGHT AND UP', width/2, 330);

  text('CLICK THE SCREEN TO START', width/2, 450);

}

//////level1
function level1() {
  background(150, 230, 240); //sky blue color
  image(landscape, width/2, height/2, width, height);

  //window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2, height/2, width, height);

  //grass
  noStroke();
  fill(100, 200, 75); //green color
  rect(width/2, 450, width, 100);

  //draw box
  stroke(0);
  strokeWeight(5);
  fill(255, 120, 0); //orange
  //rect(b1X, b1Y, bWidth, bHeight);
  image(platform, b1X, b1Y, bWidth, bHeight);
  image(platform, b2X, b2Y, bWidth, bHeight);
  image(platform, b3X, b3Y, bWidth, bHeight);

  //draw player
  stroke(0);
  strokeWeight(5);
  fill(150, 0, 170); //purple
  //rect(p1X, p1Y, pWidth, pHeight);
  image(royalholllowaybear, p1X, p1Y, pWidth, pHeight);

  //cctv
  image(cctv, g1X, g1Y, gWidth, gHeight);
  if(p1X >= g1X-gWidth/2 && p1X <= g1X+gWidth/2 && p1Y >= g1Y-gHeight/2 && p1Y <= g1Y+gHeight/2){
    lives = lives-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }
  image(cctv, g2X, g2Y, gWidth, gHeight);
  if(p1X >= g2X-gWidth/2 && p1X <= g2X+gWidth/2 && p1Y >= g2Y-gHeight/2 && p1Y <= g2Y+gHeight/2){
    lives = lives-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }

  //moving cctv
  g1X = g1X + (gSpeed*g1Direction);
    if(g1X >= g1Position+g1Distance || g1X <= g1Position-g1Distance){
      g1Direction = g1Direction*-1;
    }

  g2X = g2X + (gSpeed*g2Direction);
    if(g2X >= g2Position+g2Distance || g2X <= g2Position-g2Distance){
      g2Direction = g2Direction*-1;
    }


  //scaoreboard
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('POINTS:', 50, 50);
  text(score, 100, 50);

  //lives
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('LIVES:', 150, 50);
  text(lives, 200, 50);

  //timer
  splashTime = splashTime; //stop counting time on splash
  gameTime = int((totalTime-splashTime)/1000); //convert to seconds and integer
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('TIME REMAINING:', 600, 50);
  text(timeLimit-gameTime, 700, 50); //timer count down

  //code to trigger win or lose screen
  if(score >= 4){
    winSound.play();
    p1X = 400; //set rhulbear back to start position for level 2
    p1Y = 375;
    stage = 4; //trigger level 2
  }

  if(lives <= 0){
    loseSound.play();
    stage = 3;
  }

  if(gameTime >= timeLimit){
    loseSound.play();
    stage = 3;
  }

  //collisions
  if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight/2 >= b1Y-bHeight/2 && p1Y-pHeight/2 <= b1Y+bHeight/2 && jump == false){
    p1Y = b1Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

   if(p1X >= b2X-bWidth/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= b2Y-bHeight/2 && p1Y-pHeight/2 <= b2Y+bHeight/2 && jump == false){
    p1Y = b2Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

   if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight/2 >= b3Y-bHeight/2 && p1Y-pHeight/2 <= b3Y+bHeight/2 && jump == false){
    p1Y = b3Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

  //coins
  image(coin, c1X, c1Y, cWidth, cHeight);
  if(p1X >= c1X-cWidth/2 && p1X <= c1X+cWidth/2 && p1Y >= c1Y-cHeight/2 && p1Y <= c1Y+cHeight/2){
    score = score+1;
    c1X = -1000; //move coin off screen
    coinSound.play();
  }

  image(coin, c2X, c2Y, cWidth, cHeight);
  if(p1X >= c2X-cWidth/2 && p1X <= c2X+cWidth/2 && p1Y >= c2Y-cHeight/2 && p1Y <= c2Y+cHeight/2){
    score = score+1;
    c2X = -1000;
    coinSound.play();
  }

  image(coin, c3X, c3Y, cWidth, cHeight);
  if(p1X >= c3X-cWidth/2 && p1X <= c3X+cWidth/2 && p1Y >= c3Y-cHeight/2 && p1Y <= c3Y+cHeight/2){
    score = score+1;
    c3X = -1000;
    coinSound.play();
  }

  image(coin, c4X, c4Y, cWidth, cHeight);
  if(p1X >= c4X-cWidth/2 && p1X <= c4X+cWidth/2 && p1Y >= c4Y-cHeight/2 && p1Y <= c4Y+cHeight/2){
    score = score+1;
    c4X = -1000;
    coinSound.play();
  }

}//closelevel1

//////level2
function level2() {
  image(landscape, width/2, height/2, width, height);

  //grass
  noStroke();
  fill(100, 200, 75); //green color
  rect(width/2, 450, width, 100);

  //scaoreboard
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('POINTS:', 50, 50);
  text(score2, 100, 50);

  //lives
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('LIVES:', 150, 50);
  text(lives2, 200, 50);

  //timer
  gameTime = gameTime; //stop counting time on splash
  gameTime2 = int((totalTime-splashTime-(gameTime*1000))/1000); //convert to seconds and integer
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(20);
  text('TIME REMAINING:', 600, 50);
  text(timeLimit-gameTime2, 700, 50); //timer count down

  //drawing and colliding with platforms
  //box4
  image(platform, b4X, b4Y, bWidth, bHeight);
  if(p1X >= b4X-bWidth/2 && p1X <= b4X+bWidth/2 && p1Y+pHeight/2 >= b4Y-bHeight/2 && p1Y-pHeight/2 <= b4Y+bHeight/2 && jump == false){
    p1Y = b4Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

  image(platform, b5X, b5Y, bWidth, bHeight);
  if(p1X >= b5X-bWidth/2 && p1X <= b5X+bWidth/2 && p1Y+pHeight/2 >= b5Y-bHeight/2 && p1Y-pHeight/2 <= b5Y+bHeight/2 && jump == false){
    p1Y = b5Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

  image(platform, b6X, b6Y, bWidth, bHeight);
  if(p1X >= b6X-bWidth/2 && p1X <= b6X+bWidth/2 && p1Y+pHeight/2 >= b6Y-bHeight/2 && p1Y-pHeight/2 <= b6Y+bHeight/2 && jump == false){
    p1Y = b6Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

  image(platform, b7X, b7Y, bWidth, bHeight);
  if(p1X >= b7X-bWidth/2 && p1X <= b7X+bWidth/2 && p1Y+pHeight/2 >= b7Y-bHeight/2 && p1Y-pHeight/2 <= b7Y+bHeight/2 && jump == false){
    p1Y = b7Y-55; //don't fall
    velocity = 0; //no speed because we aren't falling
    jumpCounter = 0; //allows to jump again
  }

  //drawing and colliding with cctv
  //cctv 3
  image(cctv, g3X, g3Y, gWidth, gHeight);
  if(p1X >= g3X-gWidth/2 && p1X <= g3X+gWidth/2 && p1Y >= g3Y-gHeight/2 && p1Y <= g3Y+gHeight/2){
    lives2 = lives2-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }

  image(cctv, g4X, g4Y, gWidth, gHeight);
  if(p1X >= g4X-gWidth/2 && p1X <= g4X+gWidth/2 && p1Y >= g4Y-gHeight/2 && p1Y <= g4Y+gHeight/2){
    lives2 = lives2-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }

  image(cctv, g5X, g5Y, gWidth, gHeight);
  if(p1X >= g5X-gWidth/2 && p1X <= g5X+gWidth/2 && p1Y >= g5Y-gHeight/2 && p1Y <= g5Y+gHeight/2){
    lives2 = lives2-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }

  image(cctv, g6X, g6Y, gWidth, gHeight);
  if(p1X >= g6X-gWidth/2 && p1X <= g6X+gWidth/2 && p1Y >= g6Y-gHeight/2 && p1Y <= g6Y+gHeight/2){
    lives2 = lives2-1; //lose life
    lifeSound.play();
    p1X = 400; // put rhulbear back to start position
    p1Y = 375;
  }

  //moveing cctv 3
  g3X = g3X + (gSpeed*g3Direction);
    if(g3X >= g3Position+g3Distance || g3X <= g3Position-g3Distance){
      g3Direction = g3Direction*-1;
  }

  g4X = g4X + (gSpeed*g4Direction);
    if(g4X >= g4Position+g4Distance || g4X <= g4Position-g4Distance){
      g4Direction = g4Direction*-1;
  }

  g5X = g5X + (gSpeed*g5Direction);
    if(g5X >= g5Position+g5Distance || g5X <= g5Position-g5Distance){
      g5Direction = g5Direction*-1;
  }

  g6X = g6X + (gSpeed*g6Direction);
    if(g6X >= g6Position+g6Distance || g6X <= g6Position-g6Distance){
      g6Direction = g6Direction*-1;
  }

//drawing and colliding with coins
  //coins
  image(coin, c5X, c5Y, cWidth, cHeight);
  if(p1X >= c5X-cWidth/2 && p1X <= c5X+cWidth/2 && p1Y >= c5Y-cHeight/2 && p1Y <= c5Y+cHeight/2){
    score2 = score2+1;
    c5X = -1000;
    coinSound.play();
  }

  image(coin, c6X, c6Y, cWidth, cHeight);
  if(p1X >= c6X-cWidth/2 && p1X <= c6X+cWidth/2 && p1Y >= c6Y-cHeight/2 && p1Y <= c6Y+cHeight/2){
    score2 = score2+1;
    c6X = -1000;
    coinSound.play();
  }

  image(coin, c7X, c7Y, cWidth, cHeight);
  if(p1X >= c7X-cWidth/2 && p1X <= c7X+cWidth/2 && p1Y >= c7Y-cHeight/2 && p1Y <= c7Y+cHeight/2){
    score2 = score2+1;
    c7X = -1000;
    coinSound.play();
  }

  image(coin, c8X, c8Y, cWidth, cHeight);
  if(p1X >= c8X-cWidth/2 && p1X <= c8X+cWidth/2 && p1Y >= c8Y-cHeight/2 && p1Y <= c8Y+cHeight/2){
    score2 = score2+1;
    c8X = -1000;
    coinSound.play();
  }

  image(coin, c9X, c9Y, cWidth, cHeight);
  if(p1X >= c9X-cWidth/2 && p1X <= c9X+cWidth/2 && p1Y >= c9Y-cHeight/2 && p1Y <= c9Y+cHeight/2){
    score2 = score2+1;
    c9X = -1000;
    coinSound.play();
  }

  image(coin, c10X, c10Y, cWidth, cHeight);
  if(p1X >= c10X-cWidth/2 && p1X <= c10X+cWidth/2 && p1Y >= c10Y-cHeight/2 && p1Y <= c10Y+cHeight/2){
    score2 = score2+1;
    c10X = -1000;
    coinSound.play();
  }


  //draw player
  image(royalholllowaybear, p1X, p1Y, pWidth, pHeight);

  //code to trigger win or lose screen
  if(score2 >= 6){
    winSound.play();
    stage = 2; //trigger win screen
  }

  if(lives2 <= 0){
    loseSound.play();
    stage = 3;
  }

  if(gameTime2 >= timeLimit){
    loseSound.play();
    stage = 3;
  }

}//close level2



//////winScreen
function winScreen() {
  image(landscape, width/2, height/2, width, height);
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text('YOU WIN', width/2, height/2);
}

//////loseScreen
function loseScreen() {
  image(landscape, width/2, height/2, width, height);
  textFont(royalFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text('YOU LOSE', width/2, height/2);
}

//////gravity
function gravity() {
  if(p1Y >= minHeight && jump == false){ //stop falling on ground
    p1Y = p1Y; // don't fall
    jumpCounter = 0; //reset jump counter when landing
  }
  else{
    p1Y = p1Y + (direction*velocity); //code that makes the gravity works
  } //else fall
  
  if(jump == true){
    if(p1Y <= maxHeight || jumpCounter >= jumpPower){
      if(p1Y >= minHeight){
        p1Y = minHeight;
      }
      else{
        velocity = fallingSpeed; //fall at maximums
      }
    }
    else{
      jumpSound.play();
      velocity = -jumpPower; //jumping
      jumpCounter = jumpCounter+1; // add to jump counter
    }
  }
  else{
    velocity = fallingSpeed;
  }

}

function keyPressed() {
  if(keyDown('LEFT_ARROW')){
    p1X = p1X-5; //move left
  }

  if(keyDown('RIGHT_ARROW')){
    p1X = p1X+5; //move right
  }
}

function keyTyped() {
  if(keyDown('UP_ARROW')){
    jump = true; //jump
  }
  else{
    jump = false; //don't jump
  }
}

//////preload
function preload() {
  royalholllowaybear = loadImage('multimedia/RoyalHollowayBear.png');
  platform = loadImage('multimedia/bricks.jpg');
  landscape = loadImage('multimedia/background.webp');
  jumpSound = loadSound('multimedia/cartoon-jump-6462.mp3');
  royalFont = loadFont('multimedia/smbfont.ttf');
  coin = loadImage('multimedia/Coins');
  coinSound = loadSound('multimedia/coin_sound.m4a');
  cctv = loadImage('multimedia/CCTV.png');
  lifeSound = loadSound('multimedia/lifesound.m4a');
  winSound = loadSound('multimedia/you-win-sfx-442128.mp3');
  loseSound = loadSound('multimedia/losing-horn-313723.mp3');
  themeSong = loadSound('multimedia/retro-game-arcade-236133.mp3');
}