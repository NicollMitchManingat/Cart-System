const buttons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cart-items");
const emptyMsg = document.getElementById("empty-msg");
const totalItems = document.getElementById("total-items");
const itemCount = document.getElementById("item-count");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

let cart = [];

// add to cart to basta
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productName = btn.previousElementSibling.textContent;

    const existing = cart.find((item) => item.name === productName);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: productName, qty: 1 });
    }

    updateCart();
  });
});

// cart update
function updateCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    totalItems.classList.add("hidden");
    cartItems.appendChild(emptyMsg);
  } else {
    emptyMsg.classList.add("hidden");
    totalItems.classList.remove("hidden");

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center bg-[#F9F5FF] px-3 py-2 rounded-lg shadow-sm";
      li.innerHTML = `
            <span>${item.name}</span>
            <div class="flex items-center gap-2">
              <button class="px-2 py-1 bg-[#F8B5D2] rounded-md text-xs font-semibold hover:bg-[#E378A8]" onclick="changeQty('${item.name}', -1)">−</button>
              <span>${item.qty}</span>
              <button class="px-2 py-1 bg-[#F8B5D2] rounded-md text-xs font-semibold hover:bg-[#E378A8]" onclick="changeQty('${item.name}', 1)">+</button>
              <button class="px-2 py-1 bg-red-400 text-white rounded-md text-xs font-semibold hover:bg-red-500" onclick="deleteItem('${item.name}')">🗑</button>
            </div>
          `;
      cartItems.appendChild(li);
    });

    itemCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}

// change quantity
function changeQty(name, change) {
  const item = cart.find((i) => i.name === name);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.name !== name);
  }

  updateCart();
}

// delete item
function deleteItem(name) {
  cart = cart.filter((i) => i.name !== name);
  updateCart();
}

// clear cart
clearCartBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Cart is already empty!");
    return;
  }
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    updateCart();
  }
});

// chick out
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items first.");
    return;
  }
  let summary = "Checkout Summary:\n\n";
  cart.forEach((item) => {
    summary += `${item.name} - ${item.qty}\n`;
  });
  summary += `\nTotal items: ${cart.reduce((sum, item) => sum + item.qty, 0)}`;
  alert(summary);
});


