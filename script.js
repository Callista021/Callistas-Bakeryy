// Product data
const products = [
    {
        id: 1,
        name: "Banana Bread",
        description: "Moist and delicious banana bread with walnuts",
        price: "Rs. 120",
        image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400",
        detailsPage: "banana-bread.html"
    },
    {
        id: 2,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate frosting",
        price: "Rs. 300",
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        detailsPage: "choco-cake.html"
    },
    {
        id: 3,
        name: "French Croissants",
        description: "Buttery and flaky French croissants",
        price: "Rs. 80 each",
        image: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400",
        detailsPage: "croissant.html"
    },
    {
        id: 4,
        name: "Blueberry Muffins",
        description: "Fresh blueberry muffins with streusel topping",
        price: "Rs. 250 each",
        image: "https://sallysbakingaddiction.com/wp-content/uploads/2019/05/blueberry-muffin.jpg",
        detailsPage: "muffin.html"
    },
    {
        id: 5,
        name: "Blueberry Pie",
        description: "Classic blueberry pie with flaky crust",
        price: "Rs. 300",
        image: "https://www.inspiredtaste.net/wp-content/uploads/2022/07/Easy-Homemade-Blueberry-Pie-2-1200.jpg",
        detailsPage: "blueberry-pie.html"
    }
];

// Load products into Featured Products grid
function loadProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm product-card">
                <div class="product-image">
                    <a href="${product.detailsPage}">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted">${product.description}</p>
                    <p class="fw-bold">${product.price}</p>
                    <a href="${product.detailsPage}" class="btn btn-gradient w-100">View Details</a>

                </div>
            </div>
        `;

        grid.appendChild(col);
    });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", loadProducts);
// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBhw5BcOzl-G23uFx3-nemWXFsabF2FLT4",
  authDomain: "callista-s-bakery.firebaseapp.com",
  projectId: "callista-s-bakery",
  storageBucket: "callista-s-bakery.firebasestorage.app",
  messagingSenderId: "951182255921",
  appId: "1:951182255921:web:94db483e39445aeed63210",
  measurementId: "G-60HM59BT26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Handle form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  push(ref(db, "contactMessages"), {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  }).catch((error) => {
    console.error(error);
    alert("Error sending message.");
  });
});

