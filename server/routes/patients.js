import express from 'express';
import db from '../db.js';
const router = express.Router();
const patients = await fetch("https://health-hub-a-hospital-managment-system.onrender.com/api/patients/all");

// Add patient
router.post('/add', async (req, res) => {
    const { hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, emergency_contact, patient_type } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO patients 
            (hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, emergency_contact, patient_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, emergency_contact, patient_type]
        );
        res.json({ success: true, patient_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all patients
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM patients');
    res.json(rows);
});

export default router;
