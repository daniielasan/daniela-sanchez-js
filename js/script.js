// Variables globales
let confirmacion = false;
let producto = {}; // el producto va a ser un objeto
let carrito = []; // array de productos
let continuar = true;

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
    // Validacion 
    // Comparación && --> 
    // false && true = false
    // false && false = false
    // true && false = false
    // true && true = true
    
    
    if(isValidTipo && isValidColor && isValidTalle){ // aca se observan las flags
        // Aca armo mi producto
        producto = {
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
    
            Agregar al carrito o que?
        `)
    }else{
        // Mensaje fallido
        alert('Has ingresado una o varias opciones inválidas.')
    }
    
    if(confirmacion){
        alert('Agregado al carrito')
        carrito.push(producto)
        console.log('CARRITO: ', carrito);
    }else{
        alert('No se agrego al carrito')
    }

    continuar = confirm(` Desea continuar comprando?`)
} while (continuar);

// Siguente fase del proceso de compra
// 1- Visualizar la lista de productos
// 2- Ofrecer opcion de modificar esa lista
// 3- Opcional: manejo de stocks

