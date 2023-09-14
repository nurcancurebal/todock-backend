const mongoose = require('mongoose');

const Model = mongoose.model('Todos',
    {
        title: {
            type: String,
            required: true
        }
    }
);

module.exports = Model;