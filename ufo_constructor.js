//Topic 1.2
//Object orientation revisted
//UFO

var flyingSaucers;
var trees;
var clouds;
var penguinManager;

function setup(){
    
    createCanvas(1600,600);
    noStroke();
    
    
    ufo = new Ufo(width/2,100);

    penguin = new Penguin(width/2, height - 100, 500, 1);
    
    penguinManager = new PenguinManager(-900, height - 100, 800, 0);
    
    trees =[
    {x_pos:  100,  y_pos: height/2 + 55, width: 70, height: 120},
    {x_pos:  300,  y_pos: height/2 + 55, width: 70, height: 120},
    {x_pos:  600,  y_pos: height/2 + 55, width: 70, height: 120},
    {x_pos:  900,  y_pos: height/2 + 55, width: 70, height: 120},
    {x_pos:  1500,  y_pos: height/2 + 55, width: 70, height: 120},
     ];
    
    clouds=[
        {x_pos: 250,  y_pos: 50, size:  60,  radius: 75}, 
        {x_pos: 600,  y_pos: 150, size: 60,  radius: 70}, 
        {x_pos: 1000, y_pos: 250, size: 60,  radius: 80}, 
        ];

}

function draw(){
    
    drawBackround();
    drawTrees();
    drawClouds();
    drawMoon();

    penguinManager.update();
    penguinManager.draw()
    penguin.draw();
    
    ufo.hover();
    ufo.draw();
    if(ufo.beam_on){   
        
        var boundary = ufo.getBeamBoundaries();
        penguinManager.levitatePenguins(boundary, ufo.x, ufo.y);
    }
    
}

function drawBackround(){
    
    //Drawing Sky Background
    background(55,0,88);
    
    //Drawing Snow
    fill(255, 250, 250);
    rect(0,height - 100, width, 100);
    
}
function drawMoon(){
    
        fill(245,245,245); //Moon
        noStroke();
        ellipse(width,height-height,150);
        fill(169,169,169);
        ellipse(width-10,height-height +25,15);
        ellipse(width-40,height-height,+50, 50);
        ellipse(width-30,height-height +45,5);
    
    }		
