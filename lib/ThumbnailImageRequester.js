const {Requester} = require('cote');

const requester = new Requester({name: 'peticionario thumbnail'});

const evento ={
  type: 'obtener-thumbnail'
};

requester.send(evento, resultado =>{
  console.log
  Console.log(`${Date.now()} - thumbnail creado:  ${resultado}`);
});