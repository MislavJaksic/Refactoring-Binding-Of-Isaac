/*
Canvas coordinate system:
 ---------------------------------------------->
| x=0, y=0
|
|
|
|
V                x=canvas.width, y=canvas.height
*/

/* Variables */

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var x_character = canvas.width / 2;
var y_character = canvas.height / 2;
var character_radius = 20; 
var character_health = 6; //each health is represented by half a heart
var character_colour = "orange";

var bullets = [];
var enemy_bullets = [];

var room_counter = 0;

var dx = 2;
var dy =- 2;

var door_number; // a candidate for deletion
var randomly_generated_door;
var randomly_generated_level;

var half_heart_y = 50;

var right_arrow_pressed = false;
var left_arrow_pressed = false;
var up_arrow_pressed = false;
var down_arrow_pressed = false;

var d_pressed = false;
var a_pressed = false;
var w_pressed = false;
var s_pressed = false;

var wall_thickness_one = 20;
var wall_thickness_two = 50;
var wall_length = (canvas.width / 2) - 50;
var wall_height = (canvas.height / 2) - 50;

var x_wall_offset = canvas.width - wall_thickness_one;
var y_wall_offset = canvas.height - wall_thickness_one;

var door_size = 80;

var x_door_offset = (canvas.width / 2) - (door_size / 2);
var y_door_offset = (canvas.height / 2) - (door_size / 2);

var starting_room_wall_colour = "blue";
var starting_room_door_colour = "red";
var heart_colour = "red";

/* Score Display/Graphics */

/* Timer delay on shots */
var shooting_delay = false;

/* Damage delay function */
var player_invincible = false;

/* Damage delay on enemies */
var enemy_invincible = false;

var plus_height = (canvas.height / 2) + 30;
var minus_height = (canvas.height / 2) - 30;
var plus_width = (canvas.width / 2) + 30;
var minus_width = (canvas.width / 2) - 30;

var impassible_objects_array = [];

/* Levels */

