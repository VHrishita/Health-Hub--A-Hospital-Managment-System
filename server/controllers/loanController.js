
export const getLoanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM loan WHERE loan_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

Loan = (req, res) =
