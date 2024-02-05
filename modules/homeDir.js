import os from 'os';
import path from 'path';

export const setHomeDir = () => {
  const homeDir = os.homedir();
  return homeDir;
};

export const setRoot = () => {
  return path.parse(setHomeDir()).root;
};
