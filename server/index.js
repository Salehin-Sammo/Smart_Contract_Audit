require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const UploadContractRoutes = require('./routes/uploadContracts');
const parseAndSaveRoutes = require('./routes/parseAndSave')
const previousReportRoutes = require('./routes/previousReport');

// Use morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}

// Middleware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

// DB connection
const db = require('./models');

app.use(cors(corsOptions)); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', UploadContractRoutes);
app.use('/api/parseAndSave', parseAndSaveRoutes);
app.use('/api/previousReport', previousReportRoutes);
app.use('/slither_output', express.static(path.join(__dirname, 'slither_output')));

const port = process.env.PORT || 8080;

// Initialize the DB and then start the server
db.sequelize.sync()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
