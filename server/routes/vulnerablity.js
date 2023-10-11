// Assuming you have Express.js for backend
const express = require('express');
const router = express.Router();

router.get('/get-vulnerabilities', async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findAll();
        res.json({ success: true, vulnerabilities });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch vulnerabilities' });
    }
});

module.exports = router;
