const API_URL = "/api/dishes";

//TODO: cleanup code, add comments

function ready(fn){
        if (document.readyState !== 'loading'){
                fn();
                return;
        }
        document.addEventListener('DOMContentLoaded', fn);
}

async function loadDishes() {
        try {
                const res = await fetch(API_URL);
                const dishes = await res.json();
                const table = document.getElementById("dishTable");
                const template = document.getElementById("dishRowTemplate");
                table.innerHTML = "";

                dishes.forEach(dish => {
                        const clone = template.content.cloneNode(true);
                        const row = clone.querySelector("tr");

                        row.querySelector(".name").innerText = dish.name;
                        row.querySelector(".ingredients").innerText = dish.ingredients.join(", ");
                        row.querySelector(".steps").innerText = dish.preparationSteps.join(" ");
                        row.querySelector(".time").innerText = dish.cookingTime;
                        row.querySelector(".origin").innerText = dish.origin;
                        row.querySelector(".difficulty").innerText = dish.difficulty;

                        row.querySelector(".update").addEventListener("click", () => updateDish(dish._id, row));
                        row.querySelector(".delete").addEventListener("click", () => deleteDish(dish._id));

                        table.appendChild(clone);
                });
        } catch (err){
                console.error(err);
        }
}

async function deleteDish(id) {
        if (confirm("Are you sure you want to delete this recipe?")) {
                await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                loadDishes();
        }
}

async function addElement(){
        document.getElementById("addForm").addEventListener("submit", async e => {
                e.preventDefault();
                const form = e.target;
                const newDish = {
                        name: form.name.value,
                        ingredients: form.ingredients.value.split(",").map(s => s.trim()),
                        preparationSteps: form.preparationSteps.value.split(".").map(s => s.trim()),
                        cookingTime: form.cookingTime.value,
                        origin: form.origin.value,
                        difficulty: form.difficulty.value,
                };

                try {
                        const res = await fetch(API_URL, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(newDish),
                        });
                        
                        const responseData = await res.json();

                        if (responseData.status == 409) {
                                alert(`Error: ${responseData.message}`);
                                return;
                        }

                        form.reset();
                        loadDishes();
                } catch (err) {
                        console.error("Error submitting form:", err);
                }
        });
}

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

                loadDishes();
        } catch (err) {
                console.error("Error in updateDish:", err);
        }
}

ready(addElement);
ready(loadDishes);
