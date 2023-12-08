import { day8, getIndexCircular, lcm } from "./@lib";

type nodeMap = {[id: string] : [string, string]}
function parseMap(data: string): [string[], nodeMap] {
    let instructions = data.split("\n\n")[0].split("")
    let outDict: nodeMap = {}
    for (let line of data.split("\n\n")[1].split("\n")) {
        let connected = line.split(" = ")[1].split(", ")
        outDict[line.split(" = ")[0]] = [connected[0].replace("(", ""), connected[1].replace(")", "")]
    }
    return [instructions, outDict]
}

function getStepsNeededToReach(instructions: string[], map: nodeMap, startingNode="AAA", endingNode="ZZZ"): number {
    let currentNode = startingNode
    let currentStep = 0
    while (currentNode != endingNode) {
        currentNode = map[currentNode][getIndexCircular(instructions, currentStep) == "R" ? 1 : 0]
        currentStep++
    }
    return currentStep
}

function getStepsNeededForGhosts(instructions: string[], map: nodeMap): number {
    let currentNodes = Object.keys(map).filter(x => x.split("")[2] == "A")
    let distanceMap: {[id: string] : number} = {}
    while (currentNodes.length != 0) {
        let currentStep = 0
        let startingNode: string = currentNodes.pop()!
        let currentNode: string = startingNode
        while (currentNode.split("")[2] != "Z") {
            currentNode = map[currentNode][getIndexCircular(instructions, currentStep) == "R" ? 1 : 0]
            currentStep += 1
        }
        distanceMap[startingNode] = currentStep
    }
    let distances = Object.values(distanceMap)
    return lcm(distances)
}

console.log(getStepsNeededForGhosts(...parseMap(day8)))