class Food{
    constructor(){
        this.foodStock=0
        this.lastFed
        this.image = loadImage("images/Milk.png");
     }
    
    updateFoodStock(foodStock){
      this.foodStock=foodStock
      
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=foodStock-1
        }
    }
    getFoodStock(){
        return this.foodStock
    }

    display(){
        var x=80,y=100
        imageMode(CENTER);
        image(this.image,720,220,70,70)

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0)
                {
                    x=80+30
                    y=y+50
                }
            image(this.image,x,y,50,50)
            x=x+30
            }
         
               
                
            
        }
    }
    bedroom(){
        image(bedroom,350,350,280,280);
    }
    garden(){
      //  background(garden,350,450,250,250);
      image(garden,350,350,280,280);
    }
    washroom(){
        image(washroon,350,350,280,280);
    }

}