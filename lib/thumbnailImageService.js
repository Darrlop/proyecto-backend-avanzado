const {Responder} = require('cote');
const jimp = require('jimp');
const path = require('node:path');

const responder = new Responder({name: 'Servicio creación Thumbnail'});

responder.on('obtener-thumbnail', (req, done) => {  
  
  jimp.read(req.thumb)
  .then((thumbnail) => {
    return thumbnail
      .resize(100, 100) // resize
      .write( `${path.join(req.path, req.nameImage)}-thumbnail.png`); // guardo el fichero creado
  })
  .catch((err) => {
    console.error(err);
  });
  
  console.log(`${Date.now()} - "Creación thumbnail: " ${req.nameImage}-thumbnail.png \n`);

})