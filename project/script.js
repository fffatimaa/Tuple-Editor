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
    this.form.addEventListener("submit", (e) => this.addData(e));

    this.displayStoredTuples();
  }

  addData(e) {
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

    this.addDataToTable(tuple); //*Calls another method that updates the table visually.
    this.form.reset();
  }

  displayStoredTuples() {
    let tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    tuples.forEach((tuple) => this.addDataToTable(tuple)); //*loops through each saved record.
  }

  addDataToTable(tuple) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${tuple.firstName}</td>
      <td>${tuple.lastName}</td>
      <td>${tuple.phone}</td>
      <td>${tuple.address}</td>
      <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
    `;
    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      row.remove(); 

      let tuples = JSON.parse(localStorage.getItem("tuples")) || [];
      tuples = tuples.filter(
        (t) =>
          !(
            t.firstName === tuple.firstName &&
            t.lastName === tuple.lastName &&
            t.phone === tuple.phone &&
            t.address === tuple.address
          )
      );
      localStorage.setItem("tuples", JSON.stringify(tuples));
    });
     const editBtn = row.querySelector(".edit-btn");
     editBtn.addEventListener("click", () => {
      document.getElementById("firstName").value = tuple.firstName;
      document.getElementById("lastName").value = tuple.lastName;
      document.getElementById("phone").value = tuple.phone;
      document.getElementById("address").value = tuple.address;

      row.remove();
      let tuples = JSON.parse(localStorage.getItem("tuples")) || [];
      tuples = tuples.filter(
        (t) =>
          !(
            t.firstName === tuple.firstName &&
            t.lastName === tuple.lastName &&
            t.phone === tuple.phone &&
            t.address === tuple.address
          )
      );
      localStorage.setItem("tuples", JSON.stringify(tuples));
    });

    this.clearBtn = document.getElementById("clearallBtn");
    this.clearBtn.addEventListener("click", () => {
    localStorage.removeItem("tuples");
    this.tableBody.innerHTML = "";
    
});

    this.tableBody.appendChild(row);
  }
}

const myTupleEditor = new TupleEditor();
