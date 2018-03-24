function InitializeCharacter(){
  var canvas_center = new Point(canvas.width / 2, canvas.height / 2);
  var character_starting_position = canvas_center;
  var character_size = 20;
  var starting_movement_speed = 5;
  var character_colour = "orange";
  
  var character = new Character(character_starting_position, character_size, starting_movement_speed, character_colour);
  
  return character
};


function InitializeHealthBar(){
  var start_point = new Point(10, 10);
  var token_size = 40;
  var token_spacing = 10;
  var starting_health = 7;
  var health_colour = "red";
  
  var health_bar = new HealthBar(start_point, token_size, token_spacing, starting_health, health_colour);
  
  return health_bar
};


function DrawGame() {
  ResetCanvas()
  
  character.Move();
  character.DrawShape();
  
  health_bar.DrawShape();
  
  requestAnimationFrame(DrawGame);
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

/* Refactoring functions */

function ResetCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
};


function Point(x, y){
  this.x = x;
  this.y = y;
};


function Dimensions(width, height){
  this.width = width;
  this.height = height
};


function ExtremeCoordinates(min_x, max_x, min_y, max_y){
  this.min = new Point(min_x, min_y);
  this.max = new Point(max_x, max_y);
};


function Shape(colour){
  this.colour = colour;
};

Shape.prototype.BeginPath = function(){
  context.beginPath();
};

Shape.prototype.ClosePath = function(){
  context.closePath();
};

Shape.prototype.Fill = function(){
  context.fillStyle = this.colour;
  context.fill();
  context.fillStyle = "black";
};


function Rectangle(start_point, dimensions, colour){
  Shape.call(this, colour);
  
  this.start_point = start_point;
  this.dimensions = dimensions;
};

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this);
  context.rect(this.start_point.x, this.start_point.y, this.dimensions.width, this.dimensions.height);
  Shape.prototype.ClosePath.call(this);
  Shape.prototype.Fill.call(this);
};


function Wall(start_point, thickness, length, orientation, colour){
  dimensions = ChooseWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions, colour);
};

