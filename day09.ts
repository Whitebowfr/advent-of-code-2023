import { day9, getIndexCircular, parseStringAsInts, sum } from "./@lib";

function parseOASISData(data: string) {
    return data.split("\n").map(x => parseStringAsInts(x, " "))
}

function extrapolateValues(data: number[][], extrapolateForward = true) {
    let extrapolatedValues: number[] = []
    data.forEach(line => {
        let lineHistory: number[][] = [line]
        let latestLine = line
        while (!latestLine.every((x: number) => x == 0)) {
            let newLine: number[] = []
            for (let i = 0; i < latestLine.length - 1; i++) {
                newLine.push(latestLine[i + 1] - latestLine[i])
            }
            lineHistory.push(newLine)
            latestLine = newLine
        }

        lineHistory.pop() // Remove the first array of 0s
        
        let currentExtrapolatedValue = extrapolateForward ? getIndexCircular(lineHistory.pop()!, -1) : lineHistory.pop()![0]
        while (lineHistory.length != 0) {
            if (extrapolateForward) {
                currentExtrapolatedValue += getIndexCircular(lineHistory.pop()!, -1)
            } else {
                currentExtrapolatedValue = lineHistory.pop()![0] - currentExtrapolatedValue
            }
        }
        extrapolatedValues.push(currentExtrapolatedValue)
    })
    return sum(extrapolatedValues)
}