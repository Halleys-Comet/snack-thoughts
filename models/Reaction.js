const { Schema, Types } = Require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxlength: 280
    },
    userName: {
        type: String, 
        required: true, 
    },

    createdAt: {
        type: Date, 
        default: Date.now, 
        // user getter method to format timestamp
    }
})



module.exports = ReactionSchema; 