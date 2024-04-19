const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let userSchema =
    new Schema(
        {
            username: {
                type: String
            },
            email: {
                type: String
            },
            phoneno: {
                type: Number
            }
        },
        {
            collection: 'users'
        })
 
module.exports =
    mongoose.model('User', userSchema);