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
            }
        };

        this.app.paddle = {
            x: this.app.center.x,
            y: 140,
            width: 40,
            height: 16,
            color: "#999",
            px: 0,//to store previous frame position for speed calc
            speed: 0,
            mod: {
                x: 0,
                y: 0
            }
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

        //ball
        this.app.layer
            .fillStyle(ball.color)
            .fillCircle(ball.x, ball.y, ball.height/2)
            .restore();

        //paddle
        this.app.layer
            .fillStyle(paddle.color)
            .fillRect(paddle.x, paddle.y, paddle.width+paddle.mod.x, paddle.height-paddle.mod.y)
            .restore();

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

ARCADE.breakin = {

    create: function () {
        this.app.ballB = {
            x: 0,
            y: this.app.center.y,
            width: 8,
            height: 16,
            color: "#e44",
            speed: {
                x: 100,
                y: 90
            }
        };

        this.app.paddleB = {
            x: this.app.center.x,
            y: 140,
            width: 40,
            height: 10,
            color: "#4ee"
        }
    },

    step: function(dt) {
        var ball = this.app.ballB;
        var paddle = this.app.paddleB;
        ball.x += ball.speed.x * dt;
        ball.y += ball.speed.y * dt;
        if(ball.x > this.app.width || ball.x < 0)
            ball.speed.x = -ball.speed.x;
        if(ball.y > this.app.height || ball.y < 0)
            ball.speed.y = -ball.speed.y;
        if(ball.y > paddle.y){
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width)
            ball.speed.y = -ball.speed.y;
        }

    },

    render: function() {
        var ball = this.app.ballB;
        var paddle = this.app.paddleB;

        this.app.layer
            .clear("#000")
            //mouse data
            .font("8px Minecraftia-Regular")
            .fillStyle("#fff")
            .fillText(this.text, 8, 8)
            .restore();

        //ball
        this.app.layer
            .fillStyle(ball.color)
            .fillCircle(ball.x, ball.y, ball.height/2)
            .restore();

        //paddle
        this.app.layer
            .fillStyle(paddle.color)
            .fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
            .restore();

    },

    mousemove: function(data) {
        this.text = "mouse move " + data.x + " , " + data.y;
        this.app.paddleB.x = data.x - this.app.paddleB.width/2;
        //this.paddle.y = data.y;
    },

    mousedown: function(data) {
        this.text = "mouse down " + data.button + " " + data.x + " , " + data.y;
    }


}

var app = playground({

    width:320,
    height:180,
    scale: 2,
    smoothing: false,
    container: gameContainer,

    ready: function() {

        this.setState(ARCADE.breakout);
    },

    keydown: function (e){

        switch(e.key) {
            case "1": this.setState(ARCADE.breakout); break;
            case "2": this.setState(ARCADE.breakin); break;
        }
    }

});