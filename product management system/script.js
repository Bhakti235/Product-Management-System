let products = [];
let idCounter = 1;

// Add or Update Product
document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const id = document.getElementById("productId").value || idCounter++;
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("price").value);
  const category = document.getElementById("category").value;

  const existingProductIndex = products.findIndex((product) => product.id == id);
  if (existingProductIndex > -1) {
    // Update product
    products[existingProductIndex] = { id, name, price, category };
  } else {
    // Add new product
    products.push({ id, name, price, category });
  }

  clearForm();
  renderTable();
});

// Sort Products by Price
function sortByPrice(order) {
  if (order === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else {
    products.sort((a, b) => b.price - a.price);
  }
  renderTable();
}

// View Product for Editing
function viewProduct(id) {
  const product = products.find((product) => product.id == id);
  if (product) {
    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
  }
}

// Delete Product
function deleteProduct(id) {
  products = products.filter((product) => product.id != id);
  renderTable();
}

// Render Product Table
function renderTable() {
  const tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.category}</td>
      <td>
        <button class="action-btn edit" onclick="viewProduct(${product.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Clear Form
function clearForm() {
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
}
