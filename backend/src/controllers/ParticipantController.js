const bcrypt = require('bcrypt');

const Participant = require('../models/Participant');

const saltRounds = 10;

module.exports = {
    async store(req, res) {
        const { name, password } = req.body;
        const participantExists = await Participant.findOne({ name: name[0].toUpperCase() + name.slice(1) });

        //verifica se tal participante está cadastrado
        if (participantExists) {
            return res.json({ message: 'participante já cadastrado' });
        } else {
            //utiliza o bcrypt para encriptar a senha
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                const participant = await Participant.create({
                    name: name[0].toUpperCase() + name.slice(1),
                    password: hash
                });
                return res.json(participant);
            });
        }

    }
}