var levels=[
  {  

      /* Starting room */
      
    level: function(){
      /* Control Tutorial */
      DisplayTutorialText()
      
      if (MoveForwardOnXAndCheckOuterWallCollision()) {
        x_character += 5;
      };
      if (MoveBackOnXAndCheckOuterWallCollision()) {
        x_character -= 5;
      };
      if (MoveBackOnYAndCheckOuterWallCollision()) {
        y_character -= 5;
      };
      if (MoveForwardOnYAndCheckOuterWallCollision()) {
        y_character += 5;
      };

    },
    
    status: 1
    
  },
  {
    /* Level 1 */
    /* Turret level */
    enemies:{ 
        
      enemy1:{
        enemyLength: 30,
        enemyThickness: 30,
        x: 305,
        y: 185,
        
        
        spawn: function(){
        
          context.beginPath();
          context.rect(this.x , this.y, this.enemyLength, this.enemyThickness);
          context.fillStyle = "gold";
          context.fill();
          context.closePath();
          
        
        },


        
        health: 3,
        enemyFire: true 

      },
      
      
    enemy2:{
      
        x: 50,
        y: 50,
        enemyLength: 30,
        enemyThickness: 30,
        
        spawn: function(){
          

          context.beginPath();
          context.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
          context.fillStyle = "gold";
          context.fill();
          context.closePath();
        
        },

        
        health: 3 ,
        enemyFire: true 

      },
      
      
      enemy3:{
      
        x: 560,
        y: 50,
        enemyLength: 30,
        enemyThickness: 30,
        
        spawn: function(){
          

          context.beginPath();
          context.rect(this.x , this.y, this.enemyLength, this.enemyThickness);
          context.fillStyle = "gold";
          context.fill();
          context.closePath();
        
        },

        
        health: 3,
        enemyFire: true  

      },
      
      
      enemy4:{
      
        x: 50,
        y: 320,
        enemyLength: 30,
        enemyThickness: 30,
        
        spawn: function(){
          

          context.beginPath();
          context.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
          context.fillStyle = "gold";
          context.fill();
          context.closePath();
        
        },

        
        health: 3,
        enemyFire: true  

      },
      
      
      enemy5:{
      
        x: 560,
        y: 320,
        enemyLength: 30,
        enemyThickness: 30,
        
        spawn: function(){
          

          context.beginPath();
          context.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
          context.fillStyle = "gold";
          context.fill();
          context.closePath();
        
        },

        
        health: 3,
        enemyFire: true  

      },
      
      
      /* enemy shooting */
      
      
      drawenemyShot: function(){
        if(enemy_bullets.length>0){
        for(i=0;i<enemy_bullets.length;i++){

                context.beginPath();
                context.arc(enemy_bullets[i].enemyBulletx, enemy_bullets[i].enemyBullety, 5, 0, Math.PI*2);
                context.fillStyle = "black";
                context.fill();
                context.closePath();
          enemy_bullets[i].enemyBulletx+=enemy_bullets[i].enemyBulletvx;
          enemy_bullets[i].enemyBullety+=enemy_bullets[i].enemyBulletvy; 
          
          
          if(enemy_bullets[i].enemyBulletx > x_character-character_radius && enemy_bullets[i].enemyBulletx < x_character+character_radius && enemy_bullets[i].enemyBullety > y_character-character_radius && enemy_bullets[i].enemyBullety < y_character+character_radius ){
          DamageDelay();
          
          }
          
          }}
    },
        
      enemyShoot:function(){
      
        /*enemy1 shooting*/
        
        var currentDate = new Date();
        if(currentDate.getMilliseconds()<50 && currentDate.getMilliseconds()>0 ){
        this.enemy1.enemyFire=true;
        this.enemy2.enemyFire=true;   
        this.enemy3.enemyFire=true;
        this.enemy4.enemyFire=true;
        this.enemy5.enemyFire=true;}

        
        
        if(this.enemy1.health>0 && this.enemy1.enemyFire==true){
          var distx = (x_character - character_radius/2) - this.enemy1.x;
          var disty = (y_character - character_radius/2) - this.enemy1.y;
          var distance = Math.sqrt((distx*distx) + (disty*disty)); 
          var killx = distx / (distance - character_radius/2);
          var killy = disty / (distance - character_radius/2);
          
        if (x_character < 470 && x_character > 190 && distance>this.enemy1.enemyLength+10){
          enemy_bullets.push({
          enemyBulletx: this.enemy1.x+this.enemy1.enemyLength/2,
          enemyBullety: this.enemy1.y+this.enemy1.enemyThickness/2,
          enemyBulletvx: killx*2,
          enemyBulletvy: killy*2
          });
          this.enemy1.enemyFire=false;
          }
        }
        /*enemy2 shooting*/
        if(this.enemy2.health>0 && this.enemy2.enemyFire==true){
        if(y_character > this.enemy2.y-character_radius && y_character < this.enemy2.y+30+character_radius && x_character > this.enemy2.x+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy2.x+this.enemy2.enemyLength/2,
        enemyBullety: this.enemy2.y+this.enemy2.enemyThickness/2,
        enemyBulletvx: 3,
        enemyBulletvy: 0
        });
          this.enemy2.enemyFire=false;
          }
        else if (x_character > this.enemy2.x-character_radius && x_character < this.enemy2.x+30+character_radius && y_character > this.enemy2.y+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy2.x+this.enemy2.enemyLength/2,
        enemyBullety: this.enemy2.y+this.enemy2.enemyThickness/2,
        enemyBulletvx: 0,
        enemyBulletvy: 3
        });
          this.enemy2.enemyFire=false;
          }
        }
        /*enemy3 shooting*/
            if(this.enemy3.health>0  && this.enemy3.enemyFire==true){
        if(y_character > this.enemy3.y-character_radius && y_character < this.enemy3.y+30+character_radius && x_character < this.enemy3.x+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy3.x+this.enemy3.enemyLength/2,
        enemyBullety: this.enemy3.y+this.enemy3.enemyThickness/2,
        enemyBulletvx: -3,
        enemyBulletvy: 0
        });
          this.enemy3.enemyFire=false;
          }
        else if (x_character > this.enemy3.x-character_radius && x_character < this.enemy3.x+30+character_radius && y_character > this.enemy3.y+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy3.x+this.enemy3.enemyLength/2,
        enemyBullety: this.enemy3.y+this.enemy3.enemyThickness/2,
        enemyBulletvx: 0,
        enemyBulletvy: 3
        });
          this.enemy3.enemyFire=false;
          }
        }
        /*enemy4 shooting*/
            if(this.enemy4.health>0  && this.enemy4.enemyFire==true){
        if(y_character > this.enemy4.y-character_radius && y_character < this.enemy4.y+30+character_radius && x_character > this.enemy4.x+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy4.x+this.enemy4.enemyLength/2,
        enemyBullety: this.enemy4.y+this.enemy4.enemyThickness/2,
        enemyBulletvx: 3,
        enemyBulletvy: 0
        });
          this.enemy4.enemyFire=false;
          }
        else if (x_character > this.enemy4.x-character_radius && x_character < this.enemy4.x+30+character_radius && y_character < this.enemy4.y+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy4.x+this.enemy4.enemyLength/2,
        enemyBullety: this.enemy4.y+this.enemy4.enemyThickness/2,
        enemyBulletvx: 0,
        enemyBulletvy: -3
        });
          this.enemy4.enemyFire=false;
          }
        }
        /*enemy5 shooting*/
        if(this.enemy5.health>0  && this.enemy5.enemyFire==true){
        if(y_character > this.enemy5.y-character_radius && y_character < this.enemy5.y+30+character_radius && x_character < this.enemy5.x+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy5.x+this.enemy5.enemyLength/2,
        enemyBullety: this.enemy5.y+this.enemy5.enemyThickness/2,
        enemyBulletvx: -3,
        enemyBulletvy: 0
        });
          this.enemy5.enemyFire=false;
          }
        else if (x_character > this.enemy5.x-character_radius && x_character < this.enemy5.x+30+character_radius && y_character < this.enemy5.y+15){
      
        enemy_bullets.push({
        enemyBulletx: this.enemy5.x+this.enemy5.enemyLength/2,
        enemyBullety: this.enemy5.y+this.enemy5.enemyThickness/2,
        enemyBulletvx: 0,
        enemyBulletvy: -3
        });
          this.enemy5.enemyFire=false;
          }
        }
        
    }


      },
    
    level: function(){

      DrawInnerWallsInTurretLevel()
      
        //door closing
      if( this.active==1){
        context.beginPath();
        context.rect(0, 0, canvas.width, wall_thickness_one);
        context.rect(0, 0, wall_thickness_one, canvas.height);
        context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
        context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
      };
      
      
      
      if(this.enemies.enemy1.health>0){
        this.enemies.enemy1.spawn();
      };

      if(this.enemies.enemy2.health>0){
        this.enemies.enemy2.spawn();
      };

      if(this.enemies.enemy3.health>0){
        this.enemies.enemy3.spawn();
      };

      if(this.enemies.enemy4.health>0){
        this.enemies.enemy4.spawn();
      };

      if(this.enemies.enemy5.health>0){
        this.enemies.enemy5.spawn();
      };
      
      this.enemies.drawenemyShot();
      this.enemies.enemyShoot();
    
      /* Level 1 Movement */
      /* Right */
      if(this.active == 0){
        if (
          (x_character == canvas.width-120-character_radius && (y_character > 120 && y_character < canvas.height-120))
          ||
          (x_character == canvas.width-200-character_radius && ((y_character > 100-character_radius && y_character < 120+character_radius) || (y_character > canvas.height-120-character_radius && y_character < canvas.height-100+character_radius)))
          ||
          (x_character == 100-character_radius && (y_character > 100-character_radius && y_character < canvas.height-100+character_radius))
          ){}
          
        else if (MoveForwardOnXAndCheckOuterWallCollision()){
          x_character += 5;
        }
      }
      
      else{
          if (
        (x_character == canvas.width-120-character_radius && (y_character > 120 && y_character < canvas.height-120))
        ||
        (x_character == canvas.width-200-character_radius && ((y_character > 100-character_radius && y_character < 120+character_radius) || (y_character > canvas.height-120-character_radius && y_character < canvas.height-100+character_radius)))
        ||
        (x_character == 100-character_radius && (y_character > 100-character_radius && y_character < canvas.height-100+character_radius))
        ){}
      
      else if(d_pressed &&
              x_character < canvas.width-character_radius-wall_thickness_one) {
        x_character += 5;
      }
      };

      /* Left */
      
      if(this.active == 0){
        if (
          (x_character == 120+character_radius && (y_character > 120 && y_character < canvas.height-120))
          ||
          (x_character == 200+character_radius && ((y_character > 100-character_radius && y_character < 120+character_radius) || (y_character > canvas.height-120-character_radius && y_character < canvas.height-100+character_radius)))
          ||
          (x_character == canvas.width-100+character_radius && (y_character > 100-character_radius && y_character < canvas.height-100+character_radius))
          ){} 
          
        else if (MoveBackOnXAndCheckOuterWallCollision()){
          x_character -= 5;
        }
      }
        
      else{
        if (
          (x_character == 120+character_radius && (y_character > 120 && y_character < canvas.height-120))
          ||
          (x_character == 200+character_radius && ((y_character > 100-character_radius && y_character < 120+character_radius) || (y_character > canvas.height-120-character_radius && y_character < canvas.height-100+character_radius)))
          ||
          (x_character == canvas.width-100+character_radius && (y_character > 100-character_radius && y_character < canvas.height-100+character_radius))
          ){} 
        
        else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
          x_character -= 5;
        } 
      }; 
        
        /* Up */
      if(this.active == 0){   
        if (
          ((x_character > 100-character_radius && x_character < 200+character_radius) || (x_character > canvas.width-200-character_radius && x_character < canvas.width-100+character_radius)) 
          &&
          (y_character == 120+character_radius || y_character == canvas.height-100+character_radius)

          ){} 
        
        else if (MoveBackOnYAndCheckOuterWallCollision()) {
          y_character -= 5;
        }
      }
      
      else{
        if (
          ((x_character > 100-character_radius && x_character < 200+character_radius) || (x_character > canvas.width-200-character_radius && x_character < canvas.width-100+character_radius)) 
          &&
          (y_character == 120+character_radius || y_character == canvas.height-100+character_radius)

          ){} 
        
        else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
          y_character -= 5;
        } 
      }; 

        /* Down */
        
      if(this.active == 0){   
        if (
          ((x_character > 100-character_radius && x_character < 200+character_radius) || (x_character > canvas.width-200-character_radius && x_character < canvas.width-100+character_radius)) 
          &&
          (y_character == 100-character_radius || y_character == canvas.height-120-character_radius)

          ){} 
        else if (MoveForwardOnYAndCheckOuterWallCollision()) {
          y_character += 5;
        }
      }
      
      else{
        if (
          ((x_character > 100-character_radius && x_character < 200+character_radius) || (x_character > canvas.width-200-character_radius && x_character < canvas.width-100+character_radius)) 
          &&
          (y_character == 100-character_radius || y_character == canvas.height-120-character_radius)

          ){} 

        else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
          y_character += 5;
        } 
      }; 
      
      if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0 && this.enemies.enemy5.health <= 0){
        this.active=0;
        
        if(this.regen==1){
          if(x_character > canvas.width/2-character_radius && x_character < canvas.width/2+character_radius && y_character > canvas.height/2-character_radius && y_character < canvas.height/2+character_radius){
            character_health++;     
            this.regen=0;
          };
            context.beginPath();
            context.moveTo(canvas.width/2,canvas.height/2);
            context.lineTo(canvas.width/2,canvas.height/2-20);
            context.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
            context.moveTo(canvas.width/2-20,canvas.height/2-20);
            context.lineTo(canvas.width/2,canvas.height/2);
            context.fillStyle = "red";
            context.fill();
            context.closePath();  
        };
      };
    
  },

    status: 0,
    active: 1,
    regen: 0
    
  },  
  {  /* Level 2 */

    /* Level 2 Enemies */ 
    /* Purple ghost level */
    enemies:{ 
      
      
    enemy1:{
    
      x:50,
      y:50,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 10, 0, Math.PI*2);
        context.fillStyle = "purple";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        
        var gox = x_character - this.x;
        var goy = y_character - this.y;
        var length = Math.sqrt((gox*gox) + (goy*goy)); 
        var killerx = gox / length;
        var killery = goy / length;
        if (length>character_radius){
        this.x += killerx *3;
        this.y += killery *3;}
      
        // enemy hit detection
        if((this.x < x_character+character_radius && this.x > x_character-character_radius) && (this.y < y_character+character_radius && this.y > y_character-character_radius)){
          /*if(damageTimer%100==0){
            DamageDelay();
          }
          damageTimer+=5;*/
          DamageDelay();
        }
      },
      
      health: 3 

    },
    
    
    enemy2:{
    
      x:canvas.width-50,
      y:50,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 10, 0, Math.PI*2);
        context.fillStyle = "purple";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        
        var gox = x_character - this.x;
        var goy = y_character - this.y;
        var length = Math.sqrt((gox*gox) + (goy*goy)); 
        var killerx = gox / length;
        var killery = goy / length;
        if (length>character_radius){
        this.x += killerx *3;
        this.y += killery *3;}
        
              // enemy hit detection
        if((this.x < x_character+character_radius && this.x > x_character-character_radius) && (this.y < y_character+character_radius && this.y > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },

    enemy3:{
    
      x:50,
      y:canvas.height-50,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 10, 0, Math.PI*2);
        context.fillStyle = "purple";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        
        var gox = x_character - this.x;
        var goy = y_character - this.y;
        var length = Math.sqrt((gox*gox) + (goy*goy)); 
        var killerx = gox / length;
        var killery = goy / length;
        if (length>character_radius){
        this.x += killerx *3;
        this.y += killery *3;}
        
              // enemy hit detection
        if((this.x < x_character+character_radius && this.x > x_character-character_radius) && (this.y < y_character+character_radius && this.y > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },  
    
    enemy4:{
    
      x:canvas.width-50,
      y:canvas.height-50,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 10, 0, Math.PI*2);
        context.fillStyle = "purple";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        
        var gox = x_character - this.x;
        var goy = y_character - this.y;
        var length = Math.sqrt((gox*gox) + (goy*goy)); 
        var killerx = gox / length;
        var killery = goy / length;
        if (length>character_radius){
        this.x += killerx *3;
        this.y += killery *3;}
        
              // enemy hit detection
        if((this.x < x_character+character_radius && this.x > x_character-character_radius) && (this.y < y_character+character_radius && this.y > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    } 

    },
    
    level: function(){
    
    /* Level 2 Walls*/
    
      context.beginPath();
      context.rect(80, canvas.height/2-25, 480, wall_thickness_two);
      context.rect(canvas.width/2-25, 80, wall_thickness_two, 240);
      
      //door closing
      if( this.active==1){
      
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      
      }
      
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();
      
    /* Level 2 enemy spawn */
      
      if(this.enemies.enemy1.health>0){
      this.enemies.enemy1.spawn();
      this.enemies.enemy1.move();}

      if(this.enemies.enemy2.health>0){
      this.enemies.enemy2.spawn();
      this.enemies.enemy2.move();}

      if(this.enemies.enemy3.health>0){
      this.enemies.enemy3.spawn();
      this.enemies.enemy3.move();}

      if(this.enemies.enemy4.health>0){
      this.enemies.enemy4.spawn();
      this.enemies.enemy4.move();}    
      
      


      
      /* Level 2 Movement */
      /* Right */
      if(this.active == 0){
        if (
          (x_character == canvas.width/2-wall_thickness_two/2-character_radius && (y_character > 80-character_radius && y_character < canvas.height-80+character_radius))
          ||
          (x_character == 80-character_radius && (y_character > canvas.height/2-wall_thickness_two/2-character_radius && y_character < canvas.height/2+wall_thickness_two/2+character_radius))

          ){}
        
          else if(d_pressed && x_character < canvas.width-character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
            x_character += 5;
          }
        
            else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
              x_character += 5;
            }}
      
      else{
        if (
          (x_character == canvas.width/2-wall_thickness_two/2-character_radius && (y_character > 80-character_radius && y_character < canvas.height-80+character_radius))
          ||
          (x_character == 80-character_radius && (y_character > canvas.height/2-wall_thickness_two/2-character_radius && y_character < canvas.height/2+wall_thickness_two/2+character_radius))

          ){}
            
          else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
            x_character += 5;
          }}

      
      /* Left */
      if(this.active == 0){
        if (
          (x_character == canvas.width/2+wall_thickness_two/2+character_radius && (y_character > 80-character_radius && y_character < canvas.height-80+character_radius))
          ||
          (x_character == canvas.width-80+character_radius && (y_character > canvas.height/2-wall_thickness_two/2-character_radius && y_character < canvas.height/2+wall_thickness_two/2+character_radius))

          ){}
          
          else if(a_pressed && x_character > 0+character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
            x_character -= 5;
          }
            else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
              x_character -= 5;
            }}
      
      else{
        if (
          (x_character == canvas.width/2+wall_thickness_two/2+character_radius && (y_character > 80-character_radius && y_character < canvas.height-80+character_radius))
          ||
          (x_character == canvas.width-80+character_radius && (y_character > canvas.height/2-wall_thickness_two/2-character_radius && y_character < canvas.height/2+wall_thickness_two/2+character_radius))

          ){}
          
          else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
            x_character -= 5;
          }}
        
        
      /* Up */
      if(this.active == 0){
        if (
          ((x_character > 80-character_radius && x_character < canvas.width-80+character_radius) && y_character == canvas.height/2+wall_thickness_two/2+character_radius)
          ||
          ((x_character > canvas.width/2-wall_thickness_two/2-character_radius && x_character < canvas.width/2+wall_thickness_two/2+character_radius) && y_character == canvas.height-80+character_radius)
          ){} 
        
          else if(w_pressed && y_character > 0+character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
            y_character -= 5;
          }
            else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
              y_character -= 5;
        }}
          
          
      else{   
        if (
          ((x_character > 80-character_radius && x_character < canvas.width-80+character_radius) && y_character == canvas.height/2+wall_thickness_two/2+character_radius)
          ||
          ((x_character > canvas.width/2-wall_thickness_two/2-character_radius && x_character < canvas.width/2+wall_thickness_two/2+character_radius) && y_character == canvas.height-80+character_radius)
          ){} 
        
          else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
            y_character -= 5;
        }}        

      
      /* Down */
      if(this.active == 0){
        if (
          ((x_character > 80-character_radius && x_character < canvas.width-80+character_radius) && y_character == canvas.height/2-wall_thickness_two/2-character_radius)
          ||
          ((x_character > canvas.width/2-wall_thickness_two/2-character_radius && x_character < canvas.width/2+wall_thickness_two/2+character_radius) && y_character == 80-character_radius)
          ){} 
          
          else if(s_pressed && y_character < canvas.height-character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
            y_character += 5;
          }
          
            else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
              y_character += 5;
            }}
      else{ 
        if (
          ((x_character > 80-character_radius && x_character < canvas.width-80+character_radius) && y_character == canvas.height/2-wall_thickness_two/2-character_radius)
          ||
          ((x_character > canvas.width/2-wall_thickness_two/2-character_radius && x_character < canvas.width/2+wall_thickness_two/2+character_radius) && y_character == 80-character_radius)
          ){} 
          
          else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
            y_character += 5;
          }}        
    
    
      if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0){
      this.active=0;
      
      if(this.regen==1){
        if(x_character > 160-character_radius && x_character < 160+character_radius && y_character > 100-character_radius && y_character < 100+character_radius){

          character_health++;
          this.regen=0;
        }
        
          context.beginPath();
          context.moveTo(160,100);
          context.lineTo(160,100-20);
          context.arc(160-10, 100-20, 10, 0, Math.PI, true);
          context.moveTo(160-20,100-20);
          context.lineTo(160,100);
          context.fillStyle = "red";
          context.fill();
          context.closePath();  
          


        
      
      
      }
      }


  },

    status: 0,
    active: 1,
    regen: 0

  },
  {
    /* Level 3 */
    
    /* Level 3 Enemies */
    /* Shieled knights level */
    enemies:{ 
      
      
    enemy1:{
    
      x:52.5,
      y:55,
      vx:2.5,
      vy:0,
      sAngle: Math.PI*1.5,
      eAngle: Math.PI*0.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
    
    
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },  
    
    enemy2:{
    
      x:572.5,
      y:55,
      vx:-2.5,
      vy:0,
      sAngle: Math.PI*0.5,
      eAngle: Math.PI*1.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },
    
    enemy3:{
    
      x:52.5,
      y:335,
      vx:2.5,
      vy:0,
      sAngle: Math.PI*1.5,
      eAngle: Math.PI*0.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },

    enemy4:{
    
      x:572.5,
      y:335,
      vx:-2.5,
      vy:0,
      sAngle: Math.PI*0.5,
      eAngle: Math.PI*1.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },  
    
      enemy5:{
    
      x:182.5,
      y:195,
      vx:2.5,
      vy:0,
      sAngle: Math.PI*0.5,
      eAngle: Math.PI*1.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    },
    
    enemy6:{
    
      x:442.5,
      y:195,
      vx:-2.5,
      vy:0,
      sAngle: Math.PI*1.5,
      eAngle: Math.PI*0.5,
      spawn: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 25, 0, Math.PI*2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();
      
      },
      shield: function(){
        

        context.beginPath();
        context.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
        context.fillStyle = "#2C3539";
        context.fill();
        context.closePath();
      
      },
      move: function(){
        

        /* Random Movement */
        this.x+=this.vx;
        this.y+=this.vy;
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;}
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;}
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }         
              }
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 195){
          var randomGen=Math.floor(Math.random()*4+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }
              
            else if(randomGen==3){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
                
            else{
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            }           
        if((this.x == 182.5 || this.x == 312.5 || this.x == 442.5) && this.y == 335){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              }
              
        if(this.x == 52.5 && this.y == 55){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
              }
        if((this.x == 572.5) && this.y == 55){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else {
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              }

        if(this.x == 52.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
              
              }
        if(this.x == 572.5 && this.y == 335){
          var randomGen=Math.floor(Math.random()*2+1)
            if (randomGen==1){
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
            else {
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
              
              }           
        if(this.x == 52.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = 2.5;
              this.vy = 0;
              this.sAngle = Math.PI*1.5;
              this.eAngle = Math.PI*0.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }     
        if(this.x == 572.5 && this.y == 195){
          var randomGen=Math.floor(Math.random()*3+1)
            if (randomGen==1){
              this.vx = -2.5;
              this.vy = 0;
              this.sAngle = Math.PI*0.5;
              this.eAngle = Math.PI*1.5;            
              }           
            else if (randomGen==2){
              this.vx = 0;
              this.vy = 2.5;
              this.sAngle = 0;
              this.eAngle = Math.PI;            
              }           
              
            else {
              this.vx = 0;
              this.vy = -2.5;
              this.sAngle = Math.PI;
              this.eAngle = 0;            
              }           
              }

              
              // enemy hit detection
        if((this.x-30 < x_character+character_radius && this.x+30 > x_character-character_radius) && (this.y-30 < y_character+character_radius && this.y+30 > y_character-character_radius)){
          DamageDelay();
        }
      
    },
    
    health: 3 

    } 

    },
    
    level: function(){
    
      var cw9 = 65;
      var ch7 = 70;
    
      context.beginPath();
      context.rect(20+cw9, 20+ch7, cw9, ch7);
      context.rect(20+cw9*3, 20+ch7, cw9, ch7);
      context.rect(20+cw9*5, 20+ch7, cw9, ch7);
      context.rect(20+cw9*7, 20+ch7, cw9, ch7);
      context.rect(20+cw9, 20+ch7*3, cw9, ch7);
      context.rect(20+cw9*3, 20+ch7*3, cw9, ch7);
      context.rect(20+cw9*5, 20+ch7*3, cw9, ch7);
      context.rect(20+cw9*7, 20+ch7*3, cw9, ch7);

      
      //door closing
      if( this.active==1){
      
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      
      }
      
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();
      
          if(this.enemies.enemy1.health>0){
      this.enemies.enemy1.spawn();
      this.enemies.enemy1.move();
      this.enemies.enemy1.shield();}    
          if(this.enemies.enemy2.health>0){
      this.enemies.enemy2.spawn();
      this.enemies.enemy2.move();
      this.enemies.enemy2.shield();}    
          if(this.enemies.enemy3.health>0){
      this.enemies.enemy3.spawn();
      this.enemies.enemy3.move();
      this.enemies.enemy3.shield();}    
          if(this.enemies.enemy4.health>0){
      this.enemies.enemy4.spawn();
      this.enemies.enemy4.move();
      this.enemies.enemy4.shield();}
          if(this.enemies.enemy5.health>0){
      this.enemies.enemy5.spawn();
      this.enemies.enemy5.move();
      this.enemies.enemy5.shield();}
          if(this.enemies.enemy6.health>0){
      this.enemies.enemy6.spawn();
      this.enemies.enemy6.move();
      this.enemies.enemy6.shield();}    
      

          if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0 && this.enemies.enemy5.health <= 0 && this.enemies.enemy6.health <= 0){
      this.active=0;
      
      if(this.regen==1){
        if(x_character > canvas.width/2-character_radius && x_character < canvas.width/2+character_radius && y_character > canvas.height/2-character_radius && y_character < canvas.height/2+character_radius){

          character_health++;     
          this.regen=0;
        }
        
          context.beginPath();
          context.moveTo(canvas.width/2,canvas.height/2);
          context.lineTo(canvas.width/2,canvas.height/2-20);
          context.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
          context.moveTo(canvas.width/2-20,canvas.height/2-20);
          context.lineTo(canvas.width/2,canvas.height/2);
          context.fillStyle = "red";
          context.fill();
          context.closePath();  

        
      
      
      }
      }
      
    /* Level 3 Movement */
      /* Right */
      if(this.active == 0){
        if (
          (x_character == 20+cw9-character_radius || x_character == 20+cw9*3-character_radius || x_character == 20+cw9*5-character_radius || x_character == 20+cw9*7-character_radius)
          &&
          ((y_character > 20+ch7-character_radius && y_character < 20+ch7*2+character_radius) || (y_character > 20+ch7*3-character_radius && y_character < 20+ch7*4+character_radius))

          ){}
        
          else if(d_pressed && x_character < canvas.width-character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
            x_character += 5;
          }
        
            else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
              x_character += 5;
            }}
      
      else{
        if (
          (x_character == 20+cw9-character_radius || x_character == 20+cw9*3-character_radius || x_character == 20+cw9*5-character_radius || x_character == 20+cw9*7-character_radius)
          &&
          ((y_character > 20+ch7-character_radius && y_character < 20+ch7*2+character_radius) || (y_character > 20+ch7*3-character_radius && y_character < 20+ch7*4+character_radius))

          ){}
            
          else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
            x_character += 5;
          }}

      
      /* Left */
      if(this.active == 0){
        if (
          (x_character == 20+cw9*8+character_radius || x_character == 20+cw9*6+character_radius || x_character == 20+cw9*4+character_radius || x_character == 20+cw9*2+character_radius)
          &&
          ((y_character > 20+ch7-character_radius && y_character < 20+ch7*2+character_radius) || (y_character > 20+ch7*3-character_radius && y_character < 20+ch7*4+character_radius))

          ){}
          
          else if(a_pressed && x_character > 0+character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
            x_character -= 5;
          }
            else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
              x_character -= 5;
            }}
      
      else{
        if (
          (x_character == 20+cw9*8+character_radius || x_character == 20+cw9*6+character_radius || x_character == 20+cw9*4+character_radius || x_character == 20+cw9*2+character_radius)
          &&
          ((y_character > 20+ch7-character_radius && y_character < 20+ch7*2+character_radius) || (y_character > 20+ch7*3-character_radius && y_character < 20+ch7*4+character_radius))

          ){}
          
          else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
            x_character -= 5;
          }}
        
        
      /* Up */
      if(this.active == 0){
        if (
          ((x_character > 20+cw9-character_radius && x_character < 20+cw9*2+character_radius) || (x_character > 20+cw9*3-character_radius && x_character < 20+cw9*4+character_radius) || (x_character > 20+cw9*5-character_radius && x_character < 20+cw9*6+character_radius) || (x_character > 20+cw9*7-character_radius && x_character < 20+cw9*8+character_radius))
          &&
          (y_character == 20+ch7*2+character_radius || y_character == 20+ch7*4+character_radius)
          ){} 
        
          else if(w_pressed && y_character > 0+character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
            y_character -= 5;
          }
            else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
              y_character -= 5;
        }}
          
          
      else{   
        if (
          ((x_character > 20+cw9-character_radius && x_character < 20+cw9*2+character_radius) || (x_character > 20+cw9*3-character_radius && x_character < 20+cw9*4+character_radius) || (x_character > 20+cw9*5-character_radius && x_character < 20+cw9*6+character_radius) || (x_character > 20+cw9*7-character_radius && x_character < 20+cw9*8+character_radius))
          &&
          (y_character == 20+ch7*2+character_radius || y_character == 20+ch7*4+character_radius)
          ){} 
        
          else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
            y_character -= 5;
        }}        

      
      /* Down */
      if(this.active == 0){
        if (
          ((x_character > 20+cw9-character_radius && x_character < 20+cw9*2+character_radius) || (x_character > 20+cw9*3-character_radius && x_character < 20+cw9*4+character_radius) || (x_character > 20+cw9*5-character_radius && x_character < 20+cw9*6+character_radius) || (x_character > 20+cw9*7-character_radius && x_character < 20+cw9*8+character_radius))
          &&
          (y_character == 20+ch7-character_radius || y_character == 20+ch7*3-character_radius)
          ){} 
          
          else if(s_pressed && y_character < canvas.height-character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
            y_character += 5;
          }
          
            else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
              y_character += 5;
            }}
      else{ 
        if (
          ((x_character > 20+cw9-character_radius && x_character < 20+cw9*2+character_radius) || (x_character > 20+cw9*3-character_radius && x_character < 20+cw9*4+character_radius) || (x_character > 20+cw9*5-character_radius && x_character < 20+cw9*6+character_radius) || (x_character > 20+cw9*7-character_radius && x_character < 20+cw9*8+character_radius))
          &&
          (y_character == 20+ch7-character_radius || y_character == 20+ch7*3-character_radius)
          ){} 
          
          else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
            y_character += 5;
          }}        
    
    },
    
    status: 0,
    active: 1,
    regen: 0  



  },
  {
    /* 2 keys level */
    enemies:{
      
      enemy1:{
        x:45,
        y:45,
        vx:0,
        vy:5,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 45 && this.y == canvas.height-45){
            this.vx = 5;
            this.vy = 0;
          }
          if(this.x == canvas.width-45 && this.y == canvas.height-45){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-45 && this.y == 45){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == 45 && this.y == 45){
            this.vx = 0;
            this.vy = 5;
          }
          
          /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },
        
      enemy2:{
        x:45,
        y:canvas.height-45,
        vx:5,
        vy:0,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 45 && this.y == canvas.height-45){
            this.vx = 5;
            this.vy = 0;
          }
          if(this.x == canvas.width-45 && this.y == canvas.height-45){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-45 && this.y == 45){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == 45 && this.y == 45){
            this.vx = 0;
            this.vy = 5;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },
      
      enemy3:{
        x:canvas.width-45,
        y:canvas.height-45,
        vx:0,
        vy:-5,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 45 && this.y == canvas.height-45){
            this.vx = 5;
            this.vy = 0;
          }
          if(this.x == canvas.width-45 && this.y == canvas.height-45){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-45 && this.y == 45){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == 45 && this.y == 45){
            this.vx = 0;
            this.vy = 5;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },
      
        enemy4:{
        x:canvas.width-45,
        y:45,
        vx:-5,
        vy:0,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 45 && this.y == canvas.height-45){
            this.vx = 5;
            this.vy = 0;
          }
          if(this.x == canvas.width-45 && this.y == canvas.height-45){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-45 && this.y == 45){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == 45 && this.y == 45){
            this.vx = 0;
            this.vy = 5;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },
      
      enemy5:{
        x:115,
        y:115,
        vx:5,
        vy:0,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 115 && this.y == canvas.height-115){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-115 && this.y == canvas.height-115){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == canvas.width-115 && this.y == 115){
            this.vx = 0;
            this.vy = 5;
          }
          if(this.x == 115 && this.y == 115){
            this.vx = 5;
            this.vy = 0;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },

      enemy6:{
        x:canvas.width-115,
        y:115,
        vx:0,
        vy:5,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 115 && this.y == canvas.height-115){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-115 && this.y == canvas.height-115){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == canvas.width-115 && this.y == 115){
            this.vx = 0;
            this.vy = 5;
          }
          if(this.x == 115 && this.y == 115){
            this.vx = 5;
            this.vy = 0;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },

      enemy7:{
        x:canvas.width-115,
        y:canvas.height-115,
        vx:-5,
        vy:0,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 115 && this.y == canvas.height-115){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-115 && this.y == canvas.height-115){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == canvas.width-115 && this.y == 115){
            this.vx = 0;
            this.vy = 5;
          }
          if(this.x == 115 && this.y == 115){
            this.vx = 5;
            this.vy = 0;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },

      enemy8:{
        x:115,
        y:canvas.height-115,
        vx:0,
        vy:-5,

        spawn: function(){
          

          context.beginPath();
          context.arc(this.x, this.y , 20, 0, Math.PI*2);
          context.fillStyle = "black";
          context.fill();
          context.closePath();
        },
        move: function(){
          
          this.x+=this.vx;
          this.y+=this.vy;
          
          if(this.x == 115 && this.y == canvas.height-115){
            this.vx = 0;
            this.vy = -5;
          }
          if(this.x == canvas.width-115 && this.y == canvas.height-115){
            this.vx = -5;
            this.vy = 0;
          }
          if(this.x == canvas.width-115 && this.y == 115){
            this.vx = 0;
            this.vy = 5;
          }
          if(this.x == 115 && this.y == 115){
            this.vx = 5;
            this.vy = 0;
          }
          
                /* enemy hit detect */
          
          if((this.x-20 < x_character+character_radius && this.x+20 > x_character-character_radius) && (this.y-20 < y_character+character_radius && this.y+20 > y_character-character_radius)){
            DamageDelay();
          }
        }
      },

      key1:{
      
      spawn:function(){
      
      context.beginPath();
      context.arc(200, 190, 12, 0, Math.PI*2);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.arc(200, 190, 6, 0, Math.PI*2);
      context.fillStyle = "#eee";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(197, 199, 6, 25);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(197, 208, 10, 6);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(197, 218, 12, 6);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      
      if((x_character > 180 && x_character < 220) && (y_character > 170 && y_character < 240)){
        this.touched = 1;
      }
      
      },
      
      touched: 0
      
      },
      
      key2:{
      
      spawn:function(){
      
      context.beginPath();
      context.arc(canvas.width-200, 190, 12, 0, Math.PI*2);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.arc(canvas.width-200, 190, 6, 0, Math.PI*2);
      context.fillStyle = "#eee";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(canvas.width-203, 199, 6, 25);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(canvas.width-203, 208, 10, 6);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      context.beginPath();
      context.rect(canvas.width-203, 218, 12, 6);
      context.fillStyle = "pink";
      context.fill();
      context.closePath();
      
      if((x_character > canvas.width-220 && x_character < canvas.width-180) && (y_character > 170 && y_character < 240)){
        this.touched = 1;
      }
      
      
      },
      
      touched:0
      
      },
      

      
      traps:{
      
      online:function(){
      var currentDate = new Date();
      if(currentDate.getSeconds()%2==0){
        
        context.beginPath();
        context.rect(canvas.width/2-25-15, 160, 15, 80);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
        
        context.beginPath();
        context.rect(canvas.width/2+25, 160, 15, 80);
        context.fillStyle = "red";
        context.fill();
        context.closePath();
        
        if(((x_character > canvas.width/2-25-15-character_radius && x_character < canvas.width/2-25+character_radius) || (x_character > canvas.width/2+25-character_radius && x_character < canvas.width/2+25+15+character_radius)) && (y_character > 160 && y_character < 240)){
        DamageDelay();
        }
        
        
        



      } 

      }
      }
      
    },

    level: function(){
      
        context.beginPath();
        context.rect(70+50+wall_thickness_one, 70, 360, wall_thickness_one);
        context.rect(70,70+50+wall_thickness_one,wall_thickness_one, 120);
        context.rect(70+50+wall_thickness_one, canvas.height-70-wall_thickness_one, 360, wall_thickness_one);
        context.rect(canvas.width-70-wall_thickness_one, 70+50+wall_thickness_one, wall_thickness_one, 120);  
        context.rect(70+70, 70+70, 360/2-25, wall_thickness_one);
        context.rect(70+70, 70+70, wall_thickness_one, 120);
        context.rect(70+70, canvas.height-70-70-wall_thickness_one, 360/2-25, wall_thickness_one);
        context.rect(canvas.width/2+25, 70+70, 360/2-25, wall_thickness_one);
        context.rect(canvas.width-70-70-wall_thickness_one, 70+70, wall_thickness_one, 120);
        context.rect(canvas.width/2+25, canvas.height-70-70-wall_thickness_one, 360/2-25, wall_thickness_one);    
        
        
            //door closing
        if( this.active==1){
        
        context.rect(0, 0, canvas.width, wall_thickness_one);
        context.rect(0, 0, wall_thickness_one, canvas.height);
        context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
        context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
        
        }
        
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
        
        
        this.enemies.enemy1.spawn();
        this.enemies.enemy1.move();
        
        this.enemies.enemy2.spawn();
        this.enemies.enemy2.move();
        
        this.enemies.enemy3.spawn();
        this.enemies.enemy3.move();
        
        this.enemies.enemy4.spawn();
        this.enemies.enemy4.move();
        
        this.enemies.enemy5.spawn();
        this.enemies.enemy5.move();
        
        this.enemies.enemy6.spawn();
        this.enemies.enemy6.move();
        
        this.enemies.enemy7.spawn();
        this.enemies.enemy7.move();
        
        this.enemies.enemy8.spawn();
        this.enemies.enemy8.move();
        
        this.enemies.traps.online();

        
        if(this.enemies.key1.touched == 0){
        this.enemies.key1.spawn();}
        if(this.enemies.key2.touched == 0){   
        this.enemies.key2.spawn();}
        
        
        if(this.enemies.key1.touched == 1 && this.enemies.key2.touched == 1){
        this.active = 0 
        
            if(this.regen==1){
          if(x_character > canvas.width/2-character_radius && x_character < canvas.width/2+character_radius && y_character > canvas.height/2-character_radius && y_character < canvas.height/2+character_radius){

            character_health++;
            this.regen=0;
          }
          
            context.beginPath();
            context.moveTo(canvas.width/2,canvas.height/2);
            context.lineTo(canvas.width/2,canvas.height/2-20);
            context.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
            context.moveTo(canvas.width/2-20,canvas.height/2-20);
            context.lineTo(canvas.width/2,canvas.height/2);
            context.fillStyle = "red";
            context.fill();
            context.closePath();  

          
        
        
        }};
        
        
        /* Level 4 Movement */
        /* Right */
        if(this.active == 0){
          if (
            ((x_character == 70-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == 140-character_radius) && ((y_character > 70-character_radius && y_character < 70+wall_thickness_one+character_radius) || (y_character > 140-character_radius && y_character < canvas.height-140+character_radius) || (y_character > canvas.height-70-wall_thickness_one-character_radius && y_character <canvas.height-70+character_radius))) 
            ||
            ((x_character == canvas.width/2+25-character_radius) && ((y_character > 140-character_radius && y_character < 140+wall_thickness_one+character_radius ) || (y_character > canvas.height-140-wall_thickness_one-character_radius && y_character < canvas.height-140+character_radius)))
            ||
            ((x_character == canvas.width-70-wall_thickness_one-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == canvas.width-140-wall_thickness_one-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ){}
          
            else if(d_pressed && x_character < canvas.width-character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
              x_character += 5;
            }
          
              else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
                x_character += 5;
              }}
        
        else{
          if (
            ((x_character == 70-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == 140-character_radius) && ((y_character > 70-character_radius && y_character < 70+wall_thickness_one+character_radius) || (y_character > 140-character_radius && y_character < canvas.height-140+character_radius) || (y_character > canvas.height-70-wall_thickness_one-character_radius && y_character <canvas.height-70+character_radius))) 
            ||
            ((x_character == canvas.width/2+25-character_radius) && ((y_character > 140-character_radius && y_character < 140+wall_thickness_one+character_radius ) || (y_character > canvas.height-140-wall_thickness_one-character_radius && y_character < canvas.height-140+character_radius)))
            ||
            ((x_character == canvas.width-70-wall_thickness_one-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == canvas.width-140-wall_thickness_one-character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
          ){}
              
            else if(d_pressed && x_character < canvas.width-character_radius-wall_thickness_one) {
              x_character += 5;
            }}

        
        /* Left */
        if(this.active == 0){
          if (
            ((x_character == canvas.width-70+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == canvas.width-140+character_radius) && ((y_character > 70-character_radius && y_character < 70+wall_thickness_one+character_radius) || (y_character > 140-character_radius && y_character < canvas.height-140+character_radius) || (y_character > canvas.height-70-wall_thickness_one-character_radius && y_character <canvas.height-70+character_radius))) 
            ||
            ((x_character == canvas.width/2-25+character_radius) && ((y_character > 140-character_radius && y_character < 140+wall_thickness_one+character_radius ) || (y_character > canvas.height-140-wall_thickness_one-character_radius && y_character < canvas.height-140+character_radius)))
            ||
            ((x_character == 70+wall_thickness_one+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == 140+wall_thickness_one+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ){}
            
            else if(a_pressed && x_character > 0+character_radius && (y_character < canvas.height/2+30 && y_character > canvas.height/2-30)) {
              x_character -= 5;
            }
              else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
                x_character -= 5;
              }}
        
        else{
          if (
            ((x_character == canvas.width-70+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == canvas.width-140+character_radius) && ((y_character > 70-character_radius && y_character < 70+wall_thickness_one+character_radius) || (y_character > 140-character_radius && y_character < canvas.height-140+character_radius) || (y_character > canvas.height-70-wall_thickness_one-character_radius && y_character <canvas.height-70+character_radius))) 
            ||
            ((x_character == canvas.width/2-25+character_radius) && ((y_character > 140-character_radius && y_character < 140+wall_thickness_one+character_radius ) || (y_character > canvas.height-140-wall_thickness_one-character_radius && y_character < canvas.height-140+character_radius)))
            ||
            ((x_character == 70+wall_thickness_one+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))
            ||
            ((x_character == 140+wall_thickness_one+character_radius) && (y_character > 140-character_radius && y_character < canvas.height-140+character_radius))        
            ){}
            
            else if(a_pressed && x_character > 0+character_radius+wall_thickness_one) {
              x_character -= 5;
            }}
          
          
        /* Up */
        if(this.active == 0){
          if (
            ((x_character > 140-character_radius && x_character < canvas.width-140+character_radius)
            &&
            (y_character == 70+wall_thickness_one+character_radius || y_character == canvas.height-70+character_radius))
            ||
            (((x_character > 70-character_radius && x_character < 70+wall_thickness_one+character_radius) || (x_character > 140-character_radius && x_character < canvas.width/2-25+character_radius) || (x_character > canvas.width/2+25-character_radius && x_character < canvas.width-140+character_radius) || (x_character > canvas.width-70-wall_thickness_one-character_radius && x_character < canvas.width-70+character_radius))
            &&
            ((y_character == canvas.height-140+character_radius) || (y_character == 140+wall_thickness_one+character_radius))
            )
            ){} 
          
            else if(w_pressed && y_character > 0+character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
              y_character -= 5;
            }
              else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
                y_character -= 5;
          }}
            
            
        else{   
          if (
            ((x_character > 140-character_radius && x_character < canvas.width-140+character_radius)
            &&
            (y_character == 70+wall_thickness_one+character_radius || y_character == canvas.height-70+character_radius))
            ||
            (((x_character > 70-character_radius && x_character < 70+wall_thickness_one+character_radius) || (x_character > 140-character_radius && x_character < canvas.width/2-25+character_radius) || (x_character > canvas.width/2+25-character_radius && x_character < canvas.width-140+character_radius) || (x_character > canvas.width-70-wall_thickness_one-character_radius && x_character < canvas.width-70+character_radius))
            &&
            ((y_character == canvas.height-140+character_radius) || (y_character == 140+wall_thickness_one+character_radius))
            )
            ){} 
          
            else if(w_pressed && y_character > 0+character_radius+wall_thickness_one) {
              y_character -= 5;
          }}        

        
        /* Down */
        if(this.active == 0){
          if (
            ((x_character > 140-character_radius && x_character < canvas.width-140+character_radius)
            &&
            (y_character == 70-character_radius || y_character == canvas.height-70-wall_thickness_one-character_radius))
            ||
            (((x_character > 70-character_radius && x_character < 70+wall_thickness_one+character_radius) || (x_character > 140-character_radius && x_character < canvas.width/2-25+character_radius) || (x_character > canvas.width/2+25-character_radius && x_character < canvas.width-140+character_radius) || (x_character > canvas.width-70-wall_thickness_one-character_radius && x_character < canvas.width-70+character_radius))
            &&
            ((y_character == canvas.height-140-wall_thickness_one-character_radius) || (y_character == 140-character_radius))
            )
            ){} 
            
            else if(s_pressed && y_character < canvas.height-character_radius && (x_character < canvas.width/2+30 && x_character > canvas.width/2-30)) {
              y_character += 5;
            }
            
              else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
                y_character += 5;
              }}
        else{ 
          if (
            ((x_character > 140-character_radius && x_character < canvas.width-140+character_radius)
            &&
            (y_character == 70-character_radius || y_character == canvas.height-70-wall_thickness_one-character_radius))
            ||
            (((x_character > 70-character_radius && x_character < 70+wall_thickness_one+character_radius) || (x_character > 140-character_radius && x_character < canvas.width/2-25+character_radius) || (x_character > canvas.width/2+25-character_radius && x_character < canvas.width-140+character_radius) || (x_character > canvas.width-70-wall_thickness_one-character_radius && x_character < canvas.width-70+character_radius))
            &&
            ((y_character == canvas.height-140-wall_thickness_one-character_radius) || (y_character == 140-character_radius))
            )
            ){} 
            
            else if(s_pressed && y_character < canvas.height-character_radius-wall_thickness_one) {
              y_character += 5;
            }}  

    },

    status: 0,
    active: 1,
    regen: 0  

  }
];

