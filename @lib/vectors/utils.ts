import { coords } from ".";

export function getEuclidianDistance(pointA: coords, pointB: coords) {
    return Math.sqrt((pointB[0] - pointA[0])**2 + (pointB[1] - pointA[1])**2)
}

export function getManhattanDistance(pointA: coords, pointB: coords) {
    return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1])
}