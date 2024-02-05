import { add, cat, cp, mv, rm, rn } from './modules/fileOperation.js';
import { calculateHash } from './modules/hash.js';
import { help } from './modules/help.js';
import { setHomeDir } from './modules/homeDir.js';
import { up, ls, cd } from './modules/navigation.js';
import { osCommand } from './modules/os.js';
import { compress, decompress } from './modules/zip.js';

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
	console.log('Type \x1b[33mhelp\x1b[37m if you need help')
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

      case 'cat':
        await cat(currentDir, commandArg);
        break;

      case 'add':
        await add(currentDir, commandArg);
        break;

      case 'rn':
        await rn(currentDir, commandArg);
        break;

      case 'cp':
        await cp(currentDir, commandArg);
        break;

      case 'mv':
        await mv(currentDir, commandArg);
        break;

      case 'rm':
        await rm(currentDir, commandArg);
        break;

      case 'os':
        await osCommand(commandArg);
        break;

      case 'hash':
        await calculateHash(currentDir, commandArg);
        break;

      case 'compress':
        await compress(currentDir, commandArg);
        break;

      case 'decompress':
        await decompress(currentDir, commandArg);
        break;

				case 'help':
      help();
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
