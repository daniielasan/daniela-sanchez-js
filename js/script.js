// Variables globales
let confirmacion = false;
let producto = {}; // el producto va a ser un objeto
let carrito = []; // array de productos
let opcion;
let idEditar = null;

// Objeto
const objetoConversor = {
    //propiedades
    almohadon:{
        1: 'roma',
        2: 'paris',
        3: 'madrid'
    },
    color:{
        1: 'beige',
        2: 'terracota',
        3: 'blanco'
    },
    talle:{
        1: 'sm',
        2: 'md',
        3: 'lg'
    }
}

function continuar(){
    do{
        opcion = prompt(`
            Para continuar elija una opcion:
            1- Agregar un producto
            2- Editar un producto
            3- Eliminar un producto
            4- Finalizar compra`)
        if(!['1','2','3','4'].includes(opcion))
            alert('Por favor, ingrese un número válido')

    }while( !['1','2','3','4'].includes(opcion));
}

function editarProducto(){
    let seguirIntentando;
    do{

        let idSeleccionado = prompt(`
            Ingrese el id del producto que desea eliminar:
            Puedes ingresar: ${carrito.map(item => item.id)}.
        `)
    
        if(!carrito.map(item => item.id).includes(Number(idSeleccionado))){
            seguirIntentando = confirm(`Este id no es válido. Desea re intentar?`)
        }else{
            seguirIntentando = false;
            idEditar = Number(idSeleccionado);
        }
    }while(seguirIntentando)
}

function eliminarProducto(){
    let seguirEliminando;
    do{
        let idSeleccionado = prompt(`
                Ingrese el id del producto que desea eliminar:
                Puedes ingresar: ${carrito.map(item => item.id)}.
            `)

        if(!carrito.map(item => item.id).includes(Number(idSeleccionado)))
            alert(`Este id no es válido.`)
        else{
            alert(`
                Eliminaste el producto:
                ${JSON.stringify(carrito[idSeleccionado])}
            `)
            carrito = carrito.filter(producto => producto.id !== Number(idSeleccionado))
            console.log('Se eliminó el id '+ idSeleccionado + ' : ', carrito);
        }

        if(carrito.length > 0)
            seguirEliminando = confirm(`
                Desea eliminar otro producto?
            `)
        else{
            seguirEliminando = false
            alert('El carrito está vacío')
        }
    }while(seguirEliminando)
}

// Ciclo do-while 
// Ejecuta todo el proceso al menos una vez
do {
    // capturo numero referente al tipo de almohadon
    const tipoAlmohadon = prompt(`
        Seleccione un modelo de almohadon:
        1- Roma
        2- París
        3- Madrid
    `)
    // flag  // si lo que tengo en tipoAlmohadon hace match
    const isValidTipo = validarEntradas(tipoAlmohadon)  // esta funcion me entrega un booleano = true/false
    
    const colorAlmohadon = prompt(`
        Seleccione un color:
        1- Beige
        2- Terracota
        3- Blanco
    `)
    const isValidColor = validarEntradas(colorAlmohadon)
    
    const talleAlmohadon = prompt(`
        Seleccione un talle:
        1- small
        2- medium
        3- large
    `)
    const isValidTalle = validarEntradas(talleAlmohadon)
    
    function validarEntradas (dato) {
        return ['1','2','3'].includes(dato)
    }
    
    if(isValidTipo && isValidColor && isValidTalle){ // aca se observan las flags
        // Aca armo mi producto
        producto = {
            id: carrito.length,
            almohadon: `${objetoConversor.almohadon[tipoAlmohadon]}`,
            color: `${objetoConversor.color[colorAlmohadon]}`,
            talle: `${objetoConversor.talle[talleAlmohadon]}`
        }
        // Aca muesto el producto
        // Mesaje exitoso
        confirmacion = confirm(`
            Producto Seleccionado:
            Almohado: ${objetoConversor.almohadon[tipoAlmohadon]}
            Color: ${objetoConversor.color[colorAlmohadon]}
            Talle: ${objetoConversor.talle[talleAlmohadon]}
    
            Agregar al carrito?
        `)
    }else{
        // Mensaje fallido
        alert('Has ingresado una o varias opciones inválidas.')
    }
    console.log('EDITAR: ', idEditar);
    if(idEditar){
        if(confirmacion){
            alert(`
                Producto anterior:
                ${JSON.stringify(carrito[idEditar])}
                Producto Editado Exitosamente:
                ${JSON.stringify(producto)}
            `)
            carrito[idEditar] = { ...producto, id: idEditar};
            console.log('Carrito Editado: ', carrito);
            idEditar = null;
        }else{
            alert('No se agrego al carrito')
        }
    }else{
        if(confirmacion){
            alert(`
            Agregado al carrito:
            para ver la lista del carrito
            abrir la consola.`)
            carrito.push(producto)
            console.log('CARRITO: ', carrito);
        }else{
            alert('No se agrego al carrito')
        }
    }

    continuar();

    switch(opcion){
        case '2':
            editarProducto();
            break;
        case '3':
            eliminarProducto();
            break;
        case '4':
            console.log('Compra finalizada. El carrito contiene: ', carrito);
            break;
    }

} while (opcion === '1' || opcion === '2');

