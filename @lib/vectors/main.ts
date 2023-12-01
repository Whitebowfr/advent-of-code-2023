export default class Vect2 {
    constructor(x: number, y: number);
    constructor(x: number[]);
    constructor(direction: string); 
    constructor(x: string|number[]|number, y?:number) {
        if (typeof(x) === "string") {

        } else if (typeof(x) === "object") {

        }
    }
}