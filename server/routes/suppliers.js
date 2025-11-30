import express from 'express';
import db from '../db.js';
const router = express.Router();

// Add supplier
router.post('/add', async (req, res) => {
    const { name, contact, address } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO suppliers (name, contact, address) VALUES (?, ?, ?)`,
            [name, contact, address]
        );
        res.json({ success: true, supplier_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all suppliers
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM suppliers');
    res.json(rows);
});

export default router;
