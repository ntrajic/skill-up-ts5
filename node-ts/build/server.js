"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let app = (0, express_1.default)();
app.get('/hello', function (req, res) {
    res.send('Hello from Express with Typescript!');
});
app.listen(8000, function () {
    console.log('Server is listening on port :8000');
});
// AUTOMATICC WEB SERVER RESTART w/ tsnode + nodedemon
// npm install ts-node nodemon --save-dev <enter>
// RUN ts-node against web server for its auto reload:
//
// RUN ts-node
// ============
// \node-ts> npx ts-node ./src/server.ts
// ====================================================
