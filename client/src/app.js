const API_BASE = "http://localhost:5000/api";

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// --- Fetch books ---
async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`);
  const books = await res.json();
  const container = document.getElementById("books-list");
  container.innerHTML = books.map(b => `<p>${b.title} by ${b.author} - ${b.available_copies} copies</p>`).join("");
}

// --- Fetch members ---
async function fetchMembers() {
  const res = await fetch(`${API_BASE}/members`);
  const members = await res.json();
  const container = document.getElementById("members-list");
  container.innerHTML = members.map(m => `<p>${m.name} | ${m.email} | ${m.phone}</p>`).join("");
}

// --- Fetch loans ---
async function fetchLoans() {
  const res = await fetch(`${API_BASE}/loan`);
  const loans = await res.json();
  const container = document.getElementById("loan-list");
  container.innerHTML = loans.map(l => `<p>Loan ID: ${l.loan_id} | Member: ${l.member_id} | Book: ${l.book_id} | Status: ${l.status}</p>`).join("");
}

// Load books by default
fetchBooks();
