import express from 'express';
import db from '../db.js';
const router = express.Router();
router.post('/add', async (req, res) => {
    const { hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, specialization } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO doctors 
            (hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, specialization)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [hospital_id, first_name, last_name, dob, gender, blood_group, contact, address, specialization]
        );
        res.json({ success: true, doctor_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all doctors
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM doctors');
    res.json(rows);
});

export default router;
