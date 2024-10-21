// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();



connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Use this if your frontend sends cookies or HTTP credentials with requests
  }));
  

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  //ROUTE BLOG
app.use('/api', blogRoutes);

//ROUTE NOTICE
app.use('/api/notice', noticeRoutes); // Make sure this path is correct

app.use(errorHandler);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
