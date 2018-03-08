/* Variables */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x=canvas.width/2;
var y=canvas.height/2;
var characterRadius=20; 
var playerHealth=6;
var playerColor="blue";

var bullets=[];
var enemyBullets=[];

var roomCounter = 0;

var bulletX = 0;
var bulletY = 0;

var dx = 2;
var dy =- 2;

var doorNmbr;
var randomGenDoor;

var leftHearty = 50;

var rightHearty = 50;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed =false;

var dPressed = false;
var aPressed = false;
var wPressed = false;
var sPressed = false;

var wallThickness = 20;
var wallThickness2 = 50;
var wallLength = canvas.width/2-50;
var wallHeight = canvas.height/2-50;

/* Character graphics */

function drawCharacter() {
ctx.beginPath();
ctx.arc(x, y, characterRadius, 0, Math.PI*2);
ctx.fillStyle = playerColor;
ctx.fill();
ctx.closePath();



}

/* Score Display/Graphics */

var leftHeartx=[];
for(i=30;i<=playerHealth*30;i+=30){
leftHeartx.push(i);
}
var rightHeartx=[0];
for(i=30;i<=playerHealth*30;i+=30){
rightHeartx.push(i);
}

function drawHearts(){
	for(i=0;i<=playerHealth;i+=2){
		ctx.beginPath();
		ctx.moveTo(leftHeartx[i],leftHearty);
		ctx.lineTo(leftHeartx[i],leftHearty-20);
		ctx.arc(leftHeartx[i]-10, leftHearty-20, 10, 0, Math.PI, true);
		ctx.moveTo(leftHeartx[i]-20,leftHearty-20);
		ctx.lineTo(leftHeartx[i],leftHearty);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();



	}
	for(i=1;i<playerHealth;i+=2){
		ctx.beginPath();
		ctx.moveTo(rightHeartx[i],leftHearty);
		ctx.lineTo(rightHeartx[i],leftHearty-20);
		ctx.arc(rightHeartx[i]+10, leftHearty-20, 10, Math.PI, 0, false);
		ctx.moveTo(rightHeartx[i]+20,leftHearty-20);
		ctx.lineTo(rightHeartx[i],leftHearty);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();



	}



}

function drawScore(){
	
	ctx.font="20px Consolas";
		ctx.fillText("Rooms Passed:"+roomCounter+"/15", 425, 40);

}

/* Timer delay on shots */
var shootingDelay = false;
function shootingTimer(){
	shootingDelay = !shootingDelay;
}

/* Damage delay function */
var playerInvincible = false;

function invincibleTimer(){
	playerInvincible=!playerInvincible;
		playerColor="blue";

}
function damageDelay(){
	if(!playerInvincible){
		playerHealth--;
		playerInvincible=!playerInvincible;
		setTimeout(invincibleTimer,1000);
		playerColor="green";
		
				leftHeartx=[];
				for(i=30;i<=playerHealth*30;i+=30){
				leftHeartx.push(i);
				}
				rightHeartx=[0];
				for(i=30;i<=playerHealth*30;i+=30){
				rightHeartx.push(i);
				}
}

}
/* Damage delay on enemies */
var enemyInvincible = false;

function invincibleTimerEnemy(){
	enemyInvincible=!enemyInvincible;

}

