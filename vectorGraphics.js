var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");

var square = new Entity(canvas.width / 3, canvas.height / 2, 0, 1, 0, 0, [new Point(25, 25), new Point(25, -25), new Point(-25, -25), new Point(-25, 25)], false);

var diamond = new Entity(2 * canvas.width / 3, canvas.height / 2, 0, 1, 0, 0, [new Point(25, 0), new Point(0, 25), new Point(-25, 0), new Point(0, -25)]);

redraw();
setInterval(redraw, 32);

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    square.draw(ctx);
    diamond.draw(ctx);
}

function Entity(x, y, angle, scale, xShear, yShear, points, closeShape = true) {
    this.x = x;
    this.y = y;
    
    this.angle = angle;
    this.scale = scale;
    
    this.xShear = xShear;
    this.yShear = yShear;
    
    this.points     = points;
    this.closeShape = closeShape;
    
    this.draw = function() {
        var matrix = [[Math.cos(this.angle) * this.scale, (-Math.sin(this.angle) + this.xShear) * this.scale],
                 [(Math.sin(this.angle) + this.yShear) * this.scale, Math.cos(this.angle) * this.scale]];
    
        // calculate the onscreen position of all the points in the entity
        var points = [];
        for(pointIndex in this.points) {
            point = this.points[pointIndex];
            
            x = matrix[0][0] * point.x + matrix[0][1] * point.y;
            y = matrix[1][0] * point.x + matrix[1][1] * point.y;
            
            points.push(new Point(this.x + x, this.y - y));
        }
        
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "#FFFFFF";
        
        ctx.moveTo(points[0].x, points[0].y);
        
        for(var i = 1; i < points.length; i++) {
            point = points[i];
            ctx.lineTo(point.x, point.y);
        }
        
        if(this.closeShape) {
            ctx.lineTo(points[0].x, points[0].y);
        }
        
        ctx.stroke();
    };
    
    this.transitioners = {}
    this.transitionProperty = function(property, goal, step) {
        var entity = this;
        
        this.transitioners[property] = setInterval(function() {
            if(entity[property] < goal) {
                entity[property] += step;
                if(entity[property] > goal) {
                    entity[property] = goal;
                    clearInterval(entity.transitioners[property]);
                }
            } else if(entity[property] > goal) {
                entity[property] -= step;
                if(entity[property] < goal) {
                    entity[property] = goal;
                    clearInterval(entity.transitioners[property]);
                }
            } else {
                clearInterval(entity.transitioners[property]);
            }
        }, 32);
    };
    
    this.clearTransition = function(property) {
        clearInterval(this.transitioners[property]);
    };
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}