const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');

module.exports = {
    async login(req, res) {
        const { name, password } = req.body;
        const admin = await Admin.findOne({ name: name[0].toUpperCase() + name.slice(1) });
        
        //verifica se tal admin está cadastrado
        if (admin) {
            //utiliza o bcrypt para verificar a senha
            bcrypt.compare(password, admin.password, function (err, result) {
                if (result) {
                    return res.json(admin);
                } else {
                    return res.json({ message: 'dados incorretos' });
                }
            });
        }else{
            return res.json({ message: 'admin não cadastrado' });
        }

    }
}