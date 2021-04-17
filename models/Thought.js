const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        maxlength: 280
    },
    createdAt:{
    type: Date,
    default: Date.now, 
    // add getter method to format timestamp
    },

    userName: {
        type: String, 
        required: true
    },
    reactions: [ReactionsSchema]
})

// Virtual to retrieve length of thoughts

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;