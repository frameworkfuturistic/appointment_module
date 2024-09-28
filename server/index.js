const express = require('express');
// const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const departmentRoutes = require('./routes/v1/departmentRoutes');
const doctorRoutes = require('./routes/v1/doctorRoutes');
const slotRoutes = require('./routes/v1/slotRoutes');
const patientRoutes = require('./routes/v1/patientRoutes');
const appointmentRoutes = require('./routes/v1/appointmentRoutes');
const errorHandler = require('./utils/errorHandler');
const colors = require('colors'); // For colorful console messages

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser middleware
// app.use(passport.initialize());
// require('./config/passport')(passport); // Passport configuration

// Department routes
app.use('/api/V1/departments', departmentRoutes);

// Doctor routes
app.use('/api/V1', doctorRoutes);

// Slot routes
app.use('/api/V1/slots', slotRoutes);

// Patient routes
app.use('/api/V1/patients', patientRoutes);

// Appointment routes
app.use('/api/V1/appointments', appointmentRoutes);

// Global error handler
app.use(errorHandler);

// Route to check if the server is running
app.get('/', (req, res) => {
  const message = `
    🚀 Server is up and running!<br>
    🌐 Port: ${PORT}<br>
    🔧 Environment: ${ENVIRONMENT}<br>
    📅 Started on: ${new Date().toLocaleString()}
  `;
  res.status(200).send(`<pre style="font-family:monospace">${message}</pre>`);
});

// Start the server
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log('='.repeat(50).green);
  console.log(`
  🚀 Server is up and running!
  🌐 Port: ${PORT}
  🔧 Environment: ${ENVIRONMENT}
  📅 Started on: ${new Date().toLocaleString()}
  `.bold.green);
  console.log('='.repeat(50).green);
});
