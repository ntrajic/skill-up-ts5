"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let text = 'Hello from Typescript!';
fs_1.default.writeFile('file.txt', text, function (err) {
    if (err) {
        {
            return console.log('Ther was an error!');
        }
    }
    console.log('Done!');
});
// node-ts> tsc
// \node-ts> node .\build\write-to-file.js
// OUT: + wirite to 'file.txt'
// Done!
// AUTOMATE BUILD & RUN in package.json with "dev" script
// ======================================================
// node-ts> npm run dev
// OUT:
// > node-ts@1.0.0 dev C:\SRC\React\TypeScript\essentialts\essential-typescript-5\skill-up-ts5\node-ts
// > tsc && node ./build/write-to-file.js
// Done!
