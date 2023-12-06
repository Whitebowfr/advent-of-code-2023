import { day5, isBetween } from "./@lib";
import { writeFile, writeFileSync } from "fs";

interface Rule {
    source: number,
    destination: number,
    spread: number
}

function parseSeeds(data: string): [number[], { [id: string] : Rule[]}] {
    let categories = data.split("\n\n")
    let seeds = categories[0].split(":")[1].split(" ").map(x => parseInt(x))
    seeds.shift()
    categories.shift()
    let parsedCategories: { [id: string] : any[]} = {}
    categories.forEach(x => {
        parsedCategories[x.split(":")[0]] = x.split(":\n")[1].split("\n").map(x => {return {
                source: parseInt(x.split(" ")[1]),
                destination: parseInt(x.split(" ")[0]),
                spread: parseInt(x.split(" ")[2])
            }
        })
    })
    return [seeds, parsedCategories]
}

function getLocation(seeds: number[], parsedCategories: { [id: string] : Rule[] }) {
    let locationValues: number[] = []
    for(let seed of seeds) {
        for (let [key, category] of Object.entries(parsedCategories)) {
            for (let rule of category) {
                if (seed >= rule.source && seed <= rule.source + rule.spread) {
                    seed = rule.destination + (seed - rule.source)
                    break;
                }
            }
        }
        locationValues.push(seed)
    }
    return Math.min(...locationValues)
}

// function mergeTwoRuleSets(first: Rule[], second: Rule[]) {
//     let rules: Rule[] = []
//     for (let secondRule of second) {
//         for (let firstRule of first) {
//             let overlap = [Math.max(firstRule.destination, secondRule.source), Math.min(firstRule.destination + firstRule.spread, secondRule.source + secondRule.spread) - 1]
//             rules.push({
//                 source: firstRule.source + (firstRule.destination - overlap[0]),
//                 destination: secondRule.destination + (overlap[0] - secondRule.source),
//                 spread: overlap[1] - overlap[0] + 1
//             })
//             if (firstRule.destination < overlap[0]) {
//                 rules.push({
//                     source: Math.min(firstRule.destination, secondRule.source),
//                     destination: firstRule.destination > secondRule.source ? secondRule.destination : firstRule.destination,
//                     spread: overlap[0] - firstRule.destination
//                 })
//             }
//             if (firstRule.destination + firstRule.spread > overlap[1]) {
//                 rules.push({
//                     source: firstRule.source + (overlap[1] - firstRule.destination) + 1,
//                     destination: overlap[1] + 1,
//                     spread: firstRule.destination + firstRule.spread - overlap[1] - 1
//                 })
//             }
//             console.log(overlap)
//         }
//     }
//     console.log(rules)
// }

function searchForMinimumSeed(seeds: number[], parsedCategories: {[id: string]: Rule[]}) {
    let c = 1e6
    let seedsToScan = []
    for (let i = 0; i < seeds.length; i += 2) {
        let currentVal = seeds[i]
        while (currentVal <= seeds[i] + seeds[i+1]) {
            seedsToScan.push(currentVal)
            currentVal += Math.floor(seeds[i+1] / 10000)
        }
    }
    let lowestSeed = getSeedWithLowestLocation(seedsToScan, parsedCategories)
    let intervalIncludingSeedFound: any[] = []
    for (let i = 0; i < seeds.length; i += 2) {
        if (isBetween(lowestSeed[0], seeds[i], seeds[i] + seeds[i+1])) intervalIncludingSeedFound = [seeds[i], seeds[i] + seeds[i+1]]
    }
    seedsToScan = []
    for (let i = Math.max(lowestSeed[0] - 5000, intervalIncludingSeedFound[0]); i < Math.min(lowestSeed[0] + 5000, intervalIncludingSeedFound[1]); i++) {
        seedsToScan.push(i)
    }
    // while (c >= 1) {
    //     let seedsToScan = []
    //     if (lowestSeed[0] == -1) {
    //         for (let i = 0; i < seeds.length; i += 2) {
    //             let currentVal = seeds[i]
    //             while (currentVal < seeds[i] + seeds[i+1]) {
    //                 seedsToScan.push(currentVal)
    //                 currentVal += c
    //             }
    //         }
    //     } else {
    //         for (let i = 0; i < seeds.length; i += 2) {
    //             if (isBetween(lowestSeed[0], seeds[i], seeds[i] + seeds[i+1])) {
    //                 let currentVal = Math.max(lowestSeed[0] - 100 * c, seeds[i])
    //                 while (currentVal < Math.min(lowestSeed[0] + 100 * c, seeds[i] + seeds[i+1])) {
    //                     seedsToScan.push(currentVal)
    //                     currentVal += c
    //                 }
    //             }
    //         } 
    //     }
    //     let currentStepLowestSeed = getSeedWithLowestLocation(seedsToScan, parsedCategories)
    //     if (currentStepLowestSeed[1] < lowestSeed[1]) lowestSeed = currentStepLowestSeed
    //     console.log(lowestSeed, c)
    //     c /= 1000
    // }
    console.log(getSeedWithLowestLocation(seedsToScan, parsedCategories))
}

function getSeedWithLowestLocation(seeds: number[], parsedCategories: { [id: string] : Rule[] }) {
    let currentLowestLocation = [-1, Infinity]
    let out = ""
    for(let seed of seeds) {
        let ogSeed = seed
        for (let [key, category] of Object.entries(parsedCategories)) {
            for (let rule of category) {
                if (seed >= rule.source && seed <= rule.source + rule.spread) {
                    seed = rule.destination + (seed - rule.source)
                    break;
                }
            }
        }
        // out += ogSeed + "," + seed + "\n"
        if (seed < currentLowestLocation[1]) {
            currentLowestLocation = [ogSeed, seed]
        }
    }
    // writeFileSync("./test.txt", out)
    return currentLowestLocation
}

console.time()
searchForMinimumSeed(...parseSeeds(day5))
console.timeEnd()