import db from "../db.js";

export const getAcquisitions = (req, res) => {
  db.query("SELECT * FROM acquisitions", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const getAcquisitionById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM acquisitions WHERE acquisition_id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

export const createAcquisition = (req, res) => {
  const { book_id, supplier_id, purchase_date, cost } = req.body;
  db.query(
    "INSERT INTO acquisitions (book_id, supplier_id, purchase_date, cost) VALUES (?, ?, ?, ?)",
    [book_id, supplier_id, purchase_date, cost],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Acquisition created", acquisition_id: result.insertId });
    }
  );
};

export const updateAcquisition = (req, res) => {
  const { id } = req.params;
  const { book_id, supplier_id, purchase_date, cost } = req.body;
  db.query(
    "UPDATE acquisitions SET book_id=?, supplier_id=?, purchase_date=?, cost=? WHERE acquisition_id=?",
    [book_id, supplier_id, purchase_date, cost, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Acquisition updated" });
    }
  );
};

export const deleteAcquisition = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM acquisitions WHERE acquisition_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Acquisition deleted" });
  });
};
