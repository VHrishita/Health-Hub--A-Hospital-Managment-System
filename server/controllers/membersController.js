
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
export const deleteMember = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM members WHERE member_id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Member deleted" });
  });
};
