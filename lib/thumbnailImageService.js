const {Responder} = require('cote');
const jimp = require('jimp');
const path = require('node:path');


const responder = new Responder({name: 'Servicio creación Thumbnail'});

//nombre del evento del requester: obtener-thumbnail
responder.on('obtener-thumbnail', (req, done) => {

  console.log (JSON.stringify(req));
    //console.log("-----REQ.FILE => " + JSON.stringify(req.file))
    //const rutaThumb = path.join(__dirname, '..', 'public', 'assets', "img");
    jimp.read(req.thumb)
    .then((thumbnail) => {
      return thumbnail
        .resize(256, 256) // resize
        .write( `${path.join(req.path, req.nameImage)}-thumbnail.png`); // guardo el fichero creado
    })
    .catch((err) => {
      console.error(err);
    });

      console.log(`${Date.now()} - "Creación thumbnail: " ${req.nameImage}-thumbnail.png `)

})