import { coords } from "."

export enum DirectionMarker {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

export enum DirectionalDirectionMarker {
    NORTHWEST,
    SOUTHWEST,
    SOUTHEAST,
    NORTHEAST
}

export function updateCoords(coords: [number, number], direction: DirectionMarker|DirectionalDirectionMarker): [number, number] {
    switch(direction) {
        case DirectionMarker.NORTH:
            return [coords[0], coords[1] - 1]
        case DirectionMarker.EAST:
            return [coords[0] + 1, coords[1]]
        case DirectionMarker.SOUTH:
            return [coords[0], coords[1] + 1]
        case DirectionMarker.WEST:
            return [coords[0] - 1, coords[1]]
    }
}

export function getOppositeDirectionMarker(dir: DirectionMarker) {
    switch(dir) {
        case DirectionMarker.NORTH:
            return DirectionMarker.SOUTH
        case DirectionMarker.EAST:
            return DirectionMarker.WEST
        case DirectionMarker.SOUTH:
            return DirectionMarker.NORTH
        case DirectionMarker.WEST:
            return DirectionMarker.EAST
    }
}

export function getDirectionFromString(str: string) {
    switch (str) {
        case "U":
            return DirectionMarker.NORTH
        case "D":
            return DirectionMarker.SOUTH
        case "L":
            return DirectionMarker.WEST
        case "R":
            return DirectionMarker.EAST
    }
}

export function getMarkerDifferences(pointA: coords, pointB: coords): DirectionMarker[] {
    let full: DirectionMarker[] = []
    if (pointA[1] < pointB[1]) {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.NORTH)
            pointA = updateCoords(pointA, DirectionMarker.NORTH)
        }
    } else {
        while (pointA[1] !== pointB[1]) {
            full.push(DirectionMarker.SOUTH)
            pointA = updateCoords(pointA, DirectionMarker.SOUTH)
        }
    }

    if (pointA[0] < pointB[0]) {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.EAST)
            pointA = updateCoords(pointA, DirectionMarker.EAST)
        }
    } else {
        while (pointA[0] !== pointB[0]) {
            full.push(DirectionMarker.WEST)
            pointA = updateCoords(pointA, DirectionMarker.WEST)
        }
    }
    return full
}