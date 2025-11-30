import db from "../db.js";

export const getFines = (req, res) => {
  db.query("SELECT * FROM fines", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getFineById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM fines WHERE fine_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

export const createFine = (req, res) => {
  const { loan_id, member_id, amount, paid_status } = req.body;
  db.query(
    "INSERT INTO fines (loan_id, member_id, amount, paid_status) VALUES (?, ?, ?, ?)",
    [loan_id, member_id, amount, paid_status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Fine created", fine_id: result.insertId });
    }
  );
};

export const updateFine = (req, res) => {
  const { id } = req.params;
  const { loan_id, member_id, amount, paid_status } = req.body;
  db.query(
    "UPDATE fines SET loan_id=?, member_id=?, amount=?, paid_status=? WHERE fine_id=?",
    [loan_id, member_id, amount, paid_status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Fine updated" });
    }
  );
};

export const deleteFine = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM fines WHERE fine_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Fine deleted" });
  });
};
