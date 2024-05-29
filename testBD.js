const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');


main().catch(err => console.log('Hubo un error', err));

async function main(){
    await new Promise( (resolve) => connection.once('open', resolve) );
    await pruebaAnuncios();
    connection.close();
}

async function pruebaAnuncios(){
    const implantados = await Anuncio.insertMany([
        {nombre: "Caja vacía", venta: true, precio: 100, foto: "la_nada", tags: "work"},
        {nombre: "Caja rota", venta: true, precio: 10, foto: "el_roto", tags: "work"},
        {nombre: "Caja cuqui", venta: false, precio: 20, foto: "que_sea_cuqui", tags: "lifestyle"}
    ]);
    console.log("Metidos " + implantados.length + " anuncios.");
}