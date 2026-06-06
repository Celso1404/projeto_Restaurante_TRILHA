var conn = require("./db");

module.exports = {
    render(req, res, error) {
        res.render("admin/login", {
            body: req.body,
            error
        });
    },

    login(email, password) {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, [
                email
            ], (err, results) => {
                if(err) {
                    return reject(err);
                } 
                if (results.length === 0) {
                    return reject({
                        message: "Usuário ou senha incorretos."
                    });
                } 
                let row = results[0];
                if (row.password !== password) {
                    return reject({
                        message: "Usuário ou senha incorretos."
                    });
                } else {
                    return resolve(row);
                }
            });
        });
    }
};