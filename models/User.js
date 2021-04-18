const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    userName:{
    type: String, 
    unique: true, 
    required: 'Must enter a Username',
    trim: true, 
    }, 

    email: {
        type: String, 
        required: 'Must enter an Email',
        unique: true, 
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]

    },

    thoughts: {
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
    }, 

    // friends 

})

// create virutal call friendCOunt that retrieves length of the user friends array 

const User = model('User', UserSchema);

module.exports = User;