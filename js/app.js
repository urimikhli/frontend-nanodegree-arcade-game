// Enemies our player must avoid
var Enemy = function(num) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    this.num = num;
    this.x = 0;
    //need to handle more then 3 enemy sprites
    if (num < 3) {
        this.row = num + 1;
    } else {
        //modulus 3 will always result in a number from 0 to 2
        this.row = num % 3 + 1;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images8
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

    this.x = this.movement(this.speed_factor(this.row),dt);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 65);

}
//enemy speed
Enemy.prototype.speed_factor = function (){
    var speed = 0.03 - this.row / 100 ;
    return speed;
}
//enemy movement
Enemy.prototype.movement = function (speed_factor,dt){
    var new_location = 0;
    //normal movement
    speed_factor = speed_factor + dt;
    new_location =  this.x + speed_factor;

    //reappear at random interval
    if (this.x >= getRandomArbitrary(6, 12)) {
        new_location = 0;
    }

    new_location = this.checkEnemyCollision(new_location, this.row);
    return new_location;
}
Enemy.prototype.checkEnemyCollision = function (new_location,row) {
    var current_enemy = this;
    allEnemies.forEach(function(enemy) {
        //all OTHER enemies on same row and in first column
        if (new_location == 0) {
            if (enemy.row == row && this.num != enemy.num && enemy.x < enemy_spacing) {
                new_location = 7 //not visible
                return new_location;
            }
        }

    });

    return new_location;
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    this.x = 2;
    this.y = 5;
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

    //Check column bounds
    if (this.x > 4 ) {
        this.x = 4;
    } else if (this.x < 0) {
        this.x = 0;
    }
    //Check row bounds
    if (this.y > 5 ) {
        this.y = 5;
    } else if (this.y <= 0) {
        this.y = 5;
        this.x = 2;
    }

}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x* 101, this.y * 83);
}

//handle keypress
Player.prototype.handleInput = function(keyPressed) {
    //up,down,left,right
    if (keyPressed == 'right') {
        this.x = this.x + 1;
    } else if( keyPressed== 'left') {
        this.x = this.x - 1;
    } else if( keyPressed == 'up') {
        this.y = this.y - 1;
    } else if (keyPressed == 'down') {
        this.y = this.y + 1;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 5;
var enemy_spacing = 2; //range 2-5
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
