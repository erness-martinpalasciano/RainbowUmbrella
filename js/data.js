/* =====================================================================
   DATA.JS — Único archivo que hay que editar para cargar contenido.

   Las tarjetas, las fichas y el BUSCADOR leen exactamente estos datos,
   así que lo que se ve en pantalla y lo que se busca nunca difieren.

   Todos los alojamientos usan el mismo componente de ficha. Para agregar
   uno nuevo, copiá un objeto de ITEMS y cambiá sus datos. Campos:
   - id, categoria (id de CATEGORIES), nombre, tipo (texto visible, opcional)
   - ubicacion: texto de ubicación
   - etiquetas: chips destacados (ej: "Habilitación municipal")
   - descripcionBreve (tarjeta) y descripcionCompleta (ficha, opcional)
   - secciones: bloques [{ titulo, items: [...] }] en el orden a mostrar
   - galeria: fotos (ver fotosAlojamiento) — imagenPrincipal = la 1ª
   - datos: valores para el buscador. REGLA: solo lo confirmado.
       tipo        "casa" | "departamento" | "cabana" | "complejo" | null
       capacidad   número de personas (por unidad) | null
       habitaciones, banos   número | null
       mascotas    true (acepta) | false (no acepta) | null (sin información)
       visitas     true (admite) | false (no admite) | null (sin información)
     "null" significa "no hay información", NUNCA "sí". Los servicios
     (pileta, wifi, cochera…) se detectan solos a partir de los textos de
     "secciones" usando la lista SERVICIOS de abajo.
   Si un dato no está disponible, simplemente no se agrega.
   ===================================================================== */

const SITE_INFO = {
  nombreMarca: "Rainbow Umbrella Tours",
  descripcionCorta: "Nuestra especialidad es ayudarte a encontrar el alojamiento perfecto para vos en tus vacaciones",
  whatsappNumero: "5493541615122",
  instagram: "https://www.instagram.com/rainbowumbrellatours?cplk=dGY2ZXQ4NWR6dndm",
  facebook: "https://www.facebook.com/Rainbowumbrellatours/",
  ubicacion: null,   // TODO: pendiente de confirmar
  horario: null      // TODO: pendiente de confirmar
};

/* Zonas */
const CATEGORIES = [
  { id: "tanti", label: "Tanti" },
  { id: "Córdoba", label: "Córdoba" },
  { id: "Alta Gracia", label: "Alta Gracia" },
  { id: "Buenos Aires", label: "Buenos Aires" }
];

/* Tipos de alojamiento que acepta el buscador */
const TIPOS = {
  casa: "Casa",
  departamento: "Departamento",
  cabana: "Cabaña",
  complejo: "Complejo / Apart hotel"
};

/* Servicios y comodidades que el buscador puede detectar.
   re: expresión sobre el texto SIN acentos y en minúsculas.
   alias: palabras que el usuario puede escribir para encontrarlo. */
