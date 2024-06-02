class LangController {

  changeLocale(req, res, next){
    const locale = req.params.locale;

    // paso el idioma a una cookie y refresco la página de la que vengo

    res.cookie("chollopop-locale", locale, {
      maxAge: 1000*60*60*24  //está en milisegundos -> 24 horas
    })

    res.redirect('back'); // redirige a la página de la que venimos por medio de la cabecera 'referer'
  }

}

module.exports = LangController;