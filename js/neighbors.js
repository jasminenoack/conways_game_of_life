window.getNeighbors = function getNeighbors (cellIndex) {
    var neighbors = [];
    if (cellIndex >= width) {
        if (cellIndex % width !== 0) {
            neighbors.push(cellIndex - width - 1)
        }
        neighbors.push(cellIndex - width)
        if ((cellIndex + 1) % width !== 0) {
            neighbors.push(cellIndex - width + 1)
        }
    }
    if (cellIndex % width !== 0) {
        neighbors.push(cellIndex - 1)
    }
    if ((cellIndex + 1) % width !== 0) {
        neighbors.push(cellIndex + 1)
    }
    if (cellIndex < (height * width) - width) {
        if (cellIndex % width !== 0) {
            neighbors.push(cellIndex + width - 1)
        }
        neighbors.push(cellIndex + width)
        if ((cellIndex + 1) % width !== 0) {
            neighbors.push(cellIndex + width + 1)
        }
    }
    return neighbors
}

window.enoughAlive = function enoughAlive (cellIndex) {
    var neighbors = getNeighbors(cellIndex);
    var totalAlive = 0;
    for(var i = 0; i < neighbors.length; i++) {
        if (board[neighbors[i]] === "alive") {
            totalAlive++
        }
    }
    return totalAlive === 2 || totalAlive === 3
};

window.takeStep = function () {
    var cellsToMarkAlive = [];
    var cellsToMarkDying = [];
    var cellsToKill = [];
    for(var i = 0; i < board.length; i++) {
        var cellValue = board[i];
        var cellEnoughNeighbors = enoughAlive(i);
        if (cellEnoughNeighbors) {
            cellsToMarkAlive.push(i)
        } else if (cellValue === "alive") {
            cellsToMarkDying.push(i)
            // board[i] = "dying"
        } else if (cellValue === "dying") {
            cellsToKill.push(i)
            // board[i] = "dead"
        }
    }
    cellsToMarkAlive.forEach(function (cellIndex) {board[cellIndex] = "alive"})
    cellsToMarkDying.forEach(function (cellIndex) {board[cellIndex] = "dying"})
    cellsToKill.forEach(function (cellIndex) {board[cellIndex] = "dead"})
}
