const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');

const saltRounds = 10;

module.exports = {
    async store(req, res) {
        const { name, password } = req.body;
        const adminExists = await Admin.findOne({ name: name[0].toUpperCase() + name.slice(1) });

        //verifica se tal admin está cadastrado
        if (adminExists) {
            return res.json({ message: 'admin já cadastrado' });
        } else {
            //utiliza o bcrypt para encriptar a senha
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                const admin = await Admin.create({
                    name: name[0].toUpperCase() + name.slice(1),
                    password: hash
                });
                return res.json(admin);
            });
        }

    }
}