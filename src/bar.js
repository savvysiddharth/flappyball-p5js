class Bar
{
  constructor(posx,world) //creates bar with x position and depending on world size (here world is just metadata of world)
  {
    this.world = world;

    this.width = 50;
    // this.width = floor(random(45,90)); //width of bar

    this.posx = posx; //right side x position

    let minGap = 100;
    let maxGap = 300;

    this.topheight = random(0,world.height-minGap);
    this.bottomheight = random(minGap+this.topheight,maxGap+this.topheight);

    this.marked = false; //should be checked for collision or not (check if false)

    this.texture = barImg;
  }

  display() {
    noStroke();

    image(this.texture, this.posx , 0, this.width , this.topheight);
    image(this.texture, this.posx , this.bottomheight , this.width , world.height - this.bottomheight);
  }

  move() {
    this.posx = this.posx - this.world.speed;
  }

  //returns true if marked
  markIfVisited(balldiameter) {
    let ballLeftEndx = this.world.width/2 - balldiameter/2 - this.width; //included width of bar
    if(this.posx < ballLeftEndx && !this.marked ) {
      this.marked = true;
      return true;
    }
    return false;
  }

}