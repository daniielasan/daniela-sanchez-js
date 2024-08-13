const almohadonesContainer = document.getElementById('almohadones-container');

localStorage.setItem("descripciones", JSON.stringify({
    "Paris": "Excelente calidad de  algodón mediterraneo. Suave al tacto, ideal para decorar interiores",
    "Madrid": "Material semi sintetico extremada mente resistenete, ideal para ser usado en exteriores",
    "Roma": "Material sintetico impermeable de alta calidad, ideal para ser usado muebles de playas o albercas"
}))

const almohadones = ['Roma', 'Paris', 'Madrid']
const colores = ['beige', 'terracota','white']
const carrito = []
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

const buySelection = (key, cardContainer, div) =>{
    
    carrito.push(ordenGeneral[key])
    console.log('CARRITO: ', carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito))
    resetSelection(key, cardContainer, div)
}

const resetSelection = (key, container, child) =>{
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

const setSelectedColor = (key, color, buyButton) => {
    ordenGeneral[key].selectedColor ={
        beige: false,
        white: false,
        terracota: false,
        [color]: true
    }
    buyButton.disabled = !Object.values(ordenGeneral[key].selectedColor).some(value => value)
};

const colorSelection = (key) => {
    const cardContainer = document.getElementById(`card-container-${key}`);
    const div = document.createElement('div');
    div.id = `colors-${key}` 
    div.classList.add('color-card')
    div.style.width = '16rem'
    div.innerHTML = `
    <div class="colors-container">
        <p class="title-color">Seleccione un Color</p>
        <div class="colors-row">
            <p id="color-beige" class="beige">beige</p>
            <p id="color-white" class="white">blanco</p>
            <p id="color-terracota" class="terracota">terra</p>
        </div>
        <div class="footer">
            <button id="color-${key}-buy" type="button" class="btn btn-success item-button">Comprar</button>
            <button id="color-${key}-reset" type="button" class="btn btn-danger item-button">Reset</button>
        </div>
    </div>
    `

    if(ordenGeneral[key].accum > 0 && ordenGeneral[key].open === false) {
        cardContainer.appendChild(div)
        ordenGeneral[key].open = true;

        const buyButton = document.getElementById(`color-${key}-buy`)
        buyButton.disabled = !Object.values(ordenGeneral[key].selectedColor).some(value => value)

        colores.forEach(color => {
            document.getElementById(`color-${color}`).addEventListener('click', () => setSelectedColor(key, color, buyButton))
        });

        buyButton.addEventListener('click', () => buySelection(key, cardContainer, div))
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
    const descripcion = JSON.parse(localStorage.getItem("descripciones"))[key]
    const child = `
    <div id="card-container-${key}" class="card" style="width: 18rem;">
        <img class="item-img" src="../assets/${key.toLowerCase()}.jpeg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 id="card-title-${key}" class="card-title">${key} (${ordenGeneral[key].accum})</h5>
            <p class="card-text">${descripcion}</p>
        </div>
        <div class="footer">
            <button id="card-${key}-add" type="button" class="btn btn-success item-button">Agregar</button>
            <button id="card-${key}-sus" type="button" class="btn btn-danger item-button">Restar</button>
        </div>
    </div>
    `
    almohadonesContainer.innerHTML += child;
}

for (const key of almohadones) {
    document.getElementById(`card-${key}-add`).addEventListener('click', () => accumItem(key, 'add'));
    document.getElementById(`card-${key}-sus`).addEventListener('click', () => accumItem(key, 'sus'));
}