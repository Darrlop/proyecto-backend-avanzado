const {Requester} = require('cote');

const requester = new Requester({name: 'peticionario thumbnail'});

const lanzarReq = (thumb, path, nameImage) =>{ 
  const evento ={
    type: 'obtener-thumbnail',
    thumb: thumb,
    path: path,
    nameImage: nameImage
  };
  
  requester.send(evento, resultado =>{
    Console.log(`${Date.now()} - thumbnail creado:  ${resultado}`);
  });  
}

module.exports = lanzarReq; 
