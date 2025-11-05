import multer from 'multer';

const storage = multer.memoryStorage();
// {
//   destination: (_req, _file, cb) => cb(null, 'uploads'),
//   filename: (_req, file, cb) => cb(null, `${Date.now()} - ${file.originalname}`)
// }

const fileFilter = (_req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
};

const upload = multer({ storage, fileFilter });
export default upload;