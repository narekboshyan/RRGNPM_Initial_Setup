import fs from "fs";
import path, { resolve } from "path";

export const uploadFiles = async (parent, { files }, context) => {
  try {
    const response = await Promise.all(files.map(({ file }) => file));
    const allFiles = response.map(({ file }) => file);
    const __dirname = resolve();
    const filesData = [];

    for (const { filename, createReadStream } of allFiles) {
      const pathname = path.join(__dirname, `/src/uploads/${filename}`);
      const stream = createReadStream();
      stream.pipe(fs.createWriteStream(pathname));
      stream.on("end", async () => {
        filesData.push({
          filename,
          content: fs.readFileSync(
            path.join(__dirname, `/src/uploads/files/${filename}`),
            {
              encoding: "base64",
            }
          ),
          type: res[i].mimetype,
          disposition: "attachment",
        });
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