function DisplayTutorialText(){
  context.font="50px Consolas";
  context.fillText("W",150,150);
  context.font="50px Consolas";
  context.fillText("A S D",100,200);
  context.font="30px Consolas";
  context.fillText("to move",110,250);
  
  context.font="50px Consolas";
  context.fillText(String.fromCharCode(8593),454,150);
  context.font="50px Consolas";
  context.fillText(String.fromCharCode(8592)+" "+String.fromCharCode(8595)+" "+String.fromCharCode(8594),400,200);
  context.font="30px Consolas";
  context.fillText("to shoot",405,250);
};

function MoveForwardOnXAndCheckOuterWallCollision(){
  if (d_pressed &&
      x_character < canvas.width-character_radius &&
     (y_character < plus_height && y_character > minus_height)){
   return true;
 };
  if (d_pressed &&
      x_character < canvas.width-character_radius-wall_thickness_one){
    return true;
  };
  return false;
};

function MoveBackOnXAndCheckOuterWallCollision(){
  if (a_pressed &&
      x_character > 0+character_radius &&
     (y_character < plus_height && y_character > minus_height)){
    return true;
  };
  if (a_pressed &&
      x_character > 0+character_radius+wall_thickness_one){
    return true;
  };
  return false;
};

function MoveBackOnYAndCheckOuterWallCollision(){
  if (w_pressed &&
      y_character > 0+character_radius &&
      (x_character < plus_width && x_character > minus_width)){
    return true;
  };
  if (w_pressed &&
      y_character > 0+character_radius+wall_thickness_one){
    return true;
  };
  return false;
};

