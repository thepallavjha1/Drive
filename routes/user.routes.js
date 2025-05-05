const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

// to show form
router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('register', { 
            errors: errors.array(),
            message: 'Invalid credentials',
            oldInput: req.body
        });
    }

    const { name, email, password } = req.body;
    console.log(req.body);
    
    // Continue with registration logic here
})

module.exports = router;