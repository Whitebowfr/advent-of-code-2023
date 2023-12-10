import { DirectionMarker, Map2D, coords, day10, getIndexCircular, getOppositeDirectionMarker, updateCoords } from "./@lib";

function parseMap(data: string): Map2D {
    return new Map2D([data.split("\n")[0].split("").length, data.split("\n").length], data.split("\n").map(x => x.split("")))
}

function getDirectionsFromPipeCorner(map: Map2D, coords: coords): [DirectionMarker, DirectionMarker] {
    switch (map.getElement(coords)) {
        case "|":
            return [DirectionMarker.NORTH, DirectionMarker.SOUTH]
        case "-":
            return [DirectionMarker.EAST, DirectionMarker.WEST]
        case "F":
            return [DirectionMarker.SOUTH, DirectionMarker.EAST]
        case "J":
            return [DirectionMarker.NORTH, DirectionMarker.WEST]
        case "L":
            return [DirectionMarker.NORTH, DirectionMarker.EAST]
        case "7":
            return [DirectionMarker.SOUTH, DirectionMarker.WEST]
        case "S":
            let neighbours = map.getNeighbours(coords)
            let outArray: any[] = []
            if (neighbours[0] == "7" || neighbours[0] == "F" || neighbours[0] == "|") {
                outArray.push(DirectionMarker.NORTH)
            } if (neighbours[1] == "-" || neighbours[1] == "7" || neighbours[1] == "J") {
                outArray.push(DirectionMarker.EAST)
            } if (neighbours[2] == "|" || neighbours[2] == "L" || neighbours[2] == "J") {
                outArray.push(DirectionMarker.SOUTH)
            } if (neighbours[3] == "L" || neighbours[3] == "F" || neighbours[3] == "-") {
                outArray.push(DirectionMarker.WEST)
            }
            if (outArray.length > 2) throw new Error("Too many possibilities !")
            return outArray as [DirectionMarker, DirectionMarker]
    }
    throw new Error("Map element not found !")
}

function getStepsToFarthest(pipeMap: Map2D) {
    let coords = pipeMap.getCoordsByValue("S")
    let lastDirection = getDirectionsFromPipeCorner(pipeMap, coords)[0]
    let nextDirection = getDirectionsFromPipeCorner(pipeMap, coords)[0]
    let steps = 0

    do {
        coords = updateCoords(coords, nextDirection)
        lastDirection = nextDirection
        
        let tempDir = getDirectionsFromPipeCorner(pipeMap, coords)
        nextDirection = tempDir[0] == getOppositeDirectionMarker(lastDirection) ? tempDir[1] : tempDir[0]

        steps += 1
    } while (pipeMap.getElement(coords) != "S");
    
    return (steps + 1) / 2
}

function getNewInsideDirection(corner: string, oldInside: DirectionMarker): DirectionMarker {
    if (corner == "J" || corner == "F") {
        if (oldInside == DirectionMarker.NORTH || oldInside == DirectionMarker.WEST) return oldInside == DirectionMarker.NORTH ? DirectionMarker.WEST : DirectionMarker.NORTH
        return oldInside == DirectionMarker.SOUTH ? DirectionMarker.EAST : DirectionMarker.SOUTH
    } else {
        if (oldInside == DirectionMarker.NORTH || oldInside == DirectionMarker.EAST) return oldInside == DirectionMarker.NORTH ? DirectionMarker.EAST : DirectionMarker.NORTH
        return oldInside == DirectionMarker.SOUTH ? DirectionMarker.WEST : DirectionMarker.SOUTH
    } 
}

function getPointsInsideTheLoop(pipeMap: Map2D) {
    let coords = pipeMap.getCoordsByValue("S")
    let lastDirection = getDirectionsFromPipeCorner(pipeMap, coords)[0]
    let nextDirection = getDirectionsFromPipeCorner(pipeMap, coords)[0]

    // "Hashing" the coordinates so you can easily find if a point is included in the pipe afterwards
    let loopNodesHashed: string[] = []
    do {
        loopNodesHashed.push(coords.join("#"))
        coords = updateCoords(coords, nextDirection)
        lastDirection = nextDirection
        let tempDir = getDirectionsFromPipeCorner(pipeMap, coords)
        nextDirection = tempDir[0] == getOppositeDirectionMarker(lastDirection) ? tempDir[1] : tempDir[0]
    } while (pipeMap.getElement(coords) != "S");

    // A bit of black magic, this is the marker that dictates which side of the pipe is the inside. 
    // You need to tweak it depending on your input, just try all 4 directions until one of them returns something.
    let insideDirection = DirectionMarker.EAST

    // Using a set to eliminate duplicate nodes afterwards
    let insideNodes: Set<string> = new Set()

    loopNodesHashed.forEach(coordsHashed => {
        let nodeCoords = coordsHashed.split("#").map(x => parseInt(x)) as coords
        let el = pipeMap.getElement(nodeCoords)
        if (el != "S") {
            // If it's a corner, you need to check both inside directions.
            if (el != "|" && el != "-") {
                insideNodes = new Set([...insideNodes,...getPointsInDirBeforeIntersection(loopNodesHashed, nodeCoords, insideDirection)])
                insideDirection = getNewInsideDirection(el, insideDirection)
            }
            insideNodes = new Set([...insideNodes,...getPointsInDirBeforeIntersection(loopNodesHashed, nodeCoords, insideDirection)])
        }
    } )

    return insideNodes.size
}

// This function "walks" along a direction until it meets the other side of the pipe
function getPointsInDirBeforeIntersection(pipeNodesHashed: string[], currentCoords: coords, direction: DirectionMarker): Set<string> {
    let insideNodes: Set<string> = new Set()
    let runningCoords = currentCoords
    do {
        runningCoords = updateCoords(runningCoords, direction)
        if (pipeNodesHashed.indexOf(runningCoords.join("#")) == -1) {
            insideNodes.add(runningCoords.join("#"))
        }
    } while (pipeNodesHashed.indexOf(runningCoords.join("#")) == -1);
    return insideNodes
}