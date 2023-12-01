"use strict";
exports.__esModule = true;
exports.map1Dto2D = exports.getCommonItems = exports.getIndexCircular = exports.sort = exports.parseAsInts = exports.parseStringAsInts = void 0;
function parseStringAsInts(str, separator) {
    if (separator === void 0) { separator = "\n"; }
    return parseAsInts(str.split(separator));
}
exports.parseStringAsInts = parseStringAsInts;
function parseAsInts(a) {
    return a.map(function (x) { return parseInt(x); });
}
exports.parseAsInts = parseAsInts;
function sort(a, ascending, property) {
    if (ascending === void 0) { ascending = true; }
    if (!property) {
        return a.sort(function (a, b) { return ((a > b && ascending) || (a < b && !ascending)) ? 1 : -1; });
    }
    else {
        if (a[0].hasOwnProperty(property)) {
            return sort(a.map(function (x) { return x[property]; }), ascending);
        }
        else {
            throw new Error("Object does not have property " + property);
        }
    }
}
exports.sort = sort;
function getIndexCircular(a, indx) {
    if (indx >= 0) {
        return a[indx % a.length];
    }
    return a[a.length + (indx % a.length)];
}
exports.getIndexCircular = getIndexCircular;
function getCommonItems(stopAtFirst) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    if (a.length < 2)
        return;
    var result = a[0].filter(function (x) { return a.every(function (y) { return y.includes(x); }); });
    return stopAtFirst ? result[0] : result;
}
exports.getCommonItems = getCommonItems;
function map1Dto2D(ar, size) {
    var newAr = [];
    while (ar.length)
        newAr.push(ar.splice(0, size));
    return newAr;
}
exports.map1Dto2D = map1Dto2D;
