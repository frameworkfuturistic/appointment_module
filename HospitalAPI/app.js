const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/V1/authRoutes');
const blogRoutes = require('./routes/V1/blogRoutes');
const announcementRoutes = require('./routes/V1/announcementRoutes');
const galleryRoutes = require('./routes/V1/galleryRoutes');
const consultantRoutes = require('./routes/V1/consultantScheduleRoutes');
const jobPostingRoutes = require('./routes/V1/jobPostingRoutes');
const jobApplicationRoutes = require('./routes/V1/jobApplicationRoutes');
const contactUsRoutes = require('./routes/V1/contactUsRoutes');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Set security HTTP headers with Helmet
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Make this dynamic for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Use this if your frontend sends cookies or HTTP credentials with requests
}));

// Log HTTP requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting to prevent DDOS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Compress responses for improved performance
app.use(compression());

// Sanitize user input data to prevent XSS
app.use(xss());

// Body parser for parsing JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set 'true' if using https
}));

// ROUTES

app.use('/gallery', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

// Blog routes
app.use('/api/blogs', blogRoutes);

// gallery Routes 
app.use('/api/announcement', announcementRoutes);

// Notice routes
app.use('/api/gallery', galleryRoutes);

// Notice routes
app.use('/api/consultant', consultantRoutes);

app.use('/api/jobs', jobPostingRoutes);
app.use('/api/applications', jobApplicationRoutes);
app.use('/api/contact-us', contactUsRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
