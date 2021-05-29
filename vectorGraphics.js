class RenderEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(renderable, x, y, angle, {
        scale = 1,
        color = "#FFFFFF",
        lineWidth = "1px"
    } = {}) {
        this.ctx.resetTransform();

        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;

        this.ctx.beginPath();
        this.ctx.moveTo(renderable.points[0].x * scale, renderable.points[0].y * scale);

        for(let index = 1; index < renderable.points.length; index++)
            this.ctx.lineTo(renderable.points[index].x * scale, renderable.points[index].y * scale);

        if(renderable.closeShape)
            this.ctx.closePath();

        this.ctx.stroke();

        this.ctx.resetTransform();
    }
}


class Renderable {
    constructor(points, closeShape = true) {
        this.points = points;
        this.closeShape = closeShape;
    }
}


class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}