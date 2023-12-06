export function sum(a: number[], depth?: number): number {
    if (depth) {
        return sum(a.splice(0, depth))
    }
    return a.reduce((a, b) => a + b)
}

export function isBetween(number: number, a:number, b:number): boolean {
    if (a > b) {
        return number >= b && number <= a
    }
    return number >= a && number <= b
}