import path from 'path';
import fs from 'fs/promises';
import { setRoot } from './homeDir.js';

export const up = (str) => {
  const root = setRoot();
  if (str === root) return root;
  const dir = path.join(str, '..');
  return dir;
};

export const ls = async (str) => {
  const files = await fs.readdir(str);
  const list = files.map((file) => new Info(file));
  console.table(list);
};

export const cd = async (str, arr) => {
  const dir = arr.join(' ');
  const dirPath = path.join(str, dir);
  return fs
    .access(dirPath)
    .then(() => dirPath)
    .catch(() => console.log(`Dir \x1b[33m${dir}\x1b[37m not found!`));
};

class Info {
  constructor(str) {
    const itemInfo = path.parse(str);
    this.name = itemInfo.name;
    this.type = itemInfo.ext ? 'file' : 'dir';
  }
}
