"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcm = exports.gcd = exports.isBetween = exports.sum = void 0;
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
function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if (!b)
        return b === 0 ? a : NaN;
    return gcd2(b, a % b);
}
function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for (var i = 0; i < array.length; ++i)
        n = gcd2(array[i], n);
    return n;
}
exports.gcd = gcd;
function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a * b / gcd2(a, b);
}
function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for (var i = 0; i < array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}
exports.lcm = lcm;
