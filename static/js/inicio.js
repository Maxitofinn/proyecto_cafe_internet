document.addEventListener('DOMContentLoaded', () => {
  async function cargarMetrics() {
    try {
      const res = await fetch('/api/metrics');
      const data = await res.json();
      // Actualiza los elementos en menu.html :contentReference[oaicite:0]{index=0}
      document.getElementById('computadoras-en-uso').textContent =
        `${data.computadoras_en_uso}/${data.total_computadoras}`;
      document.getElementById('consolas-ocupadas').textContent =
        `${data.consolas_ocupadas}/${data.total_consolas}`;
      document.getElementById('ventas-hoy').textContent =
        data.ventas_hoy;
    } catch (err) {
      console.error('Error cargando métricas:', err);
    }
  }

  // Carga inicial y refresco cada 30s
  cargarMetrics();
  setInterval(cargarMetrics, 30000);
});
