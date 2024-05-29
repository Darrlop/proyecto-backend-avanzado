'use strict'

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio');


// GET /api/anuncios
// Devuelve todos los anuncios
// router.get('/', async (req, res, next) => {
//   try {
//     const resultado = await Anuncio.find();
//     res.json({result: resultado});
//     //res.render('index', {result: resultado}); 
//   } catch (error) {
//     console.log("Error en la petición de /anuncios:", error );
//     next(error);
//   }
// });

//GET /api/anuncios?start=1&limit4  ....

// router.get('/', async (req, res, next) => {
//   try {

//     skip = req.query.skip;
//     limit = req.query.limit;
//     orden = req.query.sort;
//     elTag = req.query.tag;
//     elNombre = req.query.nombre;
//     operacion = req.query.venta // true-> venta; false-> compra/busqueda
//     precioMin = req.query.precioMin;
//     precioMax = req.query.precioMax;

//      const resultado = await Anuncio.find().skip(skip).limit(limit);
//     // const resultado = await Anuncio.find().sort({[orden]: 1});
//     // const resultado = await Anuncio.find().sort({[orden]: 1}).skip(skip).limit(limit);
//     // const resultado = await Anuncio.find({tags: elTag});
//     // const resultado = await Anuncio.find({ $and: [{nombre: elNombre}, {tags: elTag}] })
//     /// .sort({[orden]: 1}).skip(skip).limit(limit);
//     // const resultado = await Anuncio.find({venta: operacion}).sort({[orden]: 1}).skip(skip).limit(limit);
//     // const resultado = await Anuncio.find({precio: {$gte: precioMin, $lte: precioMax} })
//     /// .sort({[orden]: 1}).skip(skip).limit(limit);

//     //res.render ('anuncios', {resultado});
//     res.json({result: resultado});
    
//     //res.render('index', {result: resultado}); 
//   } catch (error) {
//     console.log("Error en la petición de /anuncios:", error );
//     next(error);
//   }
// });

// GET /api/anuncios?
// Devuelve una lista de agente filtrada

router.get('/', async (req, res, next) => {
  try {

    //// FILTROS
    //// tag
    //// tipo
    //// precio, rango
    //// nombre
    const filterByTag = req.query.tag;
    const filterByVenta = req.query.venta;
    const filterByNombre = req.query.nombre;
    const precioMin = req.query.precioMin;
    const precioMax = req.precioMax;
    //const filterByRangoPrecio = "{$gte: " + req.query.precioMin + ", $lte: " + req.query.precioMax + "}";

    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;
    const filter = {};

    if (filterByTag)          filter.tags = filterByTag;
    if (filterByVenta)        filter.venta = filterByVenta;
    if (filterByNombre)       filter.nombre = filterByNombre;
    if (precioMin & precioMax)filter.precio = "{$gte: " + req.query.precioMin + ", $lte: " + req.query.precioMax + "}";
    
    const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);
    res.json({resultado: anuncios});
    
  } catch (error) {
    console.log("Error en la petición de /api/anuncios:", error );
    next(error);
  }
});





// GET /anuncios/tag
// Devuelve los tags existentes en la BD

router.get('/api/anuncios/tags', async (req, res, next) => {
  try {
    const resultado = await Anuncio.distinct("tags");
    res.json({result: resultado});
  } catch (error) {
    console.log ("Error en la petición de /anuncios/tags:", error);
    next(error);
  }
});

// GET /api/anuncios/id
// Devuelve el anuncio indicado en la id
router.get('/:id', async (req, res, next) => {
  try {
    const elId = req.params.id;
    const resultado = await Anuncio.findById(elId);
    res.json({result: resultado});
  } catch (error) {
    console.log("Error en la petición de /anuncios/id:", error );
    next(error);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const nombre = req.query.nombre;
//     const precio = req.query.precio;
//     console.log("--------------------", nombre);
//     //const resultado = await Anuncio.findOne({nombre: nombre});
//     const resultado = await Anuncio.find({precio: precio});
//     res.json({result: resultado});
//   } catch (error) {
//     console.log("Error en la petición de /anuncios/nombre:", error );
//     next(error);
//   }
// });


module.exports = router;
