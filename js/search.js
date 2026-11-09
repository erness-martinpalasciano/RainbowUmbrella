/* =====================================================================
   SEARCH.JS — Buscador de alojamientos (lupa del encabezado).
   Usa EXACTAMENTE los datos de js/data.js (ITEMS, CATEGORIES, TIPOS,
   SERVICIOS) y las mismas tarjetas del catálogo (renderCard).
   No hace falta editarlo para agregar alojamientos.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Normalización: sin mayúsculas, acentos ni signos ---------- */
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* ---------- Índice de búsqueda construido desde los datos ---------- */
  function categoryName(id) {
    var c = CATEGORIES.find(function (x) { return x.id === id; });
    return c ? c.label : id;
  }
  function buildIndex() {
    ITEMS.forEach(function (item) {
      var d = item.datos || {};
      var partes = [item.nombre, item.tipo, item.ubicacion, categoryName(item.categoria),
        d.tipo ? TIPOS[d.tipo] : "", item.descripcionBreve, item.descripcionCompleta]
        .concat(item.etiquetas || []);
      (item.secciones || []).forEach(function (s) {
        partes.push(s.titulo);
        (s.items || []).forEach(function (t) { partes.push(t); });
      });
      item._hay = " " + norm(partes.join(" ")) + " ";
      item._serv = SERVICIOS.filter(function (sv) { return sv.re.test(item._hay); })
                            .map(function (sv) { return sv.id; });
    });
  }

  /* ---------- Interpretación del texto libre ---------- */
  var NUM = { un:1, uno:1, una:1, dos:2, tres:3, cuatro:4, cinco:5, seis:6, siete:7, ocho:8, nueve:9, diez:10, once:11, doce:12 };
  var NUM_RE = "(\\d{1,2}|" + Object.keys(NUM).join("|") + ")";
  var STOP = ("para de del la el los las con en y un una uno que tenga tengan quiero busco a al por lo sin no se hay es mas minimo " +
              "alojamiento alojamientos lugar").split(" ");
  function toN(x) { return /^\d/.test(x) ? parseInt(x, 10) : NUM[x]; }

  function parseText(q) {
    var s = " " + norm(q) + " ";
    var out = { tipo: null, cap: null, hab: null, banos: null, mascotas: null, visitas: null, servicios: [], tokens: [] };
    function take(re, fn) { s = s.replace(re, function () { fn(arguments); return " "; }); }

    take(new RegExp("\\b" + NUM_RE + " (?:habitaciones?|dormitorios?|cuartos?)\\b", "g"), function (m) { out.hab = toN(m[1]); });
    take(new RegExp("\\b" + NUM_RE + " (?:banos?)\\b", "g"), function (m) { out.banos = toN(m[1]); });
    take(new RegExp("\\b(?:para )?" + NUM_RE + " (?:personas?|huespedes?|pasajeros?|pax|gente)\\b", "g"), function (m) { out.cap = toN(m[1]); });
    take(new RegExp("\\bpara " + NUM_RE + "\\b", "g"), function (m) { out.cap = toN(m[1]); });

    take(/\b(?:sin|no)(?: se)?(?: admiten?| acepta[n]?| permite[n]?)? (?:pet friendly|petfriendly|mascotas?|perros?)\b/g, function () { out.mascotas = false; });
    take(/\b(?:pet friendly|petfriendly|mascotas?|perros?)\b/g, function () { if (out.mascotas === null) out.mascotas = true; });
    take(/\b(?:sin|no)(?: se)?(?: admiten?| permite[n]?)? visitas?\b/g, function () { out.visitas = false; });
    take(/\b(?:con|admite[n]?|permite[n]?|acepta[n]?) visitas?\b/g, function () { out.visitas = true; });
    take(/\bvisitas?\b/g, function () { /* sola no filtra */ });

    take(/\b(casas?|departamentos?|deptos?|dptos?|cabanas?|complejos?|apart hotel|aparts?)\b/g, function (m) {
      var w = m[1];
      out.tipo = /^casa/.test(w) ? "casa" : /^cabana/.test(w) ? "cabana" : /^(complejo|apart)/.test(w) ? "complejo" : "departamento";
    });

    // servicios: frases largas primero
    var pares = [];
    SERVICIOS.forEach(function (sv) { sv.alias.forEach(function (a) { pares.push([norm(a), sv.id]); }); });
    pares.sort(function (a, b) { return b[0].length - a[0].length; });
    pares.forEach(function (p) {
      take(new RegExp("\\b" + p[0] + "\\b", "g"), function () { if (out.servicios.indexOf(p[1]) < 0) out.servicios.push(p[1]); });
    });

    s.split(" ").forEach(function (t) {
      if (!t || STOP.indexOf(t) >= 0) return;
      if (/^\d+$/.test(t)) return;              // números sueltos: sin contexto, no filtran
      if (t.length < 2) return;
      if (t.length > 4 && t.charAt(t.length - 1) === "s") t = t.slice(0, -1);
      out.tokens.push(t);
    });
    return out;
  }

  /* ---------- Evaluación: todos los criterios deben cumplirse ---------- */
  function triOk(valor, pedido) {            // pedido: "si" | "no" | "nd"
    if (pedido === "si") return valor === true;
    if (pedido === "no") return valor === false;
    if (pedido === "nd") return valor === null || valor === undefined;
    return true;
  }
  function boolToTri(b) { return b === true ? "si" : b === false ? "no" : null; }

  function matches(item, F) {
    var d = item.datos || {};
    if (F.zona && item.categoria !== F.zona) return false;
    if (F.tipo && d.tipo !== F.tipo) return false;
    if (F.cap != null && !(typeof d.capacidad === "number" && d.capacidad >= F.cap)) return false;
    if (F.hab != null && d.habitaciones !== F.hab) return false;
    if (F.banos != null && d.banos !== F.banos) return false;
    if (F.mascotas && !triOk(d.mascotas, F.mascotas)) return false;
    if (F.visitas && !triOk(d.visitas, F.visitas)) return false;
    for (var i = 0; i < F.servicios.length; i++) if (item._serv.indexOf(F.servicios[i]) < 0) return false;
    for (var j = 0; j < F.tokens.length; j++) if (item._hay.indexOf(F.tokens[j]) < 0) return false;
    return true;
  }

  /* criterios del texto + criterios de los filtros (se combinan con "y") */
  function search(state) {
    var p = parseText(state.text || "");
    var f = state.filters || {};
    var list = ITEMS.filter(function (item) {
      var okUi = matches(item, {
        zona: f.zona || null, tipo: f.tipo || null,
        cap: f.cap ? +f.cap : null, hab: f.hab ? +f.hab : null, banos: f.banos ? +f.banos : null,
        mascotas: f.mascotas || null, visitas: f.visitas || null,
        servicios: f.servicios || [], tokens: []
      });
      if (!okUi) return false;
      return matches(item, {
        zona: null, tipo: p.tipo, cap: p.cap, hab: p.hab, banos: p.banos,
        mascotas: boolToTri(p.mascotas), visitas: boolToTri(p.visitas),
        servicios: p.servicios, tokens: p.tokens
      });
    });
    return list;
  }

  window.RUTSearch = { norm: norm, parseText: parseText, search: search, buildIndex: buildIndex };

  /* ======================= Interfaz ======================= */
  if (typeof document === "undefined") return;

  var els = {}, lastFocus = null, state = { text: "", filters: { servicios: [] } };

  function option(v, label) { return '<option value="' + v + '">' + label + "</option>"; }

  function distinct(fn) {
    var seen = {};
    ITEMS.forEach(function (i) { var v = fn(i); if (v !== null && v !== undefined) seen[v] = true; });
    return Object.keys(seen);
  }

  function buildPanel() {
    var zonas = CATEGORIES.filter(function (c) { return ITEMS.some(function (i) { return i.categoria === c.id; }); });
    var tipos = Object.keys(TIPOS).filter(function (k) { return ITEMS.some(function (i) { return i.datos && i.datos.tipo === k; }); });
    var habs = distinct(function (i) { return i.datos && i.datos.habitaciones; }).map(Number).sort(function (a, b) { return a - b; });
    var banos = distinct(function (i) { return i.datos && i.datos.banos; }).map(Number).sort(function (a, b) { return a - b; });
    var hayCap = ITEMS.some(function (i) { return i.datos && typeof i.datos.capacidad === "number"; });
    var servs = SERVICIOS.filter(function (sv) { return ITEMS.some(function (i) { return i._serv.indexOf(sv.id) >= 0; }); });

    var tri = function (si, no) { return option("", "Cualquiera") + option("si", si) + option("no", no) + option("nd", "Sin información"); };

    var html =
      '<div class="search-overlay" id="search-overlay" aria-hidden="true">' +
      '<div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title" tabindex="-1">' +
        '<div class="search-head">' +
          '<h2 id="search-title">Buscar alojamiento</h2>' +
          '<button type="button" class="search-close" id="search-close" aria-label="Cerrar buscador">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="search-body">' +
          '<label class="search-input-wrap" for="search-text">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.2 15.2L20.5 20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '<span class="sr-only">Buscar por nombre, localidad o característica</span>' +
            '<input type="search" id="search-text" placeholder="Nombre, localidad o característica (ej: pileta, casa para 8 personas)" autocomplete="off">' +
          "</label>" +
          '<div class="search-filters">' +
            '<label>Zona<select id="f-zona">' + option("", "Todas") + zonas.map(function (z) { return option(z.id, z.label); }).join("") + "</select></label>" +
            '<label>Tipo<select id="f-tipo">' + option("", "Cualquiera") + tipos.map(function (k) { return option(k, TIPOS[k]); }).join("") + "</select></label>" +
            (hayCap ? '<label>Capacidad mínima<select id="f-cap">' + option("", "Cualquiera") + [2, 4, 6, 8, 10].map(function (n) { return option(n, n + " personas o más"); }).join("") + "</select></label>" : "") +
            (habs.length ? '<label>Habitaciones<select id="f-hab">' + option("", "Cualquiera") + habs.map(function (n) { return option(n, n === 1 ? "1 habitación" : n + " habitaciones"); }).join("") + "</select></label>" : "") +
            (banos.length ? '<label>Baños<select id="f-banos">' + option("", "Cualquiera") + banos.map(function (n) { return option(n, n === 1 ? "1 baño" : n + " baños"); }).join("") + "</select></label>" : "") +
            '<label>Mascotas<select id="f-mascotas">' + tri("Acepta mascotas", "No acepta mascotas") + "</select></label>" +
            '<label>Visitas<select id="f-visitas">' + tri("Admite visitas", "No admite visitas") + "</select></label>" +
          "</div>" +
          '<fieldset class="search-services"><legend>Servicios y comodidades</legend>' +
            servs.map(function (sv) {
              return '<label class="search-chip"><input type="checkbox" value="' + sv.id + '"><span>' + sv.label + "</span></label>";
            }).join("") +
          "</fieldset>" +
          '<div class="search-bar">' +
            '<p class="search-count" id="search-count" role="status" aria-live="polite"></p>' +
            '<button type="button" class="search-clear" id="search-clear">Limpiar búsqueda</button>' +
          "</div>" +
          '<div class="search-results" id="search-results"></div>' +
        "</div>" +
      "</div></div>";
    document.body.insertAdjacentHTML("beforeend", html);
  }

  function readState() {
    var g = function (id) { var e = document.getElementById(id); return e ? e.value : ""; };
    state.text = els.text.value;
    state.filters = {
      zona: g("f-zona"), tipo: g("f-tipo"), cap: g("f-cap"), hab: g("f-hab"), banos: g("f-banos"),
      mascotas: g("f-mascotas"), visitas: g("f-visitas"),
      servicios: Array.prototype.map.call(els.overlay.querySelectorAll(".search-services input:checked"), function (c) { return c.value; })
    };
  }

  function render() {
    readState();
    var list = RUTSearch.search(state);
    var total = ITEMS.length;
    els.count.textContent = list.length === total
      ? total + (total === 1 ? " alojamiento" : " alojamientos")
      : list.length + (list.length === 1 ? " alojamiento encontrado" : " alojamientos encontrados");
    if (list.length === 0) {
      els.results.innerHTML =
        '<div class="search-empty"><p><strong>No encontramos alojamientos con esos criterios.</strong></p>' +
        "<p>Probá quitar algún filtro o escribir menos palabras.</p></div>";
    } else {
      els.results.innerHTML = '<div class="card-grid">' + list.map(renderCard).join("") + "</div>";
    }
  }

  function clearAll() {
    els.text.value = "";
    els.overlay.querySelectorAll("select").forEach(function (s) { s.value = ""; });
    els.overlay.querySelectorAll(".search-services input").forEach(function (c) { c.checked = false; });
    render();
    els.text.focus();
  }

  function open() {
    lastFocus = document.activeElement;
    els.overlay.classList.add("is-open");
    els.overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("search-open");
    if (els.toggle) els.toggle.setAttribute("aria-expanded", "true");
    render();
    setTimeout(function () { els.text.focus(); }, 60);
  }
  function close() {
    els.overlay.classList.remove("is-open");
    els.overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("search-open");
    if (els.toggle) els.toggle.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function trap(e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key !== "Tab") return;
    var f = els.overlay.querySelectorAll('a[href], button, input, select, [tabindex]:not([tabindex="-1"])');
    f = Array.prototype.filter.call(f, function (n) { return !n.disabled && n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildIndex();
    buildPanel();
    els.overlay = document.getElementById("search-overlay");
    els.text = document.getElementById("search-text");
    els.count = document.getElementById("search-count");
    els.results = document.getElementById("search-results");
    els.toggle = document.getElementById("search-toggle");

    if (els.toggle) els.toggle.addEventListener("click", open);
    document.getElementById("search-close").addEventListener("click", close);
    document.getElementById("search-clear").addEventListener("click", clearAll);
    els.overlay.addEventListener("mousedown", function (e) { if (e.target === els.overlay) close(); });
    els.overlay.addEventListener("keydown", trap);
    els.overlay.addEventListener("input", render);
    els.overlay.addEventListener("change", render);
    // al elegir un resultado, el modal no debe quedar abierto al volver con "atrás"
    els.results.addEventListener("click", function (e) { if (e.target.closest("a.card")) close(); });
  });
})();
