const db = require('../connection')
const jwt = require("jsonwebtoken");


const login = (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const sql = `SELECT * FROM companies where username ='${username}' && password = '${password}' `;
        console.log(sql)
        db.query(sql, (err, fields) => {
            console.log(fields);

            let hasil = fields;
            if (err) throw err;
            if (fields < 0) {
                res.status(404).json({
                    message: 'Password tidak sama!',
                    success: false,
                    data: null,
                });
            }

            token = jwt.sign({
                id: fields.id
            }, 'secretkey');

            res.status(201).json({
                message: 'Signup berhasil',
                success: true,
                data: hasil,
                token: token
            });
        })

    } catch (error) {
        console.log(error)
    }
}




module.exports = { login };