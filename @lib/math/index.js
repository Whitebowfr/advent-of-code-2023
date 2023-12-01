"use strict";
exports.__esModule = true;
exports.sum = void 0;
function sum(a, depth) {
    if (depth) {
        return sum(a.splice(0, depth));
    }
    return a.reduce(function (a, b) { return a + b; });
}
exports.sum = sum;
