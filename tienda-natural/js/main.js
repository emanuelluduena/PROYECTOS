/* =====================================
   WHATSAPP
   ===================================== */
function abrirWhatsApp() {
  const telefono = "5493515426971";
  const mensaje = "Hola, quiero hacer una consulta";
  const url = "https://wa.me/" + telefono + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

/* =====================================
   CATEGORÍAS
   Si agregás una categoría nueva, solo
   la agregás acá y aparece en toda la web
   ===================================== */
const categorias = [
  { nombre: "Frutos secos", url: "frutos-secos.html" },
  { nombre: "Semillas",     url: "semillas.html" },
  { nombre: "Harinas",      url: "harinas.html" },
  { nombre: "Suplementos",  url: "suplementos.html" },
  { nombre: "Granolas",     url: "granolas.html" },
  { nombre: "Congelados",   url: "congelados.html" },
];

/* =====================================
   PRODUCTOS
   ===================================== */
const productos = [

  // ===== DESTACADOS =====
  {
    nombre: "Flor de Hibiscus x 1 kg",
    precio: 4500,
    descripcion: "Antioxidantes · Vitaminas · Energia",
    imagen: "img/flor-hibiscus.jpg",
    categoria: "todos"
  },
  {
    nombre: "Gelatina Sin Sabor x 1 kg",
    precio: 4500,
    descripcion: "Proteinas · Bajo Calorias · Energia",
    imagen: "img/gelatina-sin-sabor.jpg",
    categoria: "todos"
  },
  {
    nombre: "Mix Tropical x 1 kg",
    precio: 17000,
    descripcion: "Proteinas · Bajo Calorias · Energia",
    imagen: "img/gelatina-sin-sabor.jpg",
    categoria: "todos"
  },
  {
    nombre: "Mix Clásico Económico x 1 kg",
    precio: 16000,
    descripcion: "Proteinas · Bajo Calorias · Energia",
    imagen: "img/gelatina-sin-sabor.jpg",
    categoria: "todos"
  },
  {
    nombre: "Flor de Hibiscus x 1 kg",
    precio: 4500,
    descripcion: "Antioxidantes · Vitaminas · Energia",
    imagen: "img/flor-hibiscus.jpg",
    categoria: "todos"
  },

  {
    nombre: "Flor de Hibiscus x 1 kg",
    precio: 4500,
    descripcion: "Antioxidantes · Vitaminas · Energia",
    imagen: "img/flor-hibiscus.jpg",
    categoria: "todos"
  },

  // ===== FRUTOS SECOS =====
  {
    nombre: "Mix Clásico x 1 kg",
    precio: 17000,
    descripcion: "Energía · Proteínas · Natural",
    imagen: "img/mix-clasico.jpg",
    categoria: "frutos-secos"
  },

  // ===== SEMILLAS =====
  {
    nombre: "Mix de Semillas x 1 kg",
    precio: 2500,
    descripcion: "Omega 3 · Fibra · Natural",
    imagen: "img/mix-semillas.jpg",
    categoria: "semillas"
  },

  // ===== HARINAS =====
  {
    nombre: "Harina de Almendras con Piel x 1 kg",
    precio: 5000,
    descripcion: "Natural · Sin TACC · Apta Repostería",
    imagen: "img/harina-almendras.jpg",
    categoria: "harinas"
  },

  // ===== GRANOLAS =====
  {
    nombre: "Granola con Pasta de Maní x 1 kg",
    precio: 9000,
    descripcion: "Energía · Fibra · Sin Conservantes",
    imagen: "img/granola-pasta-mani.jpg",
    categoria: "granolas"
  },

  // ===== SUPLEMENTOS =====
  {
    nombre: "Creatina Monohidrato x 1 kg",
    precio: 7000,
    descripcion: "Fuerza · Rendimiento · Recuperación",
    imagen: "img/creatina-monohidrato.jpg",
    categoria: "suplementos"
  },

  // ===== CONGELADOS =====
  {
    nombre: "Mix de Frutos Rojos Congelados x 1 kg",
    precio: 22000,
    descripcion: "Antioxidantes · Vitaminas · Natural",
    imagen: "img/mix-frutos-rojos.jpg",
    categoria: "congelados"
  }

];

/* =====================================
   RENDERIZADO CATEGORÍAS
   ===================================== */
const listaCategorias = document.querySelector(".categorias ul");

if (listaCategorias) {
  categorias.forEach(cat => {
    listaCategorias.innerHTML += `
      <li><a href="${cat.url}">${cat.nombre}</a></li>
    `;
  });
}

/* =====================================
   RENDERIZADO PRODUCTOS
   ===================================== */
const contenedorDestacados = document.getElementById("productos-destacados");
const contenedorCategoria = document.getElementById("productos-categoria");

function renderizarProducto(producto, contenedor) {
  contenedor.innerHTML += `
    <article class="producto">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio}</p>
      <p>${producto.descripcion}</p>
      <button
        class="btn-producto"
        data-nombre="${producto.nombre}"
        data-precio="${producto.precio}"
        onclick="agregarAlCarrito(this)"
      >
        Agregar al carrito
      </button>
    </article>
  `;
}

if (contenedorDestacados) {
  productos
    .filter(p => p.categoria === "todos")
    .forEach(p => renderizarProducto(p, contenedorDestacados));
}

if (contenedorCategoria) {
  productos
    .filter(p => p.categoria === categoriaActual)
    .forEach(p => renderizarProducto(p, contenedorCategoria));
}

/* =====================================
   CARRITO
   ===================================== */
let carrito = [];

function agregarAlCarrito(boton) {
  const nombre = boton.dataset.nombre.trim();
  const precio = Number(boton.dataset.precio);

  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  guardarCarrito();
}

function actualizarCarrito() {
  const carritoItems =
    document.querySelector(".carrito-items") ||
    document.getElementById("carrito-items");

  const contador = document.getElementById("contador-carrito");

  const totalSpan =
    document.querySelector(".carrito-footer strong") ||
    document.getElementById("carrito-total");

  if (!carritoItems || !totalSpan) return;

  carritoItems.innerHTML = "";

  if (carrito.length === 0) {
    carritoItems.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    if (contador) contador.textContent = 0;
    totalSpan.textContent = totalSpan.tagName === "STRONG" ? "Total: $0" : "0";
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carrito-item");
    itemDiv.innerHTML = `
      <span>${item.nombre}</span>
      <div class="controles-cantidad">
        <button onclick="restarCantidad('${item.nombre}')">−</button>
        <span>${item.cantidad}</span>
        <button onclick="sumarCantidad('${item.nombre}')">+</button>
      </div>
      <span>$${item.precio * item.cantidad}</span>
      <button onclick="eliminarProducto('${item.nombre}')" class="btn-eliminar">🗑️</button>
    `;

    carritoItems.appendChild(itemDiv);
  });

  if (contador) contador.textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);

  if (totalSpan.tagName === "STRONG") {
    totalSpan.textContent = `Total: $${total}`;
  } else {
    totalSpan.textContent = total;
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =====================================
   CARRUSEL INSTAGRAM
   ===================================== */
let posicionCarrusel = 0;

function moverCarrusel(direccion) {
  const track = document.getElementById("carrusel-track");
  if (!track) return;

  const items = track.querySelectorAll(".carrusel-item");
  const totalItems = items.length;

  posicionCarrusel += direccion;

  if (posicionCarrusel < 0) posicionCarrusel = totalItems - 1;
  if (posicionCarrusel >= totalItems) posicionCarrusel = 0;

  const ancho = items[0].offsetWidth + 20;
  track.style.transform = `translateX(-${posicionCarrusel * ancho}px)`;
}

function cargarCarrito() {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  if (carritoGuardado) {
    carrito = carritoGuardado;
    actualizarCarrito();
  }
}

function sumarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    guardarCarrito();
    actualizarCarrito();
  }
}

function restarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
    guardarCarrito();
    actualizarCarrito();
  }
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  guardarCarrito();
  actualizarCarrito();
}

/* =====================================
   INICIAR
   ===================================== */
cargarCarrito();