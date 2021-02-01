var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var divisions=[]
var particles = [];
var plinkos = [];

var divisionHeight=300;
var score = 0;

var particle = []
var turn = 0

var PLAY = 1
var END = 0
var gameState=PLAY

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


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
  background("black");

  textSize(40)
  fill(255)
  text("Score :" + score, 20,30)

  text("500" ,7,600)
  text("500" ,87,600)
  text("500" ,167,600)
  text("500" ,247,600)
  text("100" ,327,600)
  text("100" ,407,600)
  text("100" ,487,600)
  text("200" ,567,600)
  text("200" ,647,600)
  text("200" ,727,600)
  
  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  
  //if(frameCount%60===0){
    //particle=new Particle(mouseX,10,10,10)
    //particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    //score++;
  //}

  if(particle !== null) {//particle.display()}
    for (var j = 0; j < particle.length; j++) {
      if(particle[j]!==null){
        particle[j].display();
        if(particle[j].body.position.y>760){
          if(particle[j].body.position.x<300){
            score=score+500
          }
          if(particle[j].body.position.x<560 & particle[j].body.position.x>300){
            score=score+100
          }
          if(particle[j].body.position.x>560){
            score=score+200
          }
          particle.pop()
          if(turn>=5) gameState=END
        }
      }
    }
  }
  
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  if(gameState==END){
    text("Game Over",300,450)
    textFont(60)
  }

}



function mousePressed(){
  if(gameState!==END){
    turn++
    particle.push(new Particle(mouseX,10,10))
  }
}

