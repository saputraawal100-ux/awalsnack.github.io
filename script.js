const products = [
    { id: 1, name: "Keripik Kaca", price: 15000, img: "1.jpeg" },
    { id: 2, name: "Keripik Pisang", price: 18000, img: "2.jpg" },
    { id: 3, name: "Keripik Tempe", price: 10000, img: "3.jpeg" },
    { id: 4, name: "Keripik Singkong", price: 13000, img: "4.jpeg" },
    { id: 5, name: "Keripik Talas", price: 20000, img: "5.jpg" },
];

let cart = [];

const productList = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSection = document.getElementById("cart-section");
const paymentSection = document.getElementById("payment-section");
const paymentSuccess = document.getElementById("payment-success");

// --- Tampilkan Produk ---
products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rp ${p.price.toLocaleString()}</p>
        <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    `;
    productList.appendChild(div);
});

// --- Tambahkan ke Keranjang ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
    cartSection.classList.remove("hidden");
}

// --- Update Keranjang ---
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="cart-item">
                <span>${item.name}</span>
                <div class="quantity-control">
                    <button class="decrease" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="increase" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
                <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
            </div>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    cartTotal.textContent = total.toLocaleString();
}

// --- Ubah Jumlah Produk (+ atau -) ---
function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    updateCart();

    if (cart.length === 0) {
        cartSection.classList.add("hidden");
    }
}

// --- Checkout ---
document.getElementById("checkout-btn").addEventListener("click", () => {
    paymentSection.classList.remove("hidden");
    cartSection.classList.add("hidden");
});

// --- Form Pembayaran ---
document.getElementById("payment-form").addEventListener("submit", e => {
    e.preventDefault();
    paymentSuccess.classList.remove("hidden");
    cart = [];
    updateCart();
    setTimeout(() => {
        paymentSuccess.textContent = "✅ Pembayaran Berhasil! Terima kasih telah berbelanja 🍪";
    }, 500);
});
