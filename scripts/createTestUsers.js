const mongoose = require('mongoose');
const User = require('../models/userModel');
const connectDB = require('../utils/db');

const createTestUsers = async () => {
    await connectDB();

    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
        { username: 'user3', password: 'password3' }
    ];

    for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
    }

    console.log('Test users created');
    mongoose.connection.close();
};

createTestUsers();
