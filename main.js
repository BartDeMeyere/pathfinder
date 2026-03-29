import { Pathfinder } from "./PathFinder/PathFinder.js"
let myCanvas = document.getElementById("myCanvas");
let pathfinder = new Pathfinder({ canvas: myCanvas })


if (innerWidth < 768) { pathfinder.buildGridFromViewport(31, 31) } else { pathfinder.buildGridFromViewport(41, 95) }

$("#myCanvas").on("mousemove", () => {

    pathfinder.createWall()
})

$("#dropbtn-maze").on("click", function (e) {
    e.stopPropagation();
    $("#dropdownmenu-maze").toggleClass("show");
    $("#dropdownmenu-grid").removeClass("show");
    $("#dropdownmenu-solver").removeClass("show");
});

$("#dropbtn-grid").on("click", function (e) {
    e.stopPropagation();
    $("#dropdownmenu-grid").toggleClass("show");
    $("#dropdownmenu-maze").removeClass("show");
    $("#dropdownmenu-solver").removeClass("show");
});

$("#dropbtn-solver").on("click", function (e) {
    e.stopPropagation();
    $("#dropdownmenu-solver").toggleClass("show");
    $("#dropdownmenu-grid").removeClass("show");
    $("#dropdownmenu-maze").removeClass("show");
});

$("#dropdownmenu-maze a").on("click", function () {

    let value = $(this).text()
    $("#dropdownmenu-maze").removeClass("show");

    switch (value) {
        case "Depth first search":
            pathfinder.createMaze("dfs");
            break;
        case "Recursive division":
            pathfinder.createMaze("division");
            break;
    }
});

$("#dropdownmenu-grid a").on("click", function () {

    let value = $(this).text()
    $("#dropdownmenu-grid").removeClass("show");

    switch (value) {
        case "Reset grid":
            pathfinder.reset();
            break;
        case "Clear walls":
            pathfinder.clearWalls();
            break;
        case "Create random walls":
            pathfinder.reset();
            pathfinder.createRandomWalls();
            break;
    }
});

$("#dropdownmenu-solver a").on("click", function () {

    let value = $(this).text()
    $("#dropdownmenu-solver").removeClass("show");

    switch (value) {
        case "A*":
            pathfinder.reset()
            let lastRow = pathfinder.getRowCount() - 2
            let lastCol = pathfinder.getColCount() - 2
            pathfinder.findPath(1, 1, lastRow, lastCol)
            break;

    }
});

$(document).on("click", function () {
    $(".dropdown-content").removeClass("show");
});