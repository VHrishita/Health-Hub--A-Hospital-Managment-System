const API_BASE = "http://localhost:5000/api";

// Fetch patients
async function fetchPatients() {
  const res = await fetch(`${API_BASE}/patients`);
  const patients = await res.json();
  const container = document.getElementById("patients-list");
  container.innerHTML = patients.map(p => `
    <p>${p.first_name} ${p.last_name} | ${p.dob} | ${p.gender} | ${p.blood_group} | ${p.contact}</p>
  `).join("");
}

// Add new patient
document.getElementById("add-patient-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const patientData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    blood_group: document.getElementById("blood_group").value,
    contact: document.getElementById("contact").value,
    address: document.getElementById("address").value,
    emergency_contact: document.getElementById("emergency_contact").value,
    patient_type: document.getElementById("patient_type").value
  };

  await fetch(`${API_BASE}/patients/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData)
  });

  fetchPatients();
  e.target.reset();
});

// Load patients on page load
fetchPatients();
