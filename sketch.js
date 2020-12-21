var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyImage = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkeyImage);
  monkey.scale=0.15;
  
  ground=createSprite(400,350,900,5);
  ground.velocityX=-4;
  
  //monkey.addAnimation(monkeyImage);
  
  
  
  //console.log(ground.x);
foodGroup = createGroup();
obstacleGroup = createGroup();
  
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
  }
    
    
    survivalTime=Math.round(frameCount/frameRate());
    //score = Math.round(frameRate() / 3);
    ground.velocityX=-(4+2*score / 100);
    
    if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }

    fruits();
    stones();
  
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
      monkey.changeAnimation("collided",monkeyImage);
    }
}
  else if(gameState === END){
    ground.velocityX=0;
    obstacleGroup.setVelocityEach(0);
    foodGroup.setVelocityEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
    
    textSize(40);
    fill("red");
    textFont("Algerian");
    text("GAME OVER ",200,200);
  }
  
  monkey.velocityY = monkey.velocityY + 0.7;
  monkey.collide(ground);
  
  /*textSize(20);
  fill("black");
  text("score:" + score,500,50);*/
  
  textSize(20);
  fill("black");
  text("survivaltime:"+survivalTime,400,50)
    
 drawSprites();
  
  
}
function fruits(){
if(frameCount%150===0){
var fruit=createSprite(650,400,10,10);
  fruit.addImage("banana",bananaImage);
  fruit.velocityX=-(4+0*score / 100);
  fruit.y=Math.round(random(120,200));
  foodGroup.add(fruit);
  foodGroup.setlifetimeEach=185;
  fruit.scale=0.1;
  fruit.setCollider("rectangle",0,0,400,400);
  }
 }

function stones(){
if(frameCount%300===0){
var stone=createSprite(650,325,10,10);
  stone.addImage("obstacle",obstacleImage);
  stone.velocityX=-(4+0*score / 100);
  obstacleGroup.add(stone);
  obstacleGroup.setlifetimeEach=185;
  stone.scale=0.15;
  stone.setCollider("circle",0,0,200);
  }
}


