const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

// to show form
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', [
    body('user_name').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    
    console.log('Form data received:', req.body);
    res.send('User registered successfully!');
}); 

module.exports = router;