"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBetween = exports.sum = void 0;
function sum(a, depth) {
    if (depth) {
        return sum(a.splice(0, depth));
    }
    return a.reduce(function (a, b) { return a + b; });
}
exports.sum = sum;
function isBetween(number, a, b) {
    if (a > b) {
        return number >= b && number <= a;
    }
    return number >= a && number <= b;
}
exports.isBetween = isBetween;
