

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year_published, available_copies } = req.body;
  db.query(
    "UPDATE books SET title=?, author=?, genre=?, year_published=?, available_copies=? WHERE book_id=?",
    [title, author, genre, year_published, available_copies, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book updated" });
    }
  );
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE book_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
};
