"use strict";
let y = "Hello";
y = "Goodbye";
y = "Hi";
let newMove = "A1"; // OK
//let newMove: BattleshipMove = "D1";    // not OK
let userRowInput = "Hello!";
let userColInput = "Goodbye!";
function attackSquare(row, column) {
}
function attackSquare2(move) {
}
function isRowLabel(str) {
    return ["A", "B", "C"].includes(str);
}
function isColumnLabel(str) {
    return ["1", "2", "3"].includes(str);
}
if (isRowLabel(userRowInput) && isColumnLabel(userColInput)) {
    attackSquare(userRowInput, userColInput);
}
function isBattleshipMOve(str) {
    let [row, column] = str.split('');
    return isRowLabel(row) && isColumnLabel(column);
}
if (isBattleshipMOve(newMove)) {
    attackSquare2(newMove);
}
