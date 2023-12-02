import { day2, sum } from "./@lib";

function getPossibleGames(data: string, numberOfReds: number, numberOfBlues: number, numberOfGreen: number) {
    let possibleGames: number[] = [];
    data.split("\n").forEach((game, index) => {
        let reds = game.match(/[0-9]* red/g)?.map(x => parseInt(x)) || [0]
        let blues = game.match(/[0-9]* blue/g)?.map(x => parseInt(x)) || [0]
        let greens = game.match(/[0-9]* green/g)?.map(x => parseInt(x)) || [0]
        if (Math.max(...reds) <= numberOfReds && Math.max(...blues) <= numberOfBlues && Math.max(...greens) <= numberOfGreen) {
            possibleGames.push(index + 1)
        }
    })
    return possibleGames
}

function getPowersOfGames(data: string) {
    let powers: number[] = [];
    data.split("\n").forEach((game, index) => {
        let reds = game.match(/[0-9]* red/g)?.map(x => parseInt(x)) || [0]
        let blues = game.match(/[0-9]* blue/g)?.map(x => parseInt(x)) || [0]
        let greens = game.match(/[0-9]* green/g)?.map(x => parseInt(x)) || [0]
        powers.push(Math.max(...reds) * Math.max(...blues) * Math.max(...greens))
    })
    return powers
}

console.log(sum(getPowersOfGames(day2)))