/* =====================================================================
   DATA.JS — Único archivo que hay que editar con el contenido real.

   SITE_INFO, CATEGORIES (zonas) y el primer alojamiento (Complejo By
   Muni) ya tienen datos reales cargados. Para seguir sumando
   alojamientos:
   1) Agregá nuevas zonas a CATEGORIES si hace falta (misma forma
      { id, label }).
   2) Agregá un nuevo objeto a ITEMS por cada alojamiento real.
   3) Poné las fotos reales en la carpeta /images y completá
      imagenPrincipal y galeria con sus rutas. Mientras no haya fotos
      reales, dejá imagenPrincipal: null y galeria: [] — el sitio
      muestra automáticamente un aviso de "Fotos próximamente" en vez
      de una imagen inventada o genérica.
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

/* ZONAS: zonas reales donde Rainbow Umbrella Tours tiene alojamientos.
   Se agregan a medida que se incorporan alojamientos reales. */
const CATEGORIES = [
  { id: "tanti-centro", label: "Tanti Centro" }
];

/* ITEMS: alojamientos reales. Cada uno se agrega a medida que se
   confirma su información e imágenes reales. NO agregar alojamientos
   de ejemplo/placeholder acá. */
const ITEMS = [
  {
    id: "complejo-by-muni",
    categoria: "tanti-centro",
    nombre: "Complejo By Muni",
    subtitulo: "Tanti Centro",
    tipo: "PREMIUM Apart Hotel",
    descripcionBreve: "Apart hotel premium en Tanti Centro, edificio de dos plantas con rampas, piletas con vista a las sierras y 4 unidades equipadas.",
    descripcionCompleta: "Este edificio cuenta con dos plantas (rampas).",
    precio: null,
    // Pendiente: todavía no se recibieron las fotografías reales del
    // Complejo By Muni (los enlaces de Google Drive no son accesibles
    // y no se encontraron en los videos provistos). NO usar fotos
    // genéricas ni de otros alojamientos. Apenas lleguen los archivos
    // reales, completar imagenPrincipal y galeria con sus rutas.
    imagenPrincipal: null,
    galeria: [],
    espaciosComunes: [
      "2 piletas con vista a las sierras",
      "2 quinchos con asadores",
      "Amplio parque",
      "Cochera techada"
    ],
    unidades: {
      cantidad: 4,
      caracteristicas: [
        "2 habitaciones",
        "Aire acondicionado",
        "Smart TV",
        "WiFi",
        "Pava eléctrica",
        "Lavarropas",
        "Microondas"
      ]
    },
    caracteristicasEspeciales: [
      "Pet Friendly",
      "No se admiten visitas"
    ]
  }
];
