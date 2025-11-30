import db from "../db.js";

export const getLoans = (req, res) => {
  db.query("SELECT * FROM loan", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getLoanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM loan WHERE loan_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

export const createLoan = (req, res) => {
  const { member_id, book_id, issue_date, due_date, return_date, status } = req.body;
  db.query(
    "INSERT INTO loan (member_id, book_id, issue_date, due_date, return_date, status) VALUES (?, ?, ?, ?, ?, ?)",
    [member_id, book_id, issue_date, due_date, return_date, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Loan created", loan_id: result.insertId });
    }
  );
};

export const updateLoan = (req, res) => {
  const { id } = req.params;
  const { member_id, book_id, issue_date, due_date, return_date, status } = req.body;
  db.query(
    "UPDATE loan SET member_id=?, book_id=?, issue_date=?, due_date=?, return_date=?, status=? WHERE loan_id=?",
    [member_id, book_id, issue_date, due_date, return_date, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Loan updated" });
    }
  );
};

export const deleteLoan = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM loan WHERE loan_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Loan deleted" });
  });
};
