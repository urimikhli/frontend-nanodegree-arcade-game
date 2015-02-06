// Enemies our player must avoid
var Enemy = function(num) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.num = num;
    this.x = 0;
    //need to handle more then 3 enemy sprites
    if (num < 3) {
        this.row = num + 1;
    } else {
        this.row = num % 3 + 1;
    }
    this.y = this.row;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // col * 101, row * 83
    if (this.num > 3){
        this.x = this.x + allEnemies[this.row-1].x + 65;
    }
    this.x = this.movement(this.speed_factor(this.row),dt);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 65);

}
//enemy speed
Enemy.prototype.speed_factor = function (row){
    var speed = 0.03 - row / 100 ;
    return speed;
}
//enemy movement
Enemy.prototype.movement = function (speed_factor,dt){
    var move = 0;
    //normal movement
    speed_factor = speed_factor + dt;
    move =  this.x + speed_factor;

    //reappear at random interval
    if (this.x >= getRandomArbitrary(5.5, 12)) {
        move = 0;
    }
    return move;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our Player uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//handle keypress
Player.prototype.handleInput = function(allowedKeys) {

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 3;
var numEnemies = 4;
var allEnemies = [];
for (i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy(i));
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
