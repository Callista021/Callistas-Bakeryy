// script.js - product data and UI logic for Callista's Bakery

const products = [
  { id:1, name:"Banana Bread", desc:"Moist banana bread with walnuts", price:120, image:"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg", detail:"banana-bread.html", rating:4.8 },
  { id:2, name:"Chocolate Cake", desc:"Rich chocolate cake with frosting", price:1200, image:"https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg", detail:"choco-cake.html", rating:4.9 },
  { id:3, name:"French Croissants", desc:"Buttery flaky croissants", price:80, image:"https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg", detail:"croissant.html", rating:4.7 },
  { id:4, name:"Blueberry Muffins", desc:"Blueberry muffins with streusel", price:250, image:"https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg", detail:"muffin.html", rating:4.6 },
  { id:5, name:"Blueberry Pie", desc:"Classic blueberry pie", price:300, image:"https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg", detail:"blueberry-pie.html", rating:4.8 }
];

/* ------------------ Utility: toasts ------------------ */
function showToast(message='Done', type='success', toastId='liveToast'){
  const toastEl = document.getElementById(toastId) || document.getElementById('liveToast');
  if(!toastEl) return;
  toastEl.className = 'toast align-items-center text-white show';
  toastEl.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
  setTimeout(()=>{ toastEl.className = toastEl.className.replace(' show',''); }, 3000);
}

/* ------------------ Tooltips ------------------ */
function initTooltips(){
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el) })
}

/* ------------------ Home: load 3 featured cards ------------------ */
function loadHomeProducts(){
  const container = document.getElementById('homeProducts');
  if(!container) return;
  const featured = products.slice(0,3);
  container.innerHTML = featured.map(p => `
    <div class="col-md-4">
      <div class="card product-card fade-in">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.desc}</p>
          <div class="d-flex gap-2 justify-content-center align-items-center">
            <a href="${p.detail}" class="btn btn-sm btn-primary">View</a>
            <button class="btn btn-sm btn-outline-secondary" onclick="addToCart('${p.name}')">Add</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ------------------ Products page renderer ------------------ */
function loadProductsPage(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="col-md-4">
      <div class="card product-card h-100">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text small mb-2">${p.desc}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div><span class="price">Rs.${p.price}</span></div>
            <div class="btn-group">
              <a href="${p.detail}" class="btn btn-sm btn-primary" data-bs-toggle="tooltip" title="View details">Details</a>
              <button class="btn btn-sm btn-outline-secondary" onclick="addToCart('${p.name}')" data-bs-toggle="tooltip" title="Add to cart">🛒</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ------------------ Search on products page ------------------ */
function initSearch(){
  const input = document.getElementById('productSearch');
  if(!input) return;
  input.addEventListener('input', function(){
    const q = this.value.trim().toLowerCase();
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
      .map(p => `
        <div class="col-md-4">
          <div class="card product-card h-100">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text small mb-2">${p.desc}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div><span class="price">Rs.${p.price}</span></div>
                <div class="btn-group">
                  <a href="${p.detail}" class="btn btn-sm btn-primary">Details</a>
                  <button class="btn btn-sm btn-outline-secondary" onclick="addToCart('${p.name}')">🛒</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');
  });
}

/* ------------------ Cart / order interactions ------------------ */
function addToCart(productName){
  showToast(`Added ${productName} to cart!`);
}

function addToCartDetail(productName){
  const qty = parseInt(document.getElementById('qty')?.value || 1);
  showToast(`Added ${qty} × ${productName} to cart!`);
}

function orderNow(){
  const qty = parseInt(document.getElementById('qty')?.value || 1);
  const priceText = document.querySelector('.price')?.textContent || 'Rs.0';
  const priceMatch = priceText.match(/Rs\.?\s*([0-9]+)/);
  const price = priceMatch ? parseInt(priceMatch[1]) : 0;
  const total = price * qty;
  showToast(`Order total: Rs. ${total}`);
}

/* ------------------ small helper for product pages ------------------ */
function incrementQty() {
  const q = document.getElementById('qty'); if(!q) return; q.value = Math.min(99, Number(q.value||1) + 1);
}
function decrementQty() {
  const q = document.getElementById('qty'); if(!q) return; q.value = Math.max(1, Number(q.value||1) - 1);
}
