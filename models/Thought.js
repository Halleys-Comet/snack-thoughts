const { Schema, model} = require('mongoose');
const ReactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // add getter method to format timestamp
        get: createdAtVal => dateFormat(createdAtVal)
    },

    userName: {
        type: String,
        required: true
    },
    userId: {
        type:String
    },
    reactions: [ReactionSchema]
},
{
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
    
);

// Virtual to retrieve length of thoughts
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;