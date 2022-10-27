import fs, { createWriteStream, readFileSync } from "fs";
import path, { resolve, parse, join } from "path";
import AWS from "aws-sdk";

export const uploadFiles = async (parent, { files }, context) => {
  try {
    const response = await Promise.all(files.map(({ file }) => file));
    const allFiles = response.map(({ file }) => file);
    const __dirname = resolve();
    const filesData = [];
    console.log(allFiles);

    for (const { filename, createReadStream, mimetype } of allFiles) {
      const pathname = path.join(__dirname, `/src/uploads/${filename}`);
      const stream = createReadStream();
      stream.pipe(createWriteStream(pathname));
      stream.on("end", async () => {
        filesData.push({
          filename,
          content: readFileSync(
            path.join(__dirname, `/src/uploads/files/${filename}`),
            {
              encoding: "base64",
            }
          ),
          type: mimetype,
          disposition: "attachment",
        });
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
