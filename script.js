
let internships = JSON.parse(localStorage.getItem("internships")) || [];

const form = document.getElementById("internshipForm");
const table = document.getElementById("internshipList");

// Display internships in the table
function showInternships() {
    table.innerHTML = "";

    for (let i = 0; i < internships.length; i++) {
        let item = internships[i];
        let row = table.insertRow();

        row.insertCell(0).textContent = item.company;
        row.insertCell(1).textContent = item.role;
        row.insertCell(2).textContent = item.deadline || "Not set";

        let statusCell = row.insertCell(3);
        let status = document.createElement("select");

        let options = ["Pending", "Applied", "Selected"];

        for (let j = 0; j < options.length; j++) {
            let option = document.createElement("option");
            option.value = options[j];
            option.textContent = options[j];
            status.appendChild(option);
        }

        status.value = item.status;

        status.onchange = function () {
            item.status = status.value;
            saveInternships();
        };

        statusCell.appendChild(status);
    }
}

// Save internships in the browser
function saveInternships() {
    localStorage.setItem("internships", JSON.stringify(internships));
}

// Add an internship when the form is submitted
form.onsubmit = function (event) {
    event.preventDefault();

    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let link = document.getElementById("link").value;
    let deadline = document.getElementById("deadline").value;

    let internship = {
        company: company,
        role: role,
        link: link,
        deadline: deadline,
        status: "Pending"
    };

    internships.push(internship);

    saveInternships();
    showInternships();
    form.reset();
};

showInternships();
