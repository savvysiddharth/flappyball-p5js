var gwidth=600;
var gheight=600;

var min_space = 80; // minimum space b/w top & down bar
// var bwidth=30;
// var bheight=16; //any default val
// var btopx=gwidth;
var barspeed=2; //common for everybody
var minheight=0.125*gheight;
var maxheight=(gheight-min_space)/2; //80 is min space

var gameover = false;

function gameOver()
{
	noStroke();
	fill(255);
	textAlign(CENTER);
	textSize(32);
	text("GAME OVER!!",gwidth/2,gheight/2);
	textSize(16);
	text("Press space to reset..",gwidth/2,gheight/2+50);
	gameover=true;
}

class Bar 
{
	constructor(btopx)
	{
		this.bwidth=floor(random(30,80));
		this.topheight=random(minheight,maxheight);
		this.btopx=btopx;

		this.bottomheight=random(gheight-maxheight,gheight-minheight);

		this.marked = false;

		//colors
		this.red=random(50,255);
		this.green=random(50,255);
		this.blue=random(50,255);
	}

	display()
	{
		noStroke();
		fill(this.red,this.green,this.blue);
		rectMode(CORNERS);
		rect(this.btopx,0,this.btopx+this.bwidth,this.topheight);
		rect(this.btopx,gheight,this.btopx+this.bwidth,this.bottomheight);

		this.btopx=this.btopx-barspeed;
	}

	move()
	{
		this.btopx=this.btopx-barspeed;
	}

}

class Ball 
{
	constructor()
	{
		this.x=gwidth/2;
		this.y=0;
		this.speed=0.5;
		this.radius=30;

		this.thrust = 0.6; //thrust while key is pressed
	}

	gravity()
	{
		if(this.y >= gheight-10)
		{
			// console.log("GAME OVER!");
			// textAlign(CENTER);
			// textSize(32);
			// text("GAME OVER!!",gwidth/2,gheight/2);
			// gameover=true;
			gameOver();
			this.speed=0;
		}
		else
		{
			// gameover=false;
			//console.log("falling");
			this.speed=this.speed+0.5;
		}
	}

	keyCheck()
	{
		if(keyIsPressed || mouseIsPressed)
		{
			//console.log("key pressed");
			this.speed=this.speed - this.thrust;
		}
	}

	display()
	{
		ellipse(this.x,this.y,this.radius,this.radius);
		this.y=this.y + this.speed;
	}
}


var bar=[];
var totalBars=10;
var barspace=110;
var score = 0;
var levelscore = 1;
var level=1;

// var ball;

function setup()
{
	// ball = new Ball();
	createCanvas(gwidth,gheight);
	background(0);
	for(var i=0;i<=totalBars;i++)
	{
		bar[i]=new Bar(gwidth+(i*30)+(i*barspace));
	}
}


var ball = new Ball();
function draw()
{
	background(0);
	// console.log("score: "+score);
	if(!gameover)
	{
		for(var i=0;i<=totalBars;i++)
		{
			bar[i].display();
			if(!bar[i].marked) //collision check
			{
				//for top bars
				if(ball.y-ball.radius/2 <= bar[i].topheight && ball.x+ball.radius/2 >= bar[i].btopx)
				{
					console.log("touched top bar!");
					ball.speed = -ball.speed; //for bounce back effect
					gameOver();
				}

				//for bottom bars
				if(ball.x+ball.radius/2 >= bar[i].btopx && ball.y+ball.radius/2 >= bar[i].bottomheight)
				{
					console.log("touched bottom bar!");
					ball.speed = -ball.speed; //for bounce back effect
					gameOver();
				}
			}
			if(bar[i].btopx < (gwidth/2-ball.radius/2-bar[i].bwidth) && !bar[i].marked)
			{
				score = score + levelscore;
				bar[i].marked = true;
			}
		}
	}
	else
	{
		gameOver();
	}
	

	fill(255);
	noStroke();

	ball.gravity(); //order 2
	ball.keyCheck(); //order 1
	ball.display();

	if(bar[totalBars].btopx <= -bar[totalBars].bwidth)
	{
		if(level<25)
		{
			level++;
			// levelscore++; //incresing the increment in score at each level
			console.log("level: "+level);
			setup();
			barspeed++; //increse difficulty at each level
			barspace+=20;
		}
		else
		{
			textAlign(CENTER);
			textSize(30);
			text("YOU COMPLETED LEVEL:25, CONGRATS!!",gwidth/2,gheight/2);
		}
	}

	//scoreBoard
	fill(255);
	stroke(0);
	strokeWeight(4);
	rectMode(CORNER);
	rect(50,45,50,50);
	// noStroke();
	fill(255);
	textSize(24);
	textAlign(CENTER);
	text(score,75,75);
	text("LEVEL : "+level,75,150);

	// //DRAWING GRID
	// stroke(50);
	// var ctr=0;
	// while(ctr<=800)
	// {
	// 	line(ctr,0,ctr,800);
	// 	line(0,ctr,800,ctr);
	// 	ctr += 10;
	// }
	// //GRID COMPLETE

	// stroke(255);
	// ellipse(mouseX,mouseY,5,5);
	// line(mouseX,mouseY,mouseX,0);
	// line(mouseX,mouseY,0,mouseY);
	// fill(255);
	// textSize(16);
	// textAlign(LEFT);
	// text("X : "+ mouseX,10,20);
	// text("Y : "+ mouseY,10,40);
}

function keyPressed()
{
	ball.speed=-6;

	if(gameover==true && keyCode==32) //spacebar
	{
		//back to level 1
		ball.y=60;
		gameover=false;
		score=0;
		level=1;
		barspeed=2;
		barspace=110;
		setup();
	}
}

function mousePressed()
{
	ball.speed=-6;
}