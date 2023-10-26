const mongoose = require('mongoose');

const Model = mongoose.model('TodoItem',
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
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