const API_BASE = "http://localhost:3000/api";

async function postData(url, data) {
    try {
        const response = await fetch(`${API_BASE}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        alert("Error sending data to server");
    }
}

async function fetchData(url) {
    try {
        const res = await fetch(`${API_BASE}${url}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

const patientForm = document.querySelector("#patientForm");
const patientsTable = document.querySelector("#patientsTable tbody");

if(patientForm) {
    patientForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(patientForm));
        data.hospital_id = 1; // default hospital
        const res = await postData("/patients/add", data);
        if(res && res.success) {
            alert("Patient added!");
            patientForm.reset();
            loadPatients();
        }
    });

    async function loadPatients() {
        const patients = await fetchData("/patients/all");
        patientsTable.innerHTML = "";
        patients.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${p.patient_id}</td><td>${p.first_name}</td><td>${p.last_name}</td><td>${p.dob}</td><td>${p.gender}</td><td>${p.patient_type}</td><td>${p.contact}</td>`;
            patientsTable.appendChild(tr);
        });
    }
    loadPatients();
}

const doctorForm = document.querySelector("#doctorForm");
const doctorsTable = document.querySelector("#doctorsTable tbody");

if(doctorForm) {
    doctorForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(doctorForm));
        data.hospital_id = 1;
        const res = await postData("/doctors/add", data);
        if(res && res.success) {
            alert("Doctor added!");
            doctorForm.reset();
            loadDoctors();
        }
    });

    async function loadDoctors() {
        const doctors = await fetchData("/doctors/all");
        doctorsTable.innerHTML = "";
        doctors.forEach(d => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${d.doctor_id}</td><td>${d.first_name}</td><td>${d.last_name}</td><td>${d.dob}</td><td>${d.gender}</td><td>${d.specialization}</td><td>${d.contact}</td>`;
            doctorsTable.appendChild(tr);
        });
    }
    loadDoctors();
}

const prescriptionForm = document.querySelector("#prescriptionForm");
const prescriptionsTable = document.querySelector("#prescriptionsTable tbody");

if(prescriptionForm) {
    prescriptionForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(prescriptionForm));
        const res = await postData("/prescriptions/add", data);
        if(res && res.success) {
            alert("Prescription added!");
            prescriptionForm.reset();
            loadPrescriptions();
        }
    });

    async function loadPrescriptions() {
        const prescriptions = await fetchData("/prescriptions/all");
        prescriptionsTable.innerHTML = "";
        prescriptions.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${p.prescription_id}</td><td>${p.patient_id}</td><td>${p.doctor_id}</td><td>${p.medicine}</td><td>${p.dosage}</td><td>${p.frequency}</td><td>${p.duration}</td><td>${p.instructions}</td><td>${p.created_at}</td>`;
            prescriptionsTable.appendChild(tr);
        });
    }
    loadPrescriptions();
}

const roomForm = document.querySelector("#roomForm");
const roomsTable = document.querySelector("#roomsTable tbody");

if(roomForm) {
    roomForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(roomForm));
        const res = await postData("/rooms/add", data);
        if(res && res.success) {
            alert("Room added!");
            roomForm.reset();
            loadRooms();
        }
    });

    async function loadRooms() {
        const rooms = await fetchData("/rooms/all");
        roomsTable.innerHTML = "";
        rooms.forEach(r => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${r.room_id}</td><td>${r.room_number}</td><td>${r.room_type}</td><td>${r.capacity}</td>`;
            roomsTable.appendChild(tr);
        });
    }
    loadRooms();
}

const supplierForm = document.querySelector("#supplierForm");
const suppliersTable = document.querySelector("#suppliersTable tbody");

