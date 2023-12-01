"use strict";
exports.__esModule = true;
exports.getMarkerDifferences = exports.getDirectionFromString = exports.getOppositeDirectionMarker = exports.updateCoords = exports.DirectionMarker = void 0;
var DirectionMarker;
(function (DirectionMarker) {
    DirectionMarker[DirectionMarker["NORTH"] = 0] = "NORTH";
    DirectionMarker[DirectionMarker["EAST"] = 1] = "EAST";
    DirectionMarker[DirectionMarker["SOUTH"] = 2] = "SOUTH";
    DirectionMarker[DirectionMarker["WEST"] = 3] = "WEST";
})(DirectionMarker = exports.DirectionMarker || (exports.DirectionMarker = {}));
function updateCoords(coords, direction) {
    switch (direction) {
        case DirectionMarker.NORTH:
            return [coords[0], coords[1] - 1];
        case DirectionMarker.EAST:
            return [coords[0] + 1, coords[1]];
        case DirectionMarker.SOUTH:
            return [coords[0], coords[1] + 1];
        case DirectionMarker.WEST:
            return [coords[0] - 1, coords[1]];
    }
}
exports.updateCoords = updateCoords;
function getOppositeDirectionMarker(dir) {
    switch (dir) {
        case DirectionMarker.NORTH:
            return DirectionMarker.SOUTH;
        case DirectionMarker.EAST:
            return DirectionMarker.WEST;
        case DirectionMarker.SOUTH:
            return DirectionMarker.NORTH;
        case DirectionMarker.WEST:
            return DirectionMarker.EAST;
    }
}
exports.getOppositeDirectionMarker = getOppositeDirectionMarker;
function getDirectionFromString(str) {
    switch (str) {
        case "U":
            return DirectionMarker.NORTH;
        case "D":
            return DirectionMarker.SOUTH;
        case "L":
            return DirectionMarker.WEST;
        case "R":
            return DirectionMarker.EAST;
    }
}
exports.getDirectionFromString = getDirectionFromString;
function getMarkerDifferences(pointA, pointB) {
    var full = [];
    if (pointA[1] < pointB[1]) {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.NORTH);
            pointA = updateCoords(pointA, DirectionMarker.NORTH);
        }
    }
    else {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.SOUTH);
            pointA = updateCoords(pointA, DirectionMarker.SOUTH);
        }
    }
    if (pointA[0] < pointB[0]) {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.EAST);
            pointA = updateCoords(pointA, DirectionMarker.EAST);
        }
    }
    else {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.WEST);
            pointA = updateCoords(pointA, DirectionMarker.WEST);
        }
    }
    return full;
}
exports.getMarkerDifferences = getMarkerDifferences;