function MoveForwardOnYAndCheckOuterWallCollision(){
  if (s_pressed &&
      y_character < canvas.height-character_radius &&
      (x_character < plus_width && x_character > minus_width)){
    return true;
  };
  if (s_pressed &&
      y_character < canvas.height-character_radius-wall_thickness_one){
    return true;
  };
  return false;
};

function MoveTemplate(){
  if (true){
    return true;
  };
  if (true){
    return true;
  };
  return false;
};

function DrawInnerWallsInTurretLevel(){
  context.beginPath();
  context.rect(100, 100, 100, wall_thickness_one);
  context.rect(100, 100, wall_thickness_one, 100);
  context.rect(100, canvas.height-120, 100, wall_thickness_one);
  context.rect(100, canvas.height-200, wall_thickness_one, 100);
  context.rect(canvas.width-200, 100, 100, wall_thickness_one);
  context.rect(canvas.width-120, 100, wall_thickness_one, 100);
  context.rect(canvas.width-200, canvas.height-120, 100, wall_thickness_one);
  context.rect(canvas.width-120, canvas.height-200, wall_thickness_one, 100);
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
};

function RedrawCanvas() {
  ResetCanvas()

/* Level Change */
/* Undefined in the srarting room */

  //ChooseWhereIsExitDoor() /* The function is suppose to serve some purpose... */

  ChooseLevelToDraw()
  
  if(character_health==0){
      alert("GAME OVER");
      document.location.reload();
  }
  if(room_counter == 16){
      alert("CONGRATULATIONS!\nYou won the game!");
      document.location.reload();
  }

  if(bullets.length>0){
    DrawShot();}
    
  DrawStartingRoom();
  DrawLevels();
  DrawCharacter();
  DrawHearts();
  DrawScore();

  if(bullets.length > 0 && levels[3].status == 1){
      ShotRemove();}

  requestAnimationFrame(RedrawCanvas);


  /* Level Generation */

  /* Movement */

  /* Shooting */

  PushBullets();

};

