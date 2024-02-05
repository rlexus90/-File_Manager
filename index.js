import { setHomeDir } from './modules/homeDir.js';
import { up, ls, cd } from './modules/navigation.js';

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

  process.stdin.on('data', async (data) => {
    const dataString = data.toString().trim();
    const command = dataString.split(' ')[0];
    const commandArg =
      dataString.split(' ').length > 1 ? dataString.split(' ').slice(1) : [];

    switch (command) {
      case '.exit':
        process.exit(0);
        break;
      case 'up':
        currentDir = up(currentDir);
        break;
      case 'ls':
        await ls(currentDir);
        break;
      case 'cd':
        currentDir = (await cd(currentDir, commandArg)) ?? currentDir;
        break;
      default:
        console.log(`\x1b[33m${command}\x1b[37m - unknown command`);
    }

    showCurrentDir();
  });
};

process.on('exit', () =>
  console.log(`\nThank you for using File Manager, ${user}, goodbye!`)
);
process.on('SIGINT', () => {
  process.exit(0);
});

app();
