import express from 'express';
import db from '../db.js';
const router = express.Router();
router.post('/add', async (req, res) => {
    const { patient_id, doctor_id, appointment_date, status } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO appointments 
            (patient_id, doctor_id, appointment_date, status)
            VALUES (?, ?, ?, ?)`,
            [patient_id, doctor_id, appointment_date, status]
        );
        res.json({ success: true, appointment_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all appointments
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM appointments');
    res.json(rows);
});

export default router;
