var app = playground({
    width:320,
    height:180,
    scale: 2,
    smoothing: false,
    container: gameContainer,

    create: function () {
        this.box = {
            x: 0,
            y: this.center.y,
            width: 64,
            height: 64,
            color: "#e2643e",
            speed: 100
        };
    },

    step: function(dt) {
        this.box.x += this.box.speed * dt;
        if(this.box.x > this.width) this.box.x = -this.box.width;
    },

    render: function() {
        var box = this.box;

        this.layer
            .clear("#000")
            //mouse data
            .font("16px Arial")
            .fillStyle("#fff")
            .fillText(this.text, 16, 32)
            .restore();

            //box
        this.layer
            .fillStyle(box.color)
            .fillRect(box.x, box.y, box.width, box.height)
            .restore();

    },

    mousemove: function(data) {
        this.text = "mouse move " + data.x + " , " + data.y;
    },

    mousedown: function(data) {
        this.text = "mouse down " + data.button + " " + data.x + " , " + data.y;
    }



});
