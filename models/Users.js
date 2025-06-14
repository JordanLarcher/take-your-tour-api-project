const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: 8
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE
            validator: function(element) {
                return element === this.password;
            },
            message: 'Password are not the same'
        }
    },
    googleId: { type: String, unique: true, sparse: true }, // For Google OAuth
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password') || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        this.passwordConfirmation = undefined;
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User= mongoose.model('User', userSchema);
module.exports = User;