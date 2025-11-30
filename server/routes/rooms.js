import express from 'express';
import db from '../db.js';
const router = express.Router();

// Add room
router.post('/add', async (req, res) => {
    const { room_number, room_type, capacity } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO rooms (room_number, room_type, capacity) VALUES (?, ?, ?)`,
            [room_number, room_type, capacity]
        );
        res.json({ success: true, room_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all rooms
router.get('/all', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM rooms');
    res.json(rows);
});

export default router;