Wall.prototype = Object.create(Rectangle.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.CalculateExtremeCoordinates = function(){
  min_x = this.start_point.x;
  max_x = this.start_point.x + this.width;
  min_y = this.start_point.y;
  max_y = this.start_point.y + this.height;
  
  extremes = new ExtremeCoordinates(min_x, max_x, min_y, max_y);
  return extremes;
};

Wall.prototype.IsCollidedWithRectangularObject = function(rectangular_object){
  /* Assumes that both the rectangular object and the Wall are aligned with the axis */
  wall_extremes = this.CalculateExtremeCoordinates();
  object_extremes = rectangular_object.CalculateExtremeCoordinates();
  
  IsCollidedOnX(wall_extremes, object_extremes);
  IsCollidedOnY(wall_extremes, object_extremes);
};

function IsCollidedOnX(wall_extremes, object_extremes){
  /* Right and Left side of the Wall */
  x1 = wall_extremes.min.x;
  x2 = wall_extremes.max.x;
  c1 = object_extremes.min.x;
  c2 = object_extremes.max.x;
  if (IsRightSideCollided(x1, x2, c1, c2) || IsLeftSideCollided(x1, x2, c1, c2)){
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

function IsCollidedOnY(wall_extremes, object_extremes){
  /* Top and Bottom side of the Wall */
  y1 = wall_extremes.min.y;
  y2 = wall_extremes.max.y;
  c1 = object_extremes.min.y;
  c2 = object_extremes.max.y;
  if (IsRightSideCollided(y1, y2, c1, c2) || IsLeftSideCollided(y1, y2, c1, c2)){
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



function Door(start_point, thickness, length, orientation, colour){
  dimensions = ChooseWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions, colour);
};

Door.prototype = Object.create(Rectangle.prototype);
Door.prototype.constructor = Door;

function ChooseWallOrDoorDimensions(thickness, length, orientation){
  if (orientation === "horizontal"){
    dimensions = new Dimensions(length, thickness);
  }
  else if (orientation === "vertical"){
    dimensions = new Dimensions(thickness, length);
  }
  else{
    alert("Wall orientation is neither horizontal nor vertical.");
  };
  return dimensions;
};


function Triangle(first, second, third, colour){
  Shape.call(this, colour);
  
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


function Circle(center, radius, colour){
  Shape.call(this, colour);
  
  this.center = center;
  this.radius = radius;
  this.start_angle = 0;
  this.end_angle = 2 * Math.PI;
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.CalculateExtremeCoordinates = function(){
  min_x = this.center.x - this.radius;
  max_x = this.center.x + this.radius;
  min_y = this.center.y - this.radius;
  max_y = this.center.y + this.radius;
  
  extremes = new ExtremeCoordinates(min_x, max_x, min_y, max_y);
  return extremes;
};

Circle.prototype.DrawShape = function(){
  Shape.prototype.BeginPath.call(this)
  context.arc(this.center.x, this.center.y, this.radius, this.start_angle, this.end_angle);
  Shape.prototype.ClosePath.call(this)
  Shape.prototype.Fill.call(this)
};


function Character(center, radius, movement_speed, colour){
  Circle.call(this, center, radius, colour);
  
  this.movement_speed = movement_speed;
  
  this.command_move_up = false;
  this.command_move_left = false;
  this.command_move_down = false;
  this.command_move_right = false;
};

Character.prototype = Object.create(Circle.prototype);
Character.prototype.constructor = Character;

Character.prototype.Move = function(){
  if (this.command_move_up){
    this.MoveUp();
  };
  if (this.command_move_left){
    this.MoveLeft();
  };
  if (this.command_move_down){
    this.MoveDown();
  };
  if (this.command_move_right){
    this.MoveRight();
  };
};

Character.prototype.MoveUp = function(){
  this.center.y -= this.movement_speed
};

Character.prototype.MoveLeft = function(){
  this.center.x -= this.movement_speed
};

Character.prototype.MoveDown = function(){
  this.center.y += this.movement_speed
};

Character.prototype.MoveRight = function(){
  this.center.x += this.movement_speed
};


function Arc(radius, start_angle, end_angle){
  //in radians(for example Math.PI/2 is 90 degrees)
  //0th degree is at the x axis and increases clockwise
  this.radius = radius;
  this.start_angle = start_angle;
  this.end_angle = end_angle;
};


function Slice(center, arc, colour){
  Shape.call(this, colour);
  
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


function HealthBar(start_point, token_size, token_spacing, health, colour){
  this.start_point = start_point;
  this.token_size = token_size;
  this.token_spacing = token_spacing;
  this.health = health;
  
  this.colour = colour;
};

HealthBar.prototype.DrawShape = function(){
  this.DrawHealthAsHearts()
};

HealthBar.prototype.DrawHealthAsHearts = function(){
  number_of_full_hearts = Math.floor(this.health / 2);
  number_of_left_half_hearts = (this.health % 2);
  
  DrawFullHearts(this.start_point, number_of_full_hearts, this.token_size, this.token_spacing, this.colour);

  if (number_of_left_half_hearts === 1){
    DrawLeftHalfHeart(this.start_point, number_of_full_hearts, this.token_size, this.token_spacing, this.colour);
  };
};

function DrawFullHearts(health_bar_start_point, number_of_full_hearts, heart_size, heart_spacing, colour){
  y_heart_start_point = health_bar_start_point.y;
  
  for (heart_counter = 0; heart_counter < number_of_full_hearts; heart_counter += 1){
    x_heart_offset = heart_counter * (heart_size + heart_spacing);
    x_heart_start_point = health_bar_start_point.x + x_heart_offset;
    
    heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
    
    full_heart = new FullHeart(heart_start_point, heart_size, colour);
    full_heart.DrawShape();
  };
};

function DrawLeftHalfHeart(health_bar_start_point, number_of_full_hearts, heart_size, heart_spacing, colour){
  x_heart_offset = number_of_full_hearts * (heart_size + heart_spacing);
  x_heart_start_point = health_bar_start_point.x + x_heart_offset;
  
  heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
  
  left_half_heart = new HalfHeart(heart_start_point, heart_size, "left", colour);
  left_half_heart.DrawShape();
};


function FullHeart(start_point, size, colour){
  this.left_heart = new HalfHeart(start_point, size, "left", colour);
  this.right_heart = new HalfHeart(start_point, size, "right", colour);
};

FullHeart.prototype.DrawShape = function(){
  this.left_heart.DrawShape();
  this.right_heart.DrawShape();
};


function HalfHeart(start_point, size, heart_part, colour){
  point_array = CalculateFourHalfHeartPoints(start_point, size, heart_part);
  center = point_array[0];
  side_point = point_array[1];
  top_point = point_array[2];
  bottom_point = point_array[3];
  
  radius = size / 4;
  
  semicircle_arc = new Arc(radius, Math.PI, 2 * Math.PI);
  
  this.top_semicircle = new Slice(center, semicircle_arc, colour);
  this.triangle = new Triangle(side_point, top_point, bottom_point, colour);
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


function KeyDownHandler(event) {
  console.log(event.code);
  if(event.code == "ArrowUp") {
    alert(event.code);
  }
  if(event.code == "ArrowLeft") {
    alert(event.code);
  }
  if(event.code == "ArrowDown") {
    alert(event.code);
  }
  if(event.code == "ArrowRight") {
    alert(event.code);
  }
  if(event.code == "KeyW") {
    character.command_move_up = true;
  }
  if(event.code == "KeyA") {
    character.command_move_left = true;
  }
  if(event.code == "KeyS") {
    character.command_move_down = true;
  }
  if(event.code == "KeyD") {
    character.command_move_right = true;
  }

};

function KeyUpHandler(event) {
  if(event.code == "ArrowUp") {
    alert(event.code);
  }
  if(event.code == "ArrowLeft") {
    alert(event.code);
  }
  if(event.code == "ArrowDown") {
    alert(event.code);
  }
  if(event.code == "ArrowRight") {
    alert(event.code);
  }
  if(event.code == "KeyW") {
    character.command_move_up = false;
  }
  if(event.code == "KeyA") {
    character.command_move_left = false;
  }
  if(event.code == "KeyS") {
    character.command_move_down = false;
  }
  if(event.code == "KeyD") {
    character.command_move_right = false;
  }

};

document.addEventListener("keydown", KeyDownHandler);
document.addEventListener("keyup", KeyUpHandler);

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
  
var character = InitializeCharacter();
  
var health_bar = InitializeHealthBar()

DrawGame();