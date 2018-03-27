function InitializeCharacter(){
  var canvas_center = new Point(canvas.width / 2, canvas.height / 2);
  var character_starting_position = canvas_center;
  var character_size = 40;
  var character_radius = character_size / 2;
  var starting_character_movement_speed = 5;
  var character_colour = "orange";
  
  var character = new Character(character_starting_position, character_radius, starting_character_movement_speed, character_colour);
  
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


function InitializeOuterWalls(){
  var thickness = 20;
  var horizontal_length = 280;
  var vertical_length = 160;
  var door_length = 80;
  var colour = "blue";
  
  var center_x = horizontal_length + door_length;
  var right_x = canvas.width - thickness;
  
  var center_y = vertical_length + door_length;
  var bottom_y = canvas.height - thickness;
  
  /* Points naming codex:
     TL    CT    TR
     
     CL          CR
     
     BL    CB    
  */
  var top_left = new Point(0, 0);
  var center_top = new Point(center_x, 0);
  var top_right = new Point(right_x, 0);
  
  var center_left = new Point(0, center_y);
  var center_right = new Point(right_x, center_y);
  
  var bottom_left = new Point(0, bottom_y);
  var center_bottom = new Point(center_x, bottom_y);
  
  /* Walls naming codex:
         TLH              TRH 
     T                          T
     L                          R
     V                          V
                                    
     B                          B
     L                          R
     V   BLH              BRH   V
  */
  top_left_horizontal_wall = new Wall(top_left, thickness, horizontal_length, "horizontal", colour);
  top_left_vertical_wall = new Wall(top_left, thickness, vertical_length, "vertical", colour);
  top_right_horizontal_wall = new Wall(center_top, thickness, horizontal_length, "horizontal", colour);
  top_right_vertical_wall = new Wall(top_right, thickness, vertical_length, "vertical", colour);
  
  bottom_left_vertical_wall = new Wall(center_left, thickness, vertical_length, "vertical", colour);
  bottom_right_vertical_wall = new Wall(center_right, thickness, vertical_length, "vertical", colour);
  
  bottom_left_horizontal_wall = new Wall(bottom_left, thickness, horizontal_length, "horizontal", colour);
  bottom_right_horizontal_wall = new Wall(center_bottom, thickness, horizontal_length, "horizontal", colour);
  
  var outer_walls = [];
  outer_walls.push(top_left_horizontal_wall);
  outer_walls.push(top_left_vertical_wall);
  outer_walls.push(top_right_horizontal_wall);
  outer_walls.push(top_right_vertical_wall);
  outer_walls.push(bottom_left_vertical_wall);
  outer_walls.push(bottom_right_vertical_wall);
  outer_walls.push(bottom_left_horizontal_wall);
  outer_walls.push(bottom_right_horizontal_wall);
  
  return outer_walls;
};


function InitializeCollisionDetector(){
  var collision_detector = new CollisionDetector();
  
  return collision_detector;
};


function InitializeLevel(){
  var size = 5;
  var max_rooms = 10;
  var level = new Level(size, max_rooms);
  
  level.PopulateWithRooms();
  
  return level;
};


function DrawGame() {
  ResetCanvas()
  
  character.Move();
  character.Draw();
  
  DrawOuterWalls()
  
  health_bar.Draw();
  
  requestAnimationFrame(DrawGame);
};

function DrawOuterWalls(){
  outer_walls.forEach(function (wall) {
    wall.Draw();
  });
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
  top_door.Draw();
  bottom_door.Draw();
  right_door.Draw();
  left_door.Draw();
};


function ResetCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
};


function Level(size, max_rooms){
  this.layout = new RoomGrid(size);
  this.max_rooms = max_rooms;
};

Level.prototype.PopulateWithRooms = function(){
  this.layout.PlaceStartingRoom();
  
  for (let i = 1; i < this.max_rooms; i += 1){
    this.layout.PlaceRandomRoomRandomlyAdjacentToExistingRooms();
  };
  
};


function RoomGrid(size){
  this.size = size;
  this.grid = this.CreateFalseValueSquareGrid();
  
  this.room_positions = [];
  this.adjacent_positions = [];
};

RoomGrid.prototype.CreateFalseValueSquareGrid = function(){
  var array = [];
  for (let i = 0; i < this.size; i += 1){
    array.push(false);
  };
  
  var array_of_arrays = [];
  for (let i = 0; i < this.size; i += 1){
    array_of_arrays.push(array.slice()); /*Copy the array*/
  };
  
  return array_of_arrays;
};

