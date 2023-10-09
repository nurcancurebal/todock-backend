const mongoose = require('mongoose');

const Model = mongoose.model('User',
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        birthdate: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

module.exports = Model;