const {Responder} = require('cote');

const responder = new Responder({name: 'Servicio creación Thumbnail'});

//nombre del evento del requester: obtener-thumbnail
responder.on('obtener-thumbnail', (req, done) => {

  const thumb = req.file.path;
    //console.log("-----REQ.FILE => " + JSON.stringify(req.file))
    //const rutaThumb = path.join(__dirname, '..', 'public', 'assets', "img");
    jimp.read(thumb)
    .then((thumbnail) => {
      return thumbnail
        .resize(256, 256) // resize
        .write( `${path.join(req.file.destination, req.file.filename)}-thumbnail.png`); // guardo el fichero creado
    })
    .catch((err) => {
      console.error(err);
    });

      Console.log(`${Date.now()} - "Creación thumbnail: " ${req.file.filename}-thumbnail.png `)

})