function ChooseLevelToDraw(){
  randomly_generated_level = GetRandomIntInclusive(1, 4);
  randomly_generated_door = GetRandomIntInclusive(1, 3);
  /* Upper Door */

  if (HasEnteredTopDoor()){
    door_number = 3;
    room_counter++;
    
    SetStatusActiveFlagsAndEnemiesInNextLevel()
    
    x_character = canvas.width / 2;
    y_character = canvas.height - 20 - character_radius;
  };

  /* Right Door */

  if (HasEnteredRightDoor()){
    door_number = 4;
    room_counter++;
    
    SetStatusActiveFlagsAndEnemiesInNextLevel()
    
    x_character = 20+character_radius;
    y_character = canvas.height/2;
  };

  /* Bottom Door */

  if (HasEnteredBottomDoor()){
    door_number = 1;
    room_counter++;
    
    SetStatusActiveFlagsAndEnemiesInNextLevel()
    
    x_character = canvas.width/2;
    y_character = 20+character_radius;
  };

  /* Left Door */

  if (HasEnteredLeftDoor()){
    door_number = 2;
    room_counter++;
    
    SetStatusActiveFlagsAndEnemiesInNextLevel()
    
    x_character = canvas.width-20-character_radius;
    y_character = canvas.height/2;
  };

};

function HasEnteredTopDoor(){
  if (y_character == character_radius &&
      (x_character < plus_width && x_character > minus_width)){
    return true;
  }
  else {
    return false;
  };
};

function HasEnteredRightDoor(){
  if ((y_character < plus_height && y_character > minus_height) &&
      x_character == canvas.width-character_radius){
    return true;
  }
  else {
    return false;
  };
};

function HasEnteredBottomDoor(){
  if (y_character == canvas.height-character_radius &&
      (x_character < plus_width && x_character > minus_width)) {
    return true;
  }
  else {
    return false;
  };
};

