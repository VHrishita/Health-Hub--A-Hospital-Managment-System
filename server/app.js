import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import prescriptionRoutes from './routes/prescriptions.js';
import roomRoutes from './routes/rooms.js';
import supplierRoutes from './routes/suppliers.js';
import userRoutes from './routes/users.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/users', userRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// API routes
app.use("/api/users", require("./routes/users"));
app.use("/api/patients", require("./routes/patients"));
// add other routes similarly

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Serve frontend
app.use(express.static('client/src'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
