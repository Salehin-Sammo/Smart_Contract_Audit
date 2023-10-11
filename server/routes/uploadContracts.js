const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const extnameCheck = /.sol/;
const mimetypeCheck = /application\/octet-stream/;

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const extname = extnameCheck.test(path.extname(file.originalname).toLowerCase());
        const mimetype = mimetypeCheck.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only .sol files are allowed!');
    }
}).single('contract');

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(`Upload error: ${err}`);
            return res.status(400).json({ error: err });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        const resultsDir = path.join(__dirname, '..', 'slither_output');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir);
        }
        const resultFilePath = path.join(resultsDir, `${Date.now()}_result.md`);

        try {
            const slitherCmd = spawnSync('slither', [filePath, '--checklist'], {
                encoding: 'utf8'
            });

            console.log(slitherCmd.stdout);
            if (slitherCmd.stderr) {
                console.error(slitherCmd.stderr);
            }

            fs.writeFileSync(resultFilePath, slitherCmd.stdout);

            if (slitherCmd.status === 0) {
                res.json({ 
                    success: true, 
                    message: 'Slither executed successfully', 
                    filename: path.basename(resultFilePath),
                    downloadLink: `/downloads/${path.basename(resultFilePath)}`
                });
            } else {
                res.json({ 
                    success: true, 
                    message: 'Slither executed Successfully', 
                    warnings: slitherCmd.stdout, 
                    filename: path.basename(resultFilePath),
                    downloadLink: `/downloads/${path.basename(resultFilePath)}`
                });
            }
        } catch (error) {
            console.error(`Error running slither: ${error}`);
            return res.status(500).json({ error: 'Error processing file' });
        }
    });
});

router.get('/downloads/:filename', (req, res) => {
    const filePath = path.join(__dirname, '..', 'slither_output', req.params.filename);
    res.download(filePath);
});

module.exports = router;
