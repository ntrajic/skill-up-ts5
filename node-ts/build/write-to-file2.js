"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let text = 'Hello from Typescript!';
function doneWritingFile(err) {
    if (err) {
        return console.log('There wsa an error!');
    }
    console.log('Done!');
}
fs_1.default.writeFile('file.txt', text, doneWritingFile);
// \node-ts> npm run dev2
// OUT:
// > node-ts@1.0.0 dev2 C:\SRC\React\TypeScript\essentialts\essential-typescript-5\skill-up-ts5\node-ts
// > tsc && node ./build/write-to-file2.js
//
// Done!
