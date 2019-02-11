class Ball
{
  constructor(world) {
    this.world = world;
    this.x = this.world.width / 2; //always stays on center of x-axis
    this.y = this.world.height / 2;
    this.speed = 0; //normal speed of moving w/o external force in y-axis
    this.diameter = 30;
    this.radius = this.diameter / 2;

    this.thrust = -7; //thrust up while jumping

    this.score = 0;

    this.img = ballimg;
  }

  applyWorldEffects() //apply gravity and stop at ground
  {
    if(this.y >= this.world.height - 10) //on ground!
    {
      this.speed = -5; //reversing by small amt
    }
    else if(this.y < 0) //going over roof
    {
      this.speed = 1; //reversing by small amt
    }
    else //falling
    {
      this.speed=this.speed + this.world.gravity; //gravity = 0.5
    }
  }

  jump() {
    this.speed = this.thrust;
  }

  keyCheck() {
    if(keyIsPressed || mouseIsPressed) {
      this.speed = this.speed - this.thrust;
    }
  }

  display() {
    fill(255); //white color
    image(this.img, this.x - this.radius, this.y - this.radius ,this.diameter+5,this.diameter+5);
    // ellipse(this.x , this.y , this.diameter , this.diameter); //to display circle
  }

  move() {
    this.y = this.y + this.speed;
  }
}