/* =====================================================================
   DATA.JS — Único archivo que hay que editar con el contenido real.

   Todo lo que ves acá es contenido DE EJEMPLO (placeholder), pensado
   para probar que el sitio funciona. Ningún dato es real: nombres,
   descripciones, precios y teléfono son ficticios y deben reemplazarse
   por la información real del catálogo cuando esté disponible.

   Cómo completar:
   1) Reemplazá SITE_INFO con el nombre de marca real, WhatsApp real, etc.
   2) Reemplazá CATEGORIES con las categorías reales del catálogo.
   3) Reemplazá cada objeto de ITEMS con los productos/servicios reales.
   4) Poné las fotos reales en la carpeta /images y actualizá las rutas.
   ===================================================================== */

const SITE_INFO = {
  nombreMarca: "Nombre de la Marca", // TODO: reemplazar
  descripcionCorta: "Descripción corta de la marca (una frase) — reemplazar con la propuesta real de valor del negocio.", // TODO
  whatsappNumero: "5493541615122", // TODO: confirmar número real
  instagram: null,   // TODO: 'https://instagram.com/usuario' si existe
  facebook: null,    // TODO
  ubicacion: null,   // TODO: 'Ciudad, Provincia'
  horario: null      // TODO: 'Lunes a domingo de 9 a 20 hs'
};

const CATEGORIES = [
  { id: "categoria-1", label: "Categoría 1 (reemplazar)" },
  { id: "categoria-2", label: "Categoría 2 (reemplazar)" },
  { id: "categoria-3", label: "Categoría 3 (reemplazar)" }
];

const ITEMS = [
  {
    id: "ejemplo-1",
    categoria: "categoria-1",
    nombre: "Servicio de ejemplo 1",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual. Acá va el texto real y detallado que describe el producto o servicio, tal como figure en el catálogo de WhatsApp.",
    precio: null, // TODO: ej. "Desde $25.000"
    imagenPrincipal: "images/placeholder-1.svg",
    galeria: [
      "images/placeholder-1.svg",
      "images/placeholder-2.svg",
      "images/placeholder-3.svg",
      "images/placeholder-4.svg"
    ],
    caracteristicas: [
      "Característica de ejemplo 1",
      "Característica de ejemplo 2",
      "Característica de ejemplo 3"
    ]
  },
  {
    id: "ejemplo-2",
    categoria: "categoria-1",
    nombre: "Servicio de ejemplo 2",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual del servicio 2.",
    precio: null,
    imagenPrincipal: "images/placeholder-2.svg",
    galeria: ["images/placeholder-2.svg", "images/placeholder-3.svg"],
    caracteristicas: ["Característica de ejemplo 1", "Característica de ejemplo 2"]
  },
  {
    id: "ejemplo-3",
    categoria: "categoria-2",
    nombre: "Servicio de ejemplo 3",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual del servicio 3.",
    precio: null,
    imagenPrincipal: "images/placeholder-3.svg",
    galeria: ["images/placeholder-3.svg", "images/placeholder-1.svg", "images/placeholder-4.svg"],
    caracteristicas: ["Característica de ejemplo 1", "Característica de ejemplo 2", "Característica de ejemplo 3"]
  },
  {
    id: "ejemplo-4",
    categoria: "categoria-2",
    nombre: "Servicio de ejemplo 4",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual del servicio 4.",
    precio: null,
    imagenPrincipal: "images/placeholder-4.svg",
    galeria: ["images/placeholder-4.svg", "images/placeholder-2.svg"],
    caracteristicas: ["Característica de ejemplo 1", "Característica de ejemplo 2"]
  },
  {
    id: "ejemplo-5",
    categoria: "categoria-3",
    nombre: "Servicio de ejemplo 5",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual del servicio 5.",
    precio: null,
    imagenPrincipal: "images/placeholder-1.svg",
    galeria: ["images/placeholder-1.svg", "images/placeholder-3.svg", "images/placeholder-2.svg"],
    caracteristicas: ["Característica de ejemplo 1", "Característica de ejemplo 2"]
  },
  {
    id: "ejemplo-6",
    categoria: "categoria-3",
    nombre: "Servicio de ejemplo 6",
    descripcionBreve: "Descripción breve de ejemplo para la tarjeta. Reemplazar con texto real y propio del catálogo.",
    descripcionCompleta: "Descripción completa de ejemplo para la ficha individual del servicio 6.",
    precio: null,
    imagenPrincipal: "images/placeholder-2.svg",
    galeria: ["images/placeholder-2.svg", "images/placeholder-4.svg"],
    caracteristicas: ["Característica de ejemplo 1", "Característica de ejemplo 2"]
  }
];
