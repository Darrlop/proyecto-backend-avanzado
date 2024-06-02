const multer = require('multer');
const path = require('node:path');
const jimp = require("jimp");

// decalarar una configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const ruta = path.join(__dirname, '..', 'public', 'assets', "img");
    callback(null, ruta);
  },
  filename: function(req, file, callback) {

    try {
      //const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      const filename = `Item-${Date.now()}-${file.originalname}`;
      callback(null, filename);
    } catch (error) {
      callback(error);
    }
  }
})

// declarar la configuración del upload
const upload = multer({ storage: storage });

module.exports = upload;