function drawTrees(){
    for(var i = 0; i < trees.length; i++){
        
        //Trees Trunks
        fill(120, 100, 40);

        ellipse(
            trees[i].x_pos + 25,trees[i].y_pos + 85 ,trees[i].width, trees[i].height
        );

        rect(
            trees[i].x_pos, trees[i].y_pos - 5, trees[i].width - 20, trees[i].height + 30
        );

        //Trees Branches
        fill(0,100,0);

        triangle(
            trees[i].x_pos - 30, 
            trees[i].y_pos + 50, 
            trees[i].x_pos + 30, 
            trees[i].y_pos - 50, 
            trees[i].x_pos + 90, 
            trees[i].y_pos + 50
        );

        triangle(
            trees[i].x_pos - 20, 
            trees[i].y_pos, 
            trees[i].x_pos + 30, 
            trees[i].y_pos - 100, 
            trees[i].x_pos + 80, 
            trees[i].y_pos
        );

        triangle(
            trees[i].x_pos - 60, 
            trees[i].y_pos + 118, 
            trees[i].x_pos + 30, 
            trees[i].y_pos + 12, 
            trees[i].x_pos + 120, 
            trees[i].y_pos + 118
        );
        
            fill(255)
            beginShape(TRIANGLES);
                   
            //Left Branch Snow
            vertex(trees[i].x_pos + 5,
            trees[i].y_pos - 50,)
        
            vertex(trees[i].x_pos + 24, 
            trees[i].y_pos - 90,)
        
            vertex(trees[i].x_pos + 30, 
            trees[i].y_pos - 90,)
        
            //Right Branch Snow
            vertex(trees[i].x_pos + 56,
            trees[i].y_pos - 48,)
        
            vertex(trees[i].x_pos + 30, 
            trees[i].y_pos - 90,)
        
            vertex(trees[i].x_pos + 36, 
            trees[i].y_pos - 90,)
        
            //Middle Branch Snow
            vertex(trees[i].x_pos + 27,
            trees[i].y_pos - 70,)
        
            vertex(trees[i].x_pos + 25, 
            trees[i].y_pos - 90,)
        
            vertex(trees[i].x_pos + 35, 
            trees[i].y_pos - 90,)
        
            //Crown Branch Snow
            vertex(trees[i].x_pos + 24,
            trees[i].y_pos - 90,)
        
            vertex(trees[i].x_pos + 30, 
            trees[i].y_pos - 101,)
        
            vertex(trees[i].x_pos + 36, 
            trees[i].y_pos - 90,)

        endShape();
   }
}
function drawClouds(){
    
    for(var i = 0; i < clouds.length; i++){
        
        fill(220,220,220);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size + 20, clouds[i].radius + 50);
        
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos,clouds[i].size,  clouds[i].radius);
        
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos,clouds[i].size,  clouds[i].radius );
        
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos,clouds[i].size + 20,clouds[i].radius + 50);
        
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].radius);
        
        ellipse(clouds[i].x_pos + 80, clouds[i].y_pos,clouds[i].size, clouds[i].radius);
        
        //Drawing Movement of Clouds
        clouds[i].x_pos+= 0.2;
        
        
        //Redrawing of Clouds that run off the Canvas
        if(clouds[i].x_pos >= 800){
            
            clouds[i].x_pos = 0;
        }
        
    }
        
}
function Ufo(x,y){
        
        //Public Variables
        this.x            = x;
        this.y            = y;
        this.beam_on      = false;

        //Private Variables

        var ufo_width = random(150,250);
        var ufo_height = random(75,125);
        var window_width = random(0.65,0.85);
        var window_height = random(0.75,1);
        var base_height = random(0.25,0.5);
        var num_lights = floor(random(5,25));
        var light_inc = floor(random(5,10));
        var brightnesses = [];
        var beamWidth = 140;

            
        this.draw = function (){
            

            //Calling Hovering Effect

            if(this.beam_on == true){

                this.beam();
            }


            //Drawing the UFO
            fill(175,238,238);
            arc(
                this.x,
                this.y,
                ufo_width * window_width,
                ufo_height * window_height,
                PI,TWO_PI);

            fill(150);
            arc(
                this.x,
                this.y,
                ufo_width,
                ufo_height/2,
                PI,TWO_PI);

            fill(50);
            arc(
                this.x,
                this.y,
                ufo_width,
                ufo_height * base_height,
                0,PI);
            
            //Drawing the lights
            var incr = (ufo_width/(num_lights -1)); 

            for(var i = 0; i < num_lights; i++)
            {

                var x = this.x - ufo_width/2 + i * incr;
                fill(brightnesses[i]);
                ellipse(
                    x,
                    this.y,
                    5,
                    5
                )
                brightnesses[i] += light_inc;
                if(brightnesses[i] > 255)
                {
                    brightnesses[i] = 100;
                }
            }
        }   
        this.hover = function(){
            
            this.x += random(-2, 2);
            this.y += random(-1, 1);
            
            if(this.beam_on && random() > 0.995){
                
                    this.beam_on = false;
                    }
            else if(!this.beam_on && random() > 0.999){
                
                    this.beam_on = true;
            }
        }    
        this.beam = function(){
             
            //Induces Flickering
        if(random() > 0.25){
            fill(255,255,100,150);
            beginShape();
            vertex(this.x - 25,this.y + ufo_height * base_height * 0.5);
            vertex(this.x + 25,this.y + ufo_height * base_height * 0.5);
            vertex(this.x + beamWidth/2,height - 100);
            vertex(this.x - beamWidth/2,height - 100);
            endShape();
        }
    };  
        this.getBeamBoundaries = function(){
            
            var boundaries = [];
            boundaries.push(this.x - beamWidth/2);
            boundaries.push(this.x + beamWidth/2);
            return boundaries;

    }  
        
        for(var i = 0; i < num_lights; i++){
            
            brightnesses.push((i * light_inc * 2)%255);
        }
}
     