function drawShot(){

for(i=0;i<bullets.length;i++){





		if(bullets[i].status==1){
            ctx.beginPath();
            ctx.arc(bullets[i].bulletx, bullets[i].bullety, 5, 0, Math.PI*2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
			bullets[i].bulletx+=bullets[i].bulletvx;
			bullets[i].bullety+=bullets[i].bulletvy;}
			
						/*Level 1 Enemy Health */
			if(levels[1].status == 1){
			if( bullets[i].bulletx>levels[1].enemies.enemy1.x && bullets[i].bulletx<levels[1].enemies.enemy1.x+30 && bullets[i].bullety>levels[1].enemies.enemy1.y && bullets[i].bullety<levels[1].enemies.enemy1.y+30){

				if(!enemyInvincible){
					levels[1].enemies.enemy1.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy2.x && bullets[i].bulletx<levels[1].enemies.enemy2.x+30 && bullets[i].bullety>levels[1].enemies.enemy2.y && bullets[i].bullety<levels[1].enemies.enemy2.y+30){
				if(!enemyInvincible){
					levels[1].enemies.enemy2.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy3.x && bullets[i].bulletx<levels[1].enemies.enemy3.x+30 && bullets[i].bullety>levels[1].enemies.enemy3.y && bullets[i].bullety<levels[1].enemies.enemy3.y+30){
				if(!enemyInvincible){
					levels[1].enemies.enemy3.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy4.x && bullets[i].bulletx<levels[1].enemies.enemy4.x+30 && bullets[i].bullety>levels[1].enemies.enemy4.y && bullets[i].bullety<levels[1].enemies.enemy4.y+30){
				if(!enemyInvincible){
					levels[1].enemies.enemy4.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[1].enemies.enemy5.x && bullets[i].bulletx<levels[1].enemies.enemy5.x+30 && bullets[i].bullety>levels[1].enemies.enemy5.y && bullets[i].bullety<levels[1].enemies.enemy5.y+30){
				if(!enemyInvincible){
					levels[1].enemies.enemy5.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			}
			
			
			/*Level 2 Enemy Health */
			if(levels[2].status == 1){
			if( bullets[i].bulletx>levels[2].enemies.enemy1.x-10 && bullets[i].bulletx<levels[2].enemies.enemy1.x+10 && bullets[i].bullety>levels[2].enemies.enemy1.y-10 && bullets[i].bullety<levels[2].enemies.enemy1.y+10){

				if(!enemyInvincible){
					levels[2].enemies.enemy1.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}}
			
			if( bullets[i].bulletx>levels[2].enemies.enemy2.x-10 && bullets[i].bulletx<levels[2].enemies.enemy2.x+10 && bullets[i].bullety>levels[2].enemies.enemy2.y-10 && bullets[i].bullety<levels[2].enemies.enemy2.y+10){
				if(!enemyInvincible){
					levels[2].enemies.enemy2.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[2].enemies.enemy3.x-10 && bullets[i].bulletx<levels[2].enemies.enemy3.x+10 && bullets[i].bullety>levels[2].enemies.enemy3.y-10 && bullets[i].bullety<levels[2].enemies.enemy3.y+10){
				if(!enemyInvincible){
					levels[2].enemies.enemy3.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


}
			}
			
			if( bullets[i].bulletx>levels[2].enemies.enemy4.x-10 && bullets[i].bulletx<levels[2].enemies.enemy4.x+10 && bullets[i].bullety>levels[2].enemies.enemy4.y-10 && bullets[i].bullety<levels[2].enemies.enemy4.y+10){
				if(!enemyInvincible){
					levels[2].enemies.enemy4.health--;
					enemyInvincible=!enemyInvincible;
					setTimeout(invincibleTimerEnemy,300);


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

function shotRemove(){

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

/* Levels */

var levels=[
{  
    /* Starting room */
	level: function(){
	
		/* Control Tutorial */
		ctx.font="50px Consolas";
		ctx.fillText("W",150,150);
		ctx.font="50px Consolas";
		ctx.fillText("A S D",100,200);
		ctx.font="30px Consolas";
		ctx.fillText("to move",110,250);
		

		
		ctx.font="50px Consolas";
		ctx.fillText(String.fromCharCode(8593),454,150);
		ctx.font="50px Consolas";
		ctx.fillText(String.fromCharCode(8592)+" "+String.fromCharCode(8595)+" "+String.fromCharCode(8594),400,200);
		ctx.font="30px Consolas";
		ctx.fillText("to shoot",405,250);
		
		
		if(dPressed && x < canvas.width-characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x += 5;
		}
		else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
			x += 5;
		}

		if(aPressed && x > 0+characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x -= 5;
		}
		else if(aPressed && x > 0+characterRadius+wallThickness) {
			x -= 5;
		}

		if(wPressed && y > 0+characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y -= 5;
		}
		else if(wPressed && y > 0+characterRadius+wallThickness) {
			y -= 5;
		}

		if(sPressed && y < canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y += 5;
		}
		else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
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
		
			ctx.beginPath();
			ctx.rect(this.x , this.y, this.enemyLength, this.enemyThickness);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.closePath();
			
		
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
			

			ctx.beginPath();
			ctx.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.closePath();
		
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
			

			ctx.beginPath();
			ctx.rect(this.x , this.y, this.enemyLength, this.enemyThickness);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.closePath();
		
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
			

			ctx.beginPath();
			ctx.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.closePath();
		
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
			

			ctx.beginPath();
			ctx.rect(this.x, this.y, this.enemyLength, this.enemyThickness);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.closePath();
		
		},

		
		health: 3,
		enemyFire: true	 

	},
	
	
	/* enemy shooting */
	
	
	drawenemyShot: function(){
		if(enemyBullets.length>0){
		for(i=0;i<enemyBullets.length;i++){

            ctx.beginPath();
            ctx.arc(enemyBullets[i].enemyBulletx, enemyBullets[i].enemyBullety, 5, 0, Math.PI*2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
			enemyBullets[i].enemyBulletx+=enemyBullets[i].enemyBulletvx;
			enemyBullets[i].enemyBullety+=enemyBullets[i].enemyBulletvy; 
			
			
			if(enemyBullets[i].enemyBulletx > x-characterRadius && enemyBullets[i].enemyBulletx < x+characterRadius && enemyBullets[i].enemyBullety > y-characterRadius && enemyBullets[i].enemyBullety < y+characterRadius ){
			damageDelay();
			
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
			var distx = (x - characterRadius/2) - this.enemy1.x;
			var disty = (y - characterRadius/2) - this.enemy1.y;
			var distance = Math.sqrt((distx*distx) + (disty*disty)); 
			var killx = distx / (distance - characterRadius/2);
			var killy = disty / (distance - characterRadius/2);
			
		if (x < 470 && x > 190 && distance>this.enemy1.enemyLength+10){
			enemyBullets.push({
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
		if(y > this.enemy2.y-characterRadius && y < this.enemy2.y+30+characterRadius && x > this.enemy2.x+15){
	
		enemyBullets.push({
		enemyBulletx: this.enemy2.x+this.enemy2.enemyLength/2,
		enemyBullety: this.enemy2.y+this.enemy2.enemyThickness/2,
		enemyBulletvx: 3,
		enemyBulletvy: 0
		});
			this.enemy2.enemyFire=false;
			}
		else if (x > this.enemy2.x-characterRadius && x < this.enemy2.x+30+characterRadius && y > this.enemy2.y+15){
	
		enemyBullets.push({
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
		if(y > this.enemy3.y-characterRadius && y < this.enemy3.y+30+characterRadius && x < this.enemy3.x+15){
	
		enemyBullets.push({
		enemyBulletx: this.enemy3.x+this.enemy3.enemyLength/2,
		enemyBullety: this.enemy3.y+this.enemy3.enemyThickness/2,
		enemyBulletvx: -3,
		enemyBulletvy: 0
		});
			this.enemy3.enemyFire=false;
			}
		else if (x > this.enemy3.x-characterRadius && x < this.enemy3.x+30+characterRadius && y > this.enemy3.y+15){
	
		enemyBullets.push({
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
		if(y > this.enemy4.y-characterRadius && y < this.enemy4.y+30+characterRadius && x > this.enemy4.x+15){
	
		enemyBullets.push({
		enemyBulletx: this.enemy4.x+this.enemy4.enemyLength/2,
		enemyBullety: this.enemy4.y+this.enemy4.enemyThickness/2,
		enemyBulletvx: 3,
		enemyBulletvy: 0
		});
			this.enemy4.enemyFire=false;
			}
		else if (x > this.enemy4.x-characterRadius && x < this.enemy4.x+30+characterRadius && y < this.enemy4.y+15){
	
		enemyBullets.push({
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
		if(y > this.enemy5.y-characterRadius && y < this.enemy5.y+30+characterRadius && x < this.enemy5.x+15){
	
		enemyBullets.push({
		enemyBulletx: this.enemy5.x+this.enemy5.enemyLength/2,
		enemyBullety: this.enemy5.y+this.enemy5.enemyThickness/2,
		enemyBulletvx: -3,
		enemyBulletvy: 0
		});
			this.enemy5.enemyFire=false;
			}
		else if (x > this.enemy5.x-characterRadius && x < this.enemy5.x+30+characterRadius && y < this.enemy5.y+15){
	
		enemyBullets.push({
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

		ctx.beginPath();
		ctx.rect(100, 100, 100, wallThickness);
		ctx.rect(100, 100, wallThickness, 100);
		ctx.rect(100, canvas.height-120, 100, wallThickness);
		ctx.rect(100, canvas.height-200, wallThickness, 100);
		ctx.rect(canvas.width-200, 100, 100, wallThickness);
		ctx.rect(canvas.width-120, 100, wallThickness, 100);
		ctx.rect(canvas.width-200, canvas.height-120, 100, wallThickness);
		ctx.rect(canvas.width-120, canvas.height-200, wallThickness, 100);
		
			//door closing
		if( this.active==1){
		
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		
		}
		
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
		
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
			(x == canvas.width-120-characterRadius && (y > 120 && y < canvas.height-120))
			||
			(x == canvas.width-200-characterRadius && ((y > 100-characterRadius && y < 120+characterRadius) || (y > canvas.height-120-characterRadius && y < canvas.height-100+characterRadius)))
			||
			(x == 100-characterRadius && (y > 100-characterRadius && y < canvas.height-100+characterRadius))
			){}
			
		else if(dPressed && x < canvas.width-characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x += 5;
		}
		
		else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
			x += 5;
		}}
		else{
				if (
			(x == canvas.width-120-characterRadius && (y > 120 && y < canvas.height-120))
			||
			(x == canvas.width-200-characterRadius && ((y > 100-characterRadius && y < 120+characterRadius) || (y > canvas.height-120-characterRadius && y < canvas.height-100+characterRadius)))
			||
			(x == 100-characterRadius && (y > 100-characterRadius && y < canvas.height-100+characterRadius))
			){}
		
		else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
			x += 5;
		}
		}

		
		/* Left */
		
	if(this.active == 0){
		if (
			(x == 120+characterRadius && (y > 120 && y < canvas.height-120))
			||
			(x == 200+characterRadius && ((y > 100-characterRadius && y < 120+characterRadius) || (y > canvas.height-120-characterRadius && y < canvas.height-100+characterRadius)))
			||
			(x == canvas.width-100+characterRadius && (y > 100-characterRadius && y < canvas.height-100+characterRadius))
			){}	
			
		else if(aPressed && x > 0+characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
			x -= 5;
		}
		else if(aPressed && x > 0+characterRadius+wallThickness) {
			x -= 5;
		}}
	else{
		if (
			(x == 120+characterRadius && (y > 120 && y < canvas.height-120))
			||
			(x == 200+characterRadius && ((y > 100-characterRadius && y < 120+characterRadius) || (y > canvas.height-120-characterRadius && y < canvas.height-100+characterRadius)))
			||
			(x == canvas.width-100+characterRadius && (y > 100-characterRadius && y < canvas.height-100+characterRadius))
			){}	
		
		else if(aPressed && x > 0+characterRadius+wallThickness) {
			x -= 5;
		}	
	}	
		
		
		/* Up */
	if(this.active == 0){		
		if (
			((x > 100-characterRadius && x < 200+characterRadius) || (x > canvas.width-200-characterRadius && x < canvas.width-100+characterRadius)) 
			&&
			(y == 120+characterRadius || y == canvas.height-100+characterRadius)

			){}	
		
		else if(wPressed && y > 0+characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y -= 5;
		}
		else if(wPressed && y > 0+characterRadius+wallThickness) {
			y -= 5;
		}}
	else{
		if (
			((x > 100-characterRadius && x < 200+characterRadius) || (x > canvas.width-200-characterRadius && x < canvas.width-100+characterRadius)) 
			&&
			(y == 120+characterRadius || y == canvas.height-100+characterRadius)

			){}	
		
		else if(wPressed && y > 0+characterRadius+wallThickness) {
			y -= 5;
		}	
	}	

		
		/* Down */
		
	if(this.active == 0){		
		if (
			((x > 100-characterRadius && x < 200+characterRadius) || (x > canvas.width-200-characterRadius && x < canvas.width-100+characterRadius)) 
			&&
			(y == 100-characterRadius || y == canvas.height-120-characterRadius)

			){}	
		else if(sPressed && y < canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
			y += 5;
		}
		else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
			y += 5;
		}}
	else{
		if (
			((x > 100-characterRadius && x < 200+characterRadius) || (x > canvas.width-200-characterRadius && x < canvas.width-100+characterRadius)) 
			&&
			(y == 100-characterRadius || y == canvas.height-120-characterRadius)

			){}	

		else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
			y += 5;
		}	
	}	
	
	if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0 && this.enemies.enemy5.health <= 0){
		this.active=0;
		
		if(this.regen==1){
			if(x > canvas.width/2-characterRadius && x < canvas.width/2+characterRadius && y > canvas.height/2-characterRadius && y < canvas.height/2+characterRadius){

				playerHealth++;
				leftHeartx=[];
				for(i=30;i<=playerHealth*30;i+=30){
				leftHeartx.push(i);
				}
				rightHeartx=[0];
				for(i=30;i<=playerHealth*30;i+=30){
				rightHeartx.push(i);
				}				
				this.regen=0;
			}
			
				ctx.beginPath();
				ctx.moveTo(canvas.width/2,canvas.height/2);
				ctx.lineTo(canvas.width/2,canvas.height/2-20);
				ctx.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
				ctx.moveTo(canvas.width/2-20,canvas.height/2-20);
				ctx.lineTo(canvas.width/2,canvas.height/2);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();	

			
		
		
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 10, 0, Math.PI*2);
			ctx.fillStyle = "purple";
			ctx.fill();
			ctx.closePath();
		
		},
		move: function(){
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>characterRadius){
			this.x += killerx *3;
			this.y += killery *3;}
		
			// enemy hit detection
			if((this.x < x+characterRadius && this.x > x-characterRadius) && (this.y < y+characterRadius && this.y > y-characterRadius)){
				/*if(damageTimer%100==0){
					damageDelay();
				}
				damageTimer+=5;*/
				damageDelay();
			}
		},
		
		health: 3 

	},
	
	
	enemy2:{
	
		x:canvas.width-50,
		y:50,
		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 10, 0, Math.PI*2);
			ctx.fillStyle = "purple";
			ctx.fill();
			ctx.closePath();
		
		},
		move: function(){
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>characterRadius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+characterRadius && this.x > x-characterRadius) && (this.y < y+characterRadius && this.y > y-characterRadius)){
				damageDelay();
			}
		
	},
	
	health: 3 

	},

	enemy3:{
	
		x:50,
		y:canvas.height-50,
		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 10, 0, Math.PI*2);
			ctx.fillStyle = "purple";
			ctx.fill();
			ctx.closePath();
		
		},
		move: function(){
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>characterRadius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+characterRadius && this.x > x-characterRadius) && (this.y < y+characterRadius && this.y > y-characterRadius)){
				damageDelay();
			}
		
	},
	
	health: 3 

	},	
	
	enemy4:{
	
		x:canvas.width-50,
		y:canvas.height-50,
		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 10, 0, Math.PI*2);
			ctx.fillStyle = "purple";
			ctx.fill();
			ctx.closePath();
		
		},
		move: function(){
			
			var gox = x - this.x;
			var goy = y - this.y;
			var length = Math.sqrt((gox*gox) + (goy*goy)); 
			var killerx = gox / length;
			var killery = goy / length;
			if (length>characterRadius){
			this.x += killerx *3;
			this.y += killery *3;}
			
						// enemy hit detection
			if((this.x < x+characterRadius && this.x > x-characterRadius) && (this.y < y+characterRadius && this.y > y-characterRadius)){
				damageDelay();
			}
		
	},
	
	health: 3 

	}	

	},
	

	level: function(){
	
	/* Level 2 Walls*/
	
		ctx.beginPath();
		ctx.rect(80, canvas.height/2-25, 480, wallThickness2);
		ctx.rect(canvas.width/2-25, 80, wallThickness2, 240);
		
		//door closing
		if( this.active==1){
		
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		
		}
		
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
		
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
				(x == canvas.width/2-wallThickness2/2-characterRadius && (y > 80-characterRadius && y < canvas.height-80+characterRadius))
				||
				(x == 80-characterRadius && (y > canvas.height/2-wallThickness2/2-characterRadius && y < canvas.height/2+wallThickness2/2+characterRadius))

				){}
			
				else if(dPressed && x < canvas.width-characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
						x += 5;
					}}
		
		else{
			if (
				(x == canvas.width/2-wallThickness2/2-characterRadius && (y > 80-characterRadius && y < canvas.height-80+characterRadius))
				||
				(x == 80-characterRadius && (y > canvas.height/2-wallThickness2/2-characterRadius && y < canvas.height/2+wallThickness2/2+characterRadius))

				){}
					
				else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				(x == canvas.width/2+wallThickness2/2+characterRadius && (y > 80-characterRadius && y < canvas.height-80+characterRadius))
				||
				(x == canvas.width-80+characterRadius && (y > canvas.height/2-wallThickness2/2-characterRadius && y < canvas.height/2+wallThickness2/2+characterRadius))

				){}
				
				else if(aPressed && x > 0+characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(aPressed && x > 0+characterRadius+wallThickness) {
						x -= 5;
					}}
		
		else{
			if (
				(x == canvas.width/2+wallThickness2/2+characterRadius && (y > 80-characterRadius && y < canvas.height-80+characterRadius))
				||
				(x == canvas.width-80+characterRadius && (y > canvas.height/2-wallThickness2/2-characterRadius && y < canvas.height/2+wallThickness2/2+characterRadius))

				){}
				
				else if(aPressed && x > 0+characterRadius+wallThickness) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 80-characterRadius && x < canvas.width-80+characterRadius) && y == canvas.height/2+wallThickness2/2+characterRadius)
				||
				((x > canvas.width/2-wallThickness2/2-characterRadius && x < canvas.width/2+wallThickness2/2+characterRadius) && y == canvas.height-80+characterRadius)
				){}	
			
				else if(wPressed && y > 0+characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(wPressed && y > 0+characterRadius+wallThickness) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 80-characterRadius && x < canvas.width-80+characterRadius) && y == canvas.height/2+wallThickness2/2+characterRadius)
				||
				((x > canvas.width/2-wallThickness2/2-characterRadius && x < canvas.width/2+wallThickness2/2+characterRadius) && y == canvas.height-80+characterRadius)
				){}	
			
				else if(wPressed && y > 0+characterRadius+wallThickness) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 80-characterRadius && x < canvas.width-80+characterRadius) && y == canvas.height/2-wallThickness2/2-characterRadius)
				||
				((x > canvas.width/2-wallThickness2/2-characterRadius && x < canvas.width/2+wallThickness2/2+characterRadius) && y == 80-characterRadius)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
						y += 5;
					}}
		else{	
			if (
				((x > 80-characterRadius && x < canvas.width-80+characterRadius) && y == canvas.height/2-wallThickness2/2-characterRadius)
				||
				((x > canvas.width/2-wallThickness2/2-characterRadius && x < canvas.width/2+wallThickness2/2+characterRadius) && y == 80-characterRadius)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
					y += 5;
				}}				
	
	
		if(this.enemies.enemy1.health <= 0 && this.enemies.enemy2.health <= 0 && this.enemies.enemy3.health <= 0 && this.enemies.enemy4.health <= 0){
		this.active=0;
		
		if(this.regen==1){
			if(x > 160-characterRadius && x < 160+characterRadius && y > 100-characterRadius && y < 100+characterRadius){

				playerHealth++;
				leftHeartx=[];
				for(i=30;i<=playerHealth*30;i+=30){
				leftHeartx.push(i);
				}
				rightHeartx=[0];
				for(i=30;i<=playerHealth*30;i+=30){
				rightHeartx.push(i);
				}
				this.regen=0;
			}
			
				ctx.beginPath();
				ctx.moveTo(160,100);
				ctx.lineTo(160,100-20);
				ctx.arc(160-10, 100-20, 10, 0, Math.PI, true);
				ctx.moveTo(160-20,100-20);
				ctx.lineTo(160,100);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();	
				


			
		
		
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
	
	
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
		
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
		
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
		
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
		
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 25, 0, Math.PI*2);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();
		
		},
		shield: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 30, this.sAngle, this.eAngle);
			ctx.fillStyle = "#2C3539";
			ctx.fill();
			ctx.closePath();
		
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
			if((this.x-30 < x+characterRadius && this.x+30 > x-characterRadius) && (this.y-30 < y+characterRadius && this.y+30 > y-characterRadius)){
				damageDelay();
			}
		
	},
	
	health: 3 

	}	

	},
	
	level: function(){
	
		var cw9 = 65;
		var ch7 = 70;
	
		ctx.beginPath();
		ctx.rect(20+cw9, 20+ch7, cw9, ch7);
		ctx.rect(20+cw9*3, 20+ch7, cw9, ch7);
		ctx.rect(20+cw9*5, 20+ch7, cw9, ch7);
		ctx.rect(20+cw9*7, 20+ch7, cw9, ch7);
		ctx.rect(20+cw9, 20+ch7*3, cw9, ch7);
		ctx.rect(20+cw9*3, 20+ch7*3, cw9, ch7);
		ctx.rect(20+cw9*5, 20+ch7*3, cw9, ch7);
		ctx.rect(20+cw9*7, 20+ch7*3, cw9, ch7);

		
		//door closing
		if( this.active==1){
		
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		
		}
		
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
		
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
			if(x > canvas.width/2-characterRadius && x < canvas.width/2+characterRadius && y > canvas.height/2-characterRadius && y < canvas.height/2+characterRadius){

				playerHealth++;
				leftHeartx=[];
				for(i=30;i<=playerHealth*30;i+=30){
				leftHeartx.push(i);
				}
				rightHeartx=[0];
				for(i=30;i<=playerHealth*30;i+=30){
				rightHeartx.push(i);
				}				
				this.regen=0;
			}
			
				ctx.beginPath();
				ctx.moveTo(canvas.width/2,canvas.height/2);
				ctx.lineTo(canvas.width/2,canvas.height/2-20);
				ctx.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
				ctx.moveTo(canvas.width/2-20,canvas.height/2-20);
				ctx.lineTo(canvas.width/2,canvas.height/2);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();	

			
		
		
		}
		}
		
	/* Level 3 Movement */
		/* Right */
		if(this.active == 0){
			if (
				(x == 20+cw9-characterRadius || x == 20+cw9*3-characterRadius || x == 20+cw9*5-characterRadius || x == 20+cw9*7-characterRadius)
				&&
				((y > 20+ch7-characterRadius && y < 20+ch7*2+characterRadius) || (y > 20+ch7*3-characterRadius && y < 20+ch7*4+characterRadius))

				){}
			
				else if(dPressed && x < canvas.width-characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
						x += 5;
					}}
		
		else{
			if (
				(x == 20+cw9-characterRadius || x == 20+cw9*3-characterRadius || x == 20+cw9*5-characterRadius || x == 20+cw9*7-characterRadius)
				&&
				((y > 20+ch7-characterRadius && y < 20+ch7*2+characterRadius) || (y > 20+ch7*3-characterRadius && y < 20+ch7*4+characterRadius))

				){}
					
				else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				(x == 20+cw9*8+characterRadius || x == 20+cw9*6+characterRadius || x == 20+cw9*4+characterRadius || x == 20+cw9*2+characterRadius)
				&&
				((y > 20+ch7-characterRadius && y < 20+ch7*2+characterRadius) || (y > 20+ch7*3-characterRadius && y < 20+ch7*4+characterRadius))

				){}
				
				else if(aPressed && x > 0+characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(aPressed && x > 0+characterRadius+wallThickness) {
						x -= 5;
					}}
		
		else{
			if (
				(x == 20+cw9*8+characterRadius || x == 20+cw9*6+characterRadius || x == 20+cw9*4+characterRadius || x == 20+cw9*2+characterRadius)
				&&
				((y > 20+ch7-characterRadius && y < 20+ch7*2+characterRadius) || (y > 20+ch7*3-characterRadius && y < 20+ch7*4+characterRadius))

				){}
				
				else if(aPressed && x > 0+characterRadius+wallThickness) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 20+cw9-characterRadius && x < 20+cw9*2+characterRadius) || (x > 20+cw9*3-characterRadius && x < 20+cw9*4+characterRadius) || (x > 20+cw9*5-characterRadius && x < 20+cw9*6+characterRadius) || (x > 20+cw9*7-characterRadius && x < 20+cw9*8+characterRadius))
				&&
				(y == 20+ch7*2+characterRadius || y == 20+ch7*4+characterRadius)
				){}	
			
				else if(wPressed && y > 0+characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(wPressed && y > 0+characterRadius+wallThickness) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 20+cw9-characterRadius && x < 20+cw9*2+characterRadius) || (x > 20+cw9*3-characterRadius && x < 20+cw9*4+characterRadius) || (x > 20+cw9*5-characterRadius && x < 20+cw9*6+characterRadius) || (x > 20+cw9*7-characterRadius && x < 20+cw9*8+characterRadius))
				&&
				(y == 20+ch7*2+characterRadius || y == 20+ch7*4+characterRadius)
				){}	
			
				else if(wPressed && y > 0+characterRadius+wallThickness) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 20+cw9-characterRadius && x < 20+cw9*2+characterRadius) || (x > 20+cw9*3-characterRadius && x < 20+cw9*4+characterRadius) || (x > 20+cw9*5-characterRadius && x < 20+cw9*6+characterRadius) || (x > 20+cw9*7-characterRadius && x < 20+cw9*8+characterRadius))
				&&
				(y == 20+ch7-characterRadius || y == 20+ch7*3-characterRadius)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
						y += 5;
					}}
		else{	
			if (
				((x > 20+cw9-characterRadius && x < 20+cw9*2+characterRadius) || (x > 20+cw9*3-characterRadius && x < 20+cw9*4+characterRadius) || (x > 20+cw9*5-characterRadius && x < 20+cw9*6+characterRadius) || (x > 20+cw9*7-characterRadius && x < 20+cw9*8+characterRadius))
				&&
				(y == 20+ch7-characterRadius || y == 20+ch7*3-characterRadius)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
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
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},
		
	enemy2:{
		x:45,
		y:canvas.height-45,
		vx:5,
		vy:0,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},
	
	enemy3:{
		x:canvas.width-45,
		y:canvas.height-45,
		vx:0,
		vy:-5,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},
	
		enemy4:{
		x:canvas.width-45,
		y:45,
		vx:-5,
		vy:0,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},
	
	enemy5:{
		x:115,
		y:115,
		vx:5,
		vy:0,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},

	enemy6:{
		x:canvas.width-115,
		y:115,
		vx:0,
		vy:5,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},

	enemy7:{
		x:canvas.width-115,
		y:canvas.height-115,
		vx:-5,
		vy:0,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},

	enemy8:{
		x:115,
		y:canvas.height-115,
		vx:0,
		vy:-5,

		spawn: function(){
			

			ctx.beginPath();
			ctx.arc(this.x, this.y , 20, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
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
			
			if((this.x-20 < x+characterRadius && this.x+20 > x-characterRadius) && (this.y-20 < y+characterRadius && this.y+20 > y-characterRadius)){
				damageDelay();
			}
		}
	},

	key1:{
	
	spawn:function(){
	
	ctx.beginPath();
	ctx.arc(200, 190, 12, 0, Math.PI*2);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(200, 190, 6, 0, Math.PI*2);
	ctx.fillStyle = "#eee";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(197, 199, 6, 25);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(197, 208, 10, 6);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(197, 218, 12, 6);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	
	if((x > 180 && x < 220) && (y > 170 && y < 240)){
		this.touched = 1;
	}
	
	},
	
	touched: 0
	
	},
	
	key2:{
	
	spawn:function(){
	
	ctx.beginPath();
	ctx.arc(canvas.width-200, 190, 12, 0, Math.PI*2);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(canvas.width-200, 190, 6, 0, Math.PI*2);
	ctx.fillStyle = "#eee";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(canvas.width-203, 199, 6, 25);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(canvas.width-203, 208, 10, 6);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(canvas.width-203, 218, 12, 6);
	ctx.fillStyle = "pink";
	ctx.fill();
	ctx.closePath();
	
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
		
		ctx.beginPath();
		ctx.rect(canvas.width/2-25-15, 160, 15, 80);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.rect(canvas.width/2+25, 160, 15, 80);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
		
		if(((x > canvas.width/2-25-15-characterRadius && x < canvas.width/2-25+characterRadius) || (x > canvas.width/2+25-characterRadius && x < canvas.width/2+25+15+characterRadius)) && (y > 160 && y < 240)){
		damageDelay();
		}
		
		
		



	}	

	}
	}
	
},
level: function(){
	
		ctx.beginPath();
		ctx.rect(70+50+wallThickness, 70, 360, wallThickness);
		ctx.rect(70,70+50+wallThickness,wallThickness, 120);
		ctx.rect(70+50+wallThickness, canvas.height-70-wallThickness, 360, wallThickness);
		ctx.rect(canvas.width-70-wallThickness, 70+50+wallThickness, wallThickness, 120);	
		ctx.rect(70+70, 70+70, 360/2-25, wallThickness);
		ctx.rect(70+70, 70+70, wallThickness, 120);
		ctx.rect(70+70, canvas.height-70-70-wallThickness, 360/2-25, wallThickness);
		ctx.rect(canvas.width/2+25, 70+70, 360/2-25, wallThickness);
		ctx.rect(canvas.width-70-70-wallThickness, 70+70, wallThickness, 120);
		ctx.rect(canvas.width/2+25, canvas.height-70-70-wallThickness, 360/2-25, wallThickness);		
		
		
				//door closing
		if( this.active==1){
		
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		
		}
		
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
		
		
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
			if(x > canvas.width/2-characterRadius && x < canvas.width/2+characterRadius && y > canvas.height/2-characterRadius && y < canvas.height/2+characterRadius){

				playerHealth++;
				leftHeartx=[];
				for(i=30;i<=playerHealth*30;i+=30){
				leftHeartx.push(i);
				}
				rightHeartx=[0];
				for(i=30;i<=playerHealth*30;i+=30){
				rightHeartx.push(i);
				}
				this.regen=0;
			}
			
				ctx.beginPath();
				ctx.moveTo(canvas.width/2,canvas.height/2);
				ctx.lineTo(canvas.width/2,canvas.height/2-20);
				ctx.arc(canvas.width/2-10, canvas.height/2-20, 10, 0, Math.PI, true);
				ctx.moveTo(canvas.width/2-20,canvas.height/2-20);
				ctx.lineTo(canvas.width/2,canvas.height/2);
				ctx.fillStyle = "red";
				ctx.fill();
				ctx.closePath();	

			
		
		
		}};
		
		
		/* Level 4 Movement */
		/* Right */
		if(this.active == 0){
			if (
				((x == 70-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == 140-characterRadius) && ((y > 70-characterRadius && y < 70+wallThickness+characterRadius) || (y > 140-characterRadius && y < canvas.height-140+characterRadius) || (y > canvas.height-70-wallThickness-characterRadius && y <canvas.height-70+characterRadius))) 
				||
				((x == canvas.width/2+25-characterRadius) && ((y > 140-characterRadius && y < 140+wallThickness+characterRadius ) || (y > canvas.height-140-wallThickness-characterRadius && y < canvas.height-140+characterRadius)))
				||
				((x == canvas.width-70-wallThickness-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == canvas.width-140-wallThickness-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				){}
			
				else if(dPressed && x < canvas.width-characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x += 5;
				}
			
					else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
						x += 5;
					}}
		
		else{
			if (
				((x == 70-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == 140-characterRadius) && ((y > 70-characterRadius && y < 70+wallThickness+characterRadius) || (y > 140-characterRadius && y < canvas.height-140+characterRadius) || (y > canvas.height-70-wallThickness-characterRadius && y <canvas.height-70+characterRadius))) 
				||
				((x == canvas.width/2+25-characterRadius) && ((y > 140-characterRadius && y < 140+wallThickness+characterRadius ) || (y > canvas.height-140-wallThickness-characterRadius && y < canvas.height-140+characterRadius)))
				||
				((x == canvas.width-70-wallThickness-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == canvas.width-140-wallThickness-characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
			){}
					
				else if(dPressed && x < canvas.width-characterRadius-wallThickness) {
					x += 5;
				}}

		
		/* Left */
		if(this.active == 0){
			if (
				((x == canvas.width-70+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == canvas.width-140+characterRadius) && ((y > 70-characterRadius && y < 70+wallThickness+characterRadius) || (y > 140-characterRadius && y < canvas.height-140+characterRadius) || (y > canvas.height-70-wallThickness-characterRadius && y <canvas.height-70+characterRadius))) 
				||
				((x == canvas.width/2-25+characterRadius) && ((y > 140-characterRadius && y < 140+wallThickness+characterRadius ) || (y > canvas.height-140-wallThickness-characterRadius && y < canvas.height-140+characterRadius)))
				||
				((x == 70+wallThickness+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == 140+wallThickness+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				){}
				
				else if(aPressed && x > 0+characterRadius && (y < canvas.height/2+30 && y > canvas.height/2-30)) {
					x -= 5;
				}
					else if(aPressed && x > 0+characterRadius+wallThickness) {
						x -= 5;
					}}
		
		else{
			if (
				((x == canvas.width-70+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == canvas.width-140+characterRadius) && ((y > 70-characterRadius && y < 70+wallThickness+characterRadius) || (y > 140-characterRadius && y < canvas.height-140+characterRadius) || (y > canvas.height-70-wallThickness-characterRadius && y <canvas.height-70+characterRadius))) 
				||
				((x == canvas.width/2-25+characterRadius) && ((y > 140-characterRadius && y < 140+wallThickness+characterRadius ) || (y > canvas.height-140-wallThickness-characterRadius && y < canvas.height-140+characterRadius)))
				||
				((x == 70+wallThickness+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))
				||
				((x == 140+wallThickness+characterRadius) && (y > 140-characterRadius && y < canvas.height-140+characterRadius))				
				){}
				
				else if(aPressed && x > 0+characterRadius+wallThickness) {
					x -= 5;
				}}
			
			
		/* Up */
		if(this.active == 0){
			if (
				((x > 140-characterRadius && x < canvas.width-140+characterRadius)
				&&
				(y == 70+wallThickness+characterRadius || y == canvas.height-70+characterRadius))
				||
				(((x > 70-characterRadius && x < 70+wallThickness+characterRadius) || (x > 140-characterRadius && x < canvas.width/2-25+characterRadius) || (x > canvas.width/2+25-characterRadius && x < canvas.width-140+characterRadius) || (x > canvas.width-70-wallThickness-characterRadius && x < canvas.width-70+characterRadius))
				&&
				((y == canvas.height-140+characterRadius) || (y == 140+wallThickness+characterRadius))
				)
				){}	
			
				else if(wPressed && y > 0+characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y -= 5;
				}
					else if(wPressed && y > 0+characterRadius+wallThickness) {
						y -= 5;
			}}
				
				
		else{		
			if (
				((x > 140-characterRadius && x < canvas.width-140+characterRadius)
				&&
				(y == 70+wallThickness+characterRadius || y == canvas.height-70+characterRadius))
				||
				(((x > 70-characterRadius && x < 70+wallThickness+characterRadius) || (x > 140-characterRadius && x < canvas.width/2-25+characterRadius) || (x > canvas.width/2+25-characterRadius && x < canvas.width-140+characterRadius) || (x > canvas.width-70-wallThickness-characterRadius && x < canvas.width-70+characterRadius))
				&&
				((y == canvas.height-140+characterRadius) || (y == 140+wallThickness+characterRadius))
				)
				){}	
			
				else if(wPressed && y > 0+characterRadius+wallThickness) {
					y -= 5;
			}}				

		
		/* Down */
		if(this.active == 0){
			if (
				((x > 140-characterRadius && x < canvas.width-140+characterRadius)
				&&
				(y == 70-characterRadius || y == canvas.height-70-wallThickness-characterRadius))
				||
				(((x > 70-characterRadius && x < 70+wallThickness+characterRadius) || (x > 140-characterRadius && x < canvas.width/2-25+characterRadius) || (x > canvas.width/2+25-characterRadius && x < canvas.width-140+characterRadius) || (x > canvas.width-70-wallThickness-characterRadius && x < canvas.width-70+characterRadius))
				&&
				((y == canvas.height-140-wallThickness-characterRadius) || (y == 140-characterRadius))
				)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)) {
					y += 5;
				}
				
					else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
						y += 5;
					}}
		else{	
			if (
				((x > 140-characterRadius && x < canvas.width-140+characterRadius)
				&&
				(y == 70-characterRadius || y == canvas.height-70-wallThickness-characterRadius))
				||
				(((x > 70-characterRadius && x < 70+wallThickness+characterRadius) || (x > 140-characterRadius && x < canvas.width/2-25+characterRadius) || (x > canvas.width/2+25-characterRadius && x < canvas.width-140+characterRadius) || (x > canvas.width-70-wallThickness-characterRadius && x < canvas.width-70+characterRadius))
				&&
				((y == canvas.height-140-wallThickness-characterRadius) || (y == 140-characterRadius))
				)
				){}	
				
				else if(sPressed && y < canvas.height-characterRadius-wallThickness) {
					y += 5;
				}}	

},

	status: 0,
	active: 1,
	
	regen: 0	

}
];

