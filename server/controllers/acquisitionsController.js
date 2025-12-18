

export const deleteAcquisition = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM acquisitions WHERE acquisition_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Acquisition deleted" });
  });
};
