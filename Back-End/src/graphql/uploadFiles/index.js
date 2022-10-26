import { Email } from "../../services/Email.js";
import multer from "multer";

const upload = multer({
  dest: "/src/uploads/",
});

const multiUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "RESUME", maxCount: 1 },
]);

export const uploadFiles = async (parent, { files }, context) => {
  const { user } = context;
  const uploadedFiles = files.map(({ file }) => file);
  console.log(uploadedFiles, "uploadedFiles");
  upload.array(uploadedFiles);
  try {
  } catch (error) {
    console.log(error);
    return error;
  }
};
