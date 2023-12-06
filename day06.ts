import { day6, map1Dto2D } from "./@lib";

type race = [number, number]

function parseInput(data: string): race[] {
    let numbers = data.match(/[0-9]+/g)!.map(x => parseInt(x))
    let out: race[] = []
    for (let i = 0; i < numbers.length / 2; i++) {
        out.push([numbers[i], numbers[i + numbers.length / 2]])
    }
    return out
}

function getWaysToWin(races: race[]) {
    let numbersOfWaysToWin = 1
    races.forEach(race => {
        let curNumbersOfWaysToWin = 0
        for (let i = 0; i < race[0]; i++) {
            if ((i) * (race[0] - i) > race[1]) curNumbersOfWaysToWin += 1
        }
        numbersOfWaysToWin *= curNumbersOfWaysToWin
    })
    return numbersOfWaysToWin
}
console.time()
console.log(getWaysToWin(parseInput(day6.replaceAll(" ", ""))))
console.timeEnd()