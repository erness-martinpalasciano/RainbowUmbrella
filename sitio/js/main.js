/* =====================================================================
   MAIN.JS — Lógica de renderizado. No hace falta editar este archivo
   para actualizar contenido: todo el contenido vive en data.js.
   ===================================================================== */

function buildWhatsappUrl(numero, mensaje) {
  const texto = encodeURIComponent(mensaje || "Hola, quería consultar por " + SITE_INFO.nombreMarca);
  return `https://wa.me/${numero}?text=${texto}`;
}

function applySiteInfo() {
  document.querySelectorAll("[data-brand-name]").forEach(el => el.textContent = SITE_INFO.nombreMarca);
  document.querySelectorAll("[data-brand-desc]").forEach(el => el.textContent = SITE_INFO.descripcionCorta);
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    const mensaje = el.getAttribute("data-whatsapp-msg");
    el.href = buildWhatsappUrl(SITE_INFO.whatsappNumero, mensaje);
  });
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------------- Página principal (index.html) ---------------- */

function categoryLabel(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  return cat ? cat.label : id;
}

function renderCard(item) {
  const precioHtml = item.precio
    ? `<span class="card-price">${item.precio}</span>`
    : `<span class="card-price">Consultar</span>`;

  return `
    <a class="card" href="ficha.html?id=${encodeURIComponent(item.id)}">
      <div class="card-image">
        <img src="${item.imagenPrincipal}" alt="${item.nombre}" loading="lazy">
        <span class="card-tag">${categoryLabel(item.categoria)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.nombre}</h3>
        <p class="card-desc">${item.descripcionBreve}</p>
        <div class="card-footer">
          ${precioHtml}
          <span class="card-link">Ver más →</span>
        </div>
      </div>
    </a>
  `;
}

function renderCatalog(filter) {
  const root = document.getElementById("catalog-root");
  if (!root) return;

  const activeFilter = filter || "todas";
  root.innerHTML = "";

  const categoriesToRender = activeFilter === "todas"
    ? CATEGORIES
    : CATEGORIES.filter(c => c.id === activeFilter);

  let renderedAny = false;

  categoriesToRender.forEach(cat => {
    const itemsInCat = ITEMS.filter(i => i.categoria === cat.id);
    if (itemsInCat.length === 0) return;
    renderedAny = true;

    const section = document.createElement("div");
    section.innerHTML = `
      <h2 class="category-heading">${cat.label}</h2>
      <div class="card-grid">${itemsInCat.map(renderCard).join("")}</div>
    `;
    root.appendChild(section);
  });

  if (!renderedAny) {
    root.innerHTML = `<p class="empty-state">Todavía no hay elementos cargados en esta categoría.</p>`;
  }
}

function renderCategoryNav() {
  const nav = document.getElementById("category-scroll");
  if (!nav) return;

  const pills = [{ id: "todas", label: "Todas" }, ...CATEGORIES];

  nav.innerHTML = pills.map(cat =>
    `<button class="category-pill${cat.id === "todas" ? " active" : ""}" data-category="${cat.id}">${cat.label}</button>`
  ).join("");

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-pill");
    if (!btn) return;
    nav.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    renderCatalog(btn.getAttribute("data-category"));
  });
}

function initIndexPage() {
  if (!document.getElementById("catalog-root")) return;
  renderCategoryNav();
  renderCatalog("todas");
}

/* ---------------- Página de ficha (ficha.html) ---------------- */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderGallery(item) {
  const mainImg = document.getElementById("gallery-main-img");
  const thumbsWrap = document.getElementById("gallery-thumbs");
  if (!mainImg || !thumbsWrap) return;

  const galeria = item.galeria && item.galeria.length ? item.galeria : [item.imagenPrincipal];

  mainImg.src = galeria[0];
  mainImg.alt = item.nombre;

  thumbsWrap.innerHTML = galeria.slice(0, 4).map(src =>
    `<div><img src="${src}" alt="${item.nombre}" loading="lazy"></div>`
  ).join("");

  thumbsWrap.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => { mainImg.src = img.src; });
  });
}

function initFichaPage() {
  const root = document.getElementById("ficha-root");
  if (!root) return;

  const id = getQueryParam("id");
  const item = ITEMS.find(i => i.id === id);

  if (!item) {
    root.innerHTML = `<div class="container"><p class="empty-state">No encontramos ese elemento. <a href="index.html">Volver al catálogo</a>.</p></div>`;
    return;
  }

  document.title = `${item.nombre} — ${SITE_INFO.nombreMarca}`;

  renderGallery(item);

  document.getElementById("ficha-tag").textContent = categoryLabel(item.categoria);
  document.getElementById("ficha-title").textContent = item.nombre;
  document.getElementById("ficha-desc").textContent = item.descripcionCompleta;

  const featuresWrap = document.getElementById("ficha-features");
  if (item.caracteristicas && item.caracteristicas.length) {
    featuresWrap.innerHTML = `
      <h3>Características</h3>
      <ul>${item.caracteristicas.map(f => `<li>${f}</li>`).join("")}</ul>
    `;
  } else {
    featuresWrap.innerHTML = "";
  }

  document.getElementById("contact-price").textContent = item.precio || "Consultar";
  document.getElementById("contact-whatsapp").href = buildWhatsappUrl(
    SITE_INFO.whatsappNumero,
    `Hola! Quería consultar por "${item.nombre}"`
  );

  const detailsWrap = document.getElementById("contact-details");
  let detailsHtml = "";
  if (SITE_INFO.ubicacion) detailsHtml += `<div class="contact-detail"><strong>Ubicación:</strong> ${SITE_INFO.ubicacion}</div>`;
  if (SITE_INFO.horario) detailsHtml += `<div class="contact-detail"><strong>Horario:</strong> ${SITE_INFO.horario}</div>`;
  detailsWrap.innerHTML = detailsHtml;

  const socialWrap = document.getElementById("social-links");
  let socialHtml = "";
  if (SITE_INFO.instagram) socialHtml += `<a href="${SITE_INFO.instagram}" target="_blank" rel="noopener">Instagram</a>`;
  if (SITE_INFO.facebook) socialHtml += `<a href="${SITE_INFO.facebook}" target="_blank" rel="noopener">Facebook</a>`;
  socialWrap.innerHTML = socialHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  applySiteInfo();
  initIndexPage();
  initFichaPage();
});
