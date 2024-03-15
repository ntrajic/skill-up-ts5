import express from 'express';

let app = express();
app.get('/hello', function(req, res) {
    res.send('Hello from Express with Typescript!!!!!!!');
});

app.listen(8000, function() {
    console.log('Server is listening on port :8000');
});

// npm install ts-node nodemon --save-dev <enter>
// RUN ts-node against web server for its auto reload:
//
// RUN ts-node
// ====================================================
// \node-ts> npx ts-node ./src/server.ts
// OUT:         Server is listening on port :8000
// ====================================================
// type n webbrowse addr bar: http://localhost:8000/hello 
// in browser body, OUT: Hello from Express with Typescript!
//
// AUTOMATICC WEB SERVER RESTART w/ tsnode + nodedemon
// ==================================================================
// npx nodemon --watch ./src/server.ts --exec ts-node ./src/server.ts
// OUT:
// [nodemon] 3.1.0
// [nodemon] to restart at any time, enter `rs`
// [nodemon] watching path(s): src\server.ts
// [nodemon] watching extensions: ts,json
// [nodemon] starting `ts-node ./src/server.ts`
// Server is listening on port :8000


// automate reload w/ "serve" script in package.json: // npm run serve <enter>
// "scripts": {
//     "dev": "tsc && node ./build/write-to-file.js",
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "dev2": "tsc && node ./build/write-to-file2.js",
//     "serve": "nodemon --watch ./src/server.ts --exec ts-node ./src/server.ts"
// },