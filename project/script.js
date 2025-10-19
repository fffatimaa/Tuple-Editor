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
    this.modal = document.getElementById("tupleModal");
    this.closeBtn = document.querySelector(".close-btn");
    this.openBtn = document.getElementById("openModalBtn");
    this.tableBody = document.querySelector(".tupleTable tbody");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");

    this.currentPage = 1;
    this.rowsPerPage = 10;

    this.form.addEventListener("submit", (e) => this.addData(e));
    this.openBtn.addEventListener("click", () => this.openModal());
    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.prevBtn.addEventListener("click", () => this.prevPage());
    this.nextBtn.addEventListener("click", () => this.nextPage());

    this.clearBtn = document.getElementById("clearallBtn");
    this.clearBtn.addEventListener("click", () => {
      localStorage.removeItem("tuples");
      this.tableBody.innerHTML = "";
      this.displayTuplesWithButtons(); 
    });

    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    this.displayTuplesWithButtons();
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

    this.closeModal();
    this.displayTuplesWithButtons();
  }

  displayTuplesWithButtons() {
    const tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    const totalPages = Math.ceil(tuples.length / this.rowsPerPage);

    if (this.currentPage > totalPages && totalPages > 0) {
      this.currentPage = totalPages;
    }

    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    const pageTuples = tuples.slice(start, end);

    this.tableBody.innerHTML = "";

    pageTuples.forEach((tuple) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="First Name">${tuple.firstName}</td>
        <td data-label="Last Name">${tuple.lastName}</td>
        <td data-label="Phone">${tuple.phone}</td>
        <td data-label="Address">${tuple.address}</td>
      
        <td>
          <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
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
        this.displayTuplesWithButtons();
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

      this.tableBody.appendChild(row);
    });

    this.prevBtn.disabled = this.currentPage === 1;
    this.nextBtn.disabled = this.currentPage >= totalPages || totalPages === 0;
  }

  nextPage() {
    const tuples = JSON.parse(localStorage.getItem("tuples")) || [];
    if (this.currentPage * this.rowsPerPage < tuples.length) {
      this.currentPage++;
      this.displayTuplesWithButtons();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayTuplesWithButtons();
    }
  }
}
const myTupleEditor = new TupleEditor();
