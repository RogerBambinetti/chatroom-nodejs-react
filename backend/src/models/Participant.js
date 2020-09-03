const { Schema, model } = require('mongoose');

const ParticipantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Participant', ParticipantSchema);