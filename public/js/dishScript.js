const API_URL = "/api/dishes";
let currentDeleteId = null;
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDelete");
const cancelDeleteBtn = document.getElementById("cancelDelete");

/**
 * Executes a function when the document is ready.
 *
 * @param {Function} fn - The function to execute when the DOM is fully loaded.
 */
function ready(fn){
        if (document.readyState !== 'loading'){
                fn();
                return;
        }
        document.addEventListener('DOMContentLoaded', fn);
}

/**
 * Loads all dishes from the API and populates them into the table.
 */
async function loadDishes() {
        try {
                // Fetch all dishes from the API
                const res = await fetch(API_URL);
                const dishes = await res.json();
                const table = document.getElementById("dishTable");
                const template = document.getElementById("dishRowTemplate");
                table.innerHTML = ""; // Clear existing table contents

                // Populate the table with dish data
                dishes.forEach(dish => {
                        const clone = template.content.cloneNode(true);
                        const row = clone.querySelector("tr");

                        // Set the content of each table cell
                        row.querySelector(".name").innerText = dish.name;
                        row.querySelector(".ingredients").innerText = dish.ingredients.join(", ");
                        row.querySelector(".steps").innerText = dish.preparationSteps.join(" ");
                        row.querySelector(".time").innerText = dish.cookingTime;
                        row.querySelector(".origin").innerText = dish.origin;
                        row.querySelector(".difficulty").innerText = dish.difficulty;

                        // Add event listeners for update and delete buttons
                        row.querySelector(".update").addEventListener("click", () => updateDish(dish._id, row));
                        row.querySelector(".delete").addEventListener("click", () => showDeleteModal(dish._id));

                        table.appendChild(clone); // Add the populated row to the table
                });
        } catch (err){
                console.error(err); // Log any errors
        }
}

/**
 * Shows the delete confirmation modal when the delete button is clicked.
 *
 * @param {string} id - The ID of the dish to delete.
 */
function showDeleteModal(id) {
        currentDeleteId = id; // Store the ID of the dish to delete
        deleteModal.style.display = "block"; // Display the modal
}

/**
 * Deletes the selected dish from the database and refreshes the dish list.
 */
async function deleteDish() {
        try {
                // Send a DELETE request to the API
                await fetch(`${API_URL}/${currentDeleteId}`, { method: "DELETE" });
                deleteModal.style.display = "none"; // Close the modal
                loadDishes(); // Reload the dish list
        } catch (err) {
                console.error("Error deleting dish:", err);
                deleteModal.style.display = "none"; // Close the modal on error
        }
}

/**
 * Sets up the form submission for adding a new dish.
 */
async function addElement(){
        document.getElementById("addForm").addEventListener("submit", async e => {
                e.preventDefault(); // Prevent the default form submission
                const form = e.target;
                const newDish = {
                        name: form.name.value,
                        ingredients: form.ingredients.value.split(",").map(s => s.trim()),
                        preparationSteps: form.preparationSteps.value
                        .split(/(?<=\.)\s+/)
                        .map(s => s.trim())
                        .filter(step => step !== ""),
                        cookingTime: form.cookingTime.value,
                        origin: form.origin.value,
                        difficulty: form.difficulty.value,
                };

                try {
                        // Send a POST request to add a new dish
                        const res = await fetch(API_URL, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(newDish),
                        });

                        // Handle the case where the dish name already exists
                        if (!res.ok){
                                const responseData = await res.json();
                                if (responseData.status == 409) {
                                        const error = document.getElementById("nameError");
                                        error.innerText = responseData.message;
                                        error.style.display = "flex"; // Show error message
                                        return;
                                }
                        }

                        document.getElementById("nameError").style = "none"; // Hide error message
                        form.reset(); // Reset the form fields
                        loadDishes(); // Reload the dishes
                } catch (err) {
                        console.error("Error submitting form:", err);
                }
        });
}

/**
 * Updates an existing dish in the table and sends the updated data to the API.
 *
 * @param {string} id - The ID of the dish to update.
 * @param {HTMLElement} row - The table row containing the dish details.
 */
async function updateDish(id, row) {
        const updated = {
                name: row.querySelector(".name").innerText,
                ingredients: row.querySelector(".ingredients").innerText.split(",").map(s => s.trim()),
                preparationSteps: row.querySelector(".steps").innerText.split(".").map(s => s.trim()),
                cookingTime: row.querySelector(".time").innerText,
                origin: row.querySelector(".origin").innerText,
                difficulty: row.querySelector(".difficulty").innerText,
        };

        try {
                // Send a PUT request to update the dish
                const res = await fetch(`${API_URL}/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updated),
                });

                if (!res.ok) {
                        const errData = await res.json();
                        console.error("Error updating dish:", errData);
                        return;
                }

                loadDishes(); // Reload the dishes after successful update
        } catch (err) {
                console.error("Error in updateDish:", err);
        }
}

/**
 * Sets up the delete modal event listeners for confirming or canceling deletion.
 */
function setupModal(){
        confirmDeleteBtn.addEventListener("click", deleteDish);
        cancelDeleteBtn.addEventListener("click", () => {
                deleteModal.style.display = "none"; // Close the modal on cancel
        });

        // Close the modal if clicked outside of it
        document.addEventListener("click", (e) => {
                if (e.target === deleteModal) {
                        deleteModal.style.display = "none";
                }
        });
}

// Initialize the application by setting up event listeners and loading data
ready(addElement);
ready(loadDishes);
ready(setupModal);
