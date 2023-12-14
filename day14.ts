import { DirectionMarker, coords, day14, sum } from "./@lib";

function makeRoundedRockFallAndCalculateWeight(data: string[][]) {
    let weight = 0
    for (let row = 0; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] == "O") {
                data[row][column] = "."
                let currentRow = row
                while (currentRow > 0 && data[currentRow-1][column] != "#" && data[currentRow-1][column] != "O") {
                    currentRow -= 1
                }
                data[currentRow][column] = "O"
                weight += data.length - currentRow
            }
        }
    }
    return weight
}

function makeRoundedRockFall(data: string[][]) {
    for (let row = 0; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] == "O") {
                data[row][column] = "."
                let currentRow = row
                while (currentRow > 0 && data[currentRow-1][column] != "#" && data[currentRow-1][column] != "O") {
                    currentRow -= 1
                }
                data[currentRow][column] = "O"
            }
        }
    }
    return data
}

function getRockWeight(data: string[][]) {
    let weight = 0
    for (let row = 0; row < data.length; row++) {
        for (let column = 0; column < data[0].length; column++) {
            if (data[row][column] == "O") {
                weight += data.length - row
            }
        }
    }
    return weight
}

function makeRoundedRockFallPartTwo(data: string[][]) {
    let positions: string[] = []
    let currentPos: string[][] = data
    let currentPosString = joinGrid(currentPos)
    let cycle = [DirectionMarker.NORTH, DirectionMarker.WEST, DirectionMarker.SOUTH, DirectionMarker.EAST]
    let step = 0;
    while (positions.indexOf(currentPosString) == -1) {
        positions.push(currentPosString)
        for (let pos of cycle) {
            currentPos = makeRoundedRockFall(currentPos)
            currentPos = rotateArray(currentPos)
        }
        currentPosString = joinGrid(currentPos)

        step++
    }

    return getRockWeight(positions[((1000000000 - positions.indexOf(currentPosString)) % (step - 1)) - 1].split("\n").map(x => x.split("")))
}

function rotateArray(arr: string[][]): string[][] {
    let transposedArray = arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
    return transposedArray.map(x => x.reverse())
}

function joinGrid(data: string[][]): string {
    return data.map(x => x.join("")).join("\n")
}

console.log(makeRoundedRockFallPartTwo(day14.split("\n").map(x => x.split(""))))

// 100138
// 96380 too high
// 96078 too high
// 96061 96063 96068 96077
/*type section = [number, number] // Starts at, ends at
function makeRoundedRocksFallOptimized(rounded: coords[], columnSections: section[][], lineSection: section[][], direction: DirectionMarker) {
    rounded = rounded.sort((a, b) => {
        switch(direction) {
            case DirectionMarker.NORTH:
                return a[1] - b[1]
            case DirectionMarker.SOUTH:
                return b[1] - a[1]
            case DirectionMarker.EAST:
                return b[0] - a[0]
            default: 
                return a[0] - b[0]
        }
    })
    let isColumn = direction == DirectionMarker.NORTH || direction == DirectionMarker.SOUTH
    rounded = rounded.map(rock => {
        if (isColumn) {
            for (let index = 0; index < columnSections[rock[0]].length; index++) {
                let section = columnSections[rock[0]][index]
                if (section[0] <= rock[1] && section[1] >= rock[1]) {
                    if (direction == DirectionMarker.NORTH) {
                        columnSections[rock[0]][index][0] += 1
                        return [rock[0], columnSections[rock[0]][index][0]-1]
                    }
                    columnSections[rock[0]][index][1] -= 1
                    return [rock[0], columnSections[rock[0]][index][1]+1]
                }
            }
        } else {
            for (let index = 0; index < lineSection[rock[1]].length; index++) {
                let section = lineSection[rock[1]][index]
                if (section[0] <= rock[0] && section[1] >= rock[0]) {
                    if (direction == DirectionMarker.WEST) {
                        lineSection[rock[1]][index][0] += 1
                        return [lineSection[rock[1]][index][0]-1, rock[1]]
                    }
                    lineSection[rock[1]][index][1] -= 1
                    return [lineSection[rock[1]][index][1]+1, rock[1]]
                }
            }
        }
        return rock
    })
    return rounded
}

function getSectionsFromData(data: string): [section[][], section[][]] {
    let splitted = data.split("\n").map(x => x.split(""))
    let lineSection: section[][] = []
    splitted.forEach((line, yIndex) => {
        let lastChar = -1
        let curLine: section[] = []
        line.forEach((char, xIndex) => {
            if (char === "#") {
                if (lastChar != xIndex-1 && xIndex != 0) curLine.push([lastChar == -1 ? 0 : lastChar+1, xIndex-1])
                lastChar = xIndex
            }
        })
        if (lastChar == 0) curLine.push([lastChar, line.length-1])
        else if (lastChar+1 != line.length) curLine.push([lastChar+1, line.length-1])
        lineSection.push(curLine)
    })

    let transposedArray = splitted[0].map((_, colIndex) => splitted.map(row => row[colIndex]));
    let columnSection: section[][] = []
    transposedArray.forEach((line, yIndex) => {
        let lastChar = -1
        let curLine: section[] = []
        line.forEach((char, xIndex) => {
            if (char === "#") {
                if (lastChar != xIndex-1 && xIndex != 0) curLine.push([lastChar == -1 ? 0 : lastChar+1, xIndex-1])
                lastChar = xIndex
            }
        })
        if (lastChar == 0) curLine.push([lastChar, line.length-1])
        else if (lastChar+1 != line.length) curLine.push([lastChar+1, line.length-1])
        columnSection.push(curLine)
    })

    return [columnSection, lineSection]
}

function getRoundRocksCoords(data: string) {
    let splitted = data.split("\n").map(x => x.split(""))
    let out: coords[] = []
    splitted.forEach((line, yIndex) => {
        line.forEach((char, xIndex) => {
            if (char == "O") out.push([xIndex, yIndex])
        }) 
    })
    return out
}

function printRoundRocks(originalStr: string, newCoords: coords[]) {
    let str = originalStr.replaceAll("O", ".").split("\n").map(x => x.split(""))
    console.log(coord)
    newCoords.forEach(coord => str[coord[1]][coord[0]] = "O")
    console.log(str.map(x => x.join("")).join("\n"))
}
*/
