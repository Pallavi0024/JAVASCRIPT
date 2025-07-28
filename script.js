
/*************** GLOBAL SETUP ***************/
const manualProducts = [
  { name: "Coaster Set", price: 477, description: "Coaster Set of 4 Designer Pattern for Home,Office and Gifting", image: "./img/imgi_35_A14jUsNYu2L._AC_UL320_.jpg" },
  { name: "Swan Crane Love Birds", price: 450, description: "Sheesham Wooden and Brass Antique Decorative Saras", image: "./img/imgi_367_61m+5mxvqsL._AC_UL960_FMwebp_QL65_.jpg" },
  { name: "Ashoka Stambh Piller", price: 350, description: "wooden Craved with 2 Flag & Analog Clock for Office And Studey table Brown Color", image: "./img/imgi_378_81bAfPNTRAL._AC_UL960_FMwebp_QL65_.jpg" },
  { name: "Wooden Jewellery Box", price: 300, description: "Durable & Elegant Jewel Organizer with Elephant decor", image: "./img/imgi_396_41thiWntmSL._AC_UL960_FMwebp_QL65_.jpg" },
  { name: "Loving Swan Showpiece", price: 400, description: "Golden Metal Pair of Swans Love Brird", image: "./img/imgi_60_81ZqG5GySOL._AC_UL320_.jpg" },
  { name: "Cycle Shape Gold Tea Light Holder", price: 290, description: "For Diwali Home Decor Center Table Bedroom Living Room Office decorative item", image: "./img/imgi_397_61zQ5s0W9wL._AC_PT0_BL0_SX583_SY180_FMavif_PQ10_.jpg" },
  { name: "Meditating Gautam Buddha", price: 199, description: "Wooden wall Hanging for Home Decor", image: "./img/imgi_58_71Di7jfYiQL._AC_UL320_.jpg" },
  { name: "Key Chain", price: 320, description: "Wooden Elephant craved And painted Key Chain(set of 5)", image: "./img/imgi_337_61HvDntHCVL._AC_UL960_FMwebp_QL65_.jpg" },
  { name: "Mini Charkha", price: 530, description: "HandCrafted Gandhiji Wooden Mini Charkhha Spin Wheel Showpiece", image: "./img/imgi_61_71V1p1adhjL._AC_UL320_.jpg" },
  { name: "Rajasthani Dolls Puppet Candle Holder", price: 240, description: "Handmade REcycled Material TealLight Candle Holder,Multicolor", image: "./img/imgi_63_91PbR6ygQWL._AC_UL320_.jpg" },
  { name: "Elephant Showpiece", price: 190, description: "Handcrafted Set of 3 Elephant Action Showpiece Idols for Home Decor And Gift purpose", image: "./img/imgi_64_71W7xy+YU-L._AC_UL320_.jpg" },
  { name: "Wooden Mini Storage Box", price: 199, description: "Small Size Organizer For Ear Rings and Nose Pin Storage Box", image: "./img/imgi_66_81kD3FJV5UL._AC_UL320_.jpg" },
  { name: "Crossbody Sling Bag", price: 290, description: "handicraft tote Bags for Girls Womens fashion gift", image: "./img/imgi_12_51YRVEVXrUL._AC_UL320_.jpg" },
  { name: "Wooden Mini Storage Box", price: 453, description: "Puppets Idol ethnic Home Decor Handicrafts Item Piece in Wood", image: "./img/imgi_67_6141w-i7BpL._AC_UL320_.jpg" },
  { name: "Multicolor Five Elephant Hanging bell", price: 230, description: "Handcrafted Decorative Wall /Door/Window Hanging Bells Wind Chimes Showpiece", image: "./img/imgi_62_71+dBsbkQoL._AC_UL320_.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*************** PRODUCT RENDERING ***************/
function renderProducts() {
  const container = document.getElementById("productContainer");
  if (!container) return;

  const sellerProducts = JSON.parse(localStorage.getItem("sellerProducts")) || [];
  const allProducts = manualProducts.concat(sellerProducts);

  container.innerHTML = "";

  allProducts.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <p class="product-price"><strong>₹${product.price}</strong></p>
      <div class="btn-group">
        <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
        <button class="buy-now-btn" onclick='buyNow(${JSON.stringify(product)})'>Buy Now</button>
      </div>
    `;
    container.appendChild(div);
  });
}

/*************** CART FUNCTIONS ***************/
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function buyNow(product) {
  alert(`Thanks for buying "${product.name}" for ₹${product.price}!`);
}

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) countSpan.textContent = cart.length;
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-name">${item.name}</div>
        <div class="product-desc">${item.description}</div>
        <div class="product-price">₹${item.price}</div>
        <button onclick="removeFromCart(${index})">Remove</button>
        <button onclick='buyNow(${JSON.stringify(item)})' class="buy-now">Buy Now</button>
      </div>
    `;
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

/*************** SELLER DASHBOARD ***************/
function initSellerDashboard() {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("product-list");
  if (!form || !productList) return;

  let products = JSON.parse(localStorage.getItem("sellerProducts")) || [];

  function renderSellerProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p>${product.description}</p>
        <div class="btn-group">
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </div>
      `;
      productList.appendChild(card);
    });

    document.getElementById("total-products").textContent = `Products Added: ${products.length}`;
    document.getElementById("products-sold").textContent = `Products Sold: ${Math.floor(products.length / 2)}`;
    document.getElementById("products-returned").textContent = `Products Returned: ${Math.floor(products.length / 4)}`;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const description = document.getElementById("productDescription").value;
    const imageInput = document.getElementById("productImage");

    const reader = new FileReader();
    reader.onload = function () {
      const image = reader.result;
      products.push({ name, price, category, description, image });
      localStorage.setItem("sellerProducts", JSON.stringify(products));
      form.reset();
      renderSellerProducts();
    };

    if (imageInput.files[0]) {
      reader.readAsDataURL(imageInput.files[0]);
    }
  });

  window.editProduct = function (index) {
    const product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productDescription").value = product.description;
    products.splice(index, 1);
    renderSellerProducts();
  };

  window.deleteProduct = function (index) {
    products.splice(index, 1);
    localStorage.setItem("sellerProducts", JSON.stringify(products));
    renderSellerProducts();
  };

  renderSellerProducts();
}

/*************** SELLER ACCESS (seller.html) ***************/
function switchForm(formId) {
  document.querySelectorAll('.form-box').forEach(form => {
    form.classList.remove('active');
  });
  const form = document.getElementById(formId);
  if (form) form.classList.add('active');
}

function redirectToDashboard(event) {
  event.preventDefault();
  window.location.href = "sellerdashboard.html";
}

/*************** LOGIN PAGE ***************/
function initLoginPage() {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const resetBtn = document.getElementById("resetBtn");

  function redirectToHome() {
    window.location.href = "index.html";
  }

  if (loginBtn) loginBtn.addEventListener("click", redirectToHome);
  if (signupBtn) signupBtn.addEventListener("click", redirectToHome);
  if (resetBtn) resetBtn.addEventListener("click", redirectToHome);
}

/*************** PAGE INIT ***************/
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  renderCartItems();
  initSellerDashboard();
  initLoginPage();

  if (document.getElementById("signupForm")) {
    switchForm("signupForm"); // default active form on seller access page
  }
});

// ✅ Validation functions
function isValidName(name) {
  return /^[A-Za-z ]+$/.test(name);
}
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Signup Logic
function handleSellerSignup(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    fname: form.fname.value.trim(),
    lname: form.lname.value.trim(),
    phone: form.phone.value.trim(),
    address: form.address.value.trim(),
    aadhar: form.aadhar.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value.trim(),
    category: form.category.value
  };

  // Validations
  if (!isValidName(data.fname) || !isValidName(data.lname)) {
    alert("Invalid Name");
    return;
  }
  if (!isValidPhone(data.phone)) {
    alert("Invalid Phone Number");
    return;
  }
  if (!isValidEmail(data.email)) {
    alert("Invalid Email");
    return;
  }
  if (data.password.length < 4) {
    alert("Password must be at least 4 characters.");
    return;
  }
  if (!data.category) {
    alert("Please select a product category.");
    return;
  }

  const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

  if (sellers.find(s => s.email === data.email)) {
    alert("Email already registered. Please login.");
    return;
  }

  sellers.push(data);
  localStorage.setItem("sellers", JSON.stringify(sellers));
  alert("Signup successful! Please login.");
  form.reset();
}

// ✅ Login Logic
function handleSellerLogin(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!isValidEmail(email)) {
    alert("Invalid Email Format");
    return;
  }
  if (!password || password.length < 4) {
    alert("Password too short");
    return;
  }

  const sellers = JSON.parse(localStorage.getItem("sellers")) || [];
  const match = sellers.find(s => s.email === email && s.password === password);

  if (!match) {
    localStorage.removeItem("activeSeller");
    alert("Invalid login credentials.");
    return;
  }

  localStorage.setItem("activeSeller", JSON.stringify(match));
  alert("Login successful!");
  window.location.href = "sellerdashboard.html";
}

// ✅ Dashboard Access Control
function checkSellerAccess() {
  const active = JSON.parse(localStorage.getItem("activeSeller"));
  const sellers = JSON.parse(localStorage.getItem("sellers")) || [];

  const valid = active && sellers.find(s => s.email === active.email && s.password === active.password);

  if (!valid) {
    alert("Access denied. Please login as seller.");
    window.location.href = "seller.html";
  }
}

// ✅ Logout
function logoutSeller() {
  localStorage.removeItem("activeSeller");
  window.location.href = "seller.html";
}

// ✅ Attach Form Handlers
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) signupForm.addEventListener("submit", handleSellerSignup);
  if (loginForm) loginForm.addEventListener("submit", handleSellerLogin);
});
