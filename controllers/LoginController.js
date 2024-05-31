const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); 
const app = require('../app');
const transl = require('i18n');

class LoginController {

  async postAPIJWT(req, res, next) {
    try {
      // const {email, password} = req.body;
      let {email, password} = req.headers;
      //console.log (email);
      const usuario = await Usuario.findOne({ email: email});
      
      if (!usuario) {
        //const error = req.__('Usuario/contraseña incorrecto')       
        res.json({ error: transl.__('Usuario/contraseña incorrecto')});
        return;
      }

      const tokenJWT = await jwt.sign({userId: usuario._id},process.env.JWT_SECRET, { expiresIn: '1h'} ); 
      //res.json({tokenJWT: tokenJWT});
      res.json({tokenJWT});
    
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;