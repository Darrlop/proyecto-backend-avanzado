const i18n = require('i18n');
const path = require('node:path'); //carga de librería para facilitar uso de rutas

// configuración de la instancia de i18n
i18n.configure({
  locales: ['es', 'en'],
  directory: path.join(__dirname, '..', 'locales'), //carpeta actual + retroceso carpeta + entrada en carpeta localez
  defaultLocale: 'es',
  autoReload: true, // Watch for changes in json files to reload locale on updates
  syncFiles: true, // Sync locale information across all files
  cookie: 'chollopop-locale',
});

// para utilizar en script
i18n.setLocale('es');

// exportamos la instancia de i18n
module.exports = i18n;
