CATÁLOGO WEB — RAINBOW UMBRELLA TOURS
=====================================

ESTRUCTURA
----------
index.html                 Portada + catálogo filtrable por zona
ficha.html                 Ficha individual (se arma sola según ?id=)
css/style.css              Estilos
js/data.js                 ÚNICO archivo a editar para cargar contenido
js/main.js                 Lógica (no hace falta tocarlo)
public/images/alojamientos/<alojamiento>/   Fotos (4 por alojamiento, .webp)
IMAGENES-PROMPTS.md        Prompts para generar las 20 imágenes

ALOJAMIENTOS CARGADOS
---------------------
Complejo By Muni, Casa La Abu, Cabaña Bauge, Las Margaritas, El Bosquecito.
Todos usan el mismo componente de ficha (el de By Muni).

FOTOS
-----
Guardá cada foto con su nombre exacto en su carpeta, por ejemplo:
  public/images/alojamientos/casa-la-abu/casa-la-abu-01.webp
Mientras el archivo no exista, el sitio muestra "Fotos próximamente".
No hay que modificar código al agregarlas.

AGREGAR UN ALOJAMIENTO NUEVO
----------------------------
Copiá un objeto de ITEMS en js/data.js, cambiá sus datos y usá
fotosAlojamiento("slug") para la galería.

PROBAR
------
Abrí index.html con doble clic o con Live Server en VS Code.
