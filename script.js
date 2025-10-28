const products = [
    { id: 1, name: "Keripik Kaca", price: 15000, img: "1.jpeg" },
    { id: 2, name: "Keripik Pisang", price: 18000, img: "2.jpg" },
    { id: 3, name: "Keripik Tempe", price: 10000, img: "3.jpeg" },
    { id: 4, name: "Keripik Singkong", price: 13000, img: "4.jpeg" },
];

let cart = [];

const productList = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartSection = document.getElementById("cart-section");
const paymentSection = document.getElementById("payment-section");
const paymentSuccess = document.getElementById("payment-success");

// Tampilkan produk
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

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} x ${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}`;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    cartTotal.textContent = total.toLocaleString();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    paymentSection.classList.remove("hidden");
    cartSection.classList.add("hidden");
});

document.getElementById("payment-form").addEventListener("submit", e => {
    e.preventDefault();
    paymentSuccess.classList.remove("hidden");
    cart = [];
    updateCart();
    setTimeout(() => {
        paymentSuccess.textContent = "✅ Pembayaran Berhasil! Terima kasih telah berbelanja 🍪";
    }, 500);
});