if(supplierForm) {
    supplierForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(supplierForm));
        const res = await postData("/suppliers/add", data);
        if(res && res.success) {
            alert("Supplier added!");
            supplierForm.reset();
            loadSuppliers();
        }
    });

    async function loadSuppliers() {
        const suppliers = await fetchData("/suppliers/all");
        suppliersTable.innerHTML = "";
        suppliers.forEach(s => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${s.supplier_id}</td><td>${s.name}</td><td>${s.contact}</td><td>${s.address}</td>`;
            suppliersTable.appendChild(tr);
        });
    }
    loadSuppliers();
}

const userForm = document.querySelector("#userForm");
const usersTable = document.querySelector("#usersTable tbody");

if(userForm) {
    userForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(userForm));
        const res = await postData("/users/add", data);
        if(res && res.success) {
            alert("User added!");
            userForm.reset();
            loadUsers();
        }
    });

    async function loadUsers() {
        const users = await fetchData("/users/all");
        usersTable.innerHTML = "";
        users.forEach(u => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${u.user_id}</td><td>${u.username}</td><td>${u.role}</td>`;
            usersTable.appendChild(tr);
        });
    }
    loadUsers();
}

const appointmentForm = document.querySelector("#appointmentForm");
const appointmentsTable = document.querySelector("#appointmentsTable tbody");

if(appointmentForm) {
    appointmentForm.addEventListener("submit", async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(appointmentForm));
        const res = await postData("/appointments/add", data);
        if(res && res.success) {
            alert("Appointment added!");
            appointmentForm.reset();
            loadAppointments();
        }
    });

    async function loadAppointments() {
        const appointments = await fetchData("/appointments/all");
        appointmentsTable.innerHTML = "";
        appointments.forEach(a => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${a.appointment_id}</td>
                <td>${a.patient_name}</td>
                <td>${a.doctor_name}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
                <td>${a.status}</td>
            `;
            appointmentsTable.appendChild(tr);
        });
    }
    loadAppointments();
}


document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("doctorsTable"); // change ID here
    exportTableToCSV(table, "doctors.csv");
});

document.getElementById("exportPDF").addEventListener("click", function() {
    const table = document.getElementById("doctorsTable"); // change ID here
    exportTableToPDF(table, "doctors.pdf");
});

function exportTableToCSV(table, filename){
    let csv = [];
    table.querySelectorAll("tr").forEach(row => {
        let rowData = [];
        row.querySelectorAll("th, td").forEach(cell => rowData.push('"' + cell.innerText + '"'));
        csv.push(rowData.join(","));
    });
    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvFile);
    link.download = filename;
    link.click();
}

function exportTableToPDF(table, filename){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let head = [], body = [];
    table.querySelectorAll("thead tr th").forEach(th => head.push(th.innerText));
    table.querySelectorAll("tbody tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("td").forEach(td => row.push(td.innerText));
        body.push(row);
    });
    doc.autoTable({ head: [head], body: body, startY: 20 });
    doc.save(filename);
}
document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("patientsTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("patients.pdf");
});
document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("patientsTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "patients.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});


document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("appointmentsTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("appointments.pdf");
});

document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("prescriptionsTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("prescriptions.pdf");
});


document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("suppliersTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("suppliers.pdf");
});

document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("roomsTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("rooms.pdf");
});

document.getElementById("exportPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById("usersTable");
    let rows = [];
    table.querySelectorAll("tr").forEach(tr => {
        let row = [];
        tr.querySelectorAll("th, td").forEach(td => row.push(td.innerText));
        rows.push(row);
    });atients

    doc.autoTable({
        head: [rows[0]],
        body: rows.slice(1)
    });

    doc.save("users.pdf");
});

document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("appointmentsTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "appointments.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("prescriptionsTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "prescriptions.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("suppliersTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "suppliers.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("roomsTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "rooms.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
document.getElementById("exportCSV").addEventListener("click", function() {
    const table = document.getElementById("usersTable");
    let csv = [];
    const rows = table.querySelectorAll("tr");
    
    rows.forEach(row => {
        const cols = row.querySelectorAll("th, td");
        const rowData = [];
        cols.forEach(col => rowData.push('"' + col.innerText + '"'));
        csv.push(rowData.join(","));
    });

    const csvFile = new Blob([csv.join("\n")], {type: "text/csv"});
    const downloadLink = document.createElement("a");
    downloadLink.download = "users.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
});
