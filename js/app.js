const TILE_WIDTH = 80,
    TILE_HEIGHT = 101;
var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    var enemy = Object.create(Enemy.prototype);
    Character.call(enemy, x, y, 'images/1.png');
    enemy.speed = speed;
    enemy.fat = 75;
    return enemy
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    let init = this.x;
    this.x += 20 * dt * this.speed;
    if (this.x >= 580) this.x = -141;
    if (this.y == player.y) {
        if (this.x + this.fat >= player.x && this.x - this.fat <= player.x) {
            console.log('eat');
            alert('你被吃了!');
            player.init();
            return;
        }
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
let allEnemies = new Array();

var getEnemies = function() {
    const _x = [-240, -20, -141, -240, 440];
    const _y = [235, 155, 75];
    for (let i = 0; i < 15; i++) {
        let _Enemy = new Enemy(_x[Math.floor(Math.random() * _x.length)], _y[Math.floor(Math.random() * _y.length)], Math.floor(Math.random() * 10 + 1));
        // console.log(_x[Math.floor(Math.random() * _x.length)] + ' ' + _y[Math.floor(Math.random() * _y.length)]);
        // _Enemy.x = _x[Math.floor(Math.random() * _x.length)];
        // _Enemy.y = _y[Math.floor(Math.random() * _y.length)];
        allEnemies.push(_Enemy);
    };
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var Player = function() {
    this.sprite = 'images/2.png';
}
Player.prototype.update = function() {

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.init = function() {
    this.x = 305;
    this.y = 315;
}
Player.prototype.handleInput = function(e) {
    switch (e) {
        case 'left':
            if (this.x - TILE_HEIGHT <= 0) return;
            this.x -= TILE_HEIGHT;
            break;
        case 'right':
            if (this.x + TILE_HEIGHT >= 450) return;
            this.x += TILE_HEIGHT;
            break;
        case 'up':
            if (this.y - TILE_WIDTH <= -20) return;
            this.y -= TILE_WIDTH;
            break;
        case 'down':
            if (this.y + TILE_WIDTH >= 450) return;
            this.y += TILE_WIDTH;
            break;
    }
    if (this.y <= -5) {
        alert('you win!');
        player.init();
    }
}
let player = new Player();
player.init();
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
