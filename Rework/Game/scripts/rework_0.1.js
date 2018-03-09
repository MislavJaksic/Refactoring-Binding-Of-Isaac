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

var x = canvas.width / 2;
var y = canvas.height / 2;
var character_radius = 20; 
var player_health = 6; //each health is represented by half a heart
var player_colour = "orange";

var bullets = [];
var enemy_bullets = [];

var room_counter = 0;

var dx = 2;
var dy =- 2;

var door_number;
var randomly_generated_door;

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

/* Score Display/Graphics */

var left_half_heart_x=[];
for(i = 30; i <= player_health * 30; i += 30){
  left_half_heart_x.push(i);
}
var right_half_heart_x=[0];
for(i = 30; i <= player_health * 30; i += 30){
  right_half_heart_x.push(i);
}

/* Timer delay on shots */
var shooting_delay = false;

/* Damage delay function */
var player_invincible = false;

/* Damage delay on enemies */
var enemy_invincible = false;

/* Levels */

var levels=[
{  
    /* Starting room */
	level: function(){
	
		/* Control Tutorial */
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
		
		
		if(d_pressed && x < canvas.width-character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x += 5;
		}
		else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
			x += 5;
		}

		if(a_pressed && x > 0+character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x -= 5;
		}
		else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
			x -= 5;
		}

		if(w_pressed && y > 0+character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y -= 5;
		}
		else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
			y -= 5;
		}

		if(s_pressed && y < canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y += 5;
		}
		else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
			y += 5;
		}

},

	status: 1

},
{
	/* Level 1 */
	
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
			
			
			if(enemy_bullets[i].enemyBulletx > x-character_radius && enemy_bullets[i].enemyBulletx < x+character_radius && enemy_bullets[i].enemyBullety > y-character_radius && enemy_bullets[i].enemyBullety < y+character_radius ){
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
			var distx = (x - character_radius/2) - this.enemy1.x;
			var disty = (y - character_radius/2) - this.enemy1.y;
			var distance = Math.sqrt((distx*distx) + (disty*disty)); 
			var killx = distx / (distance - character_radius/2);
			var killy = disty / (distance - character_radius/2);
			
		if (x < 470 && x > 190 && distance>this.enemy1.enemyLength+10){
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
		if(y > this.enemy2.y-character_radius && y < this.enemy2.y+30+character_radius && x > this.enemy2.x+15){
	
		enemy_bullets.push({
		enemyBulletx: this.enemy2.x+this.enemy2.enemyLength/2,
		enemyBullety: this.enemy2.y+this.enemy2.enemyThickness/2,
		enemyBulletvx: 3,
		enemyBulletvy: 0
		});
			this.enemy2.enemyFire=false;
			}
		else if (x > this.enemy2.x-character_radius && x < this.enemy2.x+30+character_radius && y > this.enemy2.y+15){
	
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
		if(y > this.enemy3.y-character_radius && y < this.enemy3.y+30+character_radius && x < this.enemy3.x+15){
	
		enemy_bullets.push({
		enemyBulletx: this.enemy3.x+this.enemy3.enemyLength/2,
		enemyBullety: this.enemy3.y+this.enemy3.enemyThickness/2,
		enemyBulletvx: -3,
		enemyBulletvy: 0
		});
			this.enemy3.enemyFire=false;
			}
		else if (x > this.enemy3.x-character_radius && x < this.enemy3.x+30+character_radius && y > this.enemy3.y+15){
	
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
		if(y > this.enemy4.y-character_radius && y < this.enemy4.y+30+character_radius && x > this.enemy4.x+15){
	
		enemy_bullets.push({
		enemyBulletx: this.enemy4.x+this.enemy4.enemyLength/2,
		enemyBullety: this.enemy4.y+this.enemy4.enemyThickness/2,
		enemyBulletvx: 3,
		enemyBulletvy: 0
		});
			this.enemy4.enemyFire=false;
			}
		else if (x > this.enemy4.x-character_radius && x < this.enemy4.x+30+character_radius && y < this.enemy4.y+15){
	
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
		if(y > this.enemy5.y-character_radius && y < this.enemy5.y+30+character_radius && x < this.enemy5.x+15){
	
		enemy_bullets.push({
		enemyBulletx: this.enemy5.x+this.enemy5.enemyLength/2,
		enemyBullety: this.enemy5.y+this.enemy5.enemyThickness/2,
		enemyBulletvx: -3,
		enemyBulletvy: 0
		});
			this.enemy5.enemyFire=false;
			}
		else if (x > this.enemy5.x-character_radius && x < this.enemy5.x+30+character_radius && y < this.enemy5.y+15){
	
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

		context.beginPath();
		context.rect(100, 100, 100, wall_thickness_one);
		context.rect(100, 100, wall_thickness_one, 100);
		context.rect(100, canvas.height-120, 100, wall_thickness_one);
		context.rect(100, canvas.height-200, wall_thickness_one, 100);
		context.rect(canvas.width-200, 100, 100, wall_thickness_one);
		context.rect(canvas.width-120, 100, wall_thickness_one, 100);
		context.rect(canvas.width-200, canvas.height-120, 100, wall_thickness_one);
		context.rect(canvas.width-120, canvas.height-200, wall_thickness_one, 100);
		
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
		this.enemies.enemy1.spawn();}

		if(this.enemies.enemy2.health>0){
		this.enemies.enemy2.spawn();}

		if(this.enemies.enemy3.health>0){
		this.enemies.enemy3.spawn();}

		if(this.enemies.enemy4.health>0){
		this.enemies.enemy4.spawn();}	

		if(this.enemies.enemy5.health>0){
		this.enemies.enemy5.spawn();}
		
		this.enemies.drawenemyShot();
		this.enemies.enemyShoot();
	

	/* Level 1 Movement */
		/* Right */
		if(this.active == 0){
		if (
			(x == canvas.width-120-character_radius && (y > 120 && y < canvas.height-120))
			||
			(x == canvas.width-200-character_radius && ((y > 100-character_radius && y < 120+character_radius) || (y > canvas.height-120-character_radius && y < canvas.height-100+character_radius)))
			||
			(x == 100-character_radius && (y > 100-character_radius && y < canvas.height-100+character_radius))
			){}
			
		else if(d_pressed && x < canvas.width-character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x += 5;
		}
		
		else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
			x += 5;
		}}
		else{
				if (
			(x == canvas.width-120-character_radius && (y > 120 && y < canvas.height-120))
			||
			(x == canvas.width-200-character_radius && ((y > 100-character_radius && y < 120+character_radius) || (y > canvas.height-120-character_radius && y < canvas.height-100+character_radius)))
			||
			(x == 100-character_radius && (y > 100-character_radius && y < canvas.height-100+character_radius))
			){}
		
		else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
			x += 5;
		}
		}

		
		/* Left */
		
	if(this.active == 0){
		if (
			(x == 120+character_radius && (y > 120 && y < canvas.height-120))
			||
			(x == 200+character_radius && ((y > 100-character_radius && y < 120+character_radius) || (y > canvas.height-120-character_radius && y < canvas.height-100+character_radius)))
			||
			(x == canvas.width-100+character_radius && (y > 100-character_radius && y < canvas.height-100+character_radius))
			){}	
			
		else if(a_pressed && x > 0+character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x -= 5;
		}
		else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
			x -= 5;
		}}
	else{
		if (
			(x == 120+character_radius && (y > 120 && y < canvas.height-120))
			||
			(x == 200+character_radius && ((y > 100-character_radius && y < 120+character_radius) || (y > canvas.height-120-character_radius && y < canvas.height-100+character_radius)))
			||
			(x == canvas.width-100+character_radius && (y > 100-character_radius && y < canvas.height-100+character_radius))
			){}	
		
		else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
			x -= 5;
		}	
	}	
		
		
		/* Up */
	if(this.active == 0){		
		if (
			((x > 100-character_radius && x < 200+character_radius) || (x > canvas.width-200-character_radius && x < canvas.width-100+character_radius)) 
			&&
			(y == 120+character_radius || y == canvas.height-100+character_radius)

			){}	
		
		else if(w_pressed && y > 0+character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y -= 5;
		}
		else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
			y -= 5;
		}}
	else{
		if (
			((x > 100-character_radius && x < 200+character_radius) || (x > canvas.width-200-character_radius && x < canvas.width-100+character_radius)) 
			&&
			(y == 120+character_radius || y == canvas.height-100+character_radius)

			){}	
		
		else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
			y -= 5;
		}	
	}	

		
		/* Down */
		
	if(this.active == 0){		
		if (
			((x > 100-character_radius && x < 200+character_radius) || (x > canvas.width-200-character_radius && x < canvas.width-100+character_radius)) 
			&&
			(y == 100-character_radius || y == canvas.height-120-character_radius)

			){}	
		else if(s_pressed && y < canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y += 5;
		}
		else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
			y += 5;
		}}
	else{
		if (
			((x > 100-character_radius && x < 200+character_radius) || (x > canvas.width-200-character_radius && x < canvas.width-100+character_radius)) 
			&&
			(y == 100-character_radius || y == canvas.height-120-character_radius)

			){}	

		else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
			y += 5;
		}	
	}	
	
	if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0 && this.enemies.enemy5.health <= 0){
		this.active=0;
		
		if(this.regen==1){
			if(x > canvas.width/2-character_radius && x < canvas.width/2+character_radius && y > canvas.height/2-character_radius && y < canvas.height/2+character_radius){

				player_health++;
				left_half_heart_x=[];
				for(i=30;i<=player_health*30;i+=30){
				left_half_heart_x.push(i);
				}
				right_half_heart_x=[0];
				for(i=30;i<=player_health*30;i+=30){
				right_half_heart_x.push(i);
				}				
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
	
	
	


},

	status: 0,
	active: 1,
	
	regen: 0
	
},	
{  /* Level 2 */

	/* Level 2 Enemies */ 

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
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>character_radius){
			this.x += killerx *3;
			this.y += killery *3;}
		
			// enemy hit detection
			if((this.x < x+character_radius && this.x > x-character_radius) && (this.y < y+character_radius && this.y > y-character_radius)){
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
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>character_radius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+character_radius && this.x > x-character_radius) && (this.y < y+character_radius && this.y > y-character_radius)){
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
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>character_radius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+character_radius && this.x > x-character_radius) && (this.y < y+character_radius && this.y > y-character_radius)){
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
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>character_radius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+character_radius && this.x > x-character_radius) && (this.y < y+character_radius && this.y > y-character_radius)){
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
				(x == canvas.width/2-wall_thickness_two/2-character_radius && (y > 80-character_radius && y < canvas.height-80+character_radius))
				||
				(x == 80-character_radius && (y > canvas.height/2-wall_thickness_two/2-character_radius && y < canvas.height/2+wall_thickness_two/2+character_radius))

				){}
			
				else if(d_pressed && x < canvas.width-character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
						x += 5;
					}}
		
		else{
			if (
				(x == canvas.width/2-wall_thickness_two/2-character_radius && (y > 80-character_radius && y < canvas.height-80+character_radius))
				||
				(x == 80-character_radius && (y > canvas.height/2-wall_thickness_two/2-character_radius && y < canvas.height/2+wall_thickness_two/2+character_radius))

				){}
					
				else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				(x == canvas.width/2+wall_thickness_two/2+character_radius && (y > 80-character_radius && y < canvas.height-80+character_radius))
				||
				(x == canvas.width-80+character_radius && (y > canvas.height/2-wall_thickness_two/2-character_radius && y < canvas.height/2+wall_thickness_two/2+character_radius))

				){}
				
				else if(a_pressed && x > 0+character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
						x -= 5;
					}}
		
		else{
			if (
				(x == canvas.width/2+wall_thickness_two/2+character_radius && (y > 80-character_radius && y < canvas.height-80+character_radius))
				||
				(x == canvas.width-80+character_radius && (y > canvas.height/2-wall_thickness_two/2-character_radius && y < canvas.height/2+wall_thickness_two/2+character_radius))

				){}
				
				else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 80-character_radius && x < canvas.width-80+character_radius) && y == canvas.height/2+wall_thickness_two/2+character_radius)
				||
				((x > canvas.width/2-wall_thickness_two/2-character_radius && x < canvas.width/2+wall_thickness_two/2+character_radius) && y == canvas.height-80+character_radius)
				){}	
			
				else if(w_pressed && y > 0+character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 80-character_radius && x < canvas.width-80+character_radius) && y == canvas.height/2+wall_thickness_two/2+character_radius)
				||
				((x > canvas.width/2-wall_thickness_two/2-character_radius && x < canvas.width/2+wall_thickness_two/2+character_radius) && y == canvas.height-80+character_radius)
				){}	
			
				else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 80-character_radius && x < canvas.width-80+character_radius) && y == canvas.height/2-wall_thickness_two/2-character_radius)
				||
				((x > canvas.width/2-wall_thickness_two/2-character_radius && x < canvas.width/2+wall_thickness_two/2+character_radius) && y == 80-character_radius)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
						y += 5;
					}}
		else{	
			if (
				((x > 80-character_radius && x < canvas.width-80+character_radius) && y == canvas.height/2-wall_thickness_two/2-character_radius)
				||
				((x > canvas.width/2-wall_thickness_two/2-character_radius && x < canvas.width/2+wall_thickness_two/2+character_radius) && y == 80-character_radius)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
					y += 5;
				}}				
	
	
		if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0){
		this.active=0;
		
		if(this.regen==1){
			if(x > 160-character_radius && x < 160+character_radius && y > 100-character_radius && y < 100+character_radius){

				player_health++;
				left_half_heart_x=[];
				for(i=30;i<=player_health*30;i+=30){
				left_half_heart_x.push(i);
				}
				right_half_heart_x=[0];
				for(i=30;i<=player_health*30;i+=30){
				right_half_heart_x.push(i);
				}
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if((this.x-30 < x+character_radius && this.x+30 > x-character_radius) && (this.y-30 < y+character_radius && this.y+30 > y-character_radius)){
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
			if(x > canvas.width/2-character_radius && x < canvas.width/2+character_radius && y > canvas.height/2-character_radius && y < canvas.height/2+character_radius){

				player_health++;
				left_half_heart_x=[];
				for(i=30;i<=player_health*30;i+=30){
				left_half_heart_x.push(i);
				}
				right_half_heart_x=[0];
				for(i=30;i<=player_health*30;i+=30){
				right_half_heart_x.push(i);
				}				
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
				(x == 20+cw9-character_radius || x == 20+cw9*3-character_radius || x == 20+cw9*5-character_radius || x == 20+cw9*7-character_radius)
				&&
				((y > 20+ch7-character_radius && y < 20+ch7*2+character_radius) || (y > 20+ch7*3-character_radius && y < 20+ch7*4+character_radius))

				){}
			
				else if(d_pressed && x < canvas.width-character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
						x += 5;
					}}
		
		else{
			if (
				(x == 20+cw9-character_radius || x == 20+cw9*3-character_radius || x == 20+cw9*5-character_radius || x == 20+cw9*7-character_radius)
				&&
				((y > 20+ch7-character_radius && y < 20+ch7*2+character_radius) || (y > 20+ch7*3-character_radius && y < 20+ch7*4+character_radius))

				){}
					
				else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				(x == 20+cw9*8+character_radius || x == 20+cw9*6+character_radius || x == 20+cw9*4+character_radius || x == 20+cw9*2+character_radius)
				&&
				((y > 20+ch7-character_radius && y < 20+ch7*2+character_radius) || (y > 20+ch7*3-character_radius && y < 20+ch7*4+character_radius))

				){}
				
				else if(a_pressed && x > 0+character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
						x -= 5;
					}}
		
		else{
			if (
				(x == 20+cw9*8+character_radius || x == 20+cw9*6+character_radius || x == 20+cw9*4+character_radius || x == 20+cw9*2+character_radius)
				&&
				((y > 20+ch7-character_radius && y < 20+ch7*2+character_radius) || (y > 20+ch7*3-character_radius && y < 20+ch7*4+character_radius))

				){}
				
				else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 20+cw9-character_radius && x < 20+cw9*2+character_radius) || (x > 20+cw9*3-character_radius && x < 20+cw9*4+character_radius) || (x > 20+cw9*5-character_radius && x < 20+cw9*6+character_radius) || (x > 20+cw9*7-character_radius && x < 20+cw9*8+character_radius))
				&&
				(y == 20+ch7*2+character_radius || y == 20+ch7*4+character_radius)
				){}	
			
				else if(w_pressed && y > 0+character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 20+cw9-character_radius && x < 20+cw9*2+character_radius) || (x > 20+cw9*3-character_radius && x < 20+cw9*4+character_radius) || (x > 20+cw9*5-character_radius && x < 20+cw9*6+character_radius) || (x > 20+cw9*7-character_radius && x < 20+cw9*8+character_radius))
				&&
				(y == 20+ch7*2+character_radius || y == 20+ch7*4+character_radius)
				){}	
			
				else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 20+cw9-character_radius && x < 20+cw9*2+character_radius) || (x > 20+cw9*3-character_radius && x < 20+cw9*4+character_radius) || (x > 20+cw9*5-character_radius && x < 20+cw9*6+character_radius) || (x > 20+cw9*7-character_radius && x < 20+cw9*8+character_radius))
				&&
				(y == 20+ch7-character_radius || y == 20+ch7*3-character_radius)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
						y += 5;
					}}
		else{	
			if (
				((x > 20+cw9-character_radius && x < 20+cw9*2+character_radius) || (x > 20+cw9*3-character_radius && x < 20+cw9*4+character_radius) || (x > 20+cw9*5-character_radius && x < 20+cw9*6+character_radius) || (x > 20+cw9*7-character_radius && x < 20+cw9*8+character_radius))
				&&
				(y == 20+ch7-character_radius || y == 20+ch7*3-character_radius)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
					y += 5;
				}}				
	
	},
	
	status: 0,
	active: 1,
	
	regen: 0	



},
{
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
			
			if((this.x-20 < x+character_radius && this.x+20 > x-character_radius) && (this.y-20 < y+character_radius && this.y+20 > y-character_radius)){
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
	
	if((x > 180 && x < 220) && (y > 170 && y < 240)){
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
	
	if((x > canvas.width-220 && x < canvas.width-180) && (y > 170 && y < 240)){
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
		
		if(((x > canvas.width/2-25-15-character_radius && x < canvas.width/2-25+character_radius) || (x > canvas.width/2+25-character_radius && x < canvas.width/2+25+15+character_radius)) && (y > 160 && y < 240)){
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
			if(x > canvas.width/2-character_radius && x < canvas.width/2+character_radius && y > canvas.height/2-character_radius && y < canvas.height/2+character_radius){

				player_health++;
				left_half_heart_x=[];
				for(i=30;i<=player_health*30;i+=30){
				left_half_heart_x.push(i);
				}
				right_half_heart_x=[0];
				for(i=30;i<=player_health*30;i+=30){
				right_half_heart_x.push(i);
				}
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
				((x == 70-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == 140-character_radius) && ((y > 70-character_radius && y < 70+wall_thickness_one+character_radius) || (y > 140-character_radius && y < canvas.height-140+character_radius) || (y > canvas.height-70-wall_thickness_one-character_radius && y <canvas.height-70+character_radius))) 
				||
				((x == canvas.width/2+25-character_radius) && ((y > 140-character_radius && y < 140+wall_thickness_one+character_radius ) || (y > canvas.height-140-wall_thickness_one-character_radius && y < canvas.height-140+character_radius)))
				||
				((x == canvas.width-70-wall_thickness_one-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == canvas.width-140-wall_thickness_one-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				){}
			
				else if(d_pressed && x < canvas.width-character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
						x += 5;
					}}
		
		else{
			if (
				((x == 70-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == 140-character_radius) && ((y > 70-character_radius && y < 70+wall_thickness_one+character_radius) || (y > 140-character_radius && y < canvas.height-140+character_radius) || (y > canvas.height-70-wall_thickness_one-character_radius && y <canvas.height-70+character_radius))) 
				||
				((x == canvas.width/2+25-character_radius) && ((y > 140-character_radius && y < 140+wall_thickness_one+character_radius ) || (y > canvas.height-140-wall_thickness_one-character_radius && y < canvas.height-140+character_radius)))
				||
				((x == canvas.width-70-wall_thickness_one-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == canvas.width-140-wall_thickness_one-character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
			){}
					
				else if(d_pressed && x < canvas.width-character_radius-wall_thickness_one) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				((x == canvas.width-70+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == canvas.width-140+character_radius) && ((y > 70-character_radius && y < 70+wall_thickness_one+character_radius) || (y > 140-character_radius && y < canvas.height-140+character_radius) || (y > canvas.height-70-wall_thickness_one-character_radius && y <canvas.height-70+character_radius))) 
				||
				((x == canvas.width/2-25+character_radius) && ((y > 140-character_radius && y < 140+wall_thickness_one+character_radius ) || (y > canvas.height-140-wall_thickness_one-character_radius && y < canvas.height-140+character_radius)))
				||
				((x == 70+wall_thickness_one+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == 140+wall_thickness_one+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				){}
				
				else if(a_pressed && x > 0+character_radius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
						x -= 5;
					}}
		
		else{
			if (
				((x == canvas.width-70+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == canvas.width-140+character_radius) && ((y > 70-character_radius && y < 70+wall_thickness_one+character_radius) || (y > 140-character_radius && y < canvas.height-140+character_radius) || (y > canvas.height-70-wall_thickness_one-character_radius && y <canvas.height-70+character_radius))) 
				||
				((x == canvas.width/2-25+character_radius) && ((y > 140-character_radius && y < 140+wall_thickness_one+character_radius ) || (y > canvas.height-140-wall_thickness_one-character_radius && y < canvas.height-140+character_radius)))
				||
				((x == 70+wall_thickness_one+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))
				||
				((x == 140+wall_thickness_one+character_radius) && (y > 140-character_radius && y < canvas.height-140+character_radius))				
				){}
				
				else if(a_pressed && x > 0+character_radius+wall_thickness_one) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 140-character_radius && x < canvas.width-140+character_radius)
				&&
				(y == 70+wall_thickness_one+character_radius || y == canvas.height-70+character_radius))
				||
				(((x > 70-character_radius && x < 70+wall_thickness_one+character_radius) || (x > 140-character_radius && x < canvas.width/2-25+character_radius) || (x > canvas.width/2+25-character_radius && x < canvas.width-140+character_radius) || (x > canvas.width-70-wall_thickness_one-character_radius && x < canvas.width-70+character_radius))
				&&
				((y == canvas.height-140+character_radius) || (y == 140+wall_thickness_one+character_radius))
				)
				){}	
			
				else if(w_pressed && y > 0+character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 140-character_radius && x < canvas.width-140+character_radius)
				&&
				(y == 70+wall_thickness_one+character_radius || y == canvas.height-70+character_radius))
				||
				(((x > 70-character_radius && x < 70+wall_thickness_one+character_radius) || (x > 140-character_radius && x < canvas.width/2-25+character_radius) || (x > canvas.width/2+25-character_radius && x < canvas.width-140+character_radius) || (x > canvas.width-70-wall_thickness_one-character_radius && x < canvas.width-70+character_radius))
				&&
				((y == canvas.height-140+character_radius) || (y == 140+wall_thickness_one+character_radius))
				)
				){}	
			
				else if(w_pressed && y > 0+character_radius+wall_thickness_one) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 140-character_radius && x < canvas.width-140+character_radius)
				&&
				(y == 70-character_radius || y == canvas.height-70-wall_thickness_one-character_radius))
				||
				(((x > 70-character_radius && x < 70+wall_thickness_one+character_radius) || (x > 140-character_radius && x < canvas.width/2-25+character_radius) || (x > canvas.width/2+25-character_radius && x < canvas.width-140+character_radius) || (x > canvas.width-70-wall_thickness_one-character_radius && x < canvas.width-70+character_radius))
				&&
				((y == canvas.height-140-wall_thickness_one-character_radius) || (y == 140-character_radius))
				)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
						y += 5;
					}}
		else{	
			if (
				((x > 140-character_radius && x < canvas.width-140+character_radius)
				&&
				(y == 70-character_radius || y == canvas.height-70-wall_thickness_one-character_radius))
				||
				(((x > 70-character_radius && x < 70+wall_thickness_one+character_radius) || (x > 140-character_radius && x < canvas.width/2-25+character_radius) || (x > canvas.width/2+25-character_radius && x < canvas.width-140+character_radius) || (x > canvas.width-70-wall_thickness_one-character_radius && x < canvas.width-70+character_radius))
				&&
				((y == canvas.height-140-wall_thickness_one-character_radius) || (y == 140-character_radius))
				)
				){}	
				
				else if(s_pressed && y < canvas.height-character_radius-wall_thickness_one) {
					y += 5;
				}}	

},

	status: 0,
	active: 1,
	
	regen: 0	

}
];

