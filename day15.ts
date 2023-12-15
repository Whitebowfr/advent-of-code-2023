import { day15, sum } from "./@lib";

function getHASH(sequence: string): number {
    let currentValue = 0
    sequence.split("").forEach((_, index) => {
        currentValue += sequence.charCodeAt(index)
        currentValue *= 17
        currentValue = currentValue % 256
    })
    return currentValue
}

function parseHASH(initSequence: string): number {
    let totalValue = 0
    initSequence.split(",").forEach((sequence) => {
        totalValue += getHASH(sequence)
    })
    return totalValue
}

type Box = Map<string, number>
function initiateHASHMAP(initSequence: string) {
    let instructions = initSequence.split(",")
    let boxes: Box[] = []
    for (let i = 0; i < 256; i++) boxes.push(new Map<string, number>())
    instructions.forEach(instruction => {
        if (instruction.indexOf("=") != -1) {
            let label = instruction.split("=")[0]
            let focalLength: number = parseInt(instruction.split("=")[1])
            let boxNumber = parseHASH(label)
            boxes[boxNumber].set(label, focalLength)
        } else {
            let label = instruction.split("-")[0]
            let boxNumber = parseHASH(label)
            if (boxes[boxNumber].has(label)) {
                boxes[boxNumber].delete(label)
            }
        }
    })
    console.log(sum(boxes.map((x, index) => calculateLensFocusPower(x, index))))
}

function calculateLensFocusPower(curBox: Box, boxNumber: number) {
    return [...curBox].reduce((totalFocusingPower, [_, focalLength], slot) => totalFocusingPower + (boxNumber + 1) * focalLength * (slot + 1), 0)
}

console.log(initiateHASHMAP(day15))