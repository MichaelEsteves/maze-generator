function Cell(r, c, i) {
    this.row = r;
    this.col = c;
    this.index = i;
    this.pos = {
        top: {
            left: {
                x: floor(this.col * grid),
                y: floor(this.row * grid),
            },
            right: {
                x: floor(this.col * grid) + grid,
                y: floor(this.row * grid),
            },
        },
        bottom: {
            left: {
                x: floor(this.col * grid),
                y: floor(this.row * grid) + grid,
            },
            right: {
                x: floor(this.col * grid) + grid,
                y: floor(this.row * grid) + grid,
            },
        }
    };
    this.visited = false;
    this.current = false;
    this.backtracked = false;
    this.complete = false;
    this.walls = {
        top: true,
        bottom: true,
        left: true,
        right: true,
    };

    this.show = function () {
        //check if this is the current cell
        this.current = false;

        if (current && current.row == this.row && current.col == this.col) {

            if (!this.visited) {
                this.visited = true;
            }

            this.current = true;

        }

        noStroke();

        //fill colour
        if (this.complete) {
            fill(255);
        } else if (this.current) {
            fill(255, 100, 255);
        } else if (this.backtracked) {
            fill(100, 200, 155);
        } else if (this.visited) {
            fill(155, 100, 155);
        } else {
            fill(200);
        }


        rect(
            this.pos.top.left.x,
            this.pos.top.left.y,
            grid, grid
        );


        stroke(0);
        strokeWeight(1);
        if (this.walls.top) { //top wall
            line(
                this.pos.top.left.x,
                this.pos.top.left.y,
                this.pos.top.right.x,
                this.pos.top.right.y
            );
        }
        if (this.walls.bottom) { //bottom wall
            line(
                this.pos.bottom.left.x,
                this.pos.bottom.left.y,
                this.pos.bottom.right.x,
                this.pos.bottom.right.y
            );
        }
        if (this.walls.left) { //left wall
            line(
                this.pos.top.left.x,
                this.pos.top.left.y,
                this.pos.bottom.left.x,
                this.pos.bottom.left.y
            );
        }
        if (this.walls.right) { //right wall
            line(
                this.pos.top.right.x,
                this.pos.top.right.y,
                this.pos.bottom.right.x,
                this.pos.bottom.right.y
            );
        }

    }

    this.randomNeighbour = function () {
        var neighbours = [];
        var currentWall = [];
        var newWall = [];

        var topIndex = this.index - cols;
        var bottomIndex = this.index + cols;
        var leftIndex = this.index - 1;
        var rightIndex = this.index + 1;

        //top neighbor
        if (topIndex >= 0 && !cells[topIndex].visited) {
            neighbours.push(topIndex);
            currentWall[topIndex] = "top";
            newWall[topIndex] = "bottom";
        }

        //bottom neighbor
        if (bottomIndex < cells.length && !cells[bottomIndex].visited) {
            neighbours.push(bottomIndex);
            currentWall[bottomIndex] = "bottom";
            newWall[bottomIndex] = "top";
        }

        //left neighbor
        if (leftIndex >= 0 && cells[leftIndex].pos.top.left.x < this.pos.top.left.x && !cells[leftIndex].visited) {
            neighbours.push(leftIndex);
            currentWall[leftIndex] = "left";
            newWall[leftIndex] = "right";
        }

        //right neighbor
        if (rightIndex < cells.length && cells[rightIndex].pos.top.left.x > this.pos.top.left.x && !cells[rightIndex].visited) {
            neighbours.push(rightIndex);
            currentWall[rightIndex] = "right";
            newWall[rightIndex] = "left";
        }


        var newIndex = (neighbours.length > 0) ? random(neighbours) : false;

        //remove the walls
        if (newIndex) {
            //remove current wall
            this.walls[currentWall[newIndex]] = false;

            //remove new wall
            cells[newIndex].walls[newWall[newIndex]] = false;
        }

        return newIndex;
    }
}
