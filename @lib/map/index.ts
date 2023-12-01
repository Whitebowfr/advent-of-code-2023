import { DirectionMarker } from "../vectors";

export class Map2D {
    grid: any[][];
    size: [number, number];

    constructor(size: [number, number], grid?: any[][]) {
        this.size = size
        if (grid) {
            this.grid = grid
        } else {
            let grid = []
            for (let index = 0; index < this.size[1]; index++) {
                let row = []
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    row.push(0)
                }
                grid.push(row)
            }
            this.grid = grid
        }
    }

    getElement(coords: number|[number, number], coordsY?: number) {
        if (typeof coords === "number") {
            if (coordsY) {
                return this.grid[coordsY][coords]
            }
        } else {
            return this.grid[coords[1]][coords[0]]
        }
    }

    getNextElement(coords: [number, number], direction: DirectionMarker) {
        switch (direction) {
            case DirectionMarker.NORTH:
                if (coords[1] - 1 >= 0) {
                    console.log(this.getElement(coords[0], coords[1] - 1)"")

                    return this.getElement(coords[0], coords[1] - 1)
                }
                return
            case DirectionMarker.WEST:
                if (coords[0] - 1 >= 0) {
                    return this.getElement(coords[0] - 1, coords[1])
                }
                return
            case DirectionMarker.SOUTH:
                if (coords[1] + 1 < this.size[1]) {
                    return this.getElement(coords[0], coords[1] + 1)
                }
                return
            case DirectionMarker.EAST:
                if (coords[0] + 1 < this.size[0]) {
                    return this.getElement(coords[0] + 1, coords[1])
                }
                return
        }
    }

    setElement(coords: [number, number], value: any) {
        this.grid[coords[1]][coords[0]] = value
    }

    fillGrid(value: any|any[][]) {
        if (typeof value === "object" && value.length === this.size[1] && value[0].length === this.size[0]) {
            for (let index = 0; index < this.size[1]; index++) {
                const element = this.grid[index];
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value[index][index2]
                }
            }
        } else {
            for (let index = 0; index < this.size[1]; index++) {
                const element = this.grid[index];
                for (let index2 = 0; index2 < this.size[0]; index2++) {
                    this.grid[index][index2] = value
                }
            }
        }
    }
}