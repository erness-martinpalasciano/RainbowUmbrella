CATÁLOGO WEB — TEMPLATE FUNCIONAL
==================================

Este sitio es un TEMPLATE con contenido de ejemplo (placeholder).
Ningún texto, precio, categoría ni imagen es real: hay que
reemplazarlos por la información real del catálogo.

ESTRUCTURA DE ARCHIVOS
----------------------
index.html        -> Página principal (portada + catálogo con filtro por categorías)
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

3. En CATEGORIES, reemplazá los 3 ejemplos por las categorías reales
   detectadas en el catálogo (podés agregar o quitar categorías,
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

IDENTIDAD VISUAL ACTUAL (PROVISORIA)
--------------------------------------
La paleta de colores y tipografías definidas en css/style.css (líneas
del bloque ":root") son un punto de partida neutro, no la identidad
visual final de la marca. Una vez que tenga las imágenes/logo reales
del catálogo, voy a ajustar estos valores para que coincidan con la
paleta y personalidad visual real detectada.
