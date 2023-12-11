import { coords, day11, getManhattanDistance } from "./@lib";

function parseInput(data: string) {
    return data.split("\n").map(x => x.split(""))
}

function getGalaxiesCoordinates(data: string[][]): coords[] {
    let outCoords: coords[] = []
    data.forEach((line, yIndex) => {
        line.forEach((char, xIndex) => {
            if (char == "#") outCoords.push([xIndex, yIndex])
        })
    })
    return outCoords
}

function expandGalaxies(data: string[][], galaxiesCoords: coords[], expandCoefficient=1): coords[] {
    let newCoords = [...galaxiesCoords]
    data.forEach((line, yIndex) => {
        if (line.every(x => x == ".")) {
            newCoords = newCoords.map((coords, idx) => [coords[0], galaxiesCoords[idx][1] > yIndex ? coords[1] + expandCoefficient : coords[1]])
        }
    })
    for (let xIndex = 0; xIndex < data[0].length; xIndex++) {
        if (data.every(line => line[xIndex] == ".")) {
            newCoords = newCoords.map((coords, idx) => [galaxiesCoords[idx][0] > xIndex ? coords[0] + expandCoefficient : coords[0], coords[1]])
        }
    }
    return newCoords
}

function getDistanceBetweenGalaxies(galaxiesCoords: coords[]): number {
    let totalDistance = 0
    galaxiesCoords.forEach((coords1, idx1) => {
        galaxiesCoords.forEach((coords2, idx2) => {
            totalDistance += getManhattanDistance(coords1, coords2)
        })
    })
    console.log(totalDistance / 2)
    return totalDistance
}

let inp = parseInput(day11)
getDistanceBetweenGalaxies(expandGalaxies(inp, getGalaxiesCoordinates(inp), 1000000 - 1))