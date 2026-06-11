var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var router = express.Router();

module.exports = function(io) {
  /* GET home page. */
  router.get('/', async function(req, res, next) {
    try {
      let results = await menus.getMenus();
      let menusDestaque = results.sort(() => 0.5 - Math.random()).slice(0, 3);

      res.render('index', { 
        title: 'Restaurante Saboroso!',
        menus: menusDestaque, 
        isHome: true,
        background: 'images/img_bg_1.jpg'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/contacts', function(req, res, next) {
    contacts.render(req, res);
  });

  router.post('/contacts', async function(req, res, next) {
    if (!req.body.name) {
      contacts.render(req, res, 'Digite o nome');
    } else if(!req.body.email) {
      contacts.render(req, res, 'Digite o email');
    } else if(!req.body.message) {
      contacts.render(req, res, 'Digite a mensagem');
    } else {
      try {
        let results = await contacts.save(req.body);
        req.body = {};
        io.emit('dashboard update');
        contacts.render(req, res, null, "Contato enviado com sucesso!");
      } catch (err) {
        contacts.render(req, res, err.message);
      }
    }
  });

  router.get('/menus', async function(req, res, next) {
    try {
      let results = await menus.getMenus();
      res.render('menus', { 
        title: 'Menus - Restaurante Saboroso!',
        background: 'images/img_bg_1.jpg',
        h1: 'Saboreie nosso menu!',
        isHome: false 
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/reservations', function(req, res, next) {
      res.render('reservations', {
          title: 'Reservas - Restaurante Saboroso',
          background: 'images/img_bg_2.jpg',
          h1: 'Reserve uma Mesa!',
          body: {} 
      });
  });

  router.post('/reservations', async function(req, res, next) {
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
      try {
        let results = await reservations.save(req.body);
        req.body = {};
        io.emit('dashboard update');
        reservations.render(req, res, null, "Reserva realizada!");
      } catch (err) {
        reservations.render(req, res, err.message);
      }
    }
  });

  router.get('/services', function(req, res, next) {
    res.render('services', { 
      title: 'Serviços - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'É um prazer poder servir!',
      isHome: false 
    });
  });

  router.post("/subscribe", async function(req, res, next) {
    try {
      let results = await emails.save(req);
      res.send(results); 
    } catch (err) {
      res.send(err);
    }
  });

  return router;
};