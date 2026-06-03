var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(results => {
      res.render('index', { 
        title: 'Restaurante Saboroso!',
        menus: results,
        isHome: true 
      });
  });
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts', {
    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!',
    isHome: false 
  });
});

router.get('/menus', function(req, res, next) {
  menus.getMenus().then(results => {
    res.render('menus', { 
      title: 'Menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      isHome: false 
    });
  })
});

router.get('/reservations', function(req, res, next) {
  reservations.render(req, res);

  res.render('reservations', { 
    title: 'Reservas - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma Mesa!',
    isHome: false 
  });
});

router.post('/reservations', function(req, res, next) {
  if(!req.body.name) {
    reservations.render(req, res, "Digite um nome");
  } else if (!req.body.email) {
    reservations.render(req, res, "Digite um email válido");
  } else if (!req.body.people) {
    reservations.render(req, res, "Escolha um número de pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Digite uma data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Digite um horário");
  } else {
    reservations.save(req.body).then(results=>{
      req.body = {};
      reservations.render(req, res, null, "Reserva realizada!")
    }).catch(err=>{
      reservations.render(req, res, err.message);
    })
  }
});

router.get('/services', function(req, res, next) {
  res.render('services', { // <-- Corrigido para renderizar 'services'
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!',
    isHome: false 
  });
});

module.exports = router;