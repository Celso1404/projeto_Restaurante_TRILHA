const { param } = require("../routes");
var conn = require("./db");
var bcrypt = require("bcrypt");

module.exports = {
    render(req, res, error) {
        res.render('admin/login', {
            error,
            body: req.body || {} 
        });
    },

    login(email, password) {
        return new Promise((resolve, reject) => {
            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, [email], async (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    reject(new Error("Usuário ou senha incorretos."));
                } else {
                    let row = results[0];
                    try {
                        let match = await bcrypt.compare(password, row.password);
                        
                        if (!match && password === row.password) {
                            match = true; 
                        }
                        if (!match) {
                            reject(new Error("Usuário ou senha incorretos."));
                        } else {
                            resolve(row);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            });
        });
    },

    getUsers() {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM tb_users ORDER BY name`, (err, results)=> {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    save(fields, files) {
        return new Promise(async (resolve, reject)=> {
            let query, params = [
                fields.name,
                fields.email
            ];

            if(parseInt(fields.id) > 0) {
                params.push(fields.id);
                query = `
                    UPDATE tb_users
                    SET name = ?, email = ?
                    WHERE id = ?    
                `;
                conn.query(query, params, (err, results)=> { 
                    if(err) reject(err);
                    else resolve(results);
                });

            } else {
                query = `
                    INSERT INTO tb_users (name, email, password)
                    VALUES(?, ?, ?)
                `;
                try {
                    let hash = await bcrypt.hash(fields.password, 10);
                    params.push(hash);
                    
                    conn.query(query, params, (err, results)=> { 
                        if(err) reject(err);
                        else resolve(results);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    },

    delete(id) {
        return new Promise((resolve, reject)=> {
            conn.query(`DELETE FROM tb_users WHERE id = ?`, [id], (err, results)=> {
                if (err) reject(err);
                else resolve(results);
            })
        })
    },

    changePassword(req) {
        return new Promise(async (resolve, reject)=> {
            if(!req.fields.password) {
                reject(new Error("Preencha a senha."));
            } else if (req.fields.password !== req.fields.passwordConfirm) {
                reject(new Error("Confirme a senha corretamente."));
            } else {
                try {
                    let hash = await bcrypt.hash(req.fields.password, 10);
                    conn.query(`
                        UPDATE tb_users
                        SET password = ? 
                        WHERE id = ?
                    `, [hash, req.fields.id], (err, results)=> {
                        if (err) reject(err);
                        else resolve(results);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        })
    }
};