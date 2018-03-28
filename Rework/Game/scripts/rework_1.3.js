function InitializeGame(){
  var game = new Game();
  
  game.Set
  
  return game;
};

function DrawGame() {
  ResetCanvas()
  
  game.CalculateAndSetCollisions();
  
  game.MoveEntities();
  
  game.Draw();
  
  requestAnimationFrame(DrawGame);
};


function Game(){
  this.levels = this.CreateLevels();
  this.current_level_index = 0;
  
  this.character = this.CreateCharacter();
  
  this.collision_detector = this.CreateCollisionDetector();
};

Game.prototype.CreateLevels = function(){
  var number_of_levels = 2;

  var levels = [];
  for (let i = 0; i < number_of_levels; i += 1){
    level = new Level();
    levels.push(level);
  };
  
  return levels;
};

Game.prototype.CreateCharacter = function(){
  var canvas_center = new Point(canvas.width / 2, canvas.height / 2);
  var character_starting_position = canvas_center;
  var character_size = 40;
  var character_radius = character_size / 2;
  var starting_character_movement_speed = 5;
  var character_colour = "orange";
  
  var character = new Character(character_starting_position, character_radius, starting_character_movement_speed, character_colour);
  
  return character
};

Game.prototype.CreateCollisionDetector = function(){
  var collision_detector = new CollisionDetector();
  
  return collision_detector;
};

Game.prototype.GetCurrentLevel = function(){
  var current_level = this.levels[this.current_level_index];
  
  return current_level;
};

Game.prototype.SetNextLevel = function(){
  this.current_level_index += 1;
};

Game.prototype.CalculateAndSetCollisions = function(){
  var collision_flags = this.GetCollisionFlags();
  this.character.SetCollisionFlags(collision_flags);
};

Game.prototype.GetCollisionFlags = function(){
  var character = this.character;
  
  var current_level = this.GetCurrentLevel();
  var obstacles = current_level.GetObstacles();
  
  var collision_flags = this.collision_detector.CalculateCollisionFlags(character, obstacles);
  
  return collision_flags;
};

Game.prototype.MoveEntities = function(){
  this.character.Move();
  
  var current_level = this.GetCurrentLevel();
  current_level.MoveEntitiesInCurrentRoom();
};

Game.prototype.Draw = function(){
  this.character.Draw();
  
  var current_level = this.GetCurrentLevel();
  current_level.Draw();
};

Game.prototype.InterpretKeyDownInput = function(event){
  if(event.code == "KeyW") {
    this.character.command_move_up = true;
    this.collision_detector.skip_char_wall_up = false;
  };
  if(event.code == "KeyA") {
    this.character.command_move_left = true;
    this.collision_detector.skip_char_wall_left = false;
  };
  if(event.code == "KeyS") {
    this.character.command_move_down = true;
    this.collision_detector.skip_char_wall_down = false;
  };
  if(event.code == "KeyD") {
    this.character.command_move_right = true;
    this.collision_detector.skip_char_wall_right = false;
  };
};

Game.prototype.InterpretKeyUpInput = function(event){
  if(event.code == "KeyW") {
    this.character.command_move_up = false;
    this.collision_detector.skip_char_wall_up = true;
  };
  if(event.code == "KeyA") {
    this.character.command_move_left = false;
    this.collision_detector.skip_char_wall_left = true;
  };
  if(event.code == "KeyS") {
    this.character.command_move_down = false;
    this.collision_detector.skip_char_wall_down = true;
  };
  if(event.code == "KeyD") {
    this.character.command_move_right = false;
    this.collision_detector.skip_char_wall_right = true;
  };
};


function Level(){
  this.rooms = this.CreateRooms();
  
  this.current_room = false;
  
  this.SetStartingRoomAsCurrentRoom()
};

Level.prototype.CreateRooms = function(){
  var grid_size = 5;
  var max_rooms = 3;
  
  var rooms = new RoomGrid(grid_size);
  
  rooms.PlaceAndSetStartingRoom();
  
  for (let i = 1; i < max_rooms; i += 1){
    rooms.PlaceRandomRoomRandomlyAdjacentToExistingRooms();
  };
  
  return rooms;
};