function HasEnteredLeftDoor(){
  if ((y_character < plus_height && y_character > minus_height) &&
      x_character == character_radius){
    return true;
  }
  else {
    return false;
  };
};

function SetStatusActiveFlagsAndEnemiesInNextLevel(){
  if (randomly_generated_level == 1){
    levels[0].status = 0;
    levels[1].status = 1;
    levels[2].status = 0;
    levels[3].status = 0;
    levels[4].status = 0;

    levels[1].active = 1;

    levels[1].enemies.enemy1.health = 3;
    levels[1].enemies.enemy2.health = 3;
    levels[1].enemies.enemy3.health = 3;
    levels[1].enemies.enemy4.health = 3;
    levels[1].enemies.enemy5.health = 3;

    levels[1].regen = Math.floor(Math.random()*2);
  }
  else if (randomly_generated_level == 2){
    levels[0].status = 0;
    levels[1].status = 0;
    levels[2].status = 1;
    levels[3].status = 0;
    levels[4].status = 0;

    levels[2].active = 1;

    levels[2].enemies.enemy1.health = 3;
    levels[2].enemies.enemy2.health = 3;
    levels[2].enemies.enemy3.health = 3;
    levels[2].enemies.enemy4.health = 3;

    levels[2].enemies.enemy1.x = 50;
    levels[2].enemies.enemy1.y = 50;

    levels[2].enemies.enemy2.x = canvas.width-50;
    levels[2].enemies.enemy2.y = 50;

    levels[2].enemies.enemy3.x = 50;
    levels[2].enemies.enemy3.y = canvas.height-50;

    levels[2].enemies.enemy4.x = canvas.width-50;
    levels[2].enemies.enemy4.y = canvas.height-50;

    levels[2].regen = Math.floor(Math.random()*2);
  }
  else if (randomly_generated_level == 3){
    levels[0].status = 0;
    levels[1].status = 0;
    levels[2].status = 0;
    levels[3].status = 1;
    levels[4].status = 0;

    levels[3].active = 1;

    levels[3].enemies.enemy1.health = 3;
    levels[3].enemies.enemy2.health = 3;
    levels[3].enemies.enemy3.health = 3;
    levels[3].enemies.enemy4.health = 3;
    levels[3].enemies.enemy5.health = 3;
    levels[3].enemies.enemy6.health = 3;

    levels[3].enemies.enemy1.x = 52.5;
    levels[3].enemies.enemy1.y = 55;

    levels[3].enemies.enemy2.x = 572.5;
    levels[3].enemies.enemy2.y = 55;

    levels[3].enemies.enemy3.x = 52.5;
    levels[3].enemies.enemy3.y = 335;

    levels[3].enemies.enemy4.x = 572.5;
    levels[3].enemies.enemy4.y = 335;

    levels[3].enemies.enemy5.x = 182.5;
    levels[3].enemies.enemy5.y = 195;

    levels[3].enemies.enemy6.x = 442.5;
    levels[3].enemies.enemy6.y = 195;

    levels[3].enemies.enemy1.vx = 2.5;
    levels[3].enemies.enemy1.vy = 0;

    levels[3].enemies.enemy2.vx = -2.5;
    levels[3].enemies.enemy2.vy = 0;

    levels[3].enemies.enemy3.vx = 2.5;
    levels[3].enemies.enemy3.vy = 0;

    levels[3].enemies.enemy4.vx = -2.5;
    levels[3].enemies.enemy4.vy = 0;

    levels[3].enemies.enemy5.vx = 2.5;
    levels[3].enemies.enemy5.vy = 0;

    levels[3].enemies.enemy6.vx = -2.5;
    levels[3].enemies.enemy6.vy = 0;

    levels[3].regen = Math.floor(Math.random()*2);
  }
  else if (randomly_generated_level == 4){
    levels[0].status = 0;
    levels[1].status = 0;
    levels[2].status = 0;
    levels[3].status = 0;
    levels[4].status = 1;

    levels[4].active = 1;

    levels[4].enemies.key1.touched = 0;
    levels[4].enemies.key2.touched = 0;

    levels[4].regen = Math.floor(Math.random()*2);
  };

};

function GetRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function ChooseWhereIsExitDoor(){
  /* The function is suppose to choose where the next doors will open at the end of the level */
  if (door_number == 3){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==2){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==3){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }}
  else if (door_number == 4){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else{ if (randomly_generated_door==3)
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }

  }
  else if (door_number == 1){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==3){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }

  }
  else if(door_number == 2){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }
  else if (randomly_generated_door==3){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();    
  }

  }
};

function PushBullets(){
  if(right_arrow_pressed) {
    if(!shooting_delay){
      bullets.push({
        bulletx: x_character,
        bullety: y_character,
        bulletvx: 6,
        bulletvy: 0,
        status: 1
      });
      shooting_delay=!shooting_delay;
      setTimeout(ShootingTimer,500);
    };
  };
  if(left_arrow_pressed) {
    if(!shooting_delay){
      bullets.push({
        bulletx: x_character,
        bullety: y_character,
        bulletvx: -6,
        bulletvy: 0,
        status: 1
      });
      shooting_delay=!shooting_delay;
      setTimeout(ShootingTimer,500);
    };
  };
  if(up_arrow_pressed) {
    if(!shooting_delay){
      bullets.push({
        bulletx: x_character,
        bullety: y_character,
        bulletvx: 0,
        bulletvy: -6,
        status: 1
      });
      shooting_delay=!shooting_delay;
      setTimeout(ShootingTimer,500);
    };
  };
  if(down_arrow_pressed) {
    if(!shooting_delay){
      bullets.push({
        bulletx: x_character,
        bullety: y_character,
        bulletvx: 0,
        bulletvy: 6,
        status: 1
      });
      shooting_delay=!shooting_delay;
      setTimeout(ShootingTimer,500);
    };
  };
};

function DrawScore(){
  context.font="20px Consolas";
  context.fillText("Rooms Passed:"+room_counter+"/15", 425, 40);
};

function ShootingTimer(){
  shooting_delay = !shooting_delay;
};

function InvincibleTimer(){
  player_invincible=!player_invincible;
  character_colour="blue";
};

function DamageDelay(){
  if(!player_invincible){
    character_health--;
    player_invincible=!player_invincible;
    setTimeout(InvincibleTimer,1000);
    character_colour="green";
};

};

function InvincibleTimerEnemy(){
  enemy_invincible=!enemy_invincible;
};

function DrawShot(){

  for (i=0;i<bullets.length;i++){
    if (bullets[i].status==1){
      context.beginPath();
      context.arc(bullets[i].bulletx, bullets[i].bullety, 5, 0, Math.PI*2);
      context.fillStyle = "red";
      context.fill();
      context.closePath();
      bullets[i].bulletx+=bullets[i].bulletvx;
      bullets[i].bullety+=bullets[i].bulletvy;
    };
    
    /*Level 1 Enemy Health */
    
    if (levels[1].status == 1){
      if (bullets[i].bulletx>levels[1].enemies.enemy1.x &&
          bullets[i].bulletx<levels[1].enemies.enemy1.x+30 &&
          bullets[i].bullety>levels[1].enemies.enemy1.y &&
          bullets[i].bullety<levels[1].enemies.enemy1.y+30){
            
        if (!enemy_invincible){
          levels[1].enemies.enemy1.health--;
          enemy_invincible=!enemy_invincible;
          setTimeout(InvincibleTimerEnemy,300);
        };
      };
      
      if (bullets[i].bulletx>levels[1].enemies.enemy2.x &&
          bullets[i].bulletx<levels[1].enemies.enemy2.x+30 &&
          bullets[i].bullety>levels[1].enemies.enemy2.y &&
          bullets[i].bullety<levels[1].enemies.enemy2.y+30){
        if (!enemy_invincible){
          levels[1].enemies.enemy2.health--;
          enemy_invincible=!enemy_invincible;
          setTimeout(InvincibleTimerEnemy,300);
        };
      };
      
      if (bullets[i].bulletx>levels[1].enemies.enemy3.x &&
          bullets[i].bulletx<levels[1].enemies.enemy3.x+30 &&
          bullets[i].bullety>levels[1].enemies.enemy3.y && 
          bullets[i].bullety<levels[1].enemies.enemy3.y+30){
        if (!enemy_invincible){
          levels[1].enemies.enemy3.health--;
          enemy_invincible=!enemy_invincible;
          setTimeout(InvincibleTimerEnemy,300);
        };
      };
      
      if (bullets[i].bulletx>levels[1].enemies.enemy4.x &&
          bullets[i].bulletx<levels[1].enemies.enemy4.x+30 &&
          bullets[i].bullety>levels[1].enemies.enemy4.y &&
          bullets[i].bullety<levels[1].enemies.enemy4.y+30){
        if (!enemy_invincible){
          levels[1].enemies.enemy4.health--;
          enemy_invincible=!enemy_invincible;
          setTimeout(InvincibleTimerEnemy,300);
        };
      };
      
      if (bullets[i].bulletx>levels[1].enemies.enemy5.x &&
          bullets[i].bulletx<levels[1].enemies.enemy5.x+30 &&
          bullets[i].bullety>levels[1].enemies.enemy5.y &&
          bullets[i].bullety<levels[1].enemies.enemy5.y+30){
        if (!enemy_invincible){
          levels[1].enemies.enemy5.health--;
          enemy_invincible=!enemy_invincible;
          setTimeout(InvincibleTimerEnemy,300);
        };
      };
    };
    
    /*Level 2 Enemy Health */
    
    if(levels[2].status == 1){
    if( bullets[i].bulletx>levels[2].enemies.enemy1.x-10 && bullets[i].bulletx<levels[2].enemies.enemy1.x+10 && bullets[i].bullety>levels[2].enemies.enemy1.y-10 && bullets[i].bullety<levels[2].enemies.enemy1.y+10){

      if(!enemy_invincible){
        levels[2].enemies.enemy1.health--;
        enemy_invincible=!enemy_invincible;
        setTimeout(InvincibleTimerEnemy,300);


  }}
    
    if( bullets[i].bulletx>levels[2].enemies.enemy2.x-10 && bullets[i].bulletx<levels[2].enemies.enemy2.x+10 && bullets[i].bullety>levels[2].enemies.enemy2.y-10 && bullets[i].bullety<levels[2].enemies.enemy2.y+10){
      if(!enemy_invincible){
        levels[2].enemies.enemy2.health--;
        enemy_invincible=!enemy_invincible;
        setTimeout(InvincibleTimerEnemy,300);


  }
    }
    
    if( bullets[i].bulletx>levels[2].enemies.enemy3.x-10 && bullets[i].bulletx<levels[2].enemies.enemy3.x+10 && bullets[i].bullety>levels[2].enemies.enemy3.y-10 && bullets[i].bullety<levels[2].enemies.enemy3.y+10){
      if(!enemy_invincible){
        levels[2].enemies.enemy3.health--;
        enemy_invincible=!enemy_invincible;
        setTimeout(InvincibleTimerEnemy,300);


  }
    }
    
    if( bullets[i].bulletx>levels[2].enemies.enemy4.x-10 && bullets[i].bulletx<levels[2].enemies.enemy4.x+10 && bullets[i].bullety>levels[2].enemies.enemy4.y-10 && bullets[i].bullety<levels[2].enemies.enemy4.y+10){
      if(!enemy_invincible){
        levels[2].enemies.enemy4.health--;
        enemy_invincible=!enemy_invincible;
        setTimeout(InvincibleTimerEnemy,300);


  }
    }
    }
    
    /*Level 3 Enemy Health */
    
    if(levels[3].status == 1){
    if( bullets[i].bulletx>levels[3].enemies.enemy1.x-30 && bullets[i].bulletx<levels[3].enemies.enemy1.x+30 && bullets[i].bullety>levels[3].enemies.enemy1.y-30 && bullets[i].bullety<levels[3].enemies.enemy1.y+30){
      levels[3].enemies.enemy1.health--;
    }
    
    if( bullets[i].bulletx>levels[3].enemies.enemy2.x-30 && bullets[i].bulletx<levels[3].enemies.enemy2.x+30 && bullets[i].bullety>levels[3].enemies.enemy2.y-30 && bullets[i].bullety<levels[3].enemies.enemy2.y+30){
      levels[3].enemies.enemy2.health--;
    }
    
    if( bullets[i].bulletx>levels[3].enemies.enemy3.x-30 && bullets[i].bulletx<levels[3].enemies.enemy3.x+30 && bullets[i].bullety>levels[3].enemies.enemy3.y-30 && bullets[i].bullety<levels[3].enemies.enemy3.y+30){
      levels[3].enemies.enemy3.health--;
    }
    
    if( bullets[i].bulletx>levels[3].enemies.enemy4.x-30 && bullets[i].bulletx<levels[3].enemies.enemy4.x+30 && bullets[i].bullety>levels[3].enemies.enemy4.y-30 && bullets[i].bullety<levels[3].enemies.enemy4.y+30){
      levels[3].enemies.enemy4.health--;
    }
    
    if( bullets[i].bulletx>levels[3].enemies.enemy5.x-30 && bullets[i].bulletx<levels[3].enemies.enemy5.x+30 && bullets[i].bullety>levels[3].enemies.enemy5.y-30 && bullets[i].bullety<levels[3].enemies.enemy5.y+30){
      levels[3].enemies.enemy5.health--;
    }
    
    if( bullets[i].bulletx>levels[3].enemies.enemy6.x-30 && bullets[i].bulletx<levels[3].enemies.enemy6.x+30 && bullets[i].bullety>levels[3].enemies.enemy6.y-30 && bullets[i].bullety<levels[3].enemies.enemy6.y+30){
      levels[3].enemies.enemy6.health--;
    }

    }
    };
};

