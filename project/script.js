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
    this.modal = document.getElementById("tupleModal");
    this.closeBtn = document.querySelector(".close-btn");
    this.openBtn = document.getElementById("openModalBtn");

    this.form.addEventListener("submit", (e) => this.addData(e));
    this.openBtn.addEventListener("click", () => this.openModal());
    this.closeBtn.addEventListener("click", () => this.closeModal());

    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    this.displayStoredTuples();
  }

  openModal() {
    this.modal.style.display = "flex";
  }

  closeModal() {
    this.modal.style.display = "none";
    this.form.reset();
  }

  addData(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!firstName || !lastName || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    const tuple = new Tuple(firstName, lastName, phone, address);
    const tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    tuples.push(tuple);
    localStorage.setItem("tuples", JSON.stringify(tuples));

    this.addDataToTable(tuple);
    this.form.reset();
    this.closeModal();
  }

  displayStoredTuples() {
    const tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    tuples.forEach((tuple) => this.addDataToTable(tuple));
  }

  addDataToTable(tuple) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tuple.firstName}</td>
      <td>${tuple.lastName}</td>
      <td>${tuple.phone}</td>
      <td>${tuple.address}</td>
      <td>
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;

    const deleteBtn = row.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () =>{
    
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
      this.openModal();
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
