const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    email_id: {
        type: String,
        unique: true
    },
    password: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('Users', UsersSchema);
