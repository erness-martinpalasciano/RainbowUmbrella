CATÁLOGO WEB — TEMPLATE FUNCIONAL
==================================

Este sitio es un TEMPLATE con contenido de ejemplo (placeholder).
Ningún texto, precio, zona ni imagen es real: hay que
reemplazarlos por la información real del catálogo.

ESTRUCTURA DE ARCHIVOS
----------------------
index.html        -> Página principal (portada + catálogo con filtro por zonas)
ficha.html        -> Ficha individual de cada producto/servicio (se arma sola según el ID en la URL)
css/style.css     -> Todos los estilos y la paleta de colores/tipografías (identidad visual)
js/data.js        -> ÚNICO archivo que hay que editar para cargar contenido real
js/main.js        -> Lógica del sitio (no hace falta tocarlo)
images/           -> Fotos. Actualmente solo hay 4 placeholders de ejemplo (SVG)

CÓMO CARGAR EL CONTENIDO REAL (paso a paso)
--------------------------------------------
1. Abrí js/data.js con cualquier editor de texto.

2. En SITE_INFO, completá:
   - nombreMarca: el nombre real de la marca/emprendimiento
   - descripcionCorta: una frase que resuma qué ofrece
   - whatsappNumero: el número real en formato internacional (ej: 5493541615122)
   - instagram / facebook: enlaces reales si existen
   - ubicacion / horario: si corresponde

3. En CATEGORIES, agregá las zonas reales
   detectadas en el catálogo (podés agregar o quitar zonas,
   solo hay que mantener el mismo formato { id, label }).

4. En ITEMS, reemplazá cada objeto de ejemplo por un producto/servicio
   real. Cada campo:
   - id: un identificador único sin espacios (ej: "tour-cascada")
   - categoria: debe coincidir con un "id" de CATEGORIES
   - nombre, descripcionBreve, descripcionCompleta: texto real
   - precio: texto real (ej: "Desde $30.000") o null si no corresponde mostrarlo
   - imagenPrincipal / galeria: rutas a las fotos reales (ver paso 5)
   - caracteristicas: lista de puntos destacados (opcional)

5. Poné las fotos reales dentro de la carpeta /images (podés borrar
   los placeholder-X.svg) y actualizá las rutas en data.js para que
   apunten a los nombres de archivo reales, por ejemplo:
   "images/tour-cascada-1.jpg"

   Recomendación: usar fotos en formato horizontal (4:3 o 16:9)
   para que se vean bien recortadas en las tarjetas.

CÓMO PROBAR EL SITIO
---------------------
Simplemente abrí index.html con doble clic en cualquier navegador,
o subí toda la carpeta a un hosting (no requiere servidor especial,
es HTML/CSS/JS puro).

ESTADO ACTUAL DE CONTENIDO (actualizado)
------------------------------------------
- Marca real cargada: Rainbow Umbrella Tours.
- Descripción real cargada (frase exacta provista).
- Zona real cargada: Tanti Centro.
- Primer alojamiento real cargado: Complejo By Muni, con toda la
  información de texto provista (espacios comunes, unidades, Pet
  Friendly, restricción de visitas).
- PENDIENTE: las 14 fotografías reales del Complejo By Muni. Los
  enlaces de Google Drive compartidos no son accesibles de forma
  automática (Drive bloquea el acceso sin sesión iniciada), y no
  se encontraron esas fotos en los videos de referencia enviados.
  La ficha y la tarjeta del Complejo By Muni muestran por ahora un
  aviso de "Fotos próximamente" en lugar de imágenes inventadas,
  genéricas o de stock. En cuanto se adjunten los archivos reales
  (por ejemplo arrastrándolos directo en el chat), se cargan en
  /images y se vinculan en data.js (campos imagenPrincipal y
  galeria del item "complejo-by-muni").

IDENTIDAD VISUAL ACTUAL (PROVISORIA)
--------------------------------------
La paleta de colores y tipografías definidas en css/style.css (líneas
del bloque ":root") son un punto de partida neutro, no la identidad
visual final de la marca. Una vez que tenga las imágenes/logo reales
del catálogo, voy a ajustar estos valores para que coincidan con la
paleta y personalidad visual real detectada.
