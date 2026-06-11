var express = require("express");
var users = require("./../inc/users");
var admin = require("./../inc/admin");
var menus = require("./../inc/menus");
var reservations = require("../inc/reservations");
const contacts = require("../inc/contacts");
var emails = require("./../inc/emails");
var moment = require("moment");
var router = express.Router();

module.exports = function(io){
    moment.locale("pt-BR");

    router.use(function(req, res, next){
        if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
            res.redirect("/admin/login");
        } else {
            next();
        }
    });

    router.use(function(req, res, next) {
        req.menus = admin.getMenus(req);
        next();
    });

    router.get("/", async function(req, res, next) {
        try {
            let data = await admin.dashboard();
            res.render("admin/index", admin.getParams(req, {
                data: data 
            }));
        } catch (err) {
            next(err);
        }
    });

    router.get("/dashboard", async function(req, res, next){
        try {
            let data = await reservations.dashboard();
            res.json(data); 
        } catch (err) {
            res.status(500).json(err);
        }
    });

    router.get("/logout", function(req, res, next) {
        delete req.session.user;
        res.redirect("/admin/login");
    });

    router.post("/login", async function(req, res, nxt) {
        if(!req.body.email) {
            users.render(req, res, "Preencha o campo e-mail");
        } else if (!req.body.password) {
            users.render(req, res, "Preencha o campo senha.");
        } else {
            try {
                let user = await users.login(req.body.email, req.body.password);
                req.session.user = user;
                res.redirect("/admin");
            } catch (err) {
                users.render(req, res, err.message || err);
            }
        }
    });

    router.get("/login", function(req, res, next) {
        users.render(req, res, null);
    });

    router.get("/contacts", async function(req, res, next) {
        try {
            let data = await contacts.getContacts();
            res.render("admin/contacts", admin.getParams(req, {
                data
            }));
        } catch (err) {
            next(err);
        }
    });

    router.delete("/contacts/:id", async function(req, res, next){
        try {
            let results = await contacts.delete(req.params.id);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send(err);
        }
    });

    router.get("/emails", async function(req, res, next) {
        try {
            let data = await emails.getEmails();
            res.render("admin/emails", admin.getParams(req, {
                data
            }));
        } catch (err) {
            next(err);
        }
    });

    router.delete("/emails/:id", async function(req, res, next){ 
        try {
            let results = await emails.delete(req.params.id);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send(err);
        }
    });

    router.get("/menus", async function(req, res, next) {
        try {
            let data = await menus.getMenus();
            res.render("admin/menus", admin.getParams(req, {
                data
            }));
        } catch (err) {
            next(err);
        }
    });

    router.post("/menus", async function(req, res, next) {
        try {
            let results = await menus.save(req.fields, req.files);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            console.error("ERRO AO SALVAR O MENU:", err); 
            res.send(err);
        }
    });

    router.delete("/menus/:id", async function(req, res, next){
        try {
            let results = await menus.delete(req.params.id);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send(err);
        }
    });

    router.get("/reservations", async function(req, res, next) {
        let start = (req.query.start) ? req.query.start : moment().subtract(1, "year").format("YYYY-MM-DD");
        let end = (req.query.end) ? req.query.end : moment().format("YYYY-MM-DD");

        try {
            let pag = await reservations.getReservations(req);
            res.render("admin/reservations", admin.getParams(req, {
                date: {
                    start, 
                    end    
                },
                data: pag.data,
                moment,
                links: pag.links
            }));
        } catch (err) {
            next(err);
        }
    });

    router.get("/reservations/chart", async function(req, res, next){
        req.query.start = (req.query.start) ? req.query.start : moment().subtract(1, "year").format("YYYY-MM-DD");
        req.query.end = (req.query.end) ? req.query.end : moment().format("YYYY-MM-DD");

        try {
            let chartData = await reservations.chart(req);
            res.send(chartData);
        } catch (err) {
            next(err);
        }
    });

    router.post("/reservations", async function(req, res, next) {
        try {
            let results = await reservations.save(req.fields, req.files);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            console.error("ERRO AO SALVAR A RESERVA:", err); 
            res.send(err);
        }
    });

    router.delete("/reservations/:id", async function(req, res, next){
        try {
            let results = await reservations.delete(req.params.id);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send(err);
        }
    });

    router.get("/users", async function(req, res, next) {
        try {
            let data = await users.getUsers();
            res.render("admin/users", admin.getParams(req, {
                data
            }));
        } catch (err) {
            next(err);
        }
    });

    router.post("/users", async function(req, res, next) {
        try {
            let results = await users.save(req.fields);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.render("admin/users", admin.getParams(req));
        }
    });

    router.post("/users/password-change", async function(req, res, next){
        try {
            let results = await users.changePassword(req);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send({
                error: err
            });
        }
    });

    router.delete("/users/:id", async function(req, res, next) {
        try {
            let results = await users.delete(req.params.id);
            io.emit('dashboard update');
            res.send(results);
        } catch (err) {
            res.send(err);
        }
    });

    return router;
};