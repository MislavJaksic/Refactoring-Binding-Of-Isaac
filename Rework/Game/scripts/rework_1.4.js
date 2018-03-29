function InitializeGame(){
  var game = new Game();
  
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
  this.levels = this._CreateLevels();
  this.current_level_index = 0;
  
  this.character = this._CreateCharacter();
  
  this.collision_detector = this._CreateCollisionDetector();
};

Game.prototype._CreateLevels = function(){
  const number_of_levels = 2;

  var levels = [];
  for (let i = 0; i < number_of_levels; i += 1){
    level = new Level();
    levels.push(level);
  };
  
  return levels;
};

Game.prototype._CreateCharacter = function(){
  const character_starting_position = new Point(canvas.width / 2, canvas.height / 2);
  const character_size = 40;
  const character_radius = character_size / 2;
  const starting_character_movement_speed = 5;
  const character_colour = "orange";
  
  var character = new Character(character_starting_position, character_radius, starting_character_movement_speed, character_colour);
  
  return character
};

Game.prototype._CreateCollisionDetector = function(){
  var collision_detector = new CollisionDetector();
  
  return collision_detector;
};

Game.prototype.SetNextLevel = function(){
  this.current_level_index += 1;
};

Game.prototype.GetCurrentLevel = function(){
  var current_level = this.levels[this.current_level_index];
  
  return current_level;
};

Game.prototype.CalculateAndSetCollisions = function(){
  var collision_flags = this._GetCollisionFlags();
  
  this.character.SetCollisionFlags(collision_flags);
  
  var current_level = this.GetCurrentLevel();
  current_level.ChangeCurrentRoomDueToDoorCollision(collision_flags);
};

Game.prototype._GetCollisionFlags = function(){
  var entities = this._GetCollidingEntities();
  var collision_flags = this.collision_detector.CalculateCollisionFlags(entities);
  
  return collision_flags;
};

Game.prototype._GetCollidingEntities = function(){
  var character = this.character;
  
  var current_level = this.GetCurrentLevel();
  var obstacles = current_level.GetObstacles();
  var doors = current_level.GetDoors();
  
  var entities = new Map();
  entities.set("character", character);
  entities.set("obstacles", obstacles);
  entities.set("doors", doors);
  
  return entities;
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
  this.current_room = false;
  
  this.rooms = this._CreateRooms();
};

Level.prototype._CreateRooms = function(){
  const grid_size = 5;
  const max_rooms = 3;
  
  var rooms = new RoomGrid(grid_size, max_rooms);
  this.current_room = rooms.GetCurrentRoom();
  
  return rooms;
};

Level.prototype._SetCurrentRoom = function(position){
  this.rooms.SetCurrentRoomPosition(position);
  this.current_room = this.rooms.GetCurrentRoom();
};

Level.prototype.Draw = function(){
  this.current_room.Draw();
};

Level.prototype.GetObstacles = function(){
  var obstacles = this.current_room.GetObstacles();
  
  return obstacles;
};

Level.prototype.GetDoors = function(){
  var doors = this.current_room.GetDoors();
  
  return doors;
};

Level.prototype.MoveEntitiesInCurrentRoom = function(){
  
};

Level.prototype.ChangeCurrentRoomDueToDoorCollision = function(collision_flags){ //refactor!
  var position = this.rooms.GetCurrentRoomPosition();
  
  var adjacent_room_existence = this.rooms.IsCurrentRoomAdjacentToRooms();
  
  if (adjacent_room_existence.get("top_room") && collision_flags.get("char_door_top")){
    this._SetCurrentRoom(new MatrixPosition(position.row - 1, position.column));
  }
  else if (adjacent_room_existence.get("left_room") && collision_flags.get("char_door_left")){
    this._SetCurrentRoom(new MatrixPosition(position.row, position.column - 1));
  }
  else if (adjacent_room_existence.get("bottom_room") && collision_flags.get("char_door_bottom")){
    this._SetCurrentRoom(new MatrixPosition(position.row + 1, position.column));
  }
  else if (adjacent_room_existence.get("right_room") && collision_flags.get("char_door_right")){
    this._SetCurrentRoom(new MatrixPosition(position.row, position.column + 1));
  };
};


