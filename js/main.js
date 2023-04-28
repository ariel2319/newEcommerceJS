//DataBase 
const productos = [
    {
        id: 1,
        nombre: 'A Plague Tale',
        imagen: './img/producto1.jpg',
        precio: 39.9,
        unidades: 5
    },
    {
        id: 2,
        nombre: 'Batman Arkham O.',
        imagen: './img/producto2.jpg',
        precio: 29.9,
        unidades: 4
    },
    {
        id: 3,
        nombre: 'Ciberpunk 2077',
        imagen: './img/producto3.jpg',
        precio: 59.9,
        unidades: 7
    },
    {
        id: 4,
        nombre: 'Spider Man',
        imagen: './img/producto4.jpg',
        precio: 29.9,
        unidades: 5
    },
    {
        id: 5,
        nombre: 'The Witcher 3',
        imagen: './img/producto5.jpg',
        precio: 39.9,
        unidades: 4
    },
    {
        id: 6,
        nombre: 'NBA 2K 23',
        imagen: './img/producto6.jpg',
        precio: 59.9,
        unidades: 7
    },
    {
        id: 7,
        nombre: 'Metal Gear Rising',
        imagen: './img/producto7.jpg',
        precio: 49.9,
        unidades: 5
    },
    {
        id: 8,
        nombre: 'Red Dead Redeption II',
        imagen: './img/producto8.jpg',
        precio: 55.9,
        unidades: 4
    },
    {
        id: 9,
        nombre: 'Gears of War 4',
        imagen: './img/producto9.jpg',
        precio: 39.9,
        unidades: 7
    },
    {
        id: 10,
        nombre: 'Borderlands 2 ',
        imagen: './img/producto10.jpg',
        precio: 29.9,
        unidades: 5
    },
    {
        id: 11,
        nombre: 'Bioshock',
        imagen: './img/producto11.jpg',
        precio: 19.9,
        unidades: 4
    },
    {
        id: 12,
        nombre: 'BassMaste Fishing',
        imagen: './img/producto12.jpg',
        precio: 19.9,
        unidades: 7
    },
    {
        id: 13,
        nombre: 'FIFA 23',
        imagen: './img/producto13.jpg',
        precio: 29.9,
        unidades: 4
    },
    {
        id: 14,
        nombre: 'Half Life 2',
        imagen: './img/producto14.jpg',
        precio: 19.9,
        unidades: 7
    }
]

//? Productos 
const productosContenedor = document.querySelector('.products__container')

function pintarProductos() {
    let html = ''
    for (const { id, nombre, imagen, precio, unidades } of productos) {
        html += `
        <div class="card">
        
            <div class="card__img">
                <img src="${imagen}" alt="${nombre}">
            </div>

            <div class="card__info">
                <h3 class="card__nombre">${nombre}</h3>

                <div class="card__price">
                    <h4>${unidades} U.</h4>
                    <h4>$${precio} USD</h4>
                </div>

                <div class="card__button">
                    <button type="button" class="button card__precio agregar" data-id="${id}"> <i class='bx bxs-add-to-queue'> </i> Agregar </button>
                </div>
            </div>
        </div>
    `
    }
    productosContenedor.innerHTML = html
}

pintarProductos()



//? Carrito 
let carrito = []

const articulosContenedor = document.querySelector('.cart__container .cart__list')
const contadorDeArticulos = document.getElementById('cart-count')
const totalPrecio = document.getElementById('cart-total')
const botonComprar = document.querySelector('.btn--checkout')

