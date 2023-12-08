import { writeFileSync } from "fs";
import { day7 } from "./@lib";

function getHandScore(hand: string): number {
    let arr: {[id: string] : number} = {}
    let value = 0
    hand.split("").forEach(card => arr[card] = (arr[card] || 0) + 1)
    if (Object.values(arr).length == 1) {
        value = 7 * 10**10
    } else if (Math.max(...Object.values(arr)) == 4) {
        value = 6 * 10**10
    } else if (Math.max(...Object.values(arr)) == 3) {
        if (Math.min(...Object.values(arr)) == 2) {
            value = 5 * 10**10
        } else {
            value = 4 * 10**10
        }
    } else if (Object.values(arr).filter(x => x == 2).length == 2) {
        value = 3 * 10**10
    } else if (Object.values(arr).length == 5) {
        value = 1 * 10**10
    } else {
        value = 2 * 10**10
    }
    hand.split("").forEach((card, index) => value += getCardValueFromString(card) * 10**(2*(4 - index)))
    return value
}

function getCardValueFromString(card: string, partOne=true): number {
    if (partOne) return ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"].indexOf(card)
    return ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"].indexOf(card)
}

function getBidAmount(data: string) {
    let hands: [string, number][] = data.split("\n").map(x => [x.split(" ")[0], parseInt(x.split(" ")[1])])
    let handsWithScore: [string, number, number][] = hands.map(x => [...x, getHandScore(x[0])])
    handsWithScore = handsWithScore.sort((a, b) => a[2] - b[2])
    let totalBidWon = 0
    handsWithScore.forEach((x, i) => totalBidWon += x[1] * (i + 1))
    console.log(totalBidWon)
}

function getHandScoreWithJokers(hand: string): number {
    let arr: {[id: string] : number} = {}
    let value = 0
    hand.split("").forEach(card => arr[card] = (arr[card] || 0) + 1)
    
    if (arr["J"]) {
        let jokersNumber = arr["J"]
        delete arr["J"]
        if (Object.values(arr).length == 0) return 7*10**10

        arr[Object.keys(arr).reduce((a, b) => arr[a] > arr[b] ? a : b)] += jokersNumber
    
    }
    
    if (Object.values(arr).length == 1) {
        value = 7 * 10**10
    } else if (Math.max(...Object.values(arr)) == 4) {
        value = 6 * 10**10
    } else if (Math.max(...Object.values(arr)) == 3) {
        if (Math.min(...Object.values(arr)) == 2) {
            value = 5 * 10**10
        } else {
            value = 4 * 10**10
        }
    } else if (Object.values(arr).filter(x => x == 2).length == 2) {
        value = 3 * 10**10
    } else if (Object.values(arr).length == 5) {
        value = 1 * 10**10
    } else {
        value = 2 * 10**10
    }
    hand.split("").forEach((card, index) => value += getCardValueFromString(card, false) * 10**(2*(4 - index)))
    return value
}

function getBidAmountWithJokers(data: string) {
    let hands: [string, number][] = data.split("\n").map(x => [x.split(" ")[0], parseInt(x.split(" ")[1])])
    let handsWithScore: [string, number, number][] = hands.map(x => [...x, getHandScoreWithJokers(x[0])])
    handsWithScore = handsWithScore.sort((a, b) => a[2] - b[2])
    writeFileSync("./test.txt", JSON.stringify(handsWithScore))
    let totalBidWon = 0
    handsWithScore.forEach((x, i) => totalBidWon += x[1] * (i + 1))
    console.log(totalBidWon)
}
