import os from 'os';

export const osCommand = async (arr) => {
  // console.log(os);
  switch (arr[0]) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;

    case '--cpus':
      console.log(os.cpus());
      break;

    case '--homedir':
      console.log(os.homedir());
      break;

    case '--username':
      console.log(os.userInfo().username);
      break;

    case '--architecture':
      console.log(os.arch());
      break;

    default:
      console.log(`\x1b[33m${arr[0]}\x1b[37m - unknown flag`);
  }
};
