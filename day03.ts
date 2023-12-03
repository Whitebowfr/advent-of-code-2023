import { coords, day3, sum, updateCoords } from "./@lib";
import { Map2D } from "./@lib";

function getMotorParts(data: string) {
    let lines = data.split("\n");
    let map = new Map2D([lines.length, lines[0].split("").length], lines.map(x => x.split("")))
    let output = []

    for (let i = 0; i < lines.length; i++) {

        // Get all the indexes of the symbols
        let symbolIndexes: number[] = []
        lines[i].split("").forEach((char, index) => {
            if (char != "." && isNaN(parseInt(char))) symbolIndexes.push(index)
        })

        for (let index of symbolIndexes) {
            // Check all the neighbours if they are a valid number
            for (let dir = 0; dir < 8; dir++) {
                if (!isNaN(map.getElement(updateCoords([index, i], dir)))) {
                    let number = parseNumber(map, updateCoords([index, i], dir))
                    output.push(number)
                }
            }
            
        }
    }

    return sum(output)
}

function getGearRatios(data: string) {
    let lines = data.split("\n");
    let map = new Map2D([lines.length, lines[0].split("").length], lines.map(x => x.split("")))
    let output = []

    for (let i = 0; i < lines.length; i++) {
        let symbolIndexes: number[] = []
        lines[i].split("").forEach((char, index) => {
            if (char == "*") symbolIndexes.push(index)
        })
        for (let index of symbolIndexes) {
            let numberOfNumbersAdjacent = 0;
            let currentRatio = 1;
            for (let dir = 0; dir < 8; dir++) {
                if (!isNaN(map.getElement(updateCoords([index, i], dir)))) {
                    numberOfNumbersAdjacent += 1;
                    if (numberOfNumbersAdjacent > 2) break;
                    let number = parseNumber(map, updateCoords([index, i], dir))
                    currentRatio *= number
                }
            }
            if (numberOfNumbersAdjacent == 2) output.push(currentRatio)
            
        }
    }

    return sum(output)
}

function parseNumber(map: Map2D, coords: coords) {
    let currentCoords: [number, number] = [coords[0], coords[1]]
    let reachedEnd = false
    let number: string[] = []
    while (!reachedEnd) {
        let currentChar = map.getElement(currentCoords)
        if (isNaN(currentChar)) {
            reachedEnd = true
        } else {
            number = [currentChar, ...number]
            map.setElement(currentCoords, ".")
        }
        currentCoords = [currentCoords[0] - 1, currentCoords[1]]
    }
    reachedEnd = false
    currentCoords = [coords[0] + 1, coords[1]]
    while (!reachedEnd) {
        let currentChar = map.getElement(currentCoords)
        if (isNaN(currentChar)) {
            reachedEnd = true
        } else {
            number = [...number, currentChar]
            map.setElement(currentCoords, ".")
        }
        currentCoords = [currentCoords[0] + 1, currentCoords[1]]
    }
    return parseInt(number.join(""))
}