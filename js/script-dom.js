const almohadonesContainer = document.getElementById('almohadones-container');

const almohadones = ['Roma', 'Paris', 'Madrid']
const colores = ['beige', 'terracota','white']

const ordenGeneral = {
    Roma: {
        accum: 0,
        open: false,
        selectedColor: {
            beige: false,
            white: false,
            terracota: false
        }
    },
    Paris: {
        accum: 0,
        open: false,
        selectedColor: {
            beige: false,
            white: false,
            terracota: false
        }
    },
    Madrid: {
        accum: 0,
        open: false,
        selectedColor: {
            beige: false,
            white: false,
            terracota: false
        }
    }
}

const buySelection = () =>{

}
const resetSelection = (key, container, child) =>{
    console.log(ordenGeneral[key]);
    ordenGeneral[key] = {
        accum: 0,
        open: false,
        selectedColor: {
            beige: false,
            white: false,
            terracota: false
        }
    }
    document.getElementById(`card-title-${key}`).textContent = `${key} (${ordenGeneral[key].accum  < 0 ? 0 : ordenGeneral[key].accum })`;
    container.removeChild(child)
}

const setSelectedColor = (key, color) => {
    ordenGeneral[key].selectedColor ={
        beige: false,
        white: false,
        terracota: false,
        [color]: true
    }
};

const colorSelection = (key) => {
    const cardContainer = document.getElementById(`card-container-${key}`);
    const div = document.createElement('div');
    div.id = `colors-${key}` 
    div.classList.add('card')
    div.style.width = '16rem'
    div.innerHTML = `
    <div class="colors-container">
        <p class="title-color">Seleccione un Color</p>
        <div class="colors-row">
            <p id="color-beige" class="beige">beige</p>
            <p id="color-white" class="white">blanco</p>
            <p id="color-terracota" class="terracota">terra</p>
        </div>
        <div>
            <button id="color-${key}-buy" type="button" class="btn btn-success item-button">Comprar</button>
            <button id="color-${key}-reset" type="button" class="btn btn-danger item-button">Reset</button>
        </div>
    </div>
    `

    if(ordenGeneral[key].accum > 0 && ordenGeneral[key].open === false) {
        cardContainer.appendChild(div)
        ordenGeneral[key].open = true;

        colores.forEach(color => {
            document.getElementById(`color-${color}`).addEventListener('click', () => setSelectedColor(key, color))
        });

        document.getElementById(`color-${key}-buy`).addEventListener('click', () => buySelection(key))
        document.getElementById(`color-${key}-reset`).addEventListener('click', () => resetSelection(key, cardContainer, div))
    }else if( ordenGeneral[key].open === true && ordenGeneral[key].accum === 0) {
        cardContainer.removeChild(document.getElementById(`colors-${key}`));
        ordenGeneral[key].open = false;
    }
}

const accumItem = (key, tag) =>{
    if(tag === 'add')
        ordenGeneral[key].accum  += 1;
    else
        ordenGeneral[key].accum  = ordenGeneral[key].accum  <= 0 ? 0 : ordenGeneral[key].accum  - 1;

    document.getElementById(`card-title-${key}`).textContent = `${key} (${ordenGeneral[key].accum  < 0 ? 0 : ordenGeneral[key].accum })`;

    colorSelection(key);
}

for (const key of almohadones) {
    const child = `
    <div id="card-container-${key}" class="card" style="width: 18rem;">
        <img class="item-img" src="../assets/${key.toLowerCase()}.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 id="card-title-${key}" class="card-title">${key} (${ordenGeneral[key].accum})</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div>
                <button id="card-${key}-add" type="button" class="btn btn-success item-button">Agregar</button>
                <button id="card-${key}-sus" type="button" class="btn btn-danger item-button">Restar</button>
            </div>
        </div>
    </div>
    `
    almohadonesContainer.innerHTML += child;
}

for (const key of almohadones) {
    document.getElementById(`card-${key}-add`).addEventListener('click', () => accumItem(key, 'add'));
    document.getElementById(`card-${key}-sus`).addEventListener('click', () => accumItem(key, 'sus'));
}