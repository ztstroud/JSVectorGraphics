var RenderEngine = {
    canvas: document.getElementById("canvas"),
    ctx   : this.canvas.getContext("2d")
};

RenderEngine.render = function(renderable, x, y, angle, scale=1, xShear=0, yShear=0, color="#FFFFFF") {
    var matrix = [[Math.cos(angle) * scale, (-Math.sin(angle) + xShear) * scale],
                 [(Math.sin(angle) + yShear) * scale, Math.cos(angle) * scale]];
    
    var points = [];
    for(var pointIndex in renderable.points) {
        var point = renderable.points[pointIndex];
        
        xOffset = matrix[0][0] * point.x + matrix[0][1] * point.y;
        yOffset = matrix[1][0] * point.x + matrix[1][1] * point.y;
        
        points.push(new Point(x + xOffset, y - yOffset));
    }
    
    this.ctx.beginPath();
    this.ctx.lineWidth = "1";
    this.ctx.strokeStyle = color;
    
    this.ctx.moveTo(points[0].x, points[0].y);
    for(var pointIndex = 1; pointIndex < points.length; pointIndex++)
        this.ctx.lineTo(points[pointIndex].x, points[pointIndex].y);
    
    if(renderable.closeShape)
        this.ctx.lineTo(points[0].x, points[0].y);
    
    this.ctx.stroke();
}

function Renderable(points, closeShape=true) {
    this.points     = points;
    this.closeShape = closeShape;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}