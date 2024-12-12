const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const saltRounds = 10

const UserSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model("user", UserSchema)
module.exports = User;