document.addEventListener("DOMContentLoaded", function () {
    loadOrderSummary();
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");

    if (cart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty!</p>";
        return;
    }

    let totalPrice = 0;
    let summaryHTML = "<h2>Order Summary</h2><ul>";
    
    cart.forEach(item => {
        summaryHTML += `<li>${item.title} - ${item.quantity} x $${item.price} = $${item.quantity * item.price}</li>`;
        totalPrice += item.quantity * item.price;
    });

    summaryHTML += `</ul><h3>Total Price: $${totalPrice}</h3>`;
    orderSummary.innerHTML = summaryHTML;
}



function processPayment() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postal-code").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiryDate = document.getElementById("expiry-date").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
  
    if (!name || !email || !address || !city || !postalCode || !cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Save user details to localStorage
    const userDetails = {
      name,
      email,
      address,
     
    };
  
    localStorage.setItem("checkoutDetails", JSON.stringify(userDetails));
  
    // Delivery date calc
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
  
    alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate.toDateString()}.`);
  
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }
  