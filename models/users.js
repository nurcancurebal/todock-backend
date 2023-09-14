const mongoose = require('mongoose');

const Model = mongoose.model('User',
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        birthdate: {
            type: String,
            required: true
        }
    }
);

module.exports = Model;