const products = [
  {id:1, name:"Basket Ball Cap", price:49.99, inStock:true, image:"product-images/India Cap.jpg"},
  {id:2, name:"Crazy Cap", price:50.99, inStock:true, image:"product-images/Craze Cap.jpg"},
  {id:3, name:"Cucu Watch", price:150.99, inStock:true, image:"product-images/Cucu Watch.jpg"},
  {id:4, name:"Domino Watch", price:199.99, inStock:true, image:"product-images/Domino Watch.jpg"},
  {id:5, name:"Dont Judge Cap", price:29.99, inStock:true, image:"product-images/Dont Judge Cap.png"},
  {id:6, name:"Faith T-Shirt", price:30.00, inStock:true, image:"product-images/Faith T-shirt.jpg"},
  {id:7, name:"Gee T-Shirt", price:49.99, inStock:true, image:"product-images/Gee T-shirt.jpg"},
  {id:8, name:"Grace T-Shirt", price:50.99, inStock:true, image:"product-images/Grace Shirt.jpg"},
  {id:9, name:"India Cap", price:49.99, inStock:true, image:"product-images/India Cap.jpg"},
  {id:10, name:"Lady Cap", price:15.99, inStock:true, image:"product-images/White Lady Cap.jpg"},
  {id:11, name:"MC T-Shirt", price:19.99, inStock:true, image:"product-images/MC-Tshirt.jpg"},
  {id:12, name:"MeMe T-Shirt", price:19.99, inStock:false, image:"product-images/Me-Tshirt.jpg"},
  {id:13, name:"Men Cap", price:49.99, inStock:true, image:"product-images/White Man Cap.png"},
  {id:14, name:"Men T-Shirt", price:29.99, inStock:true, image:"product-images/Tealer Shirt.jpg"},
  {id:15, name:"Puru Watch", price:19.99, inStock:false, image:"product-images/Puru Watch.jpg"},
  {id:16, name:"Rick Watch", price:159.99, inStock:true, image:"product-images/Rick Watch.jpg"},
  {id:17, name:"Studio Watch", price:49.99, inStock:true, image:"product-images/Studio Watch.jpg"},
  {id:18, name:"Sun Watch", price:50.99, inStock:true, image:"product-images/Sun Watch.jpg"},
  {id:19, name:"Tape Watch", price:299.99, inStock:true, image:"product-images/Tape Wach.jpg"},
  {id:20, name:"Yash Watch", price:19.99, inStock:false, image:"product-images/Yash Watch.jpg"}
];

function getBasket(){
  return JSON.parse(localStorage.getItem("basket")) || [];
}

function saveBasket(basket){
  localStorage.setItem("basket", JSON.stringify(basket));
}

function addToBasket(productId){
  const product = products.find(p => p.id === productId);
  if(!product || !product.inStock) return alert("Item not available.");

  let basket = getBasket();
  const existing = basket.find(item => item.id === productId);

  if(existing){
    existing.quantity += 1;
    existing.lineTotal = existing.quantity * existing.price;
  } else {
    basket.push({...product, quantity: 1, lineTotal: product.price});
  }

  saveBasket(basket);
  renderBasketCount();
  alert(`${product.name} added to basket!`);
}

function renderProducts(){
  const container = document.getElementById("product-list");
  if(!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML =
    `<img src="${product.image}" alt="${product.name}">
     <h3>${product.name}</h3>
     <p>£${product.price.toFixed(2)}</p>
     <button ${!product.inStock ? "disabled" : ""} onclick="addToBasket(${product.id})">
       ${product.inStock ? "Add to Basket" : "Out of Stock"}
     </button>`;

    container.appendChild(card);
  });
}

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
    div.innerHTML =
    `<img src="${item.image}" alt="${item.name}">
     <div>
       <h4>${item.name}</h4>
       <p>Price: £${item.price.toFixed(2)}</p>
       <p>Qty: ${item.quantity}</p>
       <p>Line Total: £${item.lineTotal.toFixed(2)}</p>
     </div>
     <button onclick="removeFromBasket(${item.id})" class="remove-btn">Remove</button>`;

    container.appendChild(div);
  });

  let total = basket.reduce((sum,item)=>sum+item.lineTotal, 0);
  let display = total > 500 ? total * 0.9 : total;

  totalEl.textContent = `£${display.toFixed(2)}${total>500?" (10% discount)":""}`;
}

function removeFromBasket(id){
  let basket = getBasket();
  basket = basket.filter(item => item.id !== id);
  saveBasket(basket);
  renderBasket();
  renderBasketCount();
}

function renderBasketCount(){
  const countEl = document.getElementById("basket-count");
  if(!countEl) return;
  const basket = getBasket();
  const count = basket.reduce((sum,item)=>sum+item.quantity,0);
  countEl.textContent = count;
}

function handlePayment(){
  const basket = getBasket();
  if(basket.length===0) return alert("Basket is empty!");
  localStorage.removeItem("basket");
  alert("Payment successful! Thank you.");
  renderBasketCount();
  renderBasket();
  window.location.href="../front-page/index.html";
}

document.addEventListener("DOMContentLoaded",()=>{
  renderProducts();
  renderBasket();
  renderBasketCount();
});