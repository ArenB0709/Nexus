var ShoppingCart = (function() {
  "use strict";
  
  // Cache necessary DOM Elements
  var productsEl = document.querySelector(".productos"), // Cambiado a .productos
      cartEl = document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");
  
  // Fake JSON data array (puedes reemplazar esto con una llamada a la API)
  var products = [
    {
      id: 0,
      name: "Trimui Smart Pro Console",
      description: "Consola portátil con simuladores de diferentes consolas.",
      imageUrl: "./img/trimui-console.jpg", // Actualiza la ruta según tu estructura
      price: 2500
    },
    {
      id: 1,
      name: "RGB10MAX 16GB",
      description: "Consola con 16GB de memoria y múltiples emuladores.",
      imageUrl: "./img/rgb10max.jpg", // Actualiza la ruta según tu estructura
      price: 2800
    },
    {
      id: 2,
      name: "Consola Retro 3",
      description: "Descripción de la Consola Retro 3.",
      imageUrl: "./img/consola3.jpg", // Actualiza la ruta según tu estructura
      price: 2000
    }
  ];
  
  var productsInCart = [];
  
  // Generar lista de productos
  var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      productEl.className = "producto"; // Cambiado a .producto
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Producto:</span> ${item.name}</div>
                             <div class="product-description"><span>Descripción:</span> ${item.description}</div>
                             <div class="product-price"><span>Precio:</span> $${item.price} MXN</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Añadir al Carrito</a>
                             </div>`;
                             
      productsEl.appendChild(productEl);
    });
  }
  
  // Generar lista del carrito
  var generateCartList = function() {
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity} MXN`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons();
  }
  
  // Generar botones del carrito
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block";
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice() + " MXN";
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Configurar oyentes de eventos
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
        var elId = el.dataset.id;
        addToCart(elId);
      }
    });
    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Añadir productos al carrito
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  // Comprobar si el producto ya está en el carrito
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  // Calcular el precio total
  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
  
  // Inicializar la aplicación
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  return {
    init: init
  };
})();

ShoppingCart.init();