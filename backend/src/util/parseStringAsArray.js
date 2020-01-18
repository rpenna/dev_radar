module.exports = function parseStringAsArray(string) {
    return string.split(',').map(arr => arr.trim());
};