RoomGrid.prototype.PlaceStartingRoom = function(){
  var middle = Math.floor(this.size / 2);
  var center = new MatrixPosition(middle, middle);
  var starting_room = "starting_room"; //TODO
  this.PlaceRoomAt(starting_room, center);
};

RoomGrid.prototype.PlaceRandomRoomRandomlyAdjacentToExistingRooms = function(){
  var random_adjacent_position = this.GetAndRemoveRandomAdjacentPosition();
  var random_room = "random_room";//TODO
  
  this.PlaceRoomAt(random_room, random_adjacent_position);
};

RoomGrid.prototype.GetAndRemoveRandomAdjacentPosition = function(){
  var random_number = GetRandomIntInclusive(0, this.adjacent_positions.length - 1);
  var one_length_array_with_position = this.adjacent_positions.splice(random_number, 1);
  
  var position = one_length_array_with_position[0];
  
  return position;
};

RoomGrid.prototype.PlaceRoomAt = function(room, position){
  this.grid[position.row][position.column] = room;
  
  this.AddPositionToRoomAndAdjacentPositions(position);
};

RoomGrid.prototype.AddPositionToRoomAndAdjacentPositions = function(position){
  this.AddToRoomPositions(position);
  this.AddAdjacentPositions(position);
};

RoomGrid.prototype.AddToRoomPositions = function(position){
  this.room_positions.push(position);
};

RoomGrid.prototype.AddAdjacentPositions = function(position){
  var candidates_for_adjacency = this.CalculateAdjacentPointsWithinBoundsAndNotRooms(position);
  
  for (let i = 0; i < candidates_for_adjacency.length; i = i + 1){
    candidate_position = candidates_for_adjacency[i];
    
    if (!this.IsPositionDuplicateInArray(candidate_position, this.adjacent_positions)){
      this.adjacent_positions.push(candidate_position);
    };
  };
};

RoomGrid.prototype.CalculateAdjacentPointsWithinBoundsAndNotRooms = function(position){
  var adjacent_positions = [];
  
  if (position.row - 1 >= 0){
    var up_position = new MatrixPosition(position.row - 1, position.column);
    if (!this.IsPositionDuplicateInArray(up_position, this.room_positions)){
      adjacent_positions.push(up_position);
    };
  };
  if (position.column - 1 >= 0){
    var left_position = new MatrixPosition(position.row, position.column - 1);
    if (!this.IsPositionDuplicateInArray(left_position, this.room_positions)){
      adjacent_positions.push(left_position);
    };
  };
  if (this.size > position.row + 1){
    var down_position = new MatrixPosition(position.row + 1, position.column);
    if (!this.IsPositionDuplicateInArray(down_position, this.room_positions)){
      adjacent_positions.push(down_position);
    };
  };
  if (this.size > position.column + 1){
    var right_position = new MatrixPosition(position.row, position.column + 1);
    if (!this.IsPositionDuplicateInArray(right_position, this.room_positions)){
      adjacent_positions.push(right_position);
    };
  };
  return adjacent_positions;
}

RoomGrid.prototype.IsPositionDuplicateInArray = function(possible_duplicate_position, array){
  for (let i = 0; i < array.length; i += 1){
    position_in_array = array[i];
    
    if (position_in_array.IsSame(possible_duplicate_position)){
      return true;
    };
  };
  return false;
};

