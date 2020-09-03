const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'Participant'
    },
    participantName: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});

module.exports = model('Message', MessageSchema);