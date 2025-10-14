class Tuple {
  constructor(firstName, lastName, phone, address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }
}
class TupleEditor {
  constructor() {
    this.form = document.getElementById("tupleForm");
    this.tableBody = document.querySelector(".tupleTable tbody");
    this.form.addEventListener("submit", (e) => this.addTuple(e));

    this.displayStoredTuples();
  }

  addTuple(e) {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (!firstName || !lastName || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    let tuple = new Tuple(firstName, lastName, phone, address);
    let tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    tuples.push(tuple);
    localStorage.setItem("tuples", JSON.stringify(tuples));

    this.addTupleToTable(tuple); //*Calls another method that updates the table visually.
    this.form.reset();
  }

  displayStoredTuples() {
    let tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    tuples.forEach((tuple) => this.addTupleToTable(tuple)); //*loops through each saved record.
  }

  addTupleToTable(tuple) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${tuple.firstName}</td>
      <td>${tuple.lastName}</td>
      <td>${tuple.phone}</td>
      <td>${tuple.address}</td>
    `;
    this.tableBody.appendChild(row);
  }
}

const myTupleEditor = new TupleEditor();