function Penguin(x, y, range, speed){
    
    this.x = x;
    this.y = y;
    this.range = range;
    this.speed = speed;
    this.flyingSaucerRef = null;
    this.flagForDeletion = false;
    this.isFrozen = false;
    
    
    this.currentX = x;
    this.increment = random(1,3);
    
    this.walk = function(){
        
        this.currentX += this.increment;
        if(this.currentX >= this.x + this.range){
            
                this.increment -= speed;
            }
        else if(this.currentX < this.x){
            
                this.increment += speed;
            }
        
    }
    this.draw = function(){   
        
        this.walk();
        fill(255,0,0)
  
      //drawing the body
        noStroke();
        fill(0);
        ellipse(this.currentX, this.y - 35, 23, 25); //draw head
        ellipse(this.currentX, this.y - 20, 33, 40); // draw body

        fill(255);
        ellipse(this.currentX, this.y - 14.5, 23.5, 28); //draw belly

        noStroke();
        ellipse(this.currentX, this.y -10, 24, 20); //drawing belly outline

        noStroke();
        smooth();
        fill(255,160, 122);
        triangle(this.currentX - 5, this.y - 34, this.currentX + 5, this.y - 34, this.currentX, this.y - 26); // drawing the mouth

        fill(255,255,240);
        ellipse(this.currentX - 2.5, this.y - 38,   7, 5 ); //draw eyes
        ellipse(this.currentX + 2.5, this.y - 37.3, 7, 8 ); //draw eyes 2

        fill(0);
        ellipse(this.currentX - 2.5, this.y - 38, 1 , 2); //draw iris
        ellipse(this.currentX + 2.5, this.y - 38, 1 , 2); //draw iris 2

        fill(255,160,122)
        stroke(0);
        strokeWeight(0.2);
        arc(this.currentX - 5, this.y + 2, 10, 10, PI, 2*PI);//draw feet
        arc(this.currentX + 5, this.y + 2, 10, 10, PI, 2*PI);//draw feet

        fill(128)
        noStroke();
        arc(this.currentX - 14, this.y - 20, 5, 20, 1.2*PI/2, 3*PI/2); //draw arm
        arc(this.currentX + 15, this.y - 20, 5, 20, 3*PI/2, 0.8*PI/2); //draw arm    
            
    }
    
    } 
function PenguinManager(){
    
        this.minPenguins = 10;
        this.penguins = [];
        
        this.update = function(){
            
            //Adding new penguins if necessary
            if(this.penguins.length < this.minPenguins){
                
                    this.penguins.push(new Penguin(100, height - 100, 1400, 0.5 ))
            }
            
                        
            for(var i = 0; i < this.penguins.length; i++){
                
                        if(!this.penguins[i].isFrozen){
                            
                            if(this.penguins[i].y < height - 100){
                                
                                //Drawing falling penguins
                                this.penguins[i].y += 3;
                            }
                        else{
                            
                                //Drawing regular walking penguins
                                this.penguins[i].walk();
                            
                                if(this.penguins[i].x > width + 200){
                                    this.penguins[i].x = -200;
                                }
                            
                                else if(this.penguins[i].x < -200)
                                    {
                                        this.penguins[i].x = width + 200;
                                    }       
                        }
                    }  
                        else{
                            //Resetting next frame
                            this.penguins[i].isFrozen = false;
                        }
            }
            
            //Removing old pengiuns
            for(var i = this.penguins.length - 1; i >= 0; i --){
                
                    if(this.penguins[i].flagForDeletion){
                        
                            this.penguins.splice(i,1);
                    }
            }
        }
            

        
        this.draw = function(){
            
            for(var i = 0; i < this.penguins.length; i++){
                
                this.penguins[i].draw();
            }
        }
        this.checkForPenguins = function(x1, x2){
            
                //Returning all penguins between the two points
                var penguins = [];
                
                for(var i = 0; i < this.penguins.length; i++){
                    
                        if(this.penguins[i].x >= x1 && this.penguins[i].x <= x2){
                            
                                penguins.push(this.penguins[i]);
                        }
                }
            return penguins;
        }
        
//        this.checkContact = function(gc_x, gc_y){
//        
//        var distance = dist(gc_x, gc_y, this.currentX, this.y)
//            if(distance < 10){
//                
//                    return true;
//                }
//            return false;
//        }
     
       
        this.levitatePenguins = function(boundaries, x_anchor, y_cutoff){
        
                        var penguins = this.checkForPenguins(boundaries[0], boundaries[1]);
        
                        //Beaming Penguins up
                        for(var i = 0 ; i < penguins.length; i++){ 
                            
                        penguins[i].x = x_anchor;
                        penguins[i].y -= 10;
                        penguins[i].isFrozen = true;

                        if(penguins[i].y < y_cutoff){
                            
                            penguins[i].flagForDeletion = true;
                        }
                    }
        }
        
        
}
        
        
    


    

    