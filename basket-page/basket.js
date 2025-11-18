// Render Basket
// -----------------------------
function renderBasket(){
  const container = document.getElementById("basket-container");
  const totalEl = document.getElementById("basket-total");
  if(!container || !totalEl) return;

  let basket = getBasket();
  container.innerHTML = "";

  if(basket.length === 0){
    container.innerHTML = "<p>Your basket is empty.</p>";
    totalEl.textContent = "£0.00";
    return;
  }

  basket.forEach(item => {
    const div = document.createElement("div");
    div.className = "basket-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="product-image">
      <div>
        <h4>${item.name}</h4>
        <p>Price: £${item.price.toFixed(2)}</p>
        <p>Qty: ${item.quantity}</p>
        <p>Line Total: £${item.lineTotal.toFixed(2)}</p>
      </div>
      <button onclick="removeFromBasket(${item.id})" class="remove-btn">Remove</button>
    `;
    container.appendChild(div);
  });

  // Grand Total + Discount
  let total = basket.reduce((sum,item) => sum + item.lineTotal,0);
  let displayTotal = total;
  if(total > 500) displayTotal *= 0.9; // Apply 10% discount

  totalEl.textContent = `£${displayTotal.toFixed(2)}${total > 500 ? " (10% discount)" : ""}`;
}

// -----------------------------
// Remove from Basket
// -----------------------------
function removeFromBasket(productId){
  let basket = getBasket();
  basket = basket.filter(item => item.id !== productId);
  saveBasket(basket);
  renderBasket();
  renderBasketCount();
}

// -----------------------------
// Basket Count in Header
// -----------------------------
function renderBasketCount(){
  const countEl = document.getElementById("basket-count");
  if(!countEl) return;
  const basket = getBasket();
  const count = basket.reduce((sum,item)=>sum+item.quantity,0);
  countEl.textContent = count;
}

// -----------------------------
// Checkout / Pay Now
// -----------------------------
function handlePayment(){
  const basket = getBasket();
  if(basket.length === 0) return alert("Basket is empty!");
  localStorage.removeItem("basket");
  alert("Payment successful! Thank you.");
  renderBasketCount();
  renderBasket();
  window.location.href = "index.html";
}
