const mongoose = require('mongoose');

const Model = mongoose.model('TodoItems',
    {
        todoId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
);

module.exports = Model;