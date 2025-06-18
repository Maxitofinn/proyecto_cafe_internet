document.addEventListener('DOMContentLoaded', () => {
  // … código del menú y flatpickr …

  let ventas = [];

  // 1) Cargar ventas desde el servidor
  function cargarVentas() {
    // lee filtros actuales de la UI
    const fecha = document.getElementById('fechaVenta').value;
    const id    = document.getElementById('buscarId').value;
    const orden = document.getElementById('ordenarVentas').value;

    // construye query string
    const params = new URLSearchParams();
    if (fecha) params.set('fecha', fecha);
    if (id)    params.set('id', id);
    if (orden) params.set('orden', orden);

    fetch('/api/ventas?' + params.toString())
      .then(r => r.json())
      .then(data => {
        ventas = data;
        mostrarVentas(ventas);
      })
      .catch(err => {
        console.error('Error cargando ventas:', err);
        mostrarVentas([]); // muestra “No se encontraron”
      });
  }

  // 2) Listeners: cada vez que cambie un filtro, recarga
  document.getElementById('fechaVenta').addEventListener('change', cargarVentas);
  document.getElementById('ordenarVentas').addEventListener('change', cargarVentas);
  document.getElementById('buscarId').addEventListener('input', cargarVentas);

  // 3) Mostrar tabla (igual que tenías)
  function mostrarVentas(ventasMostrar) {
    const tbody = document.querySelector('#tablaVentas tbody');
    tbody.innerHTML = '';

    if (ventasMostrar.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="7" style="text-align: center;">No se encontraron ventas</td>';
      tbody.appendChild(tr);
      return;
    }

    ventasMostrar.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.id}</td>
        <td>${v.fecha}</td>
        <td>${v.empleado}</td>
        <td>${v.productos.join(", ")}</td>
        <td>${v.cantidad}</td>
        <td>$${v.total.toFixed(2)}</td>
        <td>${v.formaPago}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 4) Inicializar calendario y carga por defecto
  flatpickr("#fechaVenta", {
    dateFormat: "d/m/Y",
    locale: "es",
    allowInput: true,
    onChange: cargarVentas
  });

  cargarVentas();  // primera carga
});
