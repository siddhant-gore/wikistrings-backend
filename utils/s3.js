import S3 from "aws-sdk/clients/s3.js";
import multer from "multer";
import dotenv from 'dotenv';
dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3Uploadv2 = async (file) => {
  const modifiedFileName = Date.now().toString() + '-' + file.originalname.replace(/ /g, '_');
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${modifiedFileName}`,
    Body: file.buffer,
  };

  return await s3.upload(params).promise();
};

const s3UploadMulti = async (files) => {
  const params = files.map((file) => {
    const modifiedFileName = Date.now().toString() + '-' + (file.originalname || "not").replace(/ /g, '_');
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${modifiedFileName}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["audio", "image"];
  if (allowedMimeTypes.includes(file.mimetype.split("/")[0])) {
    req.fileType = file.mimetype.split("/")[0];
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 11006600, files: 5 },
  onProgress: (loaded, total) => {
    console.log(`Progress: ${(loaded / total) * 100}%`);
  },
});

export { s3Uploadv2, s3UploadMulti };
