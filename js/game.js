"use strict"
var width = 3;
var height = 3;
var board = new Array(height * width);

// 0 1 2
// 3 4 5
// 6 7 8

function getNeighbors (cellIndex) {
    var neighbors = [];
    if (cellIndex >= width) {
        neighbors.push(cellIndex - width - 1)
        neighbors.push(cellIndex - width)
        neighbors.push(cellIndex - width + 1)
    }
    neighbors.push(cellIndex - 1)
    neighbors.push(cellIndex)
    neighbors.push(cellIndex + 1)
    if (cellIndex < (height * width) - width) {
        neighbors.push(cellIndex + width - 1)
        neighbors.push(cellIndex + width)
        neighbors.push(cellIndex + width + 1)
    }
    return neighbors
}

window.getNeighbors = getNeighbors

$( document ).ready(function() {
    var $content = $(".content");
    $content.mouseover("li", function (event) {
        var $li = $(event.target);
        $li.addClass("alive");
        board[$li.index()] = "alive";
    });
    for(var i = 0; i < board.length; i++) {
        $content.append("<li></li>")
    }

    setInterval(function () {
        console.log("interval")
    }, 1000)
});


// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
