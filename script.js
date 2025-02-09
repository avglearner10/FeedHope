// Simulated database
let foodDatabase = {
    donations: [],
    stats: {
        totalDonations: 0,
        foodSaved: 0,
        peopleHelped: 0
    }
};

// Function to list food
function listFood() {
    const foodName = document.getElementById('foodName').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const location = document.getElementById('location').value;
    const imageInput = document.getElementById('foodImage');

    if (!foodName || !quantity || !expiryDate || !location) {
        alert('Please fill in all required fields');
        return;
    }

    const donation = {
        id: Date.now(),
        foodName,
        quantity: parseInt(quantity),
        expiryDate,
        location,
        status: 'available',
        timestamp: new Date().toISOString()
    };

    foodDatabase.donations.push(donation);
    updateFoodList();
    updateStats(parseInt(quantity));
    clearForm();
}

// Function to update food list
function updateFoodList() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    foodDatabase.donations.forEach(donation => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="https://placehold.co/300x200" alt="${donation.foodName}">
            <div class="card-content">
                <h3>${donation.foodName}</h3>
                <p>Quantity: ${donation.quantity} servings</p>
                <p>Location: ${donation.location}</p>
                <p>Expires: ${formatDate(donation.expiryDate)}</p>
                <button onclick="claimFood(${donation.id})" class="primary-btn">Claim</button>
            </div>
        `;
        foodList.appendChild(card);
    });
}

// Function to claim food
function claimFood(id) {
    const donation = foodDatabase.donations.find(d => d.id === id);
    if (donation && donation.status === 'available') {
        donation.status = 'claimed';
        updateFoodList();
    }
}

// Function to update statistics
function updateStats(quantity) {
    foodDatabase.stats.totalDonations++;
    foodDatabase.stats.foodSaved += quantity;
    foodDatabase.stats.peopleHelped += Math.floor(quantity / 2);

    document.getElementById('totalDonations').textContent = foodDatabase.stats.totalDonations;
    document.getElementById('foodSaved').textContent = foodDatabase.stats.foodSaved;
    document.getElementById('peopleHelped').textContent = foodDatabase.stats.peopleHelped;
}

// Utility function to format date
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Function to clear form
function clearForm() {
    document.getElementById('foodName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('expiryDate').value = '';
    document.getElementById('location').value = '';
    document.getElementById('foodImage').value = '';
}

// Initialize the application
window.onload = function() {
    updateFoodList();
    // Initialize stats display
    document.getElementById('totalDonations').textContent = foodDatabase.stats.totalDonations;
    document.getElementById('foodSaved').textContent = foodDatabase.stats.foodSaved;
    document.getElementById('peopleHelped').textContent = foodDatabase.stats.peopleHelped;
};