function pintarCarrito() {
    let html = ''

    for (const { id, cantidad } of carrito) {
        const { nombre, imagen } = productos.find(producto => producto.id === id)
        html += `
        <li class="cart__item">
            <article class="cart__article">
                <div>    
                    <img class="cart__image" src="${imagen}" alt="${nombre}">
                </div>

                <h2 class="cart__name">
                    ${nombre}
                </h2>
                
                <div class="cart__data">
        
                        <button type="button" class="cart__button btn--remove" id="cart-remove" data-id="${id}"><i class='bx bx-minus' ></i>
                        </button>

                        <span id="cart-qty">${cantidad}
                        </span>

                        <button type="button" class="cart__button btn--add" id="cart-add" data-id="${id}"> <i class='bx bx-plus'> </i> 
                        </button>

                        <button type="button" class="cart__button btn--delete" id="cart-delete" data-id="${id}"> <i class='bx bx-trash'> </i> 
                        </button>
                    
                </div>
                
            </article>
        </li>   
        `
    }

    articulosContenedor.innerHTML = html
    contadorDeArticulos.innerHTML = contarArticulos()
    totalPrecio.innerHTML = total()
}


function agregarAlCarrito(id) {
    const cantidad = 1

    // si el producto (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
    const productoEncontrado = productos.find(producto => producto.id === id)

    if (productoEncontrado && productoEncontrado.unidades > 0) {
        // si el articulo (x) en su propiedad id es igual al id que pasamos como párametro, retornalo.
        const articuloEncontrado = carrito.find(articulo => articulo.id === id)

        if (articuloEncontrado) {
            // console.log('aumenta su cantidad')

            // verificar las unidades dispobibles
            if (checarUnidades(id, cantidad + articuloEncontrado.cantidad)) {
                articuloEncontrado.cantidad += cantidad
            } else {
                window.alert('No hay más unidades disponibles')
            }
        } else {
            carrito.push({ id, cantidad })
        }
    } else {
        window.alert('Lo sentimos no contamos con unidades disponibles')
    }
    pintarCarrito()
}


function checarUnidades(id, cantidad) {
    const productoEncontrado = productos.find(producto => producto.id === id)
    // console.log('id: ', id)
    // console.log('cantidad: ', cantidad)
    return productoEncontrado.unidades - cantidad >= 0
}


function removerDelCarrito(id) {
    const cantidad = 1
    // si la propiedad ID de un articulo es igual al ID que entra como parámetro...se lo assignamos a articuloEncontrado..
    const articuloEncontrado = carrito.find(articulo => articulo.id === id)
    //si se asigno un valor a articuloEncontrado
    if (articuloEncontrado && articuloEncontrado.cantidad - cantidad > 0) {
        articuloEncontrado.cantidad -= cantidad
    } else {
        carrito = carrito.filter(articulo => articulo.id !== id)
    }
    pintarCarrito()
}


function eliminarArticulo(id) {
    carrito = carrito.filter(articulo => articulo.id !== id)
    pintarCarrito()
}


function contarArticulos() {
    let suma = 0
    for (const articulo of carrito) {
        suma += articulo.cantidad
    }
    return suma
}


function total() {
    let suma = 0
    for (const articulo of carrito) {
        const productoEncontrado = productos.find(producto => producto.id === articulo.id)
        suma += articulo.cantidad * productoEncontrado.precio
    }
    return suma.toFixed(2)
}


function comprar() {
    for (const articulo of carrito) {
        const productoEncontrado = productos.find(producto => producto.id === articulo.id)
        productoEncontrado.unidades -= articulo.cantidad
    }
    window.alert('gracias por su compra')
    carrito = []
    pintarCarrito()
    pintarProductos()
}

pintarCarrito()



productosContenedor.addEventListener('click', e => {
    if (e.target.closest('.agregar')) {
        const id = +e.target.closest('.agregar').dataset.id
        agregarAlCarrito(id)
    }
})


articulosContenedor.addEventListener('click', e => {
    if (e.target.closest('#cart-add')) {
        const id = +e.target.closest('#cart-add').dataset.id
        agregarAlCarrito(id)
    }
    if (e.target.closest('#cart-remove')) {
        const id = +e.target.closest('#cart-remove').dataset.id
        removerDelCarrito(id)
    }
    if (e.target.closest('#cart-delete')) {
        const id = +e.target.closest('#cart-delete').dataset.id
        eliminarArticulo(id)
    }
})


botonComprar.addEventListener('click', () => {
    comprar()
})