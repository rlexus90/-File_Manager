import fs from "fs/promises";
import path from "path";
import crypto from "node:crypto";
import {createReadStream} from 'fs'

export const calculateHash = async (str, arr) => {
	const file = path.join(str, arr.join(' '));

	fs.access(file)
	.then(() => {
		const hash = crypto.createHash("sha256");
		const stream = createReadStream(file);
		stream.on("data", (data) => hash.update(data));
		stream.on("end", () => {
			console.log(`Hash \x1b[33m${file} - ${hash.digest("hex")}\x1b[37m`);
		});
	})
	.catch(() => console.log(`File \x1b[33m${file}\x1b[37m not found!`));
};


