//Create variables here
var dog,dog1;
var dogHappy;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood,foodObj,milkimage;
function preload()
{
  //load images here
  dog1=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
  
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

