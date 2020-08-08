//Create variables here
var dog,dog1;
var dogHappy;
var database;
var foodS,foodStock;
function preload()
{
  //load images here
  dog1=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,300,40,40);
  dog.addImage(dog1);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,85)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImage);
}
  drawSprites();
  //add styles here
  textSize(30);
  text("foodStock:"+foodStock,200,60)

}
function readStock(data){
  foodS=data.val
}
function writeStock(x){
  database.ref('/').update({
    food:x
  })
  if(x<=0){
    x-=0;
  }
  else{
    x=x-1;
  }
 
}


