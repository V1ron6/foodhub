
document.addEventListener("DOMContentLoaded", () => {
    const foodContainer = document.getElementById("food-container");
    const searchBox = document.getElementById("search-box");
    const cartContainer = document.getElementById("cart-container");
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    let mealsData = [];
    let cart = [];

    // Fetch food data
    async function fetchFoodData() {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            const data = await response.json();
             console.log(response.status)
            if (data.meals) {
                mealsData = data.meals.map(meal => ({
                    ...meal,
                    price: (Math.random() * (500 - 60) + 5).toFixed(2),
                    rating: (Math.random() * (10- 1) + 3).toFixed(1)
                }));
                displayFoodItems(mealsData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayFoodItems(meals) {
        foodContainer.innerHTML = meals.map(meal => `
            <div class="food-item">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p class="food-price">$${meal.price}</p>
                <p class="food-rating">⭐ ${meal.rating}</p>
                <button class="order-btn" onclick="addToCart('${meal.strMeal}', '${meal.price}')">Add to Cart</button>
            </div>
        `).join('');
    }

    function addToCart(name, price) {
        cart.push({ name, price: parseFloat(price) });
        updateCart();
    }

    function updateCart() {
        cartList.innerHTML = cart.map((item, index) => `
            <li>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">❌</button></li>
        `).join('');
        cartTotal.textContent = `Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
        cartCount.textContent = cart.length;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function toggleCart() {
        cartContainer.classList.toggle("hidden");
    }

    function checkout() {
        alert("Order placed!");
        cart = [];
        updateCart();
        toggleCart();
    }

    window.searchFood = () => {};
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.toggleCart = toggleCart;
    window.checkout = checkout;

    fetchFoodData();
});
