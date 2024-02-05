import path from 'path';
import fs from 'fs/promises';
import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export const compress = async (str, arr) => {
  if (arr.length < 2) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);
  const newFile = path.join(arr.slice(1).join(' '), `${arr[0]}.gz`);

  fs.access(file)
    .then(async () => {
      const readStream = createReadStream(file);
      const writeStream = createWriteStream(newFile);

      await pipeline(readStream, zlib.createGzip(), writeStream).catch(() =>
        console.log('Somesing went wrong!')
      );
      console.log('File compressed');
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};

export const decompress = async (str, arr) => {
  if (arr.length < 2) return console.log('Wrong command!');

  const file = path.join(str, arr[0]);
  const name = path.parse(arr[0]).name;
  const newFile = path.join(arr.slice(1).join(' '), `${name}`);

  fs.access(file)
    .then(async () => {
      const readStream = createReadStream(file);
      const writeStream = createWriteStream(newFile);

      await pipeline(readStream, zlib.createGunzip(), writeStream).catch(() =>
        console.log('Somesing went wrong!')
      );
      console.log('File decompresed');
    })
    .catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};
