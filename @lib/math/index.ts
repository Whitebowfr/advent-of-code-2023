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

function gcd2(a: number, b: number): number {
    // Greatest common divisor of 2 integers
    if(!b) return b===0 ? a : NaN
    return gcd2(b, a%b)
}

export function gcd(array: number[]): number {
    // Greatest common divisor of a list of integers
    let n = 0
    for(let i=0; i < array.length; ++i)
      n = gcd2(array[i], n)
    return n
}

function lcm2(a: number, b: number): number {
    // Least common multiple of 2 integers
    return a * b / gcd2(a, b)
}

export function lcm(array: number[]): number {
    // Least common multiple of a list of integers
    let n = 1;
    for(let i=0; i < array.length; ++i)
      n = lcm2(array[i], n)
    return n
}