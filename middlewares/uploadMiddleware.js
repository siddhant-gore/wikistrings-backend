import multerConfig from "./multerConfig";

export const uploadAudioMiddleware = (req, res, next) => {
  multerConfig.audioUpload("uniqueID")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    next();
  });
};

export const uploadImageMiddleware = (req, res, next) => {
  multerConfig.imageUpload("uniqueID")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    next();
  });
};
