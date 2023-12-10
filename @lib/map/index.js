"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map2D = void 0;
var vectors_1 = require("../vectors");
var Map2D = /** @class */ (function () {
    function Map2D(size, grid) {
        this.size = size;
        if (grid) {
            this.grid = grid;
        }
        else {
            var grid_1 = [];
            for (var index = 0; index < this.size[1]; index++) {
                var row = [];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    row.push(0);
                }
                grid_1.push(row);
            }
            this.grid = grid_1;
        }
    }
    Map2D.prototype.getElement = function (coords, coordsY) {
        if (typeof coords === "number") {
            if (coordsY) {
                return this.grid[coordsY][coords];
            }
            return;
        }
        if (this.areCoordsInMap(coords)) {
            return this.grid[coords[1]][coords[0]];
        }
        return;
    };
    Map2D.prototype.getCoordsByValue = function (value) {
        var coords = [-1, -1];
        this.grid.forEach(function (line, yIndex) {
            var xIndex = line.indexOf(value);
            if (xIndex != -1)
                coords = [xIndex, yIndex];
        });
        return coords;
    };
    Map2D.prototype.getNextElement = function (coords, direction) {
        switch (direction) {
            case vectors_1.DirectionMarker.NORTH:
                if (coords[1] - 1 >= 0) {
                    return this.getElement(coords[0], coords[1] - 1);
                }
                return;
            case vectors_1.DirectionMarker.WEST:
                if (coords[0] - 1 >= 0) {
                    return this.getElement(coords[0] - 1, coords[1]);
                }
                return;
            case vectors_1.DirectionMarker.SOUTH:
                if (coords[1] + 1 < this.size[1]) {
                    return this.getElement(coords[0], coords[1] + 1);
                }
                return;
            case vectors_1.DirectionMarker.EAST:
                if (coords[0] + 1 < this.size[0]) {
                    return this.getElement(coords[0] + 1, coords[1]);
                }
                return;
        }
    };
    Map2D.prototype.setElement = function (coords, value) {
        if (this.areCoordsInMap(coords)) {
            this.grid[coords[1]][coords[0]] = value;
        }
    };
    Map2D.prototype.areCoordsInMap = function (coords) {
        return coords[0] >= 0 && coords[1] >= 0 && coords[0] < this.size[0] && coords[1] < this.size[1];
    };
    Map2D.prototype.fillGrid = function (value) {
        if (typeof value === "object" && value.length === this.size[1] && value[0].length === this.size[0]) {
            for (var index = 0; index < this.size[1]; index++) {
                var element = this.grid[index];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value[index][index2];
                }
            }
        }
        else {
            for (var index = 0; index < this.size[1]; index++) {
                var element = this.grid[index];
                for (var index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value;
                }
            }
        }
    };
    Map2D.prototype.getNeighbours = function (coords) {
        return [this.getElement((0, vectors_1.updateCoords)(coords, vectors_1.DirectionMarker.NORTH)), this.getElement((0, vectors_1.updateCoords)(coords, vectors_1.DirectionMarker.EAST)), this.getElement((0, vectors_1.updateCoords)(coords, vectors_1.DirectionMarker.SOUTH)), this.getElement((0, vectors_1.updateCoords)(coords, vectors_1.DirectionMarker.WEST))];
    };
    Map2D.prototype.getGridAsString = function () {
        return this.grid.map(function (x) { return x.join(""); }).join("\n");
    };
    return Map2D;
}());
exports.Map2D = Map2D;
