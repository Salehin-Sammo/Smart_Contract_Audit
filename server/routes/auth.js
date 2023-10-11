const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Import bcryptjs module
const { User } = require('../models'); // Assuming you're exporting all models from an index file
const Joi = require('joi');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user)
            return res.status(401).send({ message: 'Invalid email or password.' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: 'Invalid email or password.' });

        const token = user.generateAuthToken();
        res.status(200).send({ token, message: 'Login successful.' });

    } catch (error) {
        res.status(500).send({ message: 'Something went wrong.' });
    }
});

const validate = (data) => {
    const Schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).required().label('Password'),
    });
    return Schema.validate(data);
};

module.exports = router;
