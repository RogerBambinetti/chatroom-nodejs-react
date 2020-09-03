const bcrypt = require('bcrypt');

const Participant = require('../models/Participant');

module.exports = {
    async login(req, res) {
        const { name, password } = req.body;
        const participant = await Participant.findOne({ name: name[0].toUpperCase() + name.slice(1) });
        
        //verifica se tal participante está cadastrado
        if (participant) {
            //utiliza o bcrypt para verificar a senha
            bcrypt.compare(password, participant.password, function (err, result) {
                if (result) {
                    return res.json(participant);
                } else {
                    return res.json({ message: 'dados incorretos' });
                }
            });
        }else{
            return res.json({ message: 'participante não cadastrado' });
        }

    }
}