// JAVASCRIPT CODE

// Sample product data
const products = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomato sauce, mozzarella cheese, fresh basil leaves",
        currentPrice: 299,
        originalPrice: 349,
        category: "pizza",
        emoji: "🍕",
        discount: "14% off",
        popularity: 95,
        discountPercent: 14
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Spicy pepperoni, mozzarella cheese, tomato sauce",
        currentPrice: 399,
        originalPrice: 449,
        category: "pizza",
        emoji: "🍕",
        discount: "11% off",
        popularity: 88,
        discountPercent: 11
    },
    {
        id: 3,
        name: "Veggie Supreme",
        description: "Bell peppers, onions, mushrooms, olives, tomatoes",
        currentPrice: 449,
        originalPrice: 499,
        category: "pizza",
        emoji: "🍕",
        discount: "10% off",
        popularity: 92,
        discountPercent: 10
    },
    {
        id: 4,
        name: "BBQ Chicken",
        description: "Grilled chicken, BBQ sauce, red onions, cilantro",
        currentPrice: 499,
        originalPrice: 549,
        category: "pizza",
        emoji: "🍕",
        discount: "9% off",
        popularity: 85,
        discountPercent: 9
    },
    {
        id: 5,
        name: "Garlic Bread",
        description: "Freshly baked bread with garlic butter and herbs",
        currentPrice: 149,
        originalPrice: 179,
        category: "sides",
        emoji: "🥖",
        discount: "17% off",
        popularity: 78,
        discountPercent: 17
    },
    {
        id: 6,
        name: "Chicken Wings",
        description: "Crispy chicken wings with your choice of sauce",
        currentPrice: 249,
        originalPrice: 299,
        category: "sides",
        emoji: "🍗",
        discount: "17% off",
        popularity: 82,
        discountPercent: 17
    },
    {
        id: 7,
        name: "Potato Wedges",
        description: "Golden crispy potato wedges with herbs and spices",
        currentPrice: 179,
        originalPrice: 199,
        category: "sides",
        emoji: "🍟",
        discount: "10% off",
        popularity: 75,
        discountPercent: 10
    },
    {
        id: 8,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten chocolate center",
        currentPrice: 129,
        originalPrice: 149,
        category: "desserts",
        emoji: "🍰",
        discount: "13% off",
        popularity: 90,
        discountPercent: 13
    },
    {
        id: 9,
        name: "Vanilla Ice Cream",
        description: "Premium vanilla ice cream scoop",
        currentPrice: 89,
        originalPrice: 99,
        category: "desserts",
        emoji: "🍦",
        discount: "10% off",
        popularity: 70,
        discountPercent: 10
    },
    {
        id: 10,
        name: "Coca Cola",
        description: "Chilled Coca Cola 330ml bottle",
        currentPrice: 49,
        originalPrice: 55,
        category: "drinks",
        emoji: "🥤",
        discount: "11% off",
        popularity: 80,
        discountPercent: 11
    },
    {
        id: 11,
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        currentPrice: 79,
        originalPrice: 89,
        category: "drinks",
        emoji: "🧃",
        discount: "11% off",
        popularity: 65,
        discountPercent: 11
    },
    {
        id: 12,
        name: "Cheese Burst Pizza",
        description: "Extra cheese with burst of flavors, tomato sauce",
        currentPrice: 549,
        originalPrice: 599,
        category: "pizza",
        emoji: "🍕",
        discount: "8% off",
        popularity: 98,
        discountPercent: 8
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';
let currentSort = 'name';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupCategoryFilters();
    setupSearch();
    setupSortFilter();
});

// Sort products based on selected criteria
function sortProducts(productsToSort, sortBy) {
    const sortedProducts = [...productsToSort];
    
    switch(sortBy) {
        case 'name':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        case 'price-low':
            return sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
        case 'price-high':
            return sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
        case 'discount':
            return sortedProducts.sort((a, b) => b.discountPercent - a.discountPercent);
        case 'popular':
            return sortedProducts.sort((a, b) => b.popularity - a.popularity);
        default:
            return sortedProducts;
    }
}

// Render products
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    let filteredProducts = currentCategory === 'all' 
        ? productsToRender 
        : productsToRender.filter(product => product.category === currentCategory);

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentSort);

    productsGrid.innerHTML = filteredProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const isPopular = product.popularity > 90;

        return `
            <div class="product-card">
                <div class="product-image">
                    ${product.emoji}
                    ${isPopular ? '<div class="popular-badge">Popular</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">₹${product.currentPrice}</span>
                        <span class="original-price">₹${product.originalPrice}</span>
                        <span class="discount">${product.discount}</span>
                    </div>
                    <div class="product-actions">
                        ${quantity === 0 ? 
                            `<button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>` :
                            `<div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${quantity - 1})">-</button>
                                <span class="quantity">${quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${quantity + 1})">+</button>
                            </div>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Setup category filters
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            renderProducts();
        });
    });
}

// Setup sort filter
function setupSortFilter() {
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        renderProducts();
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            renderProducts();
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Live search as user types
    searchInput.addEventListener('input', function() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(performSearch, 300);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            emoji: product.emoji,
            quantity: 1
        });
    }

    updateCartUI();
    showAddToCartAnimation(productId);
}

// Show add to cart animation
function showAddToCartAnimation(productId) {
    // Simple feedback - could be enhanced with actual animations
    const productCard = document.querySelector(`[onclick="addToCart(${productId})"]`);
    if (productCard) {
        productCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            productCard.style.transform = 'scale(1)';
        }, 150);
    }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;

    // Add animation to cart count
    const cartCount = document.getElementById('cartCount');
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);

    // Re-render products to update buttons
    renderProducts();

    // Update cart sidebar
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p>Add some delicious items!</p>
            </div>
        `;
        cartTotal.style.display = 'none';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        </div>
    `).join('');
}

 