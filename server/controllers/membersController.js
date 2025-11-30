import db from "../db.js";

// Get all members
export const getMembers = (req, res) => {
  db.query("SELECT * FROM members", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get member by ID
export const getMemberById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM members WHERE member_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

// Create member
export const createMember = (req, res) => {
  const { name, email, phone, membership_date } = req.body;
  db.query(
    "INSERT INTO members (name, email, phone, membership_date) VALUES (?, ?, ?, ?)",
    [name, email, phone, membership_date],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Member created", member_id: result.insertId });
    }
  );
};

// Update member
export const updateMember = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, membership_date } = req.body;
  db.query(
    "UPDATE members SET name=?, email=?, phone=?, membership_date=? WHERE member_id=?",
    [name, email, phone, membership_date, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Member updated" });
    }
  );
};

// Delete member
export const deleteMember = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM members WHERE member_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Member deleted" });
  });
};
