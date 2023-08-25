"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

const petArr = [];

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 2, 2),
};

petArr.push(data1);
petArr.push(data2);
renderTableData(petArr);

// BẮT SỰ KIỆN NÚT SUBMIT
// THỰC HIỆN:
submitBtn.addEventListener("click", function () {
  // 1. LẤY DỮ LIỆU TỪ CÁC FORM INPUT
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };
  // console.log(data);

  // 2. VALIDATE DỮ LIỆU
  // Nếu hợp lệ thì thực hiện 3,4,5
  // K hợp lệ thì thông báo dữ liệu k hợp lệ.

  const validate = validateData(data);
  // renderTableData(petArr);
  // Hàm hiển thị danh sách thú cưng

  if (validate) {
    // 3. THÊM THÚ CƯNG VÀO DANH SÁCH
    petArr.push(data);
    // 4. HIỂN THỊ DANH SÁCH THÚ CƯNG
    renderTableData(petArr);
    // 5. XOÁ CÁC DỮ LIỆU NHẬP TRONG FORM INPUT
    clearInput();
  }
});

// Hàm validateData
function validateData(data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;

  // Không có trường nào bị nhập thiếu dữ liệu.
  // data.id là 1 string "   ABC   ", phương thức .trim -> "ABC"
  if (data.id.trim() === "") {
    alert("Please input for Pet ID!");
    isValidate = false;
  }

  // data.name
  if (data.name.trim() === "") {
    alert("Please input for Pet Name!");
    isValidate = false;
  }

  // data.age
  if (isNaN(data.age)) {
    alert("Please input for Age!");
    isValidate = false;
  }

  // data.weight
  if (isNaN(data.weight)) {
    alert("Please input for Weight!");
    isValidate = false;
  }

  // data.length
  if (isNaN(data.length)) {
    alert("Please input for Length!");
    isValidate = false;
  }

  //Kiểm tra ID có trùng không.
  //Duyệt mảng petArr
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }

  // Kiểm tra dữ liệu có hợp lệ không.
  // data.age
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  // data.weight
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  // data.length
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  // data.type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }

  // data.breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  return isValidate;
}

// Hàm renderTableData
function renderTableData(petArr) {
  // Xoá nội dung hiện tại của mảng petArr
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${petArr[i].id}</th>
        <td>${petArr[i].name}</td>
        <td>${petArr[i].age}</td>
        <td>${petArr[i].type}</td>
        <td>${petArr[i].weight} kg</td>
        <td>${petArr[i].length} cm</td>
        <td>${petArr[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>
          <i class="bi ${
            petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
          }"></i>
        </td>
        <td>${petArr[i].date.getDate()}/${
      petArr[i].date.getMonth() + 1
    }/${petArr[i].date.getFullYear()}
        </td>
        <td>
        <button type="button" class="btn btn-danger">
          Delete
        </button>
        </td>`;
    tableBodyEl.appendChild(row);
  }
}