function ShotRemove(){

for(i=0;i<bullets.length;i++){

      /* Enemy shield detection */
      if(levels[3].enemies.enemy1.sAngle == Math.PI*1.5 && levels[3].enemies.enemy1.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy1.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy1.x) && (bullets[i].bullety >= levels[3].enemies.enemy1.y-35 && bullets[i].bullety <= levels[3].enemies.enemy1.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy1.sAngle == 0 && levels[3].enemies.enemy1.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy1.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy1.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy1.y && bullets[i].bullety <= levels[3].enemies.enemy1.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy1.sAngle == Math.PI*0.5 && levels[3].enemies.enemy1.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy1.x && bullets[i].bulletx >= levels[3].enemies.enemy1.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy1.y-35 && bullets[i].bullety <= levels[3].enemies.enemy1.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if (levels[3].enemies.enemy1.health > 0) {
            if((bullets[i].bulletx <= levels[3].enemies.enemy1.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy1.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy1.y-35 && bullets[i].bullety <= levels[3].enemies.enemy1.y)){
            bullets.splice(i, 1); return;
          }         
          } 
          
      if(levels[3].enemies.enemy2.sAngle == Math.PI*1.5  && levels[3].enemies.enemy2.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy2.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy2.x) && (bullets[i].bullety >= levels[3].enemies.enemy2.y-35 && bullets[i].bullety <= levels[3].enemies.enemy2.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy2.sAngle == 0  && levels[3].enemies.enemy2.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy2.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy2.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy2.y && bullets[i].bullety <= levels[3].enemies.enemy2.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy2.sAngle == Math.PI*0.5  && levels[3].enemies.enemy2.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy2.x && bullets[i].bulletx >= levels[3].enemies.enemy2.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy2.y-35 && bullets[i].bullety <= levels[3].enemies.enemy2.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if( levels[3].enemies.enemy2.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy2.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy2.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy2.y-35 && bullets[i].bullety <= levels[3].enemies.enemy2.y)){
            bullets.splice(i, 1); return;
          }         
          }
          
                if(levels[3].enemies.enemy3.sAngle == Math.PI*1.5   && levels[3].enemies.enemy3.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy3.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy3.x) && (bullets[i].bullety >= levels[3].enemies.enemy3.y-35 && bullets[i].bullety <= levels[3].enemies.enemy3.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy3.sAngle == 0  && levels[3].enemies.enemy3.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy3.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy3.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy3.y && bullets[i].bullety <= levels[3].enemies.enemy3.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy3.sAngle == Math.PI*0.5  && levels[3].enemies.enemy3.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy3.x && bullets[i].bulletx >= levels[3].enemies.enemy3.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy3.y-35 && bullets[i].bullety <= levels[3].enemies.enemy3.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if( levels[3].enemies.enemy3.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy3.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy3.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy3.y-35 && bullets[i].bullety <= levels[3].enemies.enemy3.y)){
            bullets.splice(i, 1); return;
          }         
          }
          
                if(levels[3].enemies.enemy4.sAngle == Math.PI*1.5   && levels[3].enemies.enemy4.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy4.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy4.x) && (bullets[i].bullety >= levels[3].enemies.enemy4.y-35 && bullets[i].bullety <= levels[3].enemies.enemy4.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy4.sAngle == 0   && levels[3].enemies.enemy4.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy4.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy4.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy4.y && bullets[i].bullety <= levels[3].enemies.enemy4.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy4.sAngle == Math.PI*0.5   && levels[3].enemies.enemy4.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy4.x && bullets[i].bulletx >= levels[3].enemies.enemy4.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy4.y-35 && bullets[i].bullety <= levels[3].enemies.enemy4.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if( levels[3].enemies.enemy4.health > 0) {
            if((bullets[i].bulletx <= levels[3].enemies.enemy4.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy4.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy4.y-35 && bullets[i].bullety <= levels[3].enemies.enemy4.y)){
            bullets.splice(i, 1); return;
          }         
          }
          
                if(levels[3].enemies.enemy5.sAngle == Math.PI*1.5   && levels[3].enemies.enemy5.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy5.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy5.x) && (bullets[i].bullety >= levels[3].enemies.enemy5.y-35 && bullets[i].bullety <= levels[3].enemies.enemy5.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy5.sAngle == 0  && levels[3].enemies.enemy5.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy5.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy5.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy5.y && bullets[i].bullety <= levels[3].enemies.enemy5.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy5.sAngle == Math.PI*0.5  && levels[3].enemies.enemy5.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy5.x && bullets[i].bulletx >= levels[3].enemies.enemy5.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy5.y-35 && bullets[i].bullety <= levels[3].enemies.enemy5.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if ( levels[3].enemies.enemy5.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy5.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy5.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy5.y-35 && bullets[i].bullety <= levels[3].enemies.enemy5.y)){
            bullets.splice(i, 1); return;
          }         
          }
    if(levels[3].enemies.enemy6.sAngle == Math.PI*1.5  && levels[3].enemies.enemy6.health > 0){ 

            if((bullets[i].bulletx <= levels[3].enemies.enemy6.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy6.x) && (bullets[i].bullety >= levels[3].enemies.enemy6.y-35 && bullets[i].bullety <= levels[3].enemies.enemy6.y+35)){
            bullets.splice(i, 1); return;
          }
        }
          
          else if(levels[3].enemies.enemy6.sAngle == 0 && levels[3].enemies.enemy6.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy6.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy6.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy6.y && bullets[i].bullety <= levels[3].enemies.enemy6.y+35)){
            bullets.splice(i, 1); return;
          }
          }
          else if(levels[3].enemies.enemy6.sAngle == Math.PI*0.5 && levels[3].enemies.enemy6.health > 0){
            if((bullets[i].bulletx <= levels[3].enemies.enemy6.x && bullets[i].bulletx >= levels[3].enemies.enemy6.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy6.y-35 && bullets[i].bullety <= levels[3].enemies.enemy6.y+35)){
            bullets.splice(i, 1); return;
          } 
          }
          else if( levels[3].enemies.enemy6.health > 0) {
            if((bullets[i].bulletx <= levels[3].enemies.enemy6.x+35 && bullets[i].bulletx >= levels[3].enemies.enemy6.x-35) && (bullets[i].bullety >= levels[3].enemies.enemy6.y-35 && bullets[i].bullety <= levels[3].enemies.enemy6.y)){
            bullets.splice(i, 1); return;
          }         
          }



}}
/*
function shieldDeflect(){

      if(bullets.length>0){

        for(i=0;i<bullets.length;i++){  
        if(this.sAngle == Math.PI*1.5){ 

            if((bullets[i].bulletx <= this.x+35 && bullets[i].bulletx > this.x) && (bullets[i].bullety >= this.y-35 && bullets[i].bullety <= this.y+35)){
            bullets[i].status=0;
          }
        }
          
          else if(this.sAngle == 0){}
          else if(this.sAngle == Math.PI*0.5){}
          else {} 
        }
      }}
*/

function DrawLevels(){
  for (i=0; i < levels.length; i++){
    if (levels[i].status == 1){
      levels[i].level();
    };
  };
};





function DrawHearts(){
  start_point = new Point(10, 10);
  heart_size = 40;
  heart_spacing = heart_size / 4;
  health = character_health;
  
  health_bar = new HealthBar(start_point, heart_size, heart_spacing, health);
  //context.fillStyle = heart_colour;
  health_bar.DrawShape();
};

function DrawCharacter() {
  character_position = new Point(x_character, y_character);
  character = new Character(character_position, character_radius);
  context.fillStyle = character_colour;
  character.DrawShape();
};

/* Level graphics */

function DrawStartingRoom(){
  //Note: also draws when the level is completed
  DrawStartingRoomWalls();
  DrawStartingRoomDoors();
};

function DrawStartingRoomWalls(){
  top_left = new Point(0, 0);
  bottom_left = new Point(0, y_wall_offset);
  top_right = new Point(x_wall_offset, 0);
  
  top_wall = new Wall(top_left, wall_thickness_one, canvas.width, "horizontal");
  bottom_wall = new Wall(bottom_left, wall_thickness_one, canvas.width, "horizontal");
  right_wall = new Wall(top_right, wall_thickness_one, canvas.height, "vertical");
  left_wall = new Wall(top_left, wall_thickness_one, canvas.height, "vertical");
  
  //impassible_objects_array.push(top_wall);
  //impassible_objects_array.push(bottom_wall);
  //impassible_objects_array.push(right_wall);
  //impassible_objects_array.push(left_wall);
  
  context.fillStyle = starting_room_wall_colour;
  top_wall.DrawShape();
  bottom_wall.DrawShape();
  right_wall.DrawShape();
  left_wall.DrawShape();
};

