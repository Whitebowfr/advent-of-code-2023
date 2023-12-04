import { day4, getCommonItems, sum } from "./@lib";

function parseScratchCards(data: string) {
    return data.split("\n").map(x => {
        return {
            winningNumbers: x.split(" |")[0].split(": ")[1].replaceAll("  ", " ").split(" ").map(y => parseInt(y)),
            numbersYouHave: x.split("| ")[1].replaceAll("  ", " ").split(" ").map(y => parseInt(y)),
            numberOfCards: 1
        }
    })
}

function getScratchCardsValues(parsed: any[]) {
    let totalScore = 0;
    parsed.forEach(x => {
        let l = x.numbersYouHave.filter((y: number) => x.winningNumbers.indexOf(y) !== -1).length
        if (l > 0) totalScore += 2**(l - 1)
    })
    return totalScore
}

function getScratchCardsWon(parsed: any[]) {
    parsed.forEach((x, index) => {
        let l = x.numbersYouHave.filter((y: number) => x.winningNumbers.indexOf(y) !== -1).length
        for (let i = index + 1; i <= l + index; i++) {
            parsed[i].numberOfCards += 1 * x.numberOfCards
        }
    })
    return sum(parsed.map(x => x.numberOfCards))
}