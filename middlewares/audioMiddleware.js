import multer from 'multer';

const upload = multer();

export const handleAudioFormData = (req, res, next) => {
  upload.array('audioFiles')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);

      return res.status(400).json({
        status: 'error',
        message: `Bad Request: Multer error - ${err.message}`,
      });
    } else if (err) {
    
      console.error('Unexpected error during form data processing:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }

    next();
  });
};
