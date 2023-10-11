const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User, Report } = require('../models');


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


router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;  // Extracted from token after authentication
        const reports = await Report.findAll({
            where: {
                userId: userId
            }
        });
        return res.json(reports);
    } catch (error) {
        console.error(`Error fetching reports: ${error}`);
        return res.status(500).json({ error: `Error fetching reports: ${error.message}` });
    }
});

module.exports = router;