const SERVICIOS = [
  { id: "pileta",      label: "Pileta",                re: /pileta|piscina/,            alias: ["pileta", "piscina", "pileta exclusiva"] },
  { id: "cochera",     label: "Cochera",               re: /cochera|estacionamiento/,   alias: ["cochera", "estacionamiento", "garage", "garaje", "parking"] },
  { id: "wifi",        label: "WiFi",                  re: /wi ?fi/,                    alias: ["wifi", "wi fi", "internet"] },
  { id: "aire",        label: "Aire acondicionado",    re: /aire acondicionado/,        alias: ["aire acondicionado", "aire", "climatizado"] },
  { id: "calefaccion", label: "Calefacción",           re: /calefaccion/,               alias: ["calefaccion", "calefaccionada", "calefaccionado"] },
  { id: "asador",      label: "Asador / parrilla",     re: /asador|parrilla/,           alias: ["asador", "asadores", "parrilla", "parrillero"] },
  { id: "quincho",     label: "Quincho",               re: /quincho/,                   alias: ["quincho", "quinchos"] },
  { id: "parque",      label: "Parque",                re: /parque/,                    alias: ["parque", "jardin"] },
  { id: "tv",          label: "TV",                    re: /\btv\b|directv|cable/,      alias: ["tv", "smart tv", "television", "cable", "directv"] },
  { id: "pava",        label: "Pava eléctrica",        re: /pava/,                      alias: ["pava", "pava electrica"] },
  { id: "microondas",  label: "Microondas",            re: /microondas/,                alias: ["microondas"] },
  { id: "lavarropas",  label: "Lavarropas",            re: /lavarropas/,                alias: ["lavarropas"] },
  { id: "rio",         label: "Cerca del río",         re: /del rio|al rio/,            alias: ["rio"] },
  { id: "vista",       label: "Vista panorámica / a las sierras", re: /vista/,         alias: ["vista", "vista panoramica", "panoramica", "sierras"] },
  { id: "futbol",      label: "Cancha de fútbol",      re: /futbol/,                    alias: ["cancha", "futbol"] }
];

/* Fotos: public/images/alojamientos/<slug>/<slug>-01.webp ... -0N.webp
   Si el archivo todavía no existe, el sitio muestra "Fotos próximamente". */
const IMG_BASE = "public/images/alojamientos";
function fotosAlojamiento(slug, cantidad) {
  const n = cantidad || 4;
  return Array.from({ length: n }, (_, k) => `${IMG_BASE}/${slug}/${slug}-0${k + 1}.webp`);
}

const NO_VISITAS = "🚫 No se admiten visitas";

