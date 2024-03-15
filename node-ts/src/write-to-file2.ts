import fs from 'fs';

let text: string = 'Hello from Typescript!';

function doneWritingFile(err: NodeJS.ErrnoException | null): void {
    if (err) {
        return console.log('There wsa an error!');
    }
    console.log('Done!');
}

fs.writeFile('file.txt',  text, doneWritingFile);

// \node-ts> npm run dev2
// OUT:
// > node-ts@1.0.0 dev2 C:\SRC\React\TypeScript\essentialts\essential-typescript-5\skill-up-ts5\node-ts
// > tsc && node ./build/write-to-file2.js
//
// Done!