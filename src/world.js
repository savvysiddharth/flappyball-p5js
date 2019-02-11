class World { //world consist of bars and a ball

  constructor(width,height) {
    this.width = width;
    this.height = height;

    this.gravity = 0.5;
    this.speed = 2; //how speed are bars going

    this.totalBars = 10;
    this.barspace = 200;
    this.bar = []; //array of all bar objects

    //a description of world in small packet
    this.metadata = {
      width : this.width,
      height : this.height,
      gravity : this.gravity,
      speed : this.speed
    };

    this.ball = new Ball(this.metadata);

    for (let i=0;i<this.totalBars;i++) {
      this.bar[i] = new Bar(this.width+(i*30)+(i*this.barspace),this.metadata);
    }
  }

  //sets all bars of world
  resetBars() {
    this.bar = []; //dereferencing old bars (imp)
    for (let i=0;i<this.totalBars;i++) {
      this.bar[i] = new Bar(this.width+(i*30)+(i*this.barspace),this.metadata);
    }
  }

  isLastBarGone() {
    let lastBar = this.totalBars-1; //index of last bar
    if (this.bar[lastBar].posx <= -this.bar[lastBar].width) {
      return true;
    }
    return false;
  }

  barBallCollision(bar) {
    let ballTopY = this.ball.y - this.ball.radius;
    let ballRightX = this.ball.x + this.ball.radius;
    let ballBottomY = this.ball.y + this.ball.radius;
    if (ballTopY <= bar.topheight && ballRightX >= bar.posx) {
      return true;
    }
    if (ballBottomY >= bar.bottomheight && ballRightX >= bar.posx) {
      return true;
    }
  }
}