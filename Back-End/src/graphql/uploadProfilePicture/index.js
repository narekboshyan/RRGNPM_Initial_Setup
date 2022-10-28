import fs, { createWriteStream, readFileSync } from "fs";
import path, { resolve, parse, join } from "path";
import { v4 as uuid } from "uuid";

export const uploadProfilePicture = async (parent, { file }, context) => {
  const { user, prisma } = context;
  try {
    const { file: uploadedFile } = await file;
    const __dirname = resolve();
    const filename = `${uuid()}_${uploadedFile.filename}`;
    const pathname = path.join(__dirname, `/src/uploads/${filename}`);
    const stream = uploadedFile.createReadStream();
    stream.pipe(createWriteStream(pathname));

    console.log(user);

    if (user.profilePicture) {
      await prisma.profilePicture.update({
        where: {
          userId: user.id,
        },
        data: {
          name: filename,
          mimeType: uploadedFile.mimetype,
          userId: user.id,
        },
      });
    } else {
      await prisma.profilePicture.create({
        data: {
          name: filename,
          mimeType: uploadedFile.mimetype,
          userId: user.id,
        },
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
