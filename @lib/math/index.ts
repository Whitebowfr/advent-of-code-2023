export function sum(a: number[], depth?: number): number {
    if (depth) {
        return sum(a.splice(0, depth))
    }
    return a.reduce((a, b) => a + b)
}