function GetRandomIntInclusive(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Room(){
  this.outer_walls =;
  
  this.up_door =;
  this.left_door =;
  this.down_door =;
  this.right_door =;
};

Room.prototype.CreateOuterWalls = function(){
  
};

Room.prototype.CreateDoors = function(){
  
};

Room.prototype.OpenDoorsToAdjacentRooms = function(){
  
};


function StartingRoom(){
  Room.call(this);
};

StartingRoom.prototype = Object.create(Room.prototype);
StartingRoom.prototype.constructor = StartingRoom;


function MiddleWallRoom(){
  Room.call(this);
  this.inner_walls =;
};

MiddleWallRoom.prototype = Object.create(Room.prototype);
MiddleWallRoom.prototype.constructor = MiddleWallRoom;


function Point(x, y){
  this.x = x;
  this.y = y;
};

Point.prototype.IsSame = function(point){
  if (this.x === point.x){
    if (this.y === point.y){
      return true;
    };
  };
  return false;
};


function MatrixPosition(row, column){
  /* Indexed from 0 to n-1 */
  this.row = row;
  this.column = column;
};

MatrixPosition.prototype.IsSame = function(matrix_point){
  if (this.row === matrix_point.row){
    if (this.column === matrix_point.column){
      return true;
    };
  };
  return false;
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

Rectangle.prototype.Draw = function(){
  Shape.prototype.BeginPath.call(this);
  context.rect(this.start_point.x, this.start_point.y, this.dimensions.width, this.dimensions.height);
  Shape.prototype.ClosePath.call(this);
  Shape.prototype.Fill.call(this);
};


function Wall(start_point, thickness, length, orientation, colour){
  dimensions = OrientWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions, colour);
};

Wall.prototype = Object.create(Rectangle.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.GetExtremesOnAxis = function(){
  min_x = this.start_point.x;
  max_x = this.start_point.x + this.dimensions.width;
  min_y = this.start_point.y;
  max_y = this.start_point.y + this.dimensions.height;
  
  extremes = new ExtremeCoordinates(min_x, max_x, min_y, max_y);
  return extremes;
};


function Door(start_point, thickness, length, orientation, colour){
  dimensions = OrientWallOrDoorDimensions(thickness, length, orientation);
  
  Rectangle.call(this, start_point, dimensions, colour);
};

Door.prototype = Object.create(Rectangle.prototype);
Door.prototype.constructor = Door;

function OrientWallOrDoorDimensions(thickness, length, orientation){
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

Triangle.prototype.Draw = function(){
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

Circle.prototype.GetExtremesOnAxis = function(){
  min_x = this.center.x - this.radius;
  max_x = this.center.x + this.radius;
  min_y = this.center.y - this.radius;
  max_y = this.center.y + this.radius;
  
  extremes = new ExtremeCoordinates(min_x, max_x, min_y, max_y);
  return extremes;
};

Circle.prototype.Draw = function(){
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
    if (this.IsNoUpCollision()){
      this.MoveUp();
    };
  };
  if (this.command_move_left){
    if (this.IsNoLeftCollision()){
      this.MoveLeft();
    };
  };
  if (this.command_move_down){
    if (this.IsNoDownCollision()){
      this.MoveDown();
    };
  };
  if (this.command_move_right){
    if (this.IsNoRightCollision()){
      this.MoveRight();
    };
  };
};

Character.prototype.IsNoUpCollision = function(){
  character_extremes = this.SimulateMoveUpAndGetExtremesOnAxis();
  if (collision_detector.IsExtremesOnAxisAndOuterWallCollided(character_extremes)){
    return false;
  };
  return true;
};

Character.prototype.IsNoLeftCollision = function(){
  character_extremes = this.SimulateMoveLeftAndGetExtremesOnAxis();
  if (collision_detector.IsExtremesOnAxisAndOuterWallCollided(character_extremes)){
    return false;
  };
  return true;
};

Character.prototype.IsNoDownCollision = function(){
  character_extremes = this.SimulateMoveDownAndGetExtremesOnAxis();
  if (collision_detector.IsExtremesOnAxisAndOuterWallCollided(character_extremes)){
    return false;
  };
  return true;
};

Character.prototype.IsNoRightCollision = function(){
  character_extremes = this.SimulateMoveRightAndGetExtremesOnAxis();
  if (collision_detector.IsExtremesOnAxisAndOuterWallCollided(character_extremes)){
    return false;
  };
  return true;
};

Character.prototype.SimulateMoveUpAndGetExtremesOnAxis = function(){
  extremes = Circle.prototype.GetExtremesOnAxis.call(this);
  
  extremes.min.y -= this.movement_speed;
  extremes.max.y -= this.movement_speed;
  
  return extremes
};

Character.prototype.SimulateMoveLeftAndGetExtremesOnAxis = function(){
  extremes = Circle.prototype.GetExtremesOnAxis.call(this);
  
  extremes.min.x -= this.movement_speed;
  extremes.max.x -= this.movement_speed;
  
  return extremes;
};

Character.prototype.SimulateMoveDownAndGetExtremesOnAxis = function(){
  extremes = Circle.prototype.GetExtremesOnAxis.call(this);
  
  extremes.min.y += this.movement_speed;
  extremes.max.y += this.movement_speed;
  
  return extremes;
};

Character.prototype.SimulateMoveRightAndGetExtremesOnAxis = function(){
  extremes = Circle.prototype.GetExtremesOnAxis.call(this);
  
  extremes.min.x += this.movement_speed;
  extremes.max.x += this.movement_speed;
  
  return extremes;
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


function CollisionDetector(){
  
};

CollisionDetector.prototype.IsExtremesOnAxisAndOuterWallCollided = function(extremes){
  for (let i = 0; i < outer_walls.length; i += 1){
    wall = outer_walls[i];
    wall_extremes = wall.GetExtremesOnAxis();
    if (this.IsExtremesOnAxisCollided(wall_extremes, extremes)){
      return true;
    };
  };
  return false;
};

CollisionDetector.prototype.IsExtremesOnAxisCollided = function(first_extremes, second_extremes){
  if (this.IsAxisAlignedBoundingBoxCollided(first_extremes, second_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsAxisAlignedBoundingBoxCollided = function(first_extremes, second_extremes){
  /* Assumes that both rectangular objects are aligned with the axis; there is no rotation */
  
  if (this.IsCollidedOnX(first_extremes, second_extremes)){
    if (this.IsCollidedOnY(first_extremes, second_extremes)){
      return true;
    };
  };
  return false;
};

CollisionDetector.prototype.IsCollidedOnX = function(first_extremes, second_extremes){
  x1 = first_extremes.min.x;
  x2 = first_extremes.max.x;
  c1 = second_extremes.min.x;
  c2 = second_extremes.max.x;
  
  if (this.IsIntervalCollided(x1, x2, c1, c2)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsCollidedOnY = function(first_extremes, second_extremes){
  y1 = first_extremes.min.y;
  y2 = first_extremes.max.y;
  c1 = second_extremes.min.y;
  c2 = second_extremes.max.y;
  
  if (this.IsIntervalCollided(y1, y2, c1, c2)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsIntervalCollided = function(x1, x2, c1, c2){
  if ((c2 > x1) && (x2 > c1)){
    return true;
  };
  return false;
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

Slice.prototype.Draw = function(){
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

HealthBar.prototype.Draw = function(){
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
  
  for (let heart_counter = 0; heart_counter < number_of_full_hearts; heart_counter += 1){
    x_heart_offset = heart_counter * (heart_size + heart_spacing);
    x_heart_start_point = health_bar_start_point.x + x_heart_offset;
    
    heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
    
    full_heart = new FullHeart(heart_start_point, heart_size, colour);
    full_heart.Draw();
  };
};

function DrawLeftHalfHeart(health_bar_start_point, number_of_full_hearts, heart_size, heart_spacing, colour){
  x_heart_offset = number_of_full_hearts * (heart_size + heart_spacing);
  x_heart_start_point = health_bar_start_point.x + x_heart_offset;
  
  heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
  
  left_half_heart = new HalfHeart(heart_start_point, heart_size, "left", colour);
  left_half_heart.Draw();
};


function FullHeart(start_point, size, colour){
  this.left_heart = new HalfHeart(start_point, size, "left", colour);
  this.right_heart = new HalfHeart(start_point, size, "right", colour);
};

FullHeart.prototype.Draw = function(){
  this.left_heart.Draw();
  this.right_heart.Draw();
};


function HalfHeart(start_point, size, heart_part, colour){
  point_array = CalculateHalfHeartPoints(start_point, size, heart_part);
  center = point_array[0];
  side_point = point_array[1];
  top_point = point_array[2];
  bottom_point = point_array[3];
  
  radius = size / 4;
  
  semicircle_arc = new Arc(radius, Math.PI, 2 * Math.PI);
  
  this.top_semicircle = new Slice(center, semicircle_arc, colour);
  this.triangle = new Triangle(side_point, top_point, bottom_point, colour);
};

function CalculateHalfHeartPoints(start_point, size, heart_part){
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

HalfHeart.prototype.Draw = function(){
  this.top_semicircle.Draw();
  this.triangle.Draw();
};


function KeyDownHandler(event) {
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
  
var health_bar = InitializeHealthBar();

var outer_walls = InitializeOuterWalls();

var collision_detector = InitializeCollisionDetector();

var level = InitializeLevel();

DrawGame();