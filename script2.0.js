const products = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, image: 'https://source.unsplash.com/random/800x600/?pizza' },
    { id: 2, name: 'Gourmet Burger', price: 9.99, image: 'https://source.unsplash.com/random/800x600/?burger' },
    { id: 3, name: 'Caesar Salad', price: 8.99, image: 'https://source.unsplash.com/random/800x600/?salad' },
    { id: 4, name: 'Pasta Carbonara', price: 11.99, image: 'https://source.unsplash.com/random/800x600/?pasta' },
    { id: 5, name: 'Sushi Platter', price: 15.99, image: 'https://source.unsplash.com/random/800x600/?sushi' },
    { id: 6, name: 'Chicken Stir Fry', price: 10.99, image: 'https://source.unsplash.com/random/800x600/?stirfry' },
];

const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const orderConfirmation = document.getElementById('order-confirmation');
const closeConfirmation = document.getElementById('close-confirmation');
const deliveryTime = document.getElementById('delivery-time');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsGrid.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    saveCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    totalAmount.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

function getRandomDeliveryTime() {
    const minTime = 20;
    const maxTime = 45;
    return Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        const estimatedTime = getRandomDeliveryTime();
        deliveryTime.textContent = `${estimatedTime} minutes`;
        orderConfirmation.style.display = 'block';
        clearCart();
    } else {
        alert('Your cart is empty!');
    }
});

closeConfirmation.addEventListener('click', () => {
    orderConfirmation.style.display = 'none';
});

displayProducts();
updateCart();