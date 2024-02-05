import { setHomeDir, setRoot } from './modules/homeDir.js';
import path from 'path';

const root = setRoot();
let currentDir = setHomeDir();

const userArg = process.argv[2];
let user;

if (userArg && userArg.startsWith('--username')) {
  user = userArg.split('=')[1];
} else {
  console.log('You must enter your name');
  process.exit(1);
}

const showCurrentDir = () =>
  console.log(`You are currently in \x1b[33m${currentDir}\x1b[37m`);

const app = () => {
  console.log(`Welcome to the File Manager, ${user}!`);
  showCurrentDir();

  process.stdin.on('data', (data) => {
    const command = data.toString().trim();

    switch (command) {
      case '.exit':
        process.exit(0);
      default:
        console.log(`\x1b[33m${command}\x1b[37m - unknown command`);
        showCurrentDir();
    }
  });
};

process.on('exit', () =>
  console.log(`\nThank you for using File Manager, ${user}, goodbye!`)
);
process.on('SIGINT', () => {
  process.exit(0);
});

app();
