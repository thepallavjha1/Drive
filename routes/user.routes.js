const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user.models.js');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', [
    body('user_name').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { user_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            user_name,
            email,
            password: hashedPassword
        });
        
        // Save the user to the database
        await newUser.save();
        
        console.log('Form data received:', req.body);
        // Choose only ONE response method
        return res.status(201).json({ 
            message: 'User registered successfully!',
            user: newUser
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            message: 'Registration failed',
            error: error.message
        });
    }
});

module.exports = router;