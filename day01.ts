import { day1 } from "./@lib";
import { getIndexCircular } from "./@lib";

function extractCalibrationValues(data: string): number {
    console.log(data.split("\n").map(x => x.replaceAll(/[A-z]*/g, '').split("")))
    return data.split("\n").map(x => x.replaceAll(/[A-z]*/g, '').split("")).map(x => parseInt(x[0] + (x.length == 1 ? x[0] : getIndexCircular(x, -1)))).reduce((a, b) => a + b)
}

function replaceSpelledOutValues(data: string): string {
    let replacements: Array<string> = ["one","two","three","four","five","six","seven","eight","nine"]
    replacements.forEach((x, i) => data = data.replaceAll(x, x[0] + (i + 1).toString() + x))
    return data
}

console.log(extractCalibrationValues(replaceSpelledOutValues(day1)))