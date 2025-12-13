import db from "../db.js";

export const getBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get single book
export const getBookById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM books WHERE book_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

// Create book
export const createBook = (req, res) => {
  const { title, author, genre, year_published, available_copies } = req.body;
  db.query(
    "INSERT INTO books (title, author, genre, year_published, available_copies) VALUES (?, ?, ?, ?, ?)",
    [title, author, genre, year_published, available_copies],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book created", book_id: result.insertId });
    }
  );
};

// Update book
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

// Delete book
export const deleteBook = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE book_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
};
