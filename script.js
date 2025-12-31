// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smartwatch Pro",
        category: "electronics",
        price: 199.99,
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        description: "Advanced smartwatch with fitness tracking, heart rate monitor, and water resistance."
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        category: "clothing",
        price: 29.99,
        rating: 4.2,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Comfortable 100% cotton t-shirt available in multiple colors."
    },
    {
        id: 4,
        name: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        rating: 4.6,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
        description: "Stylish and durable denim jeans with a perfect fit."
    },
    {
        id: 5,
        name: "Leather Wallet",
        category: "accessories",
        price: 49.99,
        rating: 4.4,
        reviews: 102,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        description: "Premium leather wallet with RFID protection."
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 89.99,
        rating: 4.7,
        reviews: 143,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "UV-protected sunglasses with polarized lenses."
    },
    {
        id: 7,
        name: "USB-C Cable",
        category: "electronics",
        price: 14.99,
        rating: 4.3,
        reviews: 321,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
        description: "Fast charging USB-C cable, 6-foot length, durable nylon braided."
    },
    {
        id: 8,
        name: "Cotton Socks Set",
        category: "clothing",
        price: 19.99,
        rating: 4.1,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop",
        description: "Pack of 6 comfortable cotton socks."
    }
];

// Shopping cart
let cart = [];
let currentFilter = 'all';
let selectedProduct = null;
let selectedQuantity = 1;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('cartIcon').addEventListener('click', toggleCart);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    const stars = '⭐'.repeat(Math.floor(product.rating));
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22250%22 height=%22250%22%3E%3Crect fill=%22%23ecf0f1%22 width=%22250%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%237f8c8d%22%3EProduct Image%3C/text%3E%3C/svg%3E'">
        <div class="product-content">
            <div class="product-category">${capitalizeCategory(product.category)}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-rating">${stars} ${product.rating} (${product.reviews})</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-footer">
                <button class="btn-small btn-view" onclick="viewProductDetails(${product.id})">View</button>
                <button class="btn-small btn-add" onclick="addToCart(${product.id}, 1)">Add</button>
            </div>
        </div>
    `;

    return card;
}

// Capitalize category
function capitalizeCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

// Filter products
function filterProducts(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }
    displayProducts(filtered);
}

// View product details
function viewProductDetails(productId) {
    selectedProduct = products.find(p => p.id === productId);
    selectedQuantity = 1;

    const modal = document.getElementById('productModal');
    document.getElementById('modalProductImage').src = selectedProduct.image;
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductRating').textContent = `⭐ ${selectedProduct.rating} (${selectedProduct.reviews} reviews)`;
    document.getElementById('modalProductPrice').textContent = `$${selectedProduct.price.toFixed(2)}`;
    document.getElementById('modalProductDescription').textContent = selectedProduct.description;
    document.getElementById('quantityInput').value = 1;

    modal.classList.add('show');
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// Increase quantity
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
    selectedQuantity = parseInt(input.value);
}

// Decrease quantity
function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        selectedQuantity = parseInt(input.value);
    }
}

// Add to cart from modal
function addToCartFromModal() {
    if (selectedProduct) {
        addToCart(selectedProduct.id, selectedQuantity);
        closeProductModal();
    }
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    displayCartItems();
    calculateTotals();
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    toggleCart();
    document.getElementById('checkoutModal').classList.add('show');
}

// Close checkout
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();

    // Validate form
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Simulate payment processing
    showNotification('Processing payment...');
    
    setTimeout(() => {
        showNotification('Order placed successfully! Thank you for your purchase!');
        cart = [];
        updateCartUI();
        closeCheckout();
        document.getElementById('checkoutForm').reset();
    }, 2000);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Quantity input validation
document.addEventListener('change', function(e) {
    if (e.target.id === 'quantityInput') {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            e.target.value = 1;
            selectedQuantity = 1;
        } else {
            selectedQuantity = value;
        }
    }
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cartModal');
    const productModal = document.getElementById('productModal');
    const checkoutModal = document.getElementById('checkoutModal');

    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
    if (e.target === productModal) {
        productModal.classList.remove('show');
    }
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('show');
    }
});