function RoomGrid(size, max_rooms){
  this.size = size;
  this.max_rooms = max_rooms;
  this.grid = this._CreateFalseValueSquareGrid();
  
  this.current_room_position = false;
  this.room_positions = [];
  this.adjacent_positions = [];
  this.room_pool = new RoomPool();
  
  this._PopulateGrid();
};

RoomGrid.prototype._CreateFalseValueSquareGrid = function(){
  var array = [];
  for (let i = 0; i < this.size; i += 1){
    array.push(false);
  };
  
  var array_of_arrays = [];
  for (let i = 0; i < this.size; i += 1){
    array_of_arrays.push(array.slice());
  };
  
  return array_of_arrays;
};

RoomGrid.prototype._PopulateGrid = function(){
  this._PlaceAndSetStartingRoom();
  
  for (let i = 1; i < this.max_rooms; i += 1){
    this._PlaceRandomRoomRandomlyAdjacentToExistingRooms();
  };
};

RoomGrid.prototype._PlaceAndSetStartingRoom = function(){
  const middle = Math.floor(this.size / 2);
  const center = new MatrixPosition(middle, middle);
  
  var starting_room = new StartingRoom();
  
  this.SetCurrentRoomPosition(center);
  this._PlaceRoomAt(starting_room, center);
};

RoomGrid.prototype._PlaceRandomRoomRandomlyAdjacentToExistingRooms = function(){
  var random_adjacent_position = this._GetAndRemoveRandomAdjacentPosition();
  var random_room = this._GetRoomFromPool();
  
  this._PlaceRoomAt(random_room, random_adjacent_position);
};

RoomGrid.prototype._GetAndRemoveRandomAdjacentPosition = function(){
  var random_number = GetRandomIntInclusive(0, this.adjacent_positions.length - 1);
  var position_array = this.adjacent_positions.splice(random_number, 1);
  
  var position = position_array[0];
  
  return position;
};

RoomGrid.prototype._GetRoomFromPool = function(){
  var room = this.room_pool.GetRandomRoomAndDeleteIt();
  
  return room;
};

RoomGrid.prototype._PlaceRoomAt = function(room, position){
  this.grid[position.row][position.column] = room;
  
  this._AddPositionToRoomAndAdjacentPositions(position);
};

RoomGrid.prototype._AddPositionToRoomAndAdjacentPositions = function(position){
  this._AddToRoomPositions(position);
  this._AddAdjacentPositions(position);
};

RoomGrid.prototype._AddToRoomPositions = function(position){
  this.room_positions.push(position);
};

RoomGrid.prototype._AddAdjacentPositions = function(position){
  var empty_adjacent_positions = this._CalculateEmptyAdjacentPositionsOf(position);
  
  for (let i = 0; i < empty_adjacent_positions.length; i = i + 1){
    empty_adjacent_position = empty_adjacent_positions[i];
    
    if (!this._IsPositionDuplicateInArray(empty_adjacent_position, this.adjacent_positions)){
      this.adjacent_positions.push(empty_adjacent_position);
    };
  };
};

RoomGrid.prototype._CalculateEmptyAdjacentPositionsOf = function(position){ //refactor!
  var adjacent_positions = [];
  
  if (this._IsInBounds(position.row - 1)){
    var up_position = new MatrixPosition(position.row - 1, position.column);
    if (!this._IsPositionDuplicateInArray(up_position, this.room_positions)){
      adjacent_positions.push(up_position);
    };
  };
  if (this._IsInBounds(position.column - 1)){
    var left_position = new MatrixPosition(position.row, position.column - 1);
    if (!this._IsPositionDuplicateInArray(left_position, this.room_positions)){
      adjacent_positions.push(left_position);
    };
  };
  if (this._IsInBounds(position.row + 1)){
    var down_position = new MatrixPosition(position.row + 1, position.column);
    if (!this._IsPositionDuplicateInArray(down_position, this.room_positions)){
      adjacent_positions.push(down_position);
    };
  };
  if (this._IsInBounds(position.column + 1)){
    var right_position = new MatrixPosition(position.row, position.column + 1);
    if (!this._IsPositionDuplicateInArray(right_position, this.room_positions)){
      adjacent_positions.push(right_position);
    };
  };
  return adjacent_positions;
};

