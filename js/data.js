/* =====================================================================
   DATA.JS — Único archivo que hay que editar para cargar contenido.

   Todos los alojamientos usan EL MISMO componente de ficha (el de
   By Muni). Para agregar uno nuevo, copiá un objeto de ITEMS y
   cambiá sus datos. Campos:
   - id, categoria (id de CATEGORIES), nombre, tipo (opcional)
   - ubicacion: texto de ubicación
   - etiquetas: chips destacados (ej: "Habilitación municipal")
   - descripcionBreve (tarjeta) y descripcionCompleta (ficha, opcional)
   - secciones: bloques [{ titulo, items: [...] }] en el orden a mostrar
   - galeria: 4 fotos (ver fotosAlojamiento) — imagenPrincipal = la 1ª
   Si un dato no está disponible, simplemente no se agrega.
   ===================================================================== */

const SITE_INFO = {
  nombreMarca: "Rainbow Umbrella Tours",
  descripcionCorta: "Nuestra especialidad es ayudarte a encontrar el alojamiento perfecto para vos en tus vacaciones",
  whatsappNumero: "5493541615122",
  instagram: null,   // TODO: pendiente de confirmar
  facebook: null,    // TODO: pendiente de confirmar
  ubicacion: null,   // TODO: pendiente de confirmar
  horario: null      // TODO: pendiente de confirmar
};

/* Zonas */
const CATEGORIES = [
  { id: "tanti-centro", label: "Tanti Centro" },
  { id: "tanti", label: "Tanti" },
  { id: "tanti-sans-souci", label: "Tanti / Sans Souci" }
];

/* Fotos: public/images/alojamientos/<slug>/<slug>-01.webp ... -04.webp
   Si el archivo todavía no existe, el sitio muestra "Fotos próximamente". */
const IMG_BASE = "public/images/alojamientos";
function fotosAlojamiento(slug) {
  return [1, 2, 3, 4].map(n => `${IMG_BASE}/${slug}/${slug}-0${n}.webp`);
}

const ITEMS = [
  {
    id: "complejo-by-muni",
    categoria: "tanti-centro",
    nombre: "Complejo By Muni",
    tipo: "PREMIUM Apart Hotel",
    ubicacion: "Tanti Centro",
    etiquetas: [],
    descripcionBreve: "Apart hotel premium en Tanti Centro, edificio de dos plantas con rampas, piletas con vista a las sierras y 4 unidades equipadas.",
    descripcionCompleta: "Este edificio cuenta con dos plantas (rampas).",
    precio: null,
    galeria: fotosAlojamiento("by-muni"),
    secciones: [
      { titulo: "Espacios comunes", items: [
        "🏊 2 piletas con vista a las sierras",
        "🧉 2 quinchos con 🥩 asadores",
        "🌳 Amplio parque",
        "🚗 Cochera techada"
      ]},
      { titulo: "Unidades (4)", items: [
        "🛏️ 2 habitaciones",
        "❄️ Aire acondicionado",
        "📺 Smart TV",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🧺 Lavarropas",
        "🌮 Microondas"
      ]},
      { titulo: "Características especiales", items: [
        "🐶 Pet Friendly"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se admiten visitas"
      ]}
    ]
  },
  {
    id: "casa-la-abu",
    categoria: "tanti-centro",
    nombre: "Casa La Abu",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "Casa en Tanti Centro con pileta exclusiva, quincho, asador y amplio parque. 3 habitaciones para 8 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-la-abu"),
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta exclusiva",
        "🚗 Cochera techada",
        "🥩 Asador",
        "🧉 Quincho",
        "🌳 Amplio parque"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 3 habitaciones",
        "👥 8 personas",
        "🚿 2 baños",
        "📺 Smart TV - DirecTV prepago",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🌮 Microondas"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se admiten visitas"
      ]}
    ]
  },
  {
    id: "cabana-bauge",
    categoria: "tanti-sans-souci",
    nombre: "Cabaña Bauge",
    ubicacion: "Tanti / Sans Souci",
    etiquetas: ["Vista panorámica"],
    descripcionBreve: "Cabaña en Tanti / Sans Souci con vista panorámica, a 100 mts del río. 1 habitación para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("cabana-bauge"),
    secciones: [
      { titulo: "Espacios comunes", items: [
        "🌊 100 mts del río",
        "⚽ Cancha de fútbol",
        "🏊 Pileta",
        "🧉 Quincho principal con baño (frente a la pileta)",
        "🧉 Quincho con 🥩 asador",
        "🌳 Amplio parque",
        "🚗 Cochera techada"
      ]},
      { titulo: "Capacidad", items: [
        "👥 Para 4 personas"
      ]},
      { titulo: "Características de la unidad", items: [
        "🛏️ 1 habitación",
        "❄️ Aire acondicionado",
        "🧉 Quincho privado",
        "🚗 Cochera techada",
        "📺 Cable",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🌮 Microondas",
        "🛏️ Ropa de cama"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se admiten visitas"
      ]}
    ]
  },
  {
    id: "las-margaritas",
    categoria: "tanti",
    nombre: "Las Margaritas",
    ubicacion: "Tanti",
    etiquetas: ["Habilitación municipal", "Hacemos videollamadas"],
    descripcionBreve: "2 unidades en Tanti con pileta, cancha de fútbol, quincho y amplio parque. Pet Friendly.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("las-margaritas"),
    secciones: [
      { titulo: "Espacios comunes", items: [
        "🏊 Pileta",
        "⚽ Cancha de fútbol",
        "🧉 Quincho",
        "🌳 Amplio parque"
      ]},
      { titulo: "Unidades (2) — cada una cuenta con", items: [
        "🛏️ 2 habitaciones",
        "👥 11 personas",
        "📺 TV x cable",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🌮 Microondas",
        "🥩 Asador",
        "🚗 Cochera techada",
        "🐶 Pet Friendly"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se admiten visitas"
      ]}
    ]
  },
  {
    id: "el-bosquecito",
    categoria: "tanti-centro",
    nombre: "El Bosquecito",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal"],
    descripcionBreve: "2 unidades en Tanti Centro con salida al río, cochera, asador y amplio parque. Cada unidad para 5 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("el-bosquecito"),
    secciones: [
      { titulo: "Capacidad", items: [
        "2 unidades",
        "👥 Cada unidad cuenta con capacidad para 5 personas"
      ]},
      { titulo: "Espacios comunes", items: [
        "🌊 Salida al río",
        "🚗 Cochera",
        "🥩 Asador",
        "🌳 Amplio parque"
      ]},
      { titulo: "Cada unidad cuenta con", items: [
        "🛏️ 2 habitaciones",
        "❄️ Aire acondicionado",
        "📺 TV x cable",
        "📱 WiFi"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se admiten visitas"
      ]}
    ]
  }
];

/* La imagen principal es siempre la primera de la galería. */
ITEMS.forEach(i => { i.imagenPrincipal = i.galeria.length ? i.galeria[0] : null; });
