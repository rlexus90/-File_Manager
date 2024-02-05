import path from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import url from 'url';
import { setRoot } from './homeDir.js';

export const cat = async (str, arr) => {
  const file = path.join(str, arr.join(' '));

  fs.access(file)
    .then(() => {
      process.stdout.write('Start reading file \x1b[33m \n');
      const readStream = createReadStream(file, { encoding: 'utf-8' });
      readStream.on('data', (data) => {
        process.stdout.write(data);
      });
      readStream.on('end', () => {
        process.stdout.write('\n\x1b[37m File reading done \n');
      });
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};

export const add = async (str, arr) => {
  const file = path.join(str, arr.join(' '));

  fs.access(file)
    .then(() =>
      console.log(`I can't create file \x1b[33m${arr.join(' ')}\x1b[37m `)
    )
    .catch(async () => {
      await fs.writeFile(file, '');
      console.log('File created');
    });
};

export const rn = async (str, arr) => {
  if (arr.length < 2) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);
  const newFile = path.join(str, arr[1]);

  fs.access(file)
    .then(async () => {
      await fs.rename(file, newFile);
      console.log('File renamed!');
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};

export const cp = async (str, arr) => {
  if (arr.length < 2) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);
  const newFile = path.join(arr.slice(1).join(' ').trim(), arr[0]);

  fs.access(file)
    .then(async () => {
      const readStream = createReadStream(file);
      const writeStream = createWriteStream(newFile);

      readStream.pipe(writeStream);
      writeStream.on('finish', () => {
        console.log(`File ${file} coppied`);
        writeStream.close();
      });
      writeStream.on('error', (e) => console.log('Somesing went wrong!', e));
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};

export const mv = async (str, arr) => {
  if (arr.length < 2) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);
  const newFile = path.join(arr.slice(1).join(' ').trim(), arr[0]);

  fs.access(file)
    .then(async () => {
      const readStream = createReadStream(file);
      const writeStream = createWriteStream(newFile);

      readStream.pipe(writeStream);
      writeStream.on('finish', async () => {
        await fs.rm(file);
        writeStream.close();
        console.log(`File ${file} movied`);
      });
      writeStream.on('error', (e) => console.log('Somesing went wrong!', e));
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};

export const rm = async (str, arr) => {
  if (arr.length < 1) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);

  fs.access(file)
    .then(async () => {
      await fs.rm(file);
      console.log(`File ${file} removed`);
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};