function RedrawCanvas() {
  ResetCanvas()

/* Level Change */
/* Undefined in the srarting room */

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
  else if(randomly_generated_door==2){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else{
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }}
  else if(door_number == 4){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else if(randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else{
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }

  }
  else if(door_number == 1){

  if (randomly_generated_door==1){
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else if(randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else{
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
  else if(randomly_generated_door==2){
      context.beginPath();
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.rect(0, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }
  else{
      context.beginPath();
      context.rect(0, canvas.height-wall_thickness_one, canvas.width, wall_thickness_one);
      context.rect(0, 0, canvas.width, wall_thickness_one);
      context.rect(canvas.width-wall_thickness_one, 0, wall_thickness_one, canvas.height);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();		
  }

  }

/* Upper Door */

if ( y == character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)){
door_number = 3;
randomly_generated_door=Math.floor(Math.random()*3+1);
room_counter++;

var randomGenLevel=Math.floor(Math.random()*4+1);
if (randomGenLevel==1){
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

levels[1].regen = Math.floor(Math.random()*2);}
else if (randomGenLevel==2){
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

levels[2].regen = Math.floor(Math.random()*2);}

else if (randomGenLevel==3){
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
else{
levels[0].status = 0;
levels[1].status = 0;
levels[2].status = 0;
levels[3].status = 0;
levels[4].status = 1;

levels[4].active = 1;

levels[4].enemies.key1.touched = 0;
levels[4].enemies.key2.touched = 0;

levels[4].regen = Math.floor(Math.random()*2);
}

x = canvas.width/2;
y = canvas.height-20-character_radius;
}

/* Right Door */

if ((y < canvas.height/2+30 && y > canvas.height/2-30) && x == canvas.width-character_radius){
door_number = 4;
randomly_generated_door=Math.floor(Math.random()*3+1);
room_counter++;

var randomGenLevel=Math.floor(Math.random()*4+1);
if (randomGenLevel==1){
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

levels[1].regen = Math.floor(Math.random()*2);}
else if (randomGenLevel==2){
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

levels[2].regen = Math.floor(Math.random()*2);}

else if (randomGenLevel==3){
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
else{
levels[0].status = 0;
levels[1].status = 0;
levels[2].status = 0;
levels[3].status = 0;
levels[4].status = 1;

levels[4].active = 1;

levels[4].enemies.key1.touched = 0;
levels[4].enemies.key2.touched = 0;

levels[4].regen = Math.floor(Math.random()*2);
}
x = 20+character_radius;
y = canvas.height/2;
}

/* Bottom Door */

if ( y == canvas.height-character_radius && (x < canvas.width/2+30 && x > canvas.width/2-30)){

door_number = 1;
randomly_generated_door=Math.floor(Math.random()*3+1);
room_counter++;

var randomGenLevel=Math.floor(Math.random()*4+1);
if (randomGenLevel==1){
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

levels[1].regen = Math.floor(Math.random()*2);}
else if (randomGenLevel==2){
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

levels[2].regen = Math.floor(Math.random()*2);}

else if (randomGenLevel==3){
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
else{
levels[0].status = 0;
levels[1].status = 0;
levels[2].status = 0;
levels[3].status = 0;
levels[4].status = 1;

levels[4].active = 1;

levels[4].enemies.key1.touched = 0;
levels[4].enemies.key2.touched = 0;

levels[4].regen = Math.floor(Math.random()*2);
}



x = canvas.width/2;
y = 20+character_radius;


}

/* Left Door */

if ( (y < canvas.height/2+30 && y > canvas.height/2-30) && x == character_radius){
door_number = 2;
randomly_generated_door=Math.floor(Math.random()*3+1);
room_counter++;

var randomGenLevel=Math.floor(Math.random()*4+1);
if (randomGenLevel==1){
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

levels[1].regen = Math.floor(Math.random()*2);}
else if (randomGenLevel==2){
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

levels[2].regen = Math.floor(Math.random()*2);}

else if (randomGenLevel==3){
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
else{
levels[0].status = 0;
levels[1].status = 0;
levels[2].status = 0;
levels[3].status = 0;
levels[4].status = 1;

levels[4].active = 1;

levels[4].enemies.key1.touched = 0;
levels[4].enemies.key2.touched = 0;

levels[4].regen = Math.floor(Math.random()*2);
}

x = canvas.width-20-character_radius;
y = canvas.height/2;
}

if(player_health==0){
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

if(right_arrow_pressed) {
	if(!shooting_delay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 6,
		bulletvy: 0,
		status: 1
		});
		
		shooting_delay=!shooting_delay;
		setTimeout(ShootingTimer,500);
		}


}
if(left_arrow_pressed) {
	if(!shooting_delay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: -6,
		bulletvy: 0,
		status: 1
		});
		
		shooting_delay=!shooting_delay;
		setTimeout(ShootingTimer,500);
		}

}
if(up_arrow_pressed) {
	if(!shooting_delay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 0,
		bulletvy: -6,
		status: 1
		});
		
		shooting_delay=!shooting_delay;
		setTimeout(ShootingTimer,500);
		}

}
if(down_arrow_pressed) {
	if(!shooting_delay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 0,
		bulletvy: 6,
		status: 1
		});
		
		shooting_delay=!shooting_delay;
		setTimeout(ShootingTimer,500);
		}

}

}

/* Character graphics */

function DrawCharacter() {
context.beginPath();
context.arc(x, y, character_radius, 0, Math.PI*2);
context.fillStyle = player_colour;
context.fill();
context.closePath();



}

function DrawHearts(){
	for(i=0;i<=player_health;i+=2){
		context.beginPath();
		context.moveTo(left_half_heart_x[i],half_heart_y);
		context.lineTo(left_half_heart_x[i],half_heart_y-20);
		context.arc(left_half_heart_x[i]-10, half_heart_y-20, 10, 0, Math.PI, true);
		context.moveTo(left_half_heart_x[i]-20,half_heart_y-20);
		context.lineTo(left_half_heart_x[i],half_heart_y);
		context.fillStyle = "red";
		context.fill();
		context.closePath();



	}
	for(i=1;i<player_health;i+=2){
		context.beginPath();
		context.moveTo(right_half_heart_x[i],half_heart_y);
		context.lineTo(right_half_heart_x[i],half_heart_y-20);
		context.arc(right_half_heart_x[i]+10, half_heart_y-20, 10, Math.PI, 0, false);
		context.moveTo(right_half_heart_x[i]+20,half_heart_y-20);
		context.lineTo(right_half_heart_x[i],half_heart_y);
		context.fillStyle = "red";
		context.fill();
		context.closePath();



	}



}

function DrawScore(){
	
	context.font="20px Consolas";
		context.fillText("Rooms Passed:"+room_counter+"/15", 425, 40);

}

function ShootingTimer(){
	shooting_delay = !shooting_delay;
}

function InvincibleTimer(){
	player_invincible=!player_invincible;
		player_colour="blue";

}

function DamageDelay(){
	if(!player_invincible){
		player_health--;
		player_invincible=!player_invincible;
		setTimeout(InvincibleTimer,1000);
		player_colour="green";
		
				left_half_heart_x=[];
				for(i=30;i<=player_health*30;i+=30){
				left_half_heart_x.push(i);
				}
				right_half_heart_x=[0];
				for(i=30;i<=player_health*30;i+=30){
				right_half_heart_x.push(i);
				}
}

}

function InvincibleTimerEnemy(){
	enemy_invincible=!enemy_invincible;

}

function DrawShot(){

for(i=0;i<bullets.length;i++){





		if(bullets[i].status==1){
            context.beginPath();
            context.arc(bullets[i].bulletx, bullets[i].bullety, 5, 0, Math.PI*2);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
			bullets[i].bulletx+=bullets[i].bulletvx;
			bullets[i].bullety+=bullets[i].bulletvy;}
			
						/*Level 1 Enemy Health */
			if(levels[1].status == 1){
			if( bullets[i].bulletx>levels[1].enemies.enemy1.x && bullets[i].bulletx<levels[1].enemies.enemy1.x+30 && bullets[i].bullety>levels[1].enemies.enemy1.y && bullets[i].bullety<levels[1].enemies.enemy1.y+30){

				if(!enemy_invincible){
					levels[1].enemies.enemy1.health--;
					enemy_invincible=!enemy_invincible;
					setTimeout(InvincibleTimerEnemy,300);


}}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy2.x && bullets[i].bulletx<levels[1].enemies.enemy2.x+30 && bullets[i].bullety>levels[1].enemies.enemy2.y && bullets[i].bullety<levels[1].enemies.enemy2.y+30){
				if(!enemy_invincible){
					levels[1].enemies.enemy2.health--;
					enemy_invincible=!enemy_invincible;
					setTimeout(InvincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy3.x && bullets[i].bulletx<levels[1].enemies.enemy3.x+30 && bullets[i].bullety>levels[1].enemies.enemy3.y && bullets[i].bullety<levels[1].enemies.enemy3.y+30){
				if(!enemy_invincible){
					levels[1].enemies.enemy3.health--;
					enemy_invincible=!enemy_invincible;
					setTimeout(InvincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy4.x && bullets[i].bulletx<levels[1].enemies.enemy4.x+30 && bullets[i].bullety>levels[1].enemies.enemy4.y && bullets[i].bullety<levels[1].enemies.enemy4.y+30){
				if(!enemy_invincible){
					levels[1].enemies.enemy4.health--;
					enemy_invincible=!enemy_invincible;
					setTimeout(InvincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy5.x && bullets[i].bulletx<levels[1].enemies.enemy5.x+30 && bullets[i].bullety>levels[1].enemies.enemy5.y && bullets[i].bullety<levels[1].enemies.enemy5.y+30){
				if(!enemy_invincible){
					levels[1].enemies.enemy5.health--;
					enemy_invincible=!enemy_invincible;
					setTimeout(InvincibleTimerEnemy,300);


}
			}
			}
			
			
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
			
			
			}



}

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
for(i=0;i<levels.length;i++){

if(levels[i].status == 1){
levels[i].level();

}
}}

/* Level graphics */

function DrawStartingRoom(){
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





function ResetCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
};

function Point(x, y){
  this.x = x;
  this.y = y;
};

function Arc(radius, start, end){
  //in radians(for example Math.PI/2)
  //0th degree is at the x axis and continues clockwise
  this.radius = radius;
  this.start = start;
  this.end = end;
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


function Rectangle(start, end){
  Shape.call(this);
  
  this.start = start;
  this.end = end;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this)
  context.rect(this.start.x, this.start.y, this.end.x, this.end.y);
  Shape.prototype.ClosePath.call(this)
  Shape.prototype.Fill.call(this)
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


function Slice(center, arc){
  Shape.call(this);
  
  this.center = center;
  this.arc = arc;
};

Slice.prototype = Object.create(Shape.prototype);
Slice.prototype.constructor = Slice;

Slice.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this)
  context.arc(this.center.x, this.center.y, this.arc.radius, this.arc.start, this.arc.end);
  Shape.prototype.ClosePath.call(this)
  Shape.prototype.Fill.call(this)
};


function Wall(start, thickness, length, orientation){
  if (orientation === "horizontal"){
    end = new Point(length, thickness);
  }
  else if (orientation === "vertical"){
    end = new Point(thickness, length);
  }
  else{
    alert("Incorrect wall orientation.");
  };
  
  Rectangle.call(this, start, end);
};

Wall.prototype = Object.create(Rectangle.prototype);
Wall.prototype.constructor = Wall;

function Door(start, thickness, length, orientation){
  Wall.call(this, start, thickness, length, orientation)
};

Door.prototype = Object.create(Wall.prototype);
Door.prototype.constructor = Door;

/* Key Handlers */

document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

RedrawCanvas();