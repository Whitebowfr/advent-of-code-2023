import { coords, day13, sum } from "./@lib";

function getReflectionNumber(pattern: string[][], oldReflectionNumber=-1): number {
    let transposedArray = pattern[0].map((_, colIndex) => pattern.map(row => row[colIndex]));
    for (let i = 0; i < transposedArray.length - 1; i++) {
        let secondary = 0
        let isSymmetric = true
        while(i + secondary + 1 < transposedArray.length && i - secondary >= 0 && isSymmetric) {
            if (transposedArray[i + secondary + 1].join("") != transposedArray[i - secondary].join("")) {
                isSymmetric = false
                break
            }
            secondary++
        }
        if (isSymmetric && i + 1 != oldReflectionNumber) return i + 1
    }
    for (let i = 0; i < pattern.length - 1; i++) {
        let secondary = 0
        let isSymmetric = true
        while(i + secondary + 1 < pattern.length && i - secondary >= 0 && isSymmetric) {
            if (pattern[i + secondary + 1].join("") != pattern[i - secondary].join("")) {
                isSymmetric = false
                break
            }
            secondary++
        }
        if (isSymmetric && oldReflectionNumber != (i+1)*100) return (i + 1) * 100
    }
    return 0
}

function fixSmudgeOnMirrorAndCalculateReflection(pattern: string[][]): number {
    // Relection line for columns
    let transposedArray = pattern[0].map((_, colIndex) => pattern.map(row => row[colIndex]));
    for (let i = 0; i < transposedArray.length - 1; i++) {
        let secondary = 0
        let fixNeeded: coords = [-1, -1]
        while(i + secondary + 1 < transposedArray.length && i - secondary >= 0) {
            let diffs = getDifferences(transposedArray[i + secondary + 1], transposedArray[i -  secondary])

            if (diffs.length > 1 || (diffs.length === 1 && fixNeeded[0] !== -1)) {
                fixNeeded = [-1, -1]
                break
            }

            if (diffs.length === 1) fixNeeded = [diffs[0], i - secondary]
            secondary++
        }
        if (fixNeeded[0] != -1) return i + 1
    }

    // Reflection line for rows
    for (let i = 0; i < pattern.length - 1; i++) {
        let secondary = 0
        let fixNeeded: coords = [-1, -1]
        while(i + secondary + 1 < pattern.length && i - secondary >= 0) {
            let diffs = getDifferences(pattern[i + secondary + 1], pattern[i -  secondary])

            // More than one difference is needed to make row a symmetry line
            if (diffs.length > 1 || (diffs.length === 1 && fixNeeded[0] !== -1)) {
                fixNeeded = [-1, -1]
                break
            }
            
            if (diffs.length === 1) fixNeeded = [diffs[0], i - secondary]
            secondary++
        }
        if (fixNeeded[0] != -1) return (i + 1) * 100
    }
    return 0
}

function getDifferences(strA: string[], strB: string[]): number[] {
    let out = []
    for (let i = 0; i < strA.length; i++) {
        if (strA[i] != strB[i]) out.push(i)
    }
    return out
}

console.log(sum(day13.split("\n\n").map(x => fixSmudgeOnMirrorAndCalculateReflection(x.split("\n").map(y => y.split(""))))))