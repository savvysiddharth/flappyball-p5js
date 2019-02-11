class Scoreboard {
  constructor() {
    this.score = 0;

    this.box1 = document.getElementById('score');
    this.box1.innerHTML = "Score : "+this.score;

    this.history = [0];

    this.box2 = document.getElementById('hscore');
    this.box2.innerHTML = "High Score : "+this.highScore();
  }

  update() {
    this.box1.innerHTML = "Score : "+this.score;
  }

  resetScore() {
    this.history.push(this.score);
    this.score = 0;
    this.update();
    this.updateHighScore();
  }

  updateHighScore() {
    this.box2.innerHTML = "High Score : "+this.highScore();
    this.history = [this.highScore()];
  }

  highScore() {
    let max = this.history[0];
    for (let score of this.history) {
      if (score > max)
        max = score;
    }
    return max;
  }
}

let world;
let scoreboard;

function preload() {
  console.log('helop');
  ballimg = loadImage('ball5.png')
  bgImg = loadImage('bg5.jpg');
  barImg = loadImage('wood2.jpeg');
}

function setup() {
  scoreboard = new Scoreboard();
  world = new World(700,500);

  createCanvas(world.width,world.height);
  background(0);
}

let bgX = 0;
let parallax = 0.5;

let gamePause = true;
let firstStart = true;

collisionDetection = true;

function draw() {
  background(0);
  image(bgImg, bgX, 0, bgImg.width, height);
    bgX -= world.speed * parallax;


    // this handles the "infinite loop" by checking if the right
    // edge of the image would be on the screen, if it is draw a
    // second copy of the image right next to it
    // once the second image gets to the 0 point, we can reset bgX to
  // 0 and go back to drawing just one image.
  //Orignal code from - https://codingtrain.github.io/Flappy-Bird-Clone/sketch.js (line 52-57)
    if (bgX <= -bgImg.width + width) {
      image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
      }
    }


  //BALL
  world.ball.applyWorldEffects();
  world.ball.move();
  world.ball.display();


  //BARS
  if (world.isLastBarGone())
    world.resetBars(); //reset all bars
  for (let i=0;i<world.totalBars;i++) {
    world.bar[i].move();
    world.bar[i].display();
    let justmarked = world.bar[i].markIfVisited(world.ball.diameter);
    if (justmarked) {
      world.ball.score++;
      scoreboard.score = world.ball.score;
      scoreboard.update();
    }
    if (!world.bar[i].marked) {
      // console.log('checking collision.');
      if (world.barBallCollision(world.bar[i]) && collisionDetection ) {
        gamePause = true;
        textSize(62);
        fill(255);
        textAlign(CENTER);
        textStyle(BOLD);
        strokeWeight(5);
        stroke(0);
        text('GAME OVER',world.width/2,world.height/2);
        textSize(16);
        text('press space to start again',world.width/2,world.height/2+50);
        console.log('oops');
        noLoop();

        world.resetBars();
        world.ball.score = 0
        scoreboard.resetScore();
        break;
      }
    }
  }

  if(firstStart) {
    textSize(62);
    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    strokeWeight(10);
    stroke(0);
    text('flappyBird clone',world.width/2,world.height/2);
    textSize(16);
    text('press any key to start',world.width/2,world.height/2+50);
    noLoop();
  }
}

function keyPressed() {
  world.ball.jump();
  if(firstStart) {
    firstStart = false;
    loop();
  }
  if(gamePause && !firstStart && key==' ') {
    gamePause=false;
    loop();
  }
}
