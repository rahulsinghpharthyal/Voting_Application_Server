import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensure email uniqueness
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email format validation
    },
    age: {
        type: Number, 
        required: [true, 'Age is required'],
        min: [18, 'You must be at least 18 years old'],
        max: [100, 'You must be at most 100 years old']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'voter'],
        default: 'voter'
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;
