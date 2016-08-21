"use strict"
window.width = parseInt(window.innerWidth * 0.7 / 10);
window.height = parseInt(window.innerHeight * 0.7 / 10);
window.board = new Array(height * width);

$( document ).ready(function() {
    $(".content").width((10 * width) + "px")
    function render () {
        takeStep();
        var $lis = $("li")
        for(var i = 0; i < board.length; i++) {
            var $li = $($lis[i]).removeClass();
            var cellValue = board[i];
            if (cellValue) {
                $li.addClass(cellValue);
            }
        }
    }

    var $content = $(".content");
    $content.mouseover("li", function (event) {
        var $li = $(event.target);
        $li.addClass("alive");
        board[$li.index()] = "alive";
    });
    for(var i = 0; i < board.length; i++) {
        $content.append("<li></li>")
    }

    setInterval(render, 200)
});
