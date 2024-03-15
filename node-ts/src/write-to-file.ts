import fs from 'fs';

let text: string = 'Hello from Typescript!';

fs.writeFile('file.txt',  text, function(err) {
    if (err) { {
        return console.log('Ther was an error!');
    }}
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