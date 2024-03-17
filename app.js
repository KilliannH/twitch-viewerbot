import { spawn } from 'node:child_process';

const botCount = 10;
let pr;
for(let i = 0; i < botCount; i++) {
    pr = spawn('node', ['subprocess']);
}


pr.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pr.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

pr.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});