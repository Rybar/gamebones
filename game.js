var app = playground({
    width:320,
    height:180,
    scale: 2,
    smoothing: false,
    container: gameContainer,

    create: function () {
        this.ball = {
            x: 0,
            y: this.center.y,
            width: 8,
            height: 16,
            color: "#4e4",
            speed: {
                x: 100,
                y: 90
            }
        };

        this.paddle = {
            x: this.center.x,
            y: 140,
            width: 40,
            height: 10,
            color: "#999"
        }
    },

    step: function(dt) {
        var ball = this.ball;
        var paddle = this.paddle;
        ball.x += ball.speed.x * dt;
        ball.y += ball.speed.y * dt;
        if(ball.x > this.width || ball.x < 0)
            ball.speed.x = -ball.speed.x;
        if(ball.y > this.height || ball.y < 0)
            ball.speed.y = -ball.speed.y;
        if(ball.y > paddle.y){
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width)
            ball.speed.y = -ball.speed.y;
        }

    },

    render: function() {
        var ball = this.ball;
        var paddle = this.paddle;

        this.layer
            .clear("#000")
            //mouse data
            .font("8px Minecraftia-Regular")
            .fillStyle("#fff")
            .fillText(this.text, 8, 8)
            .restore();

        //ball
        this.layer
            .fillStyle(ball.color)
            .fillCircle(ball.x, ball.y, ball.height/2)
            .restore();

        //paddle
        this.layer
            .fillStyle(paddle.color)
            .fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
            .restore();

    },

    mousemove: function(data) {
        this.text = "mouse move " + data.x + " , " + data.y;
        this.paddle.x = data.x - this.paddle.width/2;
        //this.paddle.y = data.y;
    },

    mousedown: function(data) {
        this.text = "mouse down " + data.button + " " + data.x + " , " + data.y;
    }



});
