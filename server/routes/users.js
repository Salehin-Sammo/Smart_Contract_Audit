const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to authenticate using JWT
const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({message: 'Access denied. No token provided.'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({message: 'Invalid token.'});
    }
};


router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {attributes: ['id', 'firstName', 'lastName']}); // Only retrieve first and last name
        if (!user) return res.status(404).send({message: 'User not found.'});
        
        res.status(200).send(user);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).send({message: 'Something went wrong.'});
    }
});

router.post('/', async (req, res) => {
  try {
    const { error } = User.validateUser(req.body);  // Using the validateUser function from the User model
    if (error) {
       return res.status(400).send({message: error.details[0].message});
    }

    const user = await User.findOne({ where: { email: req.body.email } });  // Adjusted for Sequelize
    if (user) {
        return res.status(400).send({message: 'User already registered.'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await User.create({...req.body, password: hashedPassword});  // Using Sequelize's create method
    res.status(200).send({message: 'User registered successfully.'});

  } catch (error) {
    console.error('Error details:', error);
    res.status(500).send({message: 'Something went wrong.'});
  }
});

module.exports = router;
