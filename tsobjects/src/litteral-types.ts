let y: "Hello" | "Goodbye" | "Hi" = "Hello";
y = "Goodbye";
y = "Hi";
//x = "Hey";     //error, x can only be one of litterals "Hello" | "Goodbye" | "Hi"


// LITTERALS are used for definition of enumerated types
// =====================================================

type ColumnLabel = "1" | "2" | "3";
type RowLabel = "A" | "B" | "C";


// TEMPLATES are all possible combinations of litterals
//=====================================================
type BattleshipMove = `${RowLabel}${ColumnLabel}`;    // any of the combinations of enumerated literals above
let newMove: BattleshipMove = "A1";    // OK
//let newMove: BattleshipMove = "D1";    // not OK

let userRowInput = "Hello!";
let userColInput = "Goodbye!";



function attackSquare(row: RowLabel, column: ColumnLabel) {

}

function attackSquare2(move: BattleshipMove) {

}

function isRowLabel(str: string): str is RowLabel {
    return ["A", "B", "C"].includes(str);
}

function isColumnLabel(str: string): str is ColumnLabel {
    return ["1", "2", "3"].includes(str);
}

if (isRowLabel(userRowInput) && isColumnLabel(userColInput)) {
    attackSquare(userRowInput, userColInput);
}

function isBattleshipMOve(str: string): str is BattleshipMove {
    let [row, column] = str.split('');
    return isRowLabel(row) && isColumnLabel(column);
}

if (isBattleshipMOve(newMove)) {
    attackSquare2(newMove);
}