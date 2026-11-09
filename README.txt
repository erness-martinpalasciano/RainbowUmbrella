CATÁLOGO WEB — RAINBOW UMBRELLA TOURS
=====================================
index.html / ficha.html     Catálogo y ficha de cada alojamiento
css/style.css               Estilos (incluye modo claro/oscuro con variables)
js/data.js                  ÚNICO archivo a editar: alojamientos, zonas, servicios
js/main.js                  Tarjetas y fichas
js/search.js                Buscador (lupa del encabezado)
js/theme.js                 Modo claro / oscuro
images/brand/               wordmark.png, wordmark-dark.png (título), umbrella.png / umbrella-dark.png
public/images/alojamientos/ Fotos por alojamiento: <slug>/<slug>-01.webp ...
fonts/                      Tipografía Arsenica Antiqua (ver LEEME-TIPOGRAFIA.txt)

AGREGAR UN ALOJAMIENTO: copiá un objeto de ITEMS en js/data.js. El campo "datos"
alimenta el buscador (null = "sin información", nunca "sí"). Los servicios se
detectan solos desde los textos de "secciones".
