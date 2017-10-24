var canvas = document.getElementById("canvas");
var ctx    = canvas.getContext("2d");

var entity = Entity(50, 50, 0, 1, 0, 0, [Point(25, 25), Point(25, -25), Point(-25, -25), Point(-25, 25)]);

redraw();
setInterval(redraw, 32);

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entity.draw(ctx);
}

function Entity(x, y, angle, scale, xShear, yShear, points) {
    entity = {};
    
    entity.x = x;
    entity.y = y;
    
    entity.angle  = angle;
    entity.scale  = scale;
    entity.xShear = xShear;
    entity.yShear = yShear;
    
    entity.points = points;
    entity.draw   = drawEntity;
    
    return entity;
}

function Point(x, y) {
    point = {};
    
    point.x = x;
    point.y = y;
    
    return point;
}

function transitionProperty(entity, property, goal, step) {
    stepper = setInterval(function() {
        if(entity[property] < goal) {
            entity[property] += step;
            if(entity[property] > goal) {
                entity[property] = goal;
                clearInterval(stepper);
            }
        } else if(entity[property] > goal) {
            entity[property] -= step;
            if(entity[property] < goal) {
                entity[property] = goal;
                clearInterval(stepper);
            }
        } else {
            clearInterval(stepper);
        }
    }, 32);
}


function drawEntity(ctx) {
    matrix = [[Math.cos(this.angle) * this.scale, (Math.sin(this.angle) + this.xShear) * this.scale],
             [(-Math.sin(this.angle) + this.yShear) * this.scale, Math.cos(this.angle) * this.scale]];
    
    points = [];
    for(pointIndex in this.points) {
        point = this.points[pointIndex];
        
        x = matrix[0][0] * point.x + matrix[0][1] * point.y;
        y = matrix[1][0] * point.x + matrix[1][1] * point.y;
        
        points.push(Point(this.x + x, this.y + y));
    }
    
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "#FFFFFF";
    
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    
    for(pointIndex in points) {
        point = points[pointIndex];
        ctx.lineTo(point.x, point.y);
    }
    
    ctx.stroke();
}