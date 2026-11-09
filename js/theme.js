/* =====================================================================
   THEME.JS — Modo claro / oscuro.
   - Se carga en el <head> (antes del CSS) para aplicar el tema guardado
     ANTES del primer pintado y evitar el parpadeo de tema equivocado.
   - El tema vive en <html data-theme="light|dark">; todos los colores
     salen de variables CSS (ver css/style.css).
   - La preferencia se guarda en localStorage. Si no hay ninguna guardada,
     se usa la del sistema operativo (prefers-color-scheme).
   ===================================================================== */
(function () {
  var KEY = "rut-theme";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function readStored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "dark" || v === "light" ? v : null;
    } catch (e) { return null; }       // localStorage bloqueado: se sigue sin guardar
  }
  function writeStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* sin persistencia */ }
  }
  function systemTheme() { return media && media.matches ? "dark" : "light"; }

  function syncButton(theme) {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var dark = theme === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    syncButton(theme);
  }

  // 1) Tema inicial (guardado > sistema)
  apply(readStored() || systemTheme());

  // 2) Botón (el DOM del header ya existe cuando termina de cargar)
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    syncButton(root.getAttribute("data-theme"));
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      writeStored(next);
    });
  });

  // 3) Si el usuario nunca eligió, acompañar cambios del sistema operativo
  if (media && media.addEventListener) {
    media.addEventListener("change", function () {
      if (!readStored()) apply(systemTheme());
    });
  }
  // 4) Mantener sincronizadas varias pestañas abiertas
  window.addEventListener("storage", function (e) {
    if (e.key === KEY && (e.newValue === "dark" || e.newValue === "light")) apply(e.newValue);
  });
})();
