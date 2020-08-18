//Create variables here
var dog,dog1;
var dogHappy;
var database;
var foodS,foodStock,currentTime;
var fedTime,lastFed,gameState,readState,saddog;
var feed,addFood,foodObj,milkimage,bedroom,garden,washroon;
function preload()
{
  //load virtual pet images here
  dog1=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
  bedroom=loadImage("virtual pet images/Bed Room.png");
  garden=loadImage("virtual pet images/Garden.png");
  washroon=loadImage("virtual pet images/Wash Room.png");
  saddog=loadImage("virtual pet images/deadDog.png")

}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,300,40,40);
  dog.addImage(dog1);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(380,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(470,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food()

  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val();
  })
}


function draw() {  
  background(46,139,85)
//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
 // dog.addImage(dogHappy);
//}
foodObj.display();
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val()
});
  drawSprites();
  //add styles here
  fill("red");
  textSize(30);
  text("foodStock:"+foodS,200,60)

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+"PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed :12 AM",350,30);
   }
   else{
     text("Last Feed :"+lastFed+"AM",350,30);
   }

   if(gameState!="hungry"){
     feed.hide();
     addFood.hide();
     dog.remove()
   }else{
     feed.show();
     addFood.show();
     dog.addImage(saddog);
     image(saddog,350,350,280,280)
   }

   currentTime=hour();
   if(currentTime==22){
     update("playing");
     foodObj.garden();
     feed.hide();
     addFood.hide();
     hide();
   }else if(currentTime==21){
    update("sleeping");
    foodObj.bedroom()
    feed.hide();
     addFood.hide();
     hide();
   }else if(currentTime==20){
     update("bathing");
     foodObj.washroon()
     feed.hide();
     addFood.hide();
     hide();
   }else{
     update("hungry");
     foodObj.display();
     dog.addImage(saddog);
    // if(mousePressed(feedDog)){
     // image(dog1,350,350,280,280);
   // }
   
   }
  
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
/*function getFoodStock(){
  var fsr=database.ref('LastFeed')  ;
  fsr.on("value",feedDog);
 }*/
function feedDog(){
  dog.addImage(dogHappy);
  
  foodObj.updateFoodStock(foodObj. getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
   // foodS:foodS-1
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
   
  })
}
function hide(){
  feed.hide();
  addFoods.hide();
}
