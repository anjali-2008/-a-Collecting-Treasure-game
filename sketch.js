var PLAY=1;
var END=0;
var gameState=1;

var survivalTime=0;

var monkey , monkey_running
var banana ,bananaImage
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
}


function draw() {
  background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime,100,50);
  
    if(gameState===PLAY){
      banana();
      obstacle();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
     }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
     }
   }
    
  if(gameState===END){
   FoodGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.x=1000;
   text("GameOver",150,200);
  }
    
  if(ground.x<0){
    ground.x=ground.width/2
  }
  
  
  if(keyDown("space")){
    monkey.velocityY=-12
  }

   monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  drawSprites();
}

function obstacle(){
   if (frameCount % 300 === 0){
   var obstacle = createSprite(400,305,10,40);
             
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    obstacle.velocityX=-8;
   obstacle.addImage(obstacleImage);
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
}

}

function banana(){
  if(World.frameCount%80===0){
    var banana=createSprite(400,350,20,20)
    banana.addImage(bananaImage);
    banana.y= Math.round(random(120,200));
    banana.scale=0.2;
    banana.velocityX=-8;
    banana.lifetime=50;
    FoodGroup.add(banana);
  }
}







