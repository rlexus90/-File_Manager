export const help = ()=>{
	console.log(`
	This File Manager supports commands:
	\x1b[33m'.exit'\x1b[37m - for close application;
	\x1b[33m'up'\x1b[37m - for go upper from current directory;
	\x1b[33m'cd directory'\x1b[37m - go to directory you must just type name directory;
	\x1b[33m'ls'\x1b[37m - print list files and directories in current directory;
	\x1b[33m'cat file'\x1b[37m - show data from file in current directory;
	\x1b[33m'add file_name'\x1b[37m - create file with file_name in current directory;
	\x1b[33m'rn file new_filename'\x1b[37m - rename file with name - new_filename in current directory;
	\x1b[33m'cp file new_directory'\x1b[37m - coppy file from current directory to new destination - new_directory (you must type absolute path);
	\x1b[33m'mv file new_directory'\x1b[37m - movie file from current directory to new destination - new_directory (you must type absolute path);
	\x1b[33m'rm file'\x1b[37m - delete file in current directory;
	\x1b[33m'os --EOL'\x1b[37m - Get EOL;
	\x1b[33m'os --cpus'\x1b[37m - Get host machine CPUs info;
	\x1b[33m'os --homedir'\x1b[37m - Get home directory;
	\x1b[33m'os --username'\x1b[37m - Get current system user name;
	\x1b[33m'os --architecture'\x1b[37m - Get CPU architecture;
	\x1b[33m'hash file'\x1b[37m - calculate HASH file in current directory;
	\x1b[33m'compress file path_to_destination'\x1b[37m - compress file and create zip file in directory = path_to_destination;
	\x1b[33m'decompress file path_to_destination'\x1b[37m - decompress zip file and create file in directory = path_to_destination;
	`);
}