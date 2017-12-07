// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    // console.log(dt);
    let init = this.x;
    this.x += 180 * dt;
    if (this.x >= 580) {
        // this.x = 1;
        // console.log(this.render());
        this.x = -141;
    }
    // console.log(this.x);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
let Enemy1 = new Enemy();
Enemy1.x = -141;
Enemy1.y = 60;
let Enemy2 = new Enemy();
Enemy2.x = -20;
Enemy2.y = 145;
let Enemy3 = new Enemy();
Enemy3.x = -240;
Enemy3.y = 225;
let Enemy4 = new Enemy();
Enemy4.x = -440;
Enemy4.y = 145;
let Enemy5 = new Enemy();
Enemy5.x = -240;
Enemy5.y = 60;
var allEnemies = [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5];
// var allEnemies = [Enemy1];

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面



var Player = function() {
    this.sprite = 'images/char-boy.png';
    // this.instance(0, 0);

}
Player.prototype.update = function() {

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(e) {
    console.log(e);
    switch (e) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 101;
            break;
        case 'down':
            this.y += 101;
            break;
    }
}
let player = new Player();
player.x = 305;
player.y = 315;
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
