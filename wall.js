function Wall(x, y, d) {
    this.pos = createVector(x, y);
    this.direction = d;
    this.closed = true;

    this.show = function () {
        if (this.closed) {
            var endX = (this.direction == "vertical") ? this.pos.x : this.pos.x + gridSize;
            var endY = (this.direction == "vertical") ? this.pos.y + gridSize : this.pos.y;

            line(this.pos.x - 1, this.pos.y - 1, endX - 1, endY - 1);
        }
    }
}
