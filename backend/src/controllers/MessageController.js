const Message = require('../models/Message');

module.exports = {
    async store(req, res) {
        const { text, participant, participantName, createdAt} = req.body;

        const message = await Message.create({
            text,
            participant,
            participantName,
            createdAt
        });

        return res.json(message);

    },

    async delete(req, res) {
        const { id } = req.body;
        await Message.deleteOne({ _id: id }, function (err) {
            if (err) {
                console.log(err);
            } else {
                return res.json({ message: 'mensagem deletada' });
            }
        });
    },

    async index(req,res){
        const messages = await Message.find();

        return res.json(messages);
    }

}