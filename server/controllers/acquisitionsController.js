
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
