'use strict'
const {query, validationResult, body} = require('express-validator');

const validator = {
  validaQuery:
  [  // array validaciones para get
    query("precio").optional().custom( (valor, {req}) => {
      let validado = false
      const precioEnBruto = req.query.precio;
      if (precioEnBruto.includes("-")){
        const precioDesglosado = precioEnBruto.split("-");
        //Utilizo test en vez de include para poder usar expresiones regulares
        if (!/[a-zA-Z!"/()?¿¡{}[\]_#@]/.test(precioDesglosado[0]) && !/[a-zA-Z!"/()?¿¡{}[\]_#@]/.test(precioDesglosado[1])) {          
          validado = true
        }
      }else if (!isNaN(parseInt(precioEnBruto)) && !/[a-zA-Z!"/()?¿¡{}[\]_#@]/.test(precioEnBruto)){
        validado = true;
      }
      return validado;
    }).withMessage("Ha de ser numérico, con alguno de estos formatos: -50: 50 o menos // 50-: 50 o más // num1-num2 (con num1>num2); ej:50-70; entre 50 y 70 // 50: exactamente 50"),
    query('skip').optional().isNumeric().withMessage("Los parámetros de paginación han de ser numéricos"),
    query('limit').optional().isNumeric().withMessage("Los parámetros de paginación han de ser numéricos"),
    query('tag').optional().isIn(['lifestyle', 'mobile', 'motor', 'work']).withMessage("Valor no válido. Etiquetas válidas: lifestyle, mobile, motor, work ") ,
    query('venta').optional().isBoolean().withMessage("Sólo valores booleanos. True: venta, false: compra")
 ],
 validaBody:
 [  // array validaciones para post
    body('nombre').notEmpty().withMessage("Campo obligatorio").isString().withMessage("El campo debe ser un string"),
    body('venta').notEmpty().withMessage("Campo obligatorio").isBoolean().withMessage("Sólo valores booleanos. True: venta, false: compra"),
    body('precio').notEmpty().withMessage("Campo obligatorio").isNumeric().withMessage("El campo tiene que ser un valor numérico (con o sin decimnales)"),
    body('tags').notEmpty().withMessage("Campo obligatorio").isIn(['lifestyle', 'mobile', 'motor', 'work']).withMessage("Etiqueta inválida. Disponibles: lifestyle, mobile, motor, work ") ,
    body('foto').optional().isString().withMessage("El campo ha de ser un string indicando el nombre completo del archivo de imagen")
 ]
}


module.exports = validator;