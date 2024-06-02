const fs = require('fs');
const { join } = require('path');



const borradoArchivos = function (ruta, archivoABorrar){
  const rutaParcial = ruta; // Ruta del archivo a eliminar
  const rutaCompleta = join(rutaParcial, archivoABorrar);

  try {
    fs.unlinkSync(rutaCompleta);
    console.log('Archivo eliminado correctamente:', rutaCompleta, "\n");
  } catch (error) {
    console.error('Error al eliminar el archivo:', error.message, "\n");
  }
}

module.exports = borradoArchivos;