const almohadonesContainer = document.getElementById('almohadones-container');

const almohadones = ['Roma', 'Paris', 'Madrid']
const colores = ['Beige', 'Terracota', 'Blanco']

const almohadonesAccum = {
    Roma: 0,
    Paris: 0,
    Madrid: 0
}

const addItem = (key) =>{
    almohadonesAccum[key] += 1;
    document.getElementById(`card-title-${key}`).textContent = `${key} (${almohadonesAccum[key]})`;
}
const susItem = (key) =>{
    almohadonesAccum[key] -= 1;
    document.getElementById(`card-title-${key}`).textContent = `${key} (${almohadonesAccum[key]})`;
}

for (const key of almohadones) {
    const child = `
    <div class="card" style="width: 18rem;">
        <img class="item-img" src="../assets/${key.toLowerCase()}.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 id="card-title-${key}" class="card-title">${key} (${almohadonesAccum[key]})</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div>
                <button id="card-${key}-add" type="button" class="btn btn-primary item-button">Agregar</button>
                <button id="card-${key}-sus" type="button" class="btn btn-primary item-button">Restar</button>
            </div>
        </div>
    </div>
    `
    almohadonesContainer.innerHTML += child;
}

for (const key of almohadones) {
    document.getElementById(`card-${key}-add`).addEventListener('click', () => addItem(key));
    document.getElementById(`card-${key}-sus`).addEventListener('click', () => susItem(key));
}