const ITEMS = [
  /* ------------------------- TANTI ------------------------- */
  {
    id: "complejo-by-muni",
    categoria: "tanti",
    nombre: "Complejo By Muni",
    tipo: "PREMIUM Apart Hotel",
    ubicacion: "Tanti Centro",
    etiquetas: [],
    descripcionBreve: "Apart hotel premium en Tanti Centro, edificio de dos plantas con rampas, piletas con vista a las sierras y 4 unidades equipadas.",
    descripcionCompleta: "Este edificio cuenta con dos plantas (rampas).",
    precio: null,
    galeria: fotosAlojamiento("by-muni"),
    datos: { tipo: "complejo", capacidad: null, habitaciones: 2, banos: null, mascotas: true, visitas: false },
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
      { titulo: "Características especiales", items: ["🐶 Pet Friendly"] },
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "casa-la-abu",
    categoria: "tanti",
    nombre: "Casa La Abu",
    tipo: "Alojamiento",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "Casa en Tanti Centro con pileta exclusiva, quincho, asador y amplio parque. 3 habitaciones para 8 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-la-abu"),
    datos: { tipo: "casa", capacidad: 8, habitaciones: 3, banos: 2, mascotas: null, visitas: false },
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
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "cabana-bauge",
    categoria: "tanti",
    nombre: "Cabaña Bauge",
    tipo: "Cabaña de troncos",
    ubicacion: "Tanti Sans Souci",
    etiquetas: ["Vista panorámica"],
    descripcionBreve: "Cabaña en Tanti / Sans Souci con vista panorámica, a 100 mts del río. 1 habitación para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("cabana-bauge"),
    datos: { tipo: "cabana", capacidad: 4, habitaciones: 1, banos: null, mascotas: null, visitas: false },
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
      { titulo: "Capacidad", items: ["👥 Para 4 personas"] },
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
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "las-margaritas",
    categoria: "tanti",
    nombre: "Las Margaritas",
    tipo: "Alojamiento",
    ubicacion: "Tanti",
    etiquetas: ["Habilitación municipal", "Hacemos videollamadas"],
    descripcionBreve: "2 unidades en Tanti con pileta, cancha de fútbol, quincho y amplio parque. Pet Friendly.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("las-margaritas"),
    datos: { tipo: null, capacidad: 11, habitaciones: 2, banos: null, mascotas: true, visitas: false },
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
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "el-bosquecito",
    categoria: "tanti",
    nombre: "El Bosquecito",
    tipo: "Cabaña de troncos",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal"],
    descripcionBreve: "2 unidades en Tanti Centro con salida al río, cochera, asador y amplio parque. Cada unidad para 5 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("el-bosquecito"),
    datos: { tipo: null, capacidad: 5, habitaciones: 2, banos: null, mascotas: null, visitas: false },
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
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "villa-trinidad",
    categoria: "tanti",
    nombre: "Villa Trinidad",
    tipo: "Alojamiento",
    ubicacion: "Tanti",
    etiquetas: [],
    descripcionBreve: "3 unidades en Tanti con pileta con vista a las sierras y amplio parque. Pet Friendly.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("villa-trinidad", 1),
    datos: { tipo: null, capacidad: null, habitaciones: 2, banos: null, mascotas: true, visitas: false },
    secciones: [
      { titulo: "Espacios comunes", items: [
        "🏊 Pileta con vista a las sierras",
        "🌳 Amplio parque"
      ]},
      { titulo: "3 unidades — esta unidad cuenta con", items: [
        "🛏️ 2 habitaciones",
        "📺 DirecTV prepago",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🌮 Microondas"
      ]},
      { titulo: "Características especiales", items: ["🐶 Pet Friendly"] },
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "casa-colibri",
    categoria: "tanti",
    nombre: "Casa Colibrí",
    tipo: "Alojamiento",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "Casa en Tanti Centro frente a la cascada, con cochera media sombra, amplio parque y 1 habitación.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-colibri", 1),
    datos: { tipo: "casa", capacidad: null, habitaciones: 1, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Ubicación", items: ["🏞️ Frente a la cascada"] },
      { titulo: "Espacios y servicios", items: [
        "🚗 Cochera media sombra",
        "Chulengo",
        "🌳 Amplio parque"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 1 habitación",
        "📱 WiFi"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "kairos",
    categoria: "tanti",
    nombre: "Kairos",
    tipo: "Departamento",
    ubicacion: "Tanti",
    etiquetas: ["Hacemos videollamada"],
    descripcionBreve: "Departamento en Tanti a metros del balneario Los Sauces. 1 habitación para 4 personas, con asador y amplio parque.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("kairos", 1),
    datos: { tipo: "departamento", capacidad: 4, habitaciones: 1, banos: null, mascotas: false, visitas: false },
    secciones: [
      { titulo: "Ubicación", items: ["🏞️ A metros del balneario Los Sauces"] },
      { titulo: "Espacios y servicios", items: [
        "🥩 Asador",
        "🌳 Amplio parque"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 1 habitación",
        "👥 4 personas",
        "📱 WiFi"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS, "🚫 No se permiten mascotas"] }
    ]
  },
  {
    id: "tanti-sol",
    categoria: "tanti",
    nombre: "Tanti Sol",
    tipo: "Alojamiento",
    ubicacion: "Tanti",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "En Tanti, con pileta exclusiva con vista a las sierras, cochera techada, asador y amplio parque. 1 habitación para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("tanti-sol"),
    datos: { tipo: null, capacidad: 4, habitaciones: 1, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta exclusiva con vista a las sierras",
        "🚗 Cochera techada",
        "🥩 Asador",
        "🌳 Amplio parque"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 1 habitación",
        "👥 4 personas",
        "❄️ Aire acondicionado",
        "📺 Smart TV - TV x cable",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "Horno eléctrico"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "casa-vaser",
    categoria: "tanti",
    nombre: "Casa Vaser",
    tipo: "Alojamiento",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamadas"],
    descripcionBreve: "Casa en Tanti Centro calefaccionada, con asador. 2 habitaciones para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-vaser", 1),
    datos: { tipo: "casa", capacidad: 4, habitaciones: 2, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 2 habitaciones",
        "👥 4 personas",
        "🔥 Calefaccionada",
        "📱 WiFi",
        "📺 TV x cable",
        "🥩 Asador"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "casas-bruno",
    categoria: "tanti",
    nombre: "Casas Bruno",
    tipo: "Alojamiento",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "Casa en Tanti Centro con pileta exclusiva, cochera techada y asador. 3 habitaciones para 7 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casas-bruno", 1),
    datos: { tipo: "casa", capacidad: 7, habitaciones: 3, banos: 2, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta exclusiva",
        "🚗 Cochera techada",
        "🥩 Asador"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 3 habitaciones",
        "👥 7 personas",
        "🚿 2 baños",
        "📺 TV x cable",
        "📱 WiFi"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "casa-sofia",
    categoria: "tanti",
    nombre: "Casa Sofía",
    tipo: "Alojamiento",
    ubicacion: "Tanti Centro",
    etiquetas: [],
    descripcionBreve: "Casa en Tanti Centro con pileta compartida y cochera techada. 1 habitación para 3 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-sofia"),
    datos: { tipo: "casa", capacidad: 3, habitaciones: 1, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta compartida",
        "🚗 Cochera techada"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 1 habitación",
        "👥 3 personas",
        "❄️ Aire acondicionado",
        "📱 WiFi",
        "📺 TV"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
  {
    id: "depto-milagro",
    categoria: "tanti",
    nombre: "Depto Milagro",
    tipo: "Departamento",
    ubicacion: "Tanti Centro",
    etiquetas: ["Habilitación municipal", "Hacemos videollamada"],
    descripcionBreve: "Departamento en Tanti Centro con pileta compartida y cochera techada. 1 habitación para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("depto-milagro"),
    datos: { tipo: "departamento", capacidad: 4, habitaciones: 1, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta compartida",
        "🚗 Cochera techada"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 1 habitación",
        "👥 4 personas",
        "❄️ Aire acondicionado",
        "📱 WiFi",
        "📺 TV"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },

  /* ---------------------- ALTA GRACIA ---------------------- */
  {
    id: "housing-touring",
    categoria: "Alta Gracia",
    nombre: "Housing Touring",
    ubicacion: "Alta Gracia",
    etiquetas: ["Hacemos videollamada"],
    descripcionBreve: "En Alta Gracia, con pileta exclusiva, quincho y asador. 2 habitaciones para 4 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("housing-touring"),
    datos: { tipo: null, capacidad: 4, habitaciones: 2, banos: null, mascotas: false, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "🏊 Pileta exclusiva",
        "🧉 Quincho",
        "🥩 Asador"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "🛏️ 2 habitaciones",
        "👥 4 personas",
        "📱 WiFi",
        "❄️ Aire acondicionado"
      ]},
      { titulo: "Restricciones", items: [
        "🚫 No se permiten visitas",
        "🚫 No se admiten mascotas"
      ]}
    ]
  },
  /* ------------------------ CÓRDOBA ------------------------ */
  { id: "complejo-vilaut",
    categoria: "Córdoba",
    nombre: "Complejo Vilaut",
    tipo: "Departamentos",
    ubicacion: "Córdoba Capital",
    etiquetas: [],
    descripcionBreve: "Apart hotel premium en Tanti Centro, edificio de dos plantas con rampas, piletas con vista a las sierras y 4 unidades equipadas.",
    descripcionCompleta: "Este edificio cuenta con dos plantas (rampas).",
    precio: null,
    galeria: fotosAlojamiento("by-muni"),
    datos: { tipo: "complejo", capacidad: null, habitaciones: 2, banos: null, mascotas: true, visitas: false },
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
      { titulo: "Características especiales", items: ["🐶 Pet Friendly"] },
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]

  }, 
     /* ---------------------- ESTANCIA VIEJA ---------------------- */
   { id: "las-torres",
    categoria: "Estancia Vieja",
    nombre: "Las Torres",
    tipo: "Alojamiento",
    ubicacion: "Estancia Vieja, Córdoba",
    etiquetas: ["Vista panorámica"],
    descripcionBreve: "En Estancia Vieja, a 200 mts del río, con quincho con asador y amplio parque. 3 habitaciones para 6 personas.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("las-torres"),
    datos: { tipo: null, capacidad: 6, habitaciones: 3, banos: 2, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Espacios comunes", items: [
        "Desayuno seco",
        "🌊 200 mts del río",
        "🧉 Quincho con 🥩 asador",
        "🌳 Amplio parque",
        "🚗 Cochera techada para 2 autos"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "👥 Para 6 personas",
        "🛏️ 3 habitaciones",
        "🚿 2 baños",
        "📱 WiFi",
        "🫖 Pava eléctrica",
        "🌮 Microondas"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },
 /* ---------------------- VILLA SANTA CRUZ DEL LAGO ---------------------- */  {
    id: "el-patiecito-de-pecos",
    categoria: "Villa Santa Cruz del Lago",
    nombre: "El Patiecito de Pecos",
    ubicacion: "Villa Santa Cruz del Lago",
    etiquetas: ["Vista panorámica"],
    descripcionBreve: "En Villa Santa Cruz del Lago, primer piso por escalera, con pileta exclusiva y quincho con asador. 2 habitaciones para 5 personas. Pet Friendly.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("el-patiecito-de-pecos"),
    datos: { tipo: null, capacidad: 5, habitaciones: 2, banos: null, mascotas: true, visitas: false },
    secciones: [
      { titulo: "Espacios y servicios", items: [
        "Primer piso por escalera",
        "Desayuno seco",
        "🏊 Pileta exclusiva",
        "🧉 Quincho en planta alta con 🥩 asador",
        "🌳 Patio en planta baja con asador y carlitera",
        "🚗 Cochera techada (media sombra) para 2 autos"
      ]},
      { titulo: "Capacidad y distribución", items: [
        "👥 Para 5 personas",
        "🛏️ 2 habitaciones",
        "Habitación principal con aire acondicionado, ventilador de techo y TV LCD",
        "❄️ Aire acondicionado en el living",
        "Smart TV en el comedor",
        "📱 WiFi",
        "📺 TV x cable",
        "🫖 Pava eléctrica",
        "🌮 Microondas"
      ]},
      { titulo: "Características especiales", items: ["🐶 Pet Friendly"] },
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  },

  /* ---------------------- BUENOS AIRES ---------------------- */
  {
    id: "casa-gloria",
    categoria: "Buenos Aires",
    nombre: "Casa Gloria",
    tipo: "Costa Atlántica",
    ubicacion: "San Clemente del Tuyú",
    etiquetas: [],
    descripcionBreve: "En San Clemente del Tuyú, a 500 metros de la playa y la peatonal. 2 habitaciones, cochera y asador.",
    descripcionCompleta: "",
    precio: null,
    galeria: fotosAlojamiento("casa-gloria"),
    datos: { tipo: "casa", capacidad: null, habitaciones: 2, banos: null, mascotas: null, visitas: false },
    secciones: [
      { titulo: "Ubicación", items: ["A 500 metros de la playa y la peatonal"] },
      { titulo: "Características", items: [
        "🛏️ 2 habitaciones",
        "📱 WiFi",
        "📺 Smart TV",
        "🚗 Cochera",
        "🥩 Asador"
      ]},
      { titulo: "Restricciones", items: [NO_VISITAS] }
    ]
  }
];

/* La imagen principal es siempre la primera de la galería. */
ITEMS.forEach(i => { i.imagenPrincipal = i.galeria.length ? i.galeria[0] : null; });
