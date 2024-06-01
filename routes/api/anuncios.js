"use strict";

var express = require("express");
var router = express.Router();
const path = require('node:path');
const Anuncio = require("../../models/Anuncio");
const { query, validationResult } = require("express-validator");
const validator = require("../../lib/validations"); //modularizadas las validaciones
const upload = require("../../lib/publicUploadConfigure"); //librería para subidad foto form-data
const jimp = require('jimp');

// GET /api/anuncios?
// Devuelve un json con lista de anuncio según filtros
router.get("/", validator.validaQuery, async (req, res, next) => {
  console.log("punto /private");  
  try {
    validationResult(req).throw(); // genero excepción en caso de error en la validación

    // Func que desglosa el precio según formato y lo asigna a precioMin y precioMax
    function desglosandoPrecio() {
      const precioEnBruto = req.query.precio;
      if (precioEnBruto !== undefined) {
        if (precioEnBruto.includes("-")) {
          const precios = precioEnBruto.split("-");
          if (precioEnBruto.indexOf("-") === 0) {
            // -50
            precioMin = 0.1;
            precioMax = parseInt(precios[1]);
          } else if (precioEnBruto.indexOf("-") === precioEnBruto.length - 1) {
            // 50-
            precioMin = parseInt(precios[0]);
            precioMax = Infinity;
          } else {
            //50-60
            precioMin = parseInt(precios[0]);
            precioMax = parseInt(precios[1]);
          }
        } else {
          //50
          precioMin = precioMax = precioEnBruto;
        }
      }
    }

    const userId = req.apiUserId;
    let precioMin = undefined,
      precioMax = undefined;
    const filterByTag = req.query.tag;
    const filterByVenta = req.query.venta;
    const filterByNombre = req.query.nombre;

    const skip = req.query.skip;
    const limit = req.query.limit;
    const sort = req.query.sort;
    const fields = req.query.fields;
    const filter = {};

    desglosandoPrecio();

    if (userId) filter.owner = userId;
    if (filterByTag) filter.tags = filterByTag;
    if (filterByVenta) filter.venta = filterByVenta;
    if (filterByNombre)
      filter.nombre = { $regex: new RegExp("^" + filterByNombre) };
    if (precioMin !== undefined && precioMax !== undefined)
      filter.precio = { $gte: precioMin, $lte: precioMax };
    // Determino si renderizo la vista con la información o la devuelvo en formato Json, según el origen
    if (req.originalUrl.startsWith("/api")) {
      const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);
      res.json({ resultado: anuncios });
    } else {
      res.locals.anuncios = await Anuncio.listar(
        filter,
        skip,
        limit,
        sort,
        fields
      );
      // res.render("index", { marca: "Nodepop" });
      res.render("articulos");
    }
  } catch (error) {
    console.log("Error en la petición de /api/anuncios:", error);
    next(error);
  }
});

// GET /api/anuncios/tags
// Devuelve los tags existentes en la BD

router.get("/tags", async (req, res, next) => {
  try {
    const resultado = await Anuncio.distinct("tags");
    res.json({ result: resultado });
  } catch (error) {
    console.log("Error en la petición de /api/anuncios/tags:", error);
    next(error);
  }
});

// GET /api/anuncios/<_id>
// Devuelve el anuncio indicado en la id
router.get("/:id", async (req, res, next) => {
  try {
    const elId = req.params.id;
    const resultado = await Anuncio.findById(elId);
    res.json({ result: resultado });
  } catch (error) {
    console.log("Error en la petición de /api/anuncios/id:", error);
    next(error);
  }
});

// POST /api/anuncios (body)
// Crea un anuncio
// router.post("/", validator.validaBody, upload.single('foto'), async (req, res, next) => {
router.post("/", upload.single('foto'), validator.validaBody, async (req, res, next) => {  
  try {
    validationResult(req).throw(); // genero excepción en caso de error en la validación

    const datos = req.body;
    datos.foto = req.file.filename; //Añado el nombre compuesto de la imagen




    /**
     * Uso de JIMP previo a implementarlo con microservicios
     */
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




    console.log(datos)
    const anuncio = new Anuncio(datos);
    const anuncioInsertado = await anuncio.save();
    res.json({ result: anuncioInsertado });
  }catch (error) {
    console.log("Error en la petición post de /api/anuncios");
    next(error);
  }
});

// DELETE /api/anuncios/<_id>
// Elimina el anuncio indicado por la id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultado = await Anuncio.deleteOne({ _id: id });
    res.json({ estado: resultado });
  } catch (error) {
    console.log("Error en la petición delete de /api/anuncios/id:", error);
    next(error);
  }
});

module.exports = router;