RoomGrid.prototype._IsInBounds = function(value) {
  var lower_bound = 0;
  var upper_bound = this.size - 1;
  
  if (value >= lower_bound){
    if (upper_bound >= value){
      return true;
    };
  };
  return false;
};

RoomGrid.prototype._IsPositionDuplicateInArray = function(possible_duplicate_position, array){
  for (let i = 0; i < array.length; i += 1){
    position_in_array = array[i];
    
    if (position_in_array.IsSame(possible_duplicate_position)){
      return true;
    };
  };
  return false;
};

RoomGrid.prototype.IsCurrentRoomAdjacentToRooms = function(){ //refactor!
  var position = this.current_room_position;
  
  var adjacent_room_existence = new Map();
  adjacent_room_existence.set("top_room", false);
  adjacent_room_existence.set("left_room", false);
  adjacent_room_existence.set("bottom_room", false);
  adjacent_room_existence.set("right_room", false);
  
  var adjusted_minus_row = position.row - 1;
  var adjusted_minus_column = position.column - 1;
  var adjusted_plus_row = position.row + 1;
  var adjusted_plus_column = position.column + 1;
  if (adjusted_minus_row >= 0){
    if (this.grid[adjusted_minus_row][position.column] !== false){
      adjacent_room_existence.set("top_room", true);
    };
  };
  if (adjusted_minus_column >= 0){
    if (this.grid[position.row][adjusted_minus_column] !== false){
      adjacent_room_existence.set("left_room", true);
    };
  };
  if (this.size > adjusted_plus_row){
    if (this.grid[adjusted_plus_row][position.column] !== false){
      adjacent_room_existence.set("bottom_room", true);
    };
  };
  if (this.size > adjusted_plus_column){
    if (this.grid[position.row][adjusted_plus_column] !== false){
      adjacent_room_existence.set("right_room", true);
    };
  };
  
  return adjacent_room_existence;
};

RoomGrid.prototype.SetCurrentRoomPosition = function(position){
  this.current_room_position = position;
};

RoomGrid.prototype.GetCurrentRoom = function(){
  return this.grid[this.current_room_position.row][this.current_room_position.column];
};

RoomGrid.prototype.GetCurrentRoomPosition = function(){
  return this.current_room_position;
};


function RoomPool(){
  this.pool_of_rooms = this._CreateRooms();
};

RoomPool.prototype._CreateRooms = function(){
  var pool_of_rooms = [];
  pool_of_rooms.push(new MiddleWallRoom());
  pool_of_rooms.push(new SideWallRoom());
  
  return pool_of_rooms;
};

RoomPool.prototype.GetRandomRoomAndDeleteIt = function(){
  var index = GetRandomIntInclusive(0, this.pool_of_rooms.length - 1);
  var room = this.pool_of_rooms.splice(index, 1);
  room = room[0]
  
  return room;
};

