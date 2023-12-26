import multer from "multer";
import path from "path";

// Path for images
const imageStorage = (id) => {
  return multer.diskStorage({
    destination: `public/image/${id}`,
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
};

// Single image upload
const imageUpload = (id) => {
  return multer({
    storage: imageStorage(id),
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    },
  }).single("image");
};

// Multiple image upload
const imageMultipleUpload = (id) => {
  return multer({
    storage: imageStorage(id),
    limits: {
      fileSize: 1000000, // 1mb
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    },
  }).array("images", 5);
};

// Path for audio
const audioStorage = (id) => {
  return multer.diskStorage({
    destination: `public/audio/${id}`,
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
};

// Single audio upload
const audioUpload = (id) => {
  return multer({
    storage: audioStorage(id),
    limits: {
      fileSize: 50000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp3|wav)$/)) {
        return cb(new Error("Please upload an audio file"));
      }
      cb(undefined, true);
    },
  }).single("audio");
};

// Multiple audio upload
const audioMultipleUpload = (id) => {
  return multer({
    storage: audioStorage(id),
    limits: {
      fileSize: 50000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp3|wav)$/)) {
        return cb(new Error("Please upload an audio file"));
      }
      cb(undefined, true);
    },
  }).array("audios", 5);
};

export default {
  imageUpload,
  imageMultipleUpload,
  audioUpload,
  audioMultipleUpload,
};
