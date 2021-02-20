
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;
var turn=0;

const PLAY=1;
const END=0;
var gameState=PLAY;

var bg;
var txtcolor;

function preload()
{
  bg=color("black");
  txtcolor=color("black");
  fetchtime();
}

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  var abc=Math.round(random(1,10));
  abc=abc*50
  
  console.log(abc);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background(bg);
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  //console.log(score);
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
  /* if(frameCount%60===0){
     particles=new Particle(random(width/2-30, width/2+30), 10,10)
     score++;
   }*/
 
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   //To display the score

   textSize(30);
   fill(txtcolor)
   text("Score : "+score,20,35);

   if(particles!=null)
   {
     particles.display();

     if(particles.body.position.y>760)
     {
       if(particles.body.position.x<300)
       {
         score=score+500;
         //particles=null;
         if(turn===8)
         {
           gameState=END;
         }
       }
      
  
       if(particles.body.position.x>301&&particles.body.position.x<600)
       {
          score=score+100;
         // particles=null;
          if(turn===8)
          {
            gameState=END;
          }
       }

       if(particles.body.position.x>601&&particles.body.position.x<900)
       {
         score=score+200;
        // particles=null;
         if(turn===8)
         {
           gameState=END;
         }
       }
       particles=null;

     }
   }

   if(gameState===END)
   {
     push();
     strokeWeight(1);
     stroke("red")
     textSize(60);
     fill(txtcolor)
     text("GAME OVER",200,250);
     textSize(50);
     stroke("yellow")
     text("Press Space Key to Restart",100,340)
     pop();
   }

   fill(txtcolor)
   textSize(32);
   text("500",15,550);
   text("500",95,550);
   text("500",95+80,550);
   text("100",95+160,550);
   text("100",95+240,550);
   text("100",95+240+80,550);
   text("100",95+240+160,550);
   text("200",95+320+160,550);
   text("200",95+320+240,550);
   text("200",95+320+320,550);

   

  
}


function mousePressed()
{
  if(gameState!==END)
  {
    turn=turn+1;
    particles=new Particle(mouseX,10,10,10);

  }
}

function keyPressed()
{
  if(keyCode===32)
  {
    score=0;
    turn=0;
    gameState=PLAY;
  }
}

async function fetchtime()
{
    var time=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var data=await time.json();
    console.log(data);
    var hour=data.datetime.slice(11,13);
    if(hour>6 && hour<18)
    {
      bg=color("black");
      txtcolor=color("white")
    }
    else{
       bg=color("white")
       txtcolor=color("black")
    }
}