function GetRandomIntInclusive(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Room(){
  outer_walls_and_doors = this._CreateOuterWallsAndDoors();
   
  this.outer_walls = outer_walls_and_doors[0];
  this.doors = outer_walls_and_doors[1];
};

Room.prototype._CreateOuterWallsAndDoors = function(){
  var wall_length_horizontal = 280;
  var wall_length_vertical = 160;
  var door_length = 80;
  
  outer_walls = this._CreateOuterWalls(door_length, wall_length_horizontal, wall_length_vertical);

  doors = this._CreateDoors(door_length, wall_length_horizontal, wall_length_vertical);
  
  return [outer_walls, doors];
};

Room.prototype._CreateOuterWalls = function(door_length, length_horizontal, length_vertical){
  var thickness = 20;
  var colour = "blue";
  
  wall_points = this._CalculateOuterWallPoints(thickness, door_length, length_horizontal, length_vertical);
  
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

Room.prototype._CalculateOuterWallPoints = function(thickness, door_length, length_horizontal, length_vertical){
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

Room.prototype._CreateDoors = function(door_length, length_horizontal, length_vertical){
  var thickness = 10;
  var door_colour = "purple";
  
  door_points = this._CalculateDoorPoints(thickness, length_horizontal, length_vertical);
  
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

Room.prototype._CalculateDoorPoints = function(thickness, length_horizontal, length_vertical){
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

Room.prototype.Draw = function(){
  this.outer_walls.forEach(function (wall) {
    wall.Draw();
  });
  
  this.doors.forEach(function (door, door_direction, doors_map) {
    door.Draw();
  });
};

Room.prototype.GetDoors = function(){
  var doors = this.doors;
  return doors;
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
  this.inner_walls = this._CreateInnerWalls();
};

MiddleWallRoom.prototype = Object.create(Room.prototype);
MiddleWallRoom.prototype.constructor = MiddleWallRoom;

MiddleWallRoom.prototype.GetObstacles = function(){
  var obstacles = this.outer_walls;
  obstacles = obstacles.concat(this.inner_walls);
  return obstacles;
};

MiddleWallRoom.prototype._CreateInnerWalls = function(){
  var thickness = 40;
  var length_horizontal = 80;
  var colour = "purple";
  
  var top_right = new Point(100, 100);
  
  var center_horizontal = new Wall(top_right, thickness, length_horizontal, "horizontal", colour);
  
  return [center_horizontal];
};

MiddleWallRoom.prototype.Draw = function(){
  Room.prototype.Draw.call(this);
  
  this.inner_walls.forEach(function (wall) {
    wall.Draw();
  });
};


function SideWallRoom(){
  Room.call(this);
  this.inner_walls = this._CreateInnerWalls();
};

SideWallRoom.prototype = Object.create(Room.prototype);
SideWallRoom.prototype.constructor = SideWallRoom;

SideWallRoom.prototype.GetObstacles = function(){
  var obstacles = this.outer_walls;
  obstacles = obstacles.concat(this.inner_walls);
  return obstacles;
};

SideWallRoom.prototype._CreateInnerWalls = function(){
  var thickness = 40;
  var length_horizontal = 80;
  var colour = "purple";
  
  var top_left = new Point(500, 100);
  
  var center_horizontal = new Wall(top_left, thickness, length_horizontal, "horizontal", colour);
  
  return [center_horizontal];
};

SideWallRoom.prototype.Draw = function(){
  Room.prototype.Draw.call(this);
  
  this.inner_walls.forEach(function (wall) {
    wall.Draw();
  });
};


function CollisionDetector(){
  this.skip_char_wall_up = false;
  this.skip_char_wall_left = false;
  this.skip_char_wall_down = false;
  this.skip_char_wall_right = false;
};

CollisionDetector.prototype.CalculateCollisionFlags = function(entities){
  var character = entities.get("character");
  var obstacles = entities.get("obstacles");
  var doors = entities.get("doors");
  
  var collision_flags = new Map();
  
  var char_wall_collision_flags = this._CalculateCharacterWallCollisionFlags(character, obstacles);
  collision_flags.set("char_wall_up", char_wall_collision_flags[0]);
  collision_flags.set("char_wall_left", char_wall_collision_flags[1]);
  collision_flags.set("char_wall_down", char_wall_collision_flags[2]);
  collision_flags.set("char_wall_right", char_wall_collision_flags[3]);
  
  var char_door_collision_flags = this._CalculateCharacterDoorCollisionFlags(character, doors);
  collision_flags.set("char_door_top", char_door_collision_flags[0]);
  collision_flags.set("char_door_left", char_door_collision_flags[1]);
  collision_flags.set("char_door_bottom", char_door_collision_flags[2]);
  collision_flags.set("char_door_right", char_door_collision_flags[3]);
  
  return collision_flags;
};

CollisionDetector.prototype._CalculateCharacterWallCollisionFlags = function(character, walls){
  var all_wall_extremes = this._CalculateAllWallExtremes(walls);
  
  if (this.skip_char_wall_up){
    var up_collision = false;
  }
  else {
    var up_collision = this._IsCharacterAndWallsCollidedIfMoveUp(character, all_wall_extremes);
  };
  if (this.skip_char_wall_left){
    var left_collision = false;
  }
  else {
    var left_collision = this._IsCharacterAndWallsCollidedIfMoveLeft(character, all_wall_extremes);
  };
  if (this.skip_char_wall_down){
    var down_collision = false;
  }
  else {
    var down_collision = this._IsCharacterAndWallsCollidedIfMoveDown(character, all_wall_extremes);
  };
  if (this.skip_char_wall_right){
    var right_collision = false;
  }
  else {
    var right_collision = this._IsCharacterAndWallsCollidedIfMoveRight(character, all_wall_extremes);
  };
  
  return [up_collision, left_collision, down_collision, right_collision];
};

CollisionDetector.prototype._CalculateAllWallExtremes = function(walls){
  var all_wall_extremes = [];
  for (let i = 0; i < walls.length; i += 1){
    wall = walls[i];
    wall_extremes = wall.GetExtremesOnAxis();
    all_wall_extremes.push(wall_extremes);
  };
  
  return all_wall_extremes;
};

CollisionDetector.prototype._IsCharacterAndWallsCollidedIfMoveUp = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.y -= character.movement_speed;
  character_extremes.max.y -= character.movement_speed;
  
  if (this._IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsCharacterAndWallsCollidedIfMoveLeft = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.x -= character.movement_speed;
  character_extremes.max.x -= character.movement_speed;
  
  if (this._IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsCharacterAndWallsCollidedIfMoveDown = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.y += character.movement_speed;
  character_extremes.max.y += character.movement_speed;
  
  if (this._IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsCharacterAndWallsCollidedIfMoveRight = function(character, all_wall_extremes){
  var character_extremes = character.GetExtremesOnAxis();
  
  character_extremes.min.x += character.movement_speed;
  character_extremes.max.x += character.movement_speed;
  
  if (this._IsEntityAndGroupCollided(character_extremes, all_wall_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._CalculateCharacterDoorCollisionFlags = function(character, doors){
  var character_extremes = character.GetExtremesOnAxis();
  var all_door_extremes = this._CalculateAllDoorExtremes(doors);
  
  var top_collision = this._IsEntityAndGroupCollided(character_extremes, all_door_extremes.splice(0, 1));
  var left_collision = this._IsEntityAndGroupCollided(character_extremes, all_door_extremes.splice(0, 1));
  var bottom_collision = this._IsEntityAndGroupCollided(character_extremes, all_door_extremes.splice(0, 1));
  var right_collision = this._IsEntityAndGroupCollided(character_extremes, all_door_extremes.splice(0, 1));
  
  return [top_collision, left_collision, bottom_collision, right_collision];
};

CollisionDetector.prototype._CalculateAllDoorExtremes = function(doors){
  var top_door = doors.get("top");
  var left_door = doors.get("left");
  var bottom_door = doors.get("bottom");
  var right_door = doors.get("right");
  
  var all_door_extremes = [];
  all_door_extremes.push(top_door.GetExtremesOnAxis());
  all_door_extremes.push(left_door.GetExtremesOnAxis());
  all_door_extremes.push(bottom_door.GetExtremesOnAxis());
  all_door_extremes.push(right_door.GetExtremesOnAxis());
  
  return all_door_extremes;
};

CollisionDetector.prototype._CalculateCharacterEnemiesCollisionFlags = function(character, enemies){
  
};

CollisionDetector.prototype._CalculateEnemiesWallCollisionFlags = function(enemies, walls){
  
};

CollisionDetector.prototype._CalculateCharacterBulletsCollisionFlags = function(character, bullets){
  
};

CollisionDetector.prototype._CalculateEnemiesBulletsCollisionFlags = function(enemies, bullets){
  
};

CollisionDetector.prototype._IsEntityAndGroupCollided = function(entity_extremes, all_group_extremes){
  for (let i = 0; i < all_group_extremes.length; i += 1){
    member_extremes = all_group_extremes[i];
    if (this._IsExtremesOnAxisCollided(member_extremes, entity_extremes)){
      return true;
    };
  };
  return false;
};

CollisionDetector.prototype._IsExtremesOnAxisCollided = function(first_extremes, second_extremes){
  if (this._IsAxisAlignedBoundingBoxCollided(first_extremes, second_extremes)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsAxisAlignedBoundingBoxCollided = function(first_extremes, second_extremes){
  /* Assumes that both rectangular objects are aligned with the axis; there is no rotation */
  
  if (this._IsCollidedOnX(first_extremes, second_extremes)){
    if (this._IsCollidedOnY(first_extremes, second_extremes)){
      return true;
    };
  };
  return false;
};

CollisionDetector.prototype._IsCollidedOnX = function(first_extremes, second_extremes){
  x1 = first_extremes.min.x;
  x2 = first_extremes.max.x;
  c1 = second_extremes.min.x;
  c2 = second_extremes.max.x;
  
  if (this._IsIntervalCollided(x1, x2, c1, c2)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsCollidedOnY = function(first_extremes, second_extremes){
  y1 = first_extremes.min.y;
  y2 = first_extremes.max.y;
  c1 = second_extremes.min.y;
  c2 = second_extremes.max.y;
  
  if (this._IsIntervalCollided(y1, y2, c1, c2)){
    return true;
  };
  return false;
};

CollisionDetector.prototype._IsIntervalCollided = function(x1, x2, c1, c2){
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
  var hearts = this._CalculateNumberOfHearts();
  full_hearts = hearts.get("full");
  half_hearts = hearts.get("half");
  
  this._DrawFullHearts(full_hearts);

  if (half_hearts === 1){
    this._DrawLeftHalfHeart(full_hearts);
  };
};

HeartHealthBar.prototype._CalculateNumberOfHearts = function(){
  var full_hearts = Math.floor(this.health / 2);
  var left_half_hearts = (this.health % 2);
  
  var hearts = new Map();
  hearts.set("full", full_hearts);
  hearts.set("half", left_half_hearts);
  
  return hearts;
};

HeartHealthBar.prototype._DrawFullHearts = function(full_hearts){
  y_heart_start_point = this.bar_start_point.y;
  
  for (let heart_counter = 0; heart_counter < full_hearts; heart_counter += 1){
    x_heart_offset = heart_counter * (this.heart_size + this.heart_spacing);
    x_heart_start_point = this.bar_start_point.x + x_heart_offset;
    
    heart_start_point = new Point(x_heart_start_point, y_heart_start_point);
    
    full_heart = new FullHeart(heart_start_point, this.heart_size, this.colour);
    full_heart.Draw();
  };
};

HeartHealthBar.prototype._DrawLeftHalfHeart = function(full_hearts){
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
  point_array = this._CalculateHalfHeartPoints(start_point, size, heart_part);
  center = point_array[0];
  side_point = point_array[1];
  top_point = point_array[2];
  bottom_point = point_array[3];
  
  radius = size / 4;
  
  semicircle_arc = new Arc(radius, Math.PI, 2 * Math.PI);
  
  this.top_semicircle = new Slice(center, semicircle_arc, colour);
  this.triangle = new Triangle(side_point, top_point, bottom_point, colour);
};

HalfHeart.prototype._CalculateHalfHeartPoints = function(start_point, size, heart_part){
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