function drawLevels(){
for(i=0;i<levels.length;i++){

if(levels[i].status == 1){
levels[i].level();

}
}}

/* Level graphics */

function drawWalls(){

    ctx.beginPath();
    ctx.rect(0, 0, wallLength, wallThickness);
	ctx.rect(0, 0, wallThickness, wallHeight);
	ctx.rect(0, canvas.height-20, wallLength, wallThickness);
	ctx.rect(0, canvas.height/2+50, wallThickness, wallHeight);
    ctx.rect(canvas.width/2+50, canvas.height-20, wallLength, wallThickness);
	ctx.rect(canvas.width-20, canvas.height/2+50, wallThickness, wallHeight);
	ctx.rect(canvas.width/2+50, 0, wallLength, wallThickness);
	ctx.rect(canvas.width-20, 0, wallThickness, wallHeight);	
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();


}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

/* Level Change */



if (doorNmbr == 3){

if (randomGenDoor==1){
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else if(randomGenDoor==2){
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else{
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}}
else if(doorNmbr == 4){

if (randomGenDoor==1){
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else if(randomGenDoor==2){
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else{
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}

}
else if(doorNmbr == 1){

if (randomGenDoor==1){
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else if(randomGenDoor==2){
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else{
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}

}
else if(doorNmbr == 2){

if (randomGenDoor==1){
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else if(randomGenDoor==2){
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.rect(0, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}
else{
		ctx.beginPath();
		ctx.rect(0, canvas.height-wallThickness, canvas.width, wallThickness);
		ctx.rect(0, 0, canvas.width, wallThickness);
		ctx.rect(canvas.width-wallThickness, 0, wallThickness, canvas.height);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();		
}

}

/* Upper Door */

if ( y == characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)){
doorNmbr = 3;
randomGenDoor=Math.floor(Math.random()*3+1);
roomCounter++;

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
y = canvas.height-20-characterRadius;
}

/* Right Door */

if ((y < canvas.height/2+30 && y > canvas.height/2-30) && x == canvas.width-characterRadius){
doorNmbr = 4;
randomGenDoor=Math.floor(Math.random()*3+1);
roomCounter++;

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
x = 20+characterRadius;
y = canvas.height/2;
}

/* Bottom Door */

if ( y == canvas.height-characterRadius && (x < canvas.width/2+30 && x > canvas.width/2-30)){

doorNmbr = 1;
randomGenDoor=Math.floor(Math.random()*3+1);
roomCounter++;

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
y = 20+characterRadius;


}

/* Left Door */

if ( (y < canvas.height/2+30 && y > canvas.height/2-30) && x == characterRadius){
doorNmbr = 2;
randomGenDoor=Math.floor(Math.random()*3+1);
roomCounter++;

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

x = canvas.width-20-characterRadius;
y = canvas.height/2;
}

if(playerHealth==0){
    alert("GAME OVER");
    document.location.reload();
}
if(roomCounter == 16){
    alert("CONGRATULATIONS!\nYou won the game!");
    document.location.reload();
}


if(bullets.length>0){
drawShot();}
drawWalls();
drawLevels();
drawCharacter();
drawHearts();
drawScore();
if(bullets.length > 0 && levels[3].status == 1){
		shotRemove();}


requestAnimationFrame(draw);


/* Level Generation */





/* Movement */




/* Shooting */

if(rightPressed) {
	if(!shootingDelay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 6,
		bulletvy: 0,
		status: 1
		});
		
		shootingDelay=!shootingDelay;
		setTimeout(shootingTimer,500);
		}


}
if(leftPressed) {
	if(!shootingDelay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: -6,
		bulletvy: 0,
		status: 1
		});
		
		shootingDelay=!shootingDelay;
		setTimeout(shootingTimer,500);
		}

}
if(upPressed) {
	if(!shootingDelay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 0,
		bulletvy: -6,
		status: 1
		});
		
		shootingDelay=!shootingDelay;
		setTimeout(shootingTimer,500);
		}

}
if(downPressed) {
	if(!shootingDelay){
		bullets.push({
		bulletx: x,
		bullety: y,
		bulletvx: 0,
		bulletvy: 6,
		status: 1
		});
		
		shootingDelay=!shootingDelay;
		setTimeout(shootingTimer,500);
		}

}


}

draw();

/* Key Handlers */

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
/*document.addEventListener("mousemove", mouseMoveHandler, false);*/

function keyDownHandler(e) {
    if(e.keyCode == 68) {
        dPressed = true;
    }
    if(e.keyCode == 65) {
        aPressed = true;
    }
	if(e.keyCode == 87) {
		wPressed = true;
	}
	if(e.keyCode == 83) {
		sPressed = true;
	}
	if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
	if(e.keyCode == 38) {
		upPressed = true;
	}
	if(e.keyCode == 40) {
		downPressed = true;
	}
	
}

function keyUpHandler(e) {
    if(e.keyCode == 68) {
        dPressed = false;
    }
    if(e.keyCode == 65) {
        aPressed = false;
    }
	if(e.keyCode == 87) {
		wPressed = false;
	}
	if(e.keyCode == 83) {
		sPressed = false;
	}
	if(e.keyCode == 39) {
        rightPressed = false;
    }
    if(e.keyCode == 37) {
        leftPressed = false;
    }
	if(e.keyCode == 38) {
		upPressed = false;
	}
	if(e.keyCode == 40) {
		downPressed = false;
	}
	
}