function DrawStartingRoomDoors(){
  top_middle = new Point(x_door_offset, 0);
  bottom_middle = new Point(x_door_offset, y_wall_offset);
  right_middle = new Point(x_wall_offset, y_door_offset);
  left_middle = new Point(0, y_door_offset);
  
  top_door = new Door(top_middle, wall_thickness_one, door_size, "horizontal");
  bottom_door = new Door(bottom_middle, wall_thickness_one, door_size, "horizontal");
  right_door = new Door(right_middle, wall_thickness_one, door_size, "vertical");
  left_door = new Door(left_middle, wall_thickness_one, door_size, "vertical");
  
  context.fillStyle = starting_room_door_colour;
  top_door.DrawShape();
  bottom_door.DrawShape();
  right_door.DrawShape();
  left_door.DrawShape();
};

/* Keyboard input handlers */

function KeyDownHandler(e) {
  if(e.keyCode == 68) {
    d_pressed = true;
  }
  if(e.keyCode == 65) {
    a_pressed = true;
  }
  if(e.keyCode == 87) {
    w_pressed = true;
  }
  if(e.keyCode == 83) {
    s_pressed = true;
  }
  if(e.keyCode == 39) {
    right_arrow_pressed = true;
  }
  if(e.keyCode == 37) {
    left_arrow_pressed = true;
  }
  if(e.keyCode == 38) {
    up_arrow_pressed = true;
  }
  if(e.keyCode == 40) {
    down_arrow_pressed = true;
  }

}

function KeyUpHandler(e) {
  if(e.keyCode == 68) {
    d_pressed = false;
  }
  if(e.keyCode == 65) {
    a_pressed = false;
  }
  if(e.keyCode == 87) {
    w_pressed = false;
  }
  if(e.keyCode == 83) {
    s_pressed = false;
  }
  if(e.keyCode == 39) {
    right_arrow_pressed = false;
  }
  if(e.keyCode == 37) {
    left_arrow_pressed = false;
  }
  if(e.keyCode == 38) {
    up_arrow_pressed = false;
  }
  if(e.keyCode == 40) {
    down_arrow_pressed = false;
  }

}

/* Refactoring functions */

function ResetCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
};


function Point(x, y){
  this.x = x;
  this.y = y;
};


function Shape(){
};

Shape.prototype.BeginPath = function(){
  context.beginPath();
};

Shape.prototype.ClosePath = function(){
  context.closePath();
};

Shape.prototype.Fill = function(){
  context.fill();
};


function Rectangle(start_point, dimensions){
  Shape.call(this);
  
  this.start_point = start_point;
  this.width = dimensions.x;
  this.height = dimensions.y;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this);
  context.rect(this.start_point.x, this.start_point.y, this.width, this.height);
  Shape.prototype.ClosePath.call(this);
  Shape.prototype.Fill.call(this);
};


function Wall(start_point, thickness, length, orientation){
  dimensions = ChooseWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions);
  this.min_x = this.start_point.x;
  this.max_x = this.start_point.x + this.width;
  this.min_y = this.start_point.y;
  this.max_y = this.start_point.y + this.height;
};

Wall.prototype = Object.create(Rectangle.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.IsCollidedWithRectangularObject = function(rectangular_object){
  /* Assumes that both the rectangular object and the Wall are aligned with the axis */
  object_small_x = rectangular_object.min_x;
  object_big_x = rectangular_object.max_x;
  object_small_y = rectangular_object.min_y;
  object_big_y = rectangular_object.max_y;
  
  wall_small_x = this.min_x;
  wall_big_x = this.max_x;
  wall_small_y = this.min_y;
  wall_big_y = this.max_y;
  
  IsCollidedOnX(wall_small_x, wall_big_x, object_small_x, object_big_x);
  IsCollidedOnY(wall_small_y, wall_big_y, object_small_y, object_big_y);
};

function IsCollidedOnX(wall_small_x, wall_big_x, object_small_x, object_big_x){
  /* Right and Left are the sides of the Wall (not the colliding object) */
  if (IsRightSideCollided(wall_small_x, wall_big_x, object_small_x, object_big_x) || IsLeftSideCollided(wall_small_x, wall_big_x, object_small_x, object_big_x)){
    return true;
  };
  return false;
};

function IsRightSideCollided(x1, x2, c1, c2){
  if ((c1 > x1) && (x2 > c1)){
    return true;
  };
  return false;
};

function IsLeftSideCollided(x1, x2, c1, c2){
  if ((c2 > x1) && (x2 > c2)){
    return true;
  };
  return false;
};

function IsCollidedOnY(wall_small_y, wall_big_y, object_small_y, object_big_y){
  /* Top and Bottom are the sides of the Wall (not the colliding object) */
  if (IsRightSideCollided(wall_small_y, wall_big_y, object_small_y, object_big_y) || IsLeftSideCollided(wall_small_y, wall_big_y, object_small_y, object_big_y)){
    return true;
  };
  return false;
};

function IsTopSideCollided(y1, y2, c1, c2){
  if (IsRightSideCollided(y1, y2, c1, c2)){
    return true;
  };
  return false;
};

function IsBottomSideCollided(y1, y2, c1, c2){
  if (IsLeftSideCollided(y1, y2, c1, c2)){
    return true;
  };
  return false;
};



function Door(start_point, thickness, length, orientation){
  dimensions = ChooseWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions);
};

Door.prototype = Object.create(Rectangle.prototype);
Door.prototype.constructor = Door;

function ChooseWallOrDoorDimensions(thickness, length, orientation){
  if (orientation === "horizontal"){
    dimensions = new Point(length, thickness);
  }
  else if (orientation === "vertical"){
    dimensions = new Point(thickness, length);
  }
  else{
    alert("Wall orientation is neither horizontal nor vertical.");
  };
  return dimensions;
};


function Triangle(first, second, third){
  Shape.call(this);
  
  this.first = first;
  this.second = second;
  this.third = third;
};

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this);
  context.moveTo(this.first.x, this.first.y);
  context.lineTo(this.second.x, this.second.y);
  context.lineTo(this.third.x, this.third.y);
  Shape.prototype.ClosePath.call(this);
  Shape.prototype.Fill.call(this);
};


function Circle(center, radius){
  Shape.call(this);
  
  this.center = center;
  this.radius = radius;
  this.start_angle = 0;
  this.end_angle = 2 * Math.PI;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this)
  context.arc(this.center.x, this.center.y, this.radius, this.start_angle, this.end_angle);
  Shape.prototype.ClosePath.call(this)
  Shape.prototype.Fill.call(this)
};


function Character(center, radius){
  Circle.call(this, center, radius);
  /* For collision detection with Walls */
  this.min_x = this.center.x - this.radius;
  this.max_x = this.center.x + this.radius;
  this.min_y = this.center.y - this.radius;
  this.max_y = this.center.y + this.radius;
};

Character.prototype = Object.create(Circle.prototype);
Character.prototype.constructor = Character;

Character.prototype.MoveUp = function(amount){
  this.center.y -= amount
};

Character.prototype.MoveLeft = function(amount){
  this.center.x -= amount
};

Character.prototype.MoveDown = function(amount){
  this.center.y += amount
};

Character.prototype.MoveRight = function(amount){
  this.center.x += amount
};


function Arc(radius, start_angle, end_angle){
  //in radians(for example Math.PI/2 is 90 degrees)
  //0th degree is at the x axis and increases clockwise
  this.radius = radius;
  this.start_angle = start_angle;
  this.end_angle = end_angle;
};


function Slice(center, arc){
  Shape.call(this);
  
  this.center = center;
  this.arc = arc;
};

Slice.prototype = Object.create(Shape.prototype);
Slice.prototype.constructor = Slice;

Slice.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this)
  context.arc(this.center.x, this.center.y, this.arc.radius, this.arc.start_angle, this.arc.end_angle);
  Shape.prototype.ClosePath.call(this)
  Shape.prototype.Fill.call(this)
};


function HealthBar(start_point, token_size, token_spacing, health){
  this.start_point = start_point;
  this.token_spacing = token_spacing;
  this.token_size = token_size;
  
  /* Health visualization */
  this.number_of_left_half_hearts = (health % 2);
  this.number_of_full_hearts = Math.floor(health / 2);
};

HealthBar.prototype.DrawShape = function(){
  DrawHealthBarFullHearts(this.start_point, this.number_of_full_hearts, this.token_size, this.token_spacing);

  if (this.number_of_left_half_hearts === 1){
    DrawHealthBarLeftHalfHeart(this.start_point, this.number_of_full_hearts, this.token_size, this.token_spacing);
  };
};

function DrawHealthBarFullHearts(health_bar_start_point, token_limit, token_size, token_spacing){
  y_token_start_point = health_bar_start_point.y;
  
  for (token_counter = 0; token_counter < token_limit; token_counter += 1){
    x_token_offset = token_counter * (token_size + token_spacing);
    x_token_start_point = health_bar_start_point.x + x_token_offset;
    
    token_start_point = new Point(x_token_start_point, y_token_start_point);
    
    full_heart = new FullHeart(token_start_point, token_size);
    full_heart.DrawShape();
  };
};

function DrawHealthBarLeftHalfHeart(health_bar_start_point, number_of_full_hearts, token_size, token_spacing){
  x_token_offset = number_of_full_hearts * (token_size + token_spacing);
  x_token_start_point = health_bar_start_point.x + x_token_offset;
  
  token_start_point = new Point(x_token_start_point, y_token_start_point);
  
  left_half_heart = new HalfHeart(token_start_point, token_size, "left");
  left_half_heart.DrawShape();
};


function FullHeart(start_point, size){
  this.left_heart = new HalfHeart(start_point, size, "left");
  this.right_heart = new HalfHeart(start_point, size, "right");
};

FullHeart.prototype.DrawShape = function(){
  this.left_heart.DrawShape();
  this.right_heart.DrawShape();
};


function HalfHeart(start_point, size, heart_part){
  point_array = CalculateFourHalfHeartPoints(start_point, size, heart_part);
  center = point_array[0];
  side_point = point_array[1];
  top_point = point_array[2];
  bottom_point = point_array[3];
  
  radius = size / 4;
  
  semicircle_arc = new Arc(radius, Math.PI, 2 * Math.PI);
  
  this.top_semicircle = new Slice(center, semicircle_arc);
  this.triangle = new Triangle(side_point, top_point, bottom_point);
};

function CalculateFourHalfHeartPoints(start_point, size, heart_part){
  x_offset = start_point.x;
  y_offset = start_point.y;
  
  full_size = size;
  three_forths_size = ((3 * size) / 4);
  quarter_size = size / 4;
  half_size = size / 2;
  
  if (heart_part === "left"){
    center = new Point(quarter_size + x_offset, quarter_size + y_offset);
    side_point = new Point(0 + x_offset, quarter_size + y_offset);
  }
  else if (heart_part === "right"){
    center = new Point(three_forths_size + x_offset, quarter_size + y_offset);
    side_point = new Point(full_size + x_offset, quarter_size + y_offset);
  }
  else{
    alert("Heart part is neither left nor right");
  };
  
  top_middle_point = new Point(half_size + x_offset, quarter_size + y_offset);
  bottom_middle_point = new Point(half_size + x_offset, full_size + y_offset);
  
  return [center, side_point, top_middle_point, bottom_middle_point]
};

HalfHeart.prototype.DrawShape = function(){
  this.top_semicircle.DrawShape();
  this.triangle.DrawShape();
};


/* Key Handlers */

document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

RedrawCanvas();