Level.prototype.SetStartingRoomAsCurrentRoom = function(){
  var start_position = this.rooms.starting_room_position;
  
  this.SetCurrentRoom(start_position);
};

Level.prototype.SetCurrentRoom = function(position){
  this.current_room = this.rooms.grid[position.row][position.column];
};

Level.prototype.Draw = function(){
  this.current_room.Draw();
};

Level.prototype.GetObstacles = function(){
  var obstacles = this.current_room.GetObstacles();
  return obstacles;
};

Level.prototype.MoveEntitiesInCurrentRoom = function(){
  
};


function RoomGrid(size){
  this.size = size;
  this.starting_room_position = false;
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

RoomGrid.prototype.PlaceAndSetStartingRoom = function(){
  var middle = Math.floor(this.size / 2);
  var center = new MatrixPosition(middle, middle);
  
  var starting_room = this.CreateStartingRoom();
  
  this.PlaceRoomAt(starting_room, center);
  
  this.SetStartingRoomPosition(center);
};

RoomGrid.prototype.CreateStartingRoom = function(){
  var starting_room = new StartingRoom();
  
  return starting_room;
};

RoomGrid.prototype.SetStartingRoomPosition = function(position){
  this.starting_room_position = position;
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
  outer_walls_and_doors = this.CreateOuterWallsAndDoors();
   
  this.outer_walls = outer_walls_and_doors[0];
  this.doors = outer_walls_and_doors[1];
};

Room.prototype.CreateOuterWallsAndDoors = function(){
  var wall_length_horizontal = 280;
  var wall_length_vertical = 160;
  var door_length = 80;
  
  outer_walls = this.CreateOuterWalls(door_length, wall_length_horizontal, wall_length_vertical);

  doors = this.CreateDoors(door_length, wall_length_horizontal, wall_length_vertical);
  
  return [outer_walls, doors];
};

Room.prototype.CreateOuterWalls = function(door_length, length_horizontal, length_vertical){
  var thickness = 20;
  var colour = "blue";
  
  wall_points = this.CalculateOuterWallPoints(thickness, door_length, length_horizontal, length_vertical);
  
  /* Walls naming codex:
         TLH              TRH 
     T                          T
     L                          R
     V                          V
                                    
     B                          B
     L                          R
     V   BLH              BRH   V
  */
  top_left_horizontal_wall = new Wall(wall_points.get("top_left"), thickness, length_horizontal, "horizontal", colour);
  top_left_vertical_wall = new Wall(wall_points.get("top_left"), thickness, length_vertical, "vertical", colour);
  top_right_horizontal_wall = new Wall(wall_points.get("center_top"), thickness, length_horizontal, "horizontal", colour);
  top_right_vertical_wall = new Wall(wall_points.get("top_right"), thickness, length_vertical, "vertical", colour);
  
  bottom_left_vertical_wall = new Wall(wall_points.get("center_left"), thickness, length_vertical, "vertical", colour);
  bottom_right_vertical_wall = new Wall(wall_points.get("center_right"), thickness, length_vertical, "vertical", colour);
  
  bottom_left_horizontal_wall = new Wall(wall_points.get("bottom_left"), thickness, length_horizontal, "horizontal", colour);
  bottom_right_horizontal_wall = new Wall(wall_points.get("center_bottom"), thickness, length_horizontal, "horizontal", colour);
  
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

Room.prototype.CalculateOuterWallPoints = function(thickness, door_length, length_horizontal, length_vertical){
  var center_x = length_horizontal + door_length;
  var right_x = canvas.width - thickness;
  
  var center_y = length_vertical + door_length;
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
  
  var wall_points = new Map();
  wall_points.set("top_left", top_left);
  wall_points.set("center_top", center_top);
  wall_points.set("top_right", top_right);
  wall_points.set("center_left", center_left);
  wall_points.set("center_right", center_right);
  wall_points.set("bottom_left", bottom_left);
  wall_points.set("center_bottom", center_bottom);
  
  return wall_points;
};

Room.prototype.CreateDoors = function(door_length, length_horizontal, length_vertical){
  var thickness = 10;
  var door_colour = "purple";
  
  door_points = this.CalculateDoorPoints(thickness, length_horizontal, length_vertical);
  
  top_door = new Door(door_points.get("center_top"), thickness, door_length, "horizontal", door_colour);
  left_door = new Door(door_points.get("center_left"), thickness, door_length, "vertical", door_colour);
  bottom_door = new Door(door_points.get("center_bottom"), thickness, door_length, "horizontal", door_colour);
  right_door = new Door(door_points.get("center_right"), thickness, door_length, "vertical", door_colour);
  
  var doors = new Map();
  doors.set("top", top_door);
  doors.set("left", left_door);
  doors.set("bottom", bottom_door);
  doors.set("right", right_door);
  
  return doors;
};

Room.prototype.CalculateDoorPoints = function(thickness, length_horizontal, length_vertical){
  var center_x = length_horizontal;
  var right_x = canvas.width - thickness;
  
  var center_y = length_vertical;
  var bottom_y = canvas.height - thickness;
  
  var center_top = new Point(center_x, 0);
  var center_left = new Point(0, center_y);
  var center_bottom = new Point(center_x, bottom_y);
  var center_right = new Point(right_x, center_y);
  
  var door_points = new Map();
  door_points.set("center_top", center_top);
  door_points.set("center_left", center_left);
  door_points.set("center_right", center_right);
  door_points.set("center_bottom", center_bottom);
  
  return door_points;
};

Room.prototype.OpenDoorsToAdjacentRooms = function(){
  
};

Room.prototype.Draw = function(){
  this.outer_walls.forEach(function (wall) {
    wall.Draw();
  });
  
  this.doors.forEach(function (door, door_direction, doors_map) {
    door.Draw();
  });
};


function StartingRoom(){
  Room.call(this);
};

StartingRoom.prototype = Object.create(Room.prototype);
StartingRoom.prototype.constructor = StartingRoom;

StartingRoom.prototype.GetObstacles = function(){
  var obstacles = this.outer_walls;
  return obstacles;
};


function MiddleWallRoom(){
  Room.call(this);
  this.inner_walls = [];
};

MiddleWallRoom.prototype = Object.create(Room.prototype);
MiddleWallRoom.prototype.constructor = MiddleWallRoom;


function CollisionDetector(){
  this.skip_char_wall_up = false;
  this.skip_char_wall_left = false;
  this.skip_char_wall_down = false;
  this.skip_char_wall_right = false;
};

CollisionDetector.prototype.GetCollisionFlags = function(){
  return this.collision_flags;
};

CollisionDetector.prototype.CalculateCollisionFlags = function(character, obstacles){
  var walls = obstacles;
  var char_wall_collision_flags = this.CalculateCharacterWallCollisionFlags(character, walls);
  
  var collision_flags = new Map();
  collision_flags.set("char_wall_up", char_wall_collision_flags[0]);
  collision_flags.set("char_wall_left", char_wall_collision_flags[1]);
  collision_flags.set("char_wall_down", char_wall_collision_flags[2]);
  collision_flags.set("char_wall_right", char_wall_collision_flags[3]);
  
  return collision_flags;
};

CollisionDetector.prototype.CalculateCharacterWallCollisionFlags = function(character, walls){
  var all_wall_extremes = this.CalculateAllWallExtremes(walls);
  
  if (this.skip_char_wall_up){
    var up_collision = false;
  }
  else {
    var up_collision = this.IsCharacterAndWallsCollidedIfMoveUp(character, all_wall_extremes);
  };
  if (this.skip_char_wall_left){
    var left_collision = false;
  }
  else {
    var left_collision = this.IsCharacterAndWallsCollidedIfMoveLeft(character, all_wall_extremes);
  };
  if (this.skip_char_wall_down){
    var down_collision = false;
  }
  else {
    var down_collision = this.IsCharacterAndWallsCollidedIfMoveDown(character, all_wall_extremes);
  };
  if (this.skip_char_wall_right){
    var right_collision = false;
  }
  else {
    var right_collision = this.IsCharacterAndWallsCollidedIfMoveRight(character, all_wall_extremes);
  };
  
  return [up_collision, left_collision, down_collision, right_collision];
};

CollisionDetector.prototype.CalculateAllWallExtremes = function(walls){
  var all_wall_extremes = [];
  for (let i = 0; i < walls.length; i += 1){
    wall = walls[i];
    wall_extremes = wall.GetExtremesOnAxis();
    all_wall_extremes.push(wall_extremes);
  };
  
  return all_wall_extremes;
};

CollisionDetector.prototype.IsCharacterAndWallsCollidedIfMoveUp = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.y -= character.movement_speed;
  character_extremes.max.y -= character.movement_speed;
  
  if (this.IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsCharacterAndWallsCollidedIfMoveLeft = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.x -= character.movement_speed;
  character_extremes.max.x -= character.movement_speed;
  
  if (this.IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsCharacterAndWallsCollidedIfMoveDown = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.y += character.movement_speed;
  character_extremes.max.y += character.movement_speed;
  
  if (this.IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.IsCharacterAndWallsCollidedIfMoveRight = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.x += character.movement_speed;
  character_extremes.max.x += character.movement_speed;
  
  if (this.IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype.CalculateCharacterDoorCollisionFlags = function(character, doors){
  
};

CollisionDetector.prototype.CalculateCharacterEnemiesCollisionFlags = function(character, enemies){
  
};

CollisionDetector.prototype.CalculateEnemiesWallCollisionFlags = function(enemies, walls){
  
};

CollisionDetector.prototype.CalculateCharacterBulletsCollisionFlags = function(character, bullets){
  
};

CollisionDetector.prototype.CalculateEnemiesBulletsCollisionFlags = function(enemies, bullets){
  
};

CollisionDetector.prototype.IsEntityAndGroupCollided = function(entity_extremes, all_group_extremes){
  for (let i = 0; i < all_group_extremes.length; i += 1){
    member_extremes = all_group_extremes[i];
    if (this.IsExtremesOnAxisCollided(member_extremes, entity_extremes)){
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


function Dimensions(width, height){
  this.width = width;
  this.height = height
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


function ExtremeCoordinates(min_x, max_x, min_y, max_y){
  this.min = new Point(min_x, min_y);
  this.max = new Point(max_x, max_y);
};


function Arc(radius, start_angle, end_angle){
  //in radians(for example Math.PI/2 is 90 degrees)
  //0th degree is at the x axis and increases clockwise
  this.radius = radius;
  this.start_angle = start_angle;
  this.end_angle = end_angle;
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
  this.ResetColour();
};

Shape.prototype.ResetColour = function(){
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
  dimensions = OrientWallDimensions(thickness, length, orientation);
  
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

function OrientWallDimensions(thickness, length, orientation){
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


function Door(start_point, thickness, length, orientation, colour){
  Wall.call(this, start_point, thickness, length, orientation, colour);
  
  this.open = false;
};

Door.prototype = Object.create(Wall.prototype);
Door.prototype.constructor = Door;

Door.prototype.Close = function(){
  this.open = false;
  this.colour = "purple";
};

Door.prototype.Open = function(){
  this.open = true;
  this.colour = "yellow";
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
  
  this.prevent_move_up = false;
  this.prevent_move_left = false;
  this.prevent_move_down = false;
  this.prevent_move_right = false;
};

Character.prototype = Object.create(Circle.prototype);
Character.prototype.constructor = Character;

Character.prototype.Move = function(){
  if (this.command_move_up && !this.command_move_down && !this.prevent_move_up){
      this.MoveUp();
  };
  if (this.command_move_left && !this.command_move_right && !this.prevent_move_left){
      this.MoveLeft();
  };
  if (this.command_move_down && !this.command_move_up && !this.prevent_move_down){
      this.MoveDown();
  };
  if (this.command_move_right && !this.command_move_left && !this.prevent_move_right){
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

Character.prototype.SetCollisionFlags = function(collision_flags){
  this.prevent_move_up = collision_flags.get("char_wall_up");
  this.prevent_move_left = collision_flags.get("char_wall_left");
  this.prevent_move_down = collision_flags.get("char_wall_down");
  this.prevent_move_right = collision_flags.get("char_wall_right");
};


function HealthBar(start_point, health, colour){
  this.bar_start_point = start_point;
  this.health = health;
  
  this.colour = colour;
};


function HeartHealthBar(start_point, heart_size, heart_spacing, health, colour){
  HealthBar.call(this, start_point, health, colour)
  
  this.heart_size = heart_size;
  this.heart_spacing = heart_spacing;
};

HeartHealthBar.prototype = Object.create(HealthBar.prototype);
HeartHealthBar.prototype.constructor = HeartHealthBar;

HeartHealthBar.prototype.Draw = function(){
  var hearts = this.CalculateNumberOfHearts();
  full_hearts = hearts.get("full");
  half_hearts = hearts.get("half");
  
  this.DrawFullHearts(full_hearts);

  if (half_hearts === 1){
    this.DrawLeftHalfHeart(full_hearts);
  };
};

HeartHealthBar.prototype.CalculateNumberOfHearts = function(){
  var full_hearts = Math.floor(this.health / 2);
  var left_half_hearts = (this.health % 2);
  
  var hearts = new Map();
  hearts.set("full", full_hearts);
  hearts.set("half", left_half_hearts);
  
  return hearts;
};

HeartHealthBar.prototype.DrawFullHearts = function(full_hearts){
  y_heart_start_point = this.bar_start_point.y;
  
  for (let heart_counter = 0; heart_counter < full_hearts; heart_counter += 1){
    x_heart_offset = heart_counter * (this.heart_size + this.heart_spacing);
    x_heart_start_point = this.bar_start_point.x + x_heart_offset;
    
    heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
    
    full_heart = new FullHeart(heart_start_point, this.heart_size, this.colour);
    full_heart.Draw();
  };
};

HeartHealthBar.prototype.DrawLeftHalfHeart = function(full_hearts){
  x_heart_offset = full_hearts * (this.heart_size + this.heart_spacing);
  x_heart_start_point = this.bar_start_point.x + x_heart_offset;
  
  heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
  
  left_half_heart = new HalfHeart(heart_start_point, this.heart_size, "left", this.colour);
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
  point_array = this.CalculateHalfHeartPoints(start_point, size, heart_part);
  center = point_array[0];
  side_point = point_array[1];
  top_point = point_array[2];
  bottom_point = point_array[3];
  
  radius = size / 4;
  
  semicircle_arc = new Arc(radius, Math.PI, 2 * Math.PI);
  
  this.top_semicircle = new Slice(center, semicircle_arc, colour);
  this.triangle = new Triangle(side_point, top_point, bottom_point, colour);
};

HalfHeart.prototype.CalculateHalfHeartPoints = function(start_point, size, heart_part){
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
  
  return [center, side_point, top_middle_point, bottom_middle_point];
};

HalfHeart.prototype.Draw = function(){
  this.top_semicircle.Draw();
  this.triangle.Draw();
};


function ResetCanvas(){
  context.clearRect(0, 0, canvas.width, canvas.height);
};


function KeyDownHandler(event) {
  game.InterpretKeyDownInput(event);
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
};

function KeyUpHandler(event) {
  game.InterpretKeyUpInput(event);
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
};

document.addEventListener("keydown", KeyDownHandler);
document.addEventListener("keyup", KeyUpHandler);

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var game = InitializeGame();

DrawGame();