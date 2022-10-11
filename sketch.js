var cells = [],
    grid = 20,
    rows,
    cols,
    speed = 60,
    current,
    stack = [],
    speedSlider,
    gridInput,
    rowInput,
    colInput,
    resetButton,
    saveButton,
    mainCanvas;


function initControls() {
    var controls = [];

    controls.push(createElement("label", "Cell Size"));
    gridInput = createInput(20);
    controls.push(gridInput);
    controls.push(createElement("br"));

    controls.push(createElement("label", "Rows"));
    rowInput = createInput(10);
    controls.push(rowInput);
    controls.push(createElement("br"));

    controls.push(createElement("label", "Columns"));
    colInput = createInput(10);
    controls.push(colInput);
    controls.push(createElement("br"));

    controls.push(createElement("label", "Speed"));
    controls.push(speedSlider = createSlider(1, speed, speed));
    controls.push(createElement("br"));

    controls.push(createElement("label", "&nbsp;"));
    resetButton = createButton('Generate!');
    resetButton.mousePressed(initMaze);
    controls.push(resetButton);
    controls.push(createElement("br"));

    controls.push(createElement("label", "&nbsp;"));
    saveButton = createButton('Save Maze');
    saveButton.mousePressed(function () {
        save('maze.jpg');
    });
    controls.push(saveButton);

    var cdiv = createDiv("").id("controls");

    for (var i = 0; i < controls.length; i++) {
        cdiv.child(controls[i]);
    }
}

function initMaze() {
    //reset main variables
    cells = [];
    stack = [];
    grid = parseInt(gridInput.value());
    rows = parseInt(rowInput.value());
    cols = parseInt(colInput.value());

    mainCanvas = createCanvas((cols * grid) + 2, (rows * grid) + 2);

    var index = 0;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var cell = new Cell(r, c, index);
            cells.push(cell);
            index++;
        }
    }

    console.log(cells);
    current = cells[0];
    current.visited = true;
}


function setup() {
    initControls();
    mainCanvas = createCanvas(0, 0);
}

function draw() {
    background(0);
    frameRate(speedSlider.value());

    if (cells.length > 0) {
        if (current) {
            //select a new current 
            var neighbour = current.randomNeighbour();
            if (neighbour) {
                stack.push(current);
                current = cells[neighbour];
            } else {
                if (stack.length > 0) {
                    current.backtracked = true;
                    current = stack.pop();
                } else {
                    current = undefined;
                }
            }
        }

        for (var i = 0; i < cells.length; i++) {

            if (!current) {
                cells[i].complete = true;
            }

            cells[i].show();
        }
    }


}
