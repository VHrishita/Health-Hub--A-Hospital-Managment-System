import express from 'express';
import db from '../db.js';
const router = express.Router();

// Add prescription
router.post('/add', async (req, res) => {
    const { patient_id, doctor_id, medicine, dosage, frequency, duration, instructions } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO prescriptions 
            (patient_id, doctor_id, medicine, dosage, frequency, duration, instructions)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [patient_id, doctor_id, medicine, dosage, frequency, duration, instructions]
        );
        res.json({ success: true, prescription_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all prescriptions
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM prescriptions');
    res.json(rows);
});

export default router;
