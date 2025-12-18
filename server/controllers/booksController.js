

export const deleteBook = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE book_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
};
