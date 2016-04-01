var playground = require('./playground.js');
var ARCADE = {};

ARCADE.breakout = {

    create: function () {

        this.app.ball = {

            x: 0,
            y: this.app.center.y,
            width: 8,
            height: 8,
            color: "green",
            speed: {
                x: 100,
                y: 120
            },

            draw: function() {
                app.layer
                    .fillStyle(this.color)
                    .fillCircle(this.x, this.y, this.height/2)
                    .restore();
            }
        };

        this.app.paddle = {

            x: this.app.center.x,
            y: 300,
            width: 40,
            height: 16,
            color: "#999",
            px: 0,//to store previous frame position for speed calc
            speed: 0,
            mod: {
                x: 0,
                y: 0
            },

            draw: function(){
                app.layer
                    .strokeStyle("#F00")
                    .strokeRect(this.x, this.y, this.width+this.mod.x, this.height-this.mod.y)
                    .restore();

            }
        };

        this.app.brick = {

        }

    },

    step: function(dt) {
        var ball = this.app.ball;
        var paddle = this.app.paddle;

        paddle.speed = (paddle.x - paddle.px) * dt * 500;
        ball.x += ball.speed.x * dt;
        ball.y += ball.speed.y * dt;

        if(ball.x > this.app.width || ball.x < 0)
            ball.speed.x = -ball.speed.x;

        if(ball.y > this.app.height || ball.y < 0)
            ball.speed.y = -ball.speed.y;

        if(ball.y > paddle.y){
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width){
                ball.speed.y = -ball.speed.y;
                ball.speed.x += paddle.speed;
            }
        }

        paddle.px = paddle.x;
        paddle.mod.x = Math.abs(paddle.speed * 0.15);  //juice paddle render on move
        paddle.mod.y = Math.abs(paddle.speed * 0.03);


    },

    render: function() {
        var ball = this.app.ball;
        var paddle = this.app.paddle;


        this.app.layer
            .clear("#222")
            //mouse data
            .font("8px Minecraftia-Regular")
            .fillStyle("#fff")
            .fillText(this.app.text, 8, 8)
            .restore();

        ball.draw();

        paddle.draw();
    },

    mousemove: function(data) {
        this.app.text = "mouse move " + data.x + " , " + data.y + " paddleSpeed: " + this.app.paddle.speed;
        this.app.paddle.x = data.x - (this.app.paddle.width + this.app.paddle.mod.x)/2;

        //this.paddle.y = data.y;
    },

    mousedown: function(data) {
        this.text = "mouse down " + data.button + " " + data.x + " , " + data.y;
    }


}

var app = playground({

    width:180,
    height:320,
    scale: 2,
    smoothing: false,
    container: gameContainer,

    ready: function() {

        this.setState(ARCADE.breakout);
    }

});

