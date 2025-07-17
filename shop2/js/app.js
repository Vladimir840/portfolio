const products = [
    { id: 1, name: "iPhone 15 Pro", description: "Найновіший iPhone з потужним процесором A17 Pro", price: 45000, category: "phones", emoji: "📱" },
    { id: 2, name: "Samsung Galaxy S24", description: "Флагманський смартфон Samsung з AI функціями", price: 35000, category: "phones", emoji: "📱" },
    { id: 3, name: "MacBook Pro M3", description: "Потужний ноутбук для професіоналів", price: 85000, category: "laptops", emoji: "💻" },
    { id: 4, name: "Dell XPS 13", description: "Компактний та потужний ноутбук для роботи", price: 55000, category: "laptops", emoji: "💻" },
    { id: 5, name: "AirPods Pro", description: "Бездротові навушники з активним шумозаглушенням", price: 8500, category: "accessories", emoji: "🎧" },
    { id: 6, name: "iPad Air", description: "Універсальний планшет для роботи та розваг", price: 25000, category: "accessories", emoji: "📱" },
    { id: 7, name: "Apple Watch Ultra", description: "Найпотужніший розумний годинник Apple", price: 32000, category: "accessories", emoji: "⌚" },
    { id: 8, name: "Google Pixel 8", description: "Смартфон Google з найкращою камерою", price: 28000, category: "phones", emoji: "📱" }
  ];

  let cart = [];
  let currentFilter = 'all';

  function initStore() {
    renderProducts();
    updateCartCount();
  }

  function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = currentFilter === 'all'
      ? products
      : products.filter(p => p.category === currentFilter);

    grid.innerHTML = filteredProducts.map(product => `
      <div class="product-card">
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">${product.price.toLocaleString()} грн</div>
          <button class="add-to-cart" onclick="addToCart(${product.id})">Додати до кошика</button>
        </div>
      </div>
    `).join('');
  }

  function filterProducts(category, event) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderProducts();
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    showAddedToCartAnimation();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
  }

  function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
      renderCart();
    }
  }

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="text-align: center; color: #666;">Кошик порожній</p>';
      cartTotal.innerHTML = 'Загальна сума: 0 грн';
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()} грн × ${item.quantity}</p>
        </div>
        <div>
          <button onclick="changeQuantity(${item.id}, -1)" style="background: #ff4757; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">-</button>
          <span style="margin: 0 10px;">${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">+</button>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `Загальна сума: ${total.toLocaleString()} грн`;
  }

  function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== productId);
      }
      updateCartCount();
      renderCart();
    }
  }

  function checkout() {
    if (cart.length === 0) {
      alert("Кошик порожній!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Дякуємо за замовлення! Загальна сума: ${total.toLocaleString()} грн\n\nНаш менеджер зв'яжеться з вами найближчим часом.`);
    cart = [];
    updateCartCount();
    toggleCart();
  }

  function showAddedToCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.1)';
    cartBtn.style.background = 'rgba(40, 167, 69, 0.8)';
    setTimeout(() => {
      cartBtn.style.transform = 'scale(1)';
      cartBtn.style.background = 'rgba(255,255,255,0.2)';
    }, 200);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  document.getElementById('cartModal').addEventListener('click', function (e) {
    if (e.target === this) {
      toggleCart();
    }
  });

  window.addEventListener('load', initStore);