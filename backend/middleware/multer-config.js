// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + '.' + extension);
//   }
// });

// module.exports = multer({storage: storage}).single('image');



const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log('Destination:', 'images');
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const fileName = name + Date.now() + '.' + extension;
    console.log('Generated FileName:', fileName);
    callback(null, fileName);
  }
});

const multerMiddleware = multer({ storage: storage }).single('image');

// Debugging middleware
function debugMiddleware(req, res, next) {
  console.log('Incoming Request:', req.method, req.url);
  next();
}

module.exports = (req, res, next) => {
  debugMiddleware(req, res, () => {
    multerMiddleware(req, res, (err) => {
      if (err) {
        console.error('Multer Error:', err);
        return res.status(500).json({ error: 'File Upload Error' });
      }
      next();
    });
  });
};
