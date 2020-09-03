const Message = require('../models/Message');

module.exports = {
    async store(req, res) {
        const { text, participant, participantName, createdAt } = req.body;

        const message = await Message.create({
            text,
            participant,
            participantName,
            createdAt
        });

        return res.json(message);

    },

    async delete(req, res) {
        const { id } = req.query;
        await Message.deleteOne({ _id: id }, async function (err) {
            if (err) {
                console.log(err);
            } else {
                const messages = await Message.find();
                return res.json(messages);
            }
        });
    },

    async index(req, res) {
        const messages = await Message.find();

        return res.json(messages);
    },

    async indexByName(req, res) {
        const { name } = req.query;
        const messages = await Message.find({ participantName: name });
        return res.json(messages);
    },

    async indexByDate(req, res) {
        const { date } = req.query;
        const filterDate = new Date(date);
        const messages = await Message.find();
        const filteredMessages = messages.filter((message) => {
            const messageDate = new Date(message.createdAt);
            if (messageDate.getUTCDate() == filterDate.getUTCDate() && messageDate.getMonth() == filterDate.getMonth() && messageDate.getUTCFullYear() == filterDate.getUTCFullYear()) {
                return true;
            }
        });
        return res.json(filteredMessages);
    }

}