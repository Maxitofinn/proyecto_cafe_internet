document.addEventListener('DOMContentLoaded', () => {
  let rentas = [];

  function cargarRentas() {
    const fecha = document.getElementById('fechaRenta').value;
    const id = document.getElementById('buscarIdRenta').value;
    const orden = document.getElementById('ordenarRentas').value;

    const params = new URLSearchParams();
    if (fecha) params.set('fecha', fecha);
    if (id) params.set('id', id);
    if (orden) params.set('orden', orden);

    fetch('/api/rentas?' + params.toString())
      .then(r => r.json())
      .then(data => {
        rentas = data;
        mostrarRentas(rentas);
      })
      .catch(err => {
        console.error('Error cargando rentas:', err);
        mostrarRentas([]);
      });
  }

  function mostrarRentas(lista) {
    const tbody = document.querySelector('#tablaRentas tbody');
    tbody.innerHTML = '';

    if (lista.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="6" style="text-align: center;">No se encontraron rentas</td>';
      tbody.appendChild(tr);
      return;
    }

    lista.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.id}</td>
        <td>${r.fecha}</td>
        <td>${r.empleado}</td>
        <td>${r.dispositivos.join(', ')}</td>
        <td>${r.total_horas}</td>
        <td>$${r.total.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Filtros
  document.getElementById('fechaRenta').addEventListener('change', cargarRentas);
  document.getElementById('ordenarRentas').addEventListener('change', cargarRentas);
  document.getElementById('buscarIdRenta').addEventListener('input', cargarRentas);

  flatpickr("#fechaRenta", {
    dateFormat: "d/m/Y",
    locale: "es",
    allowInput: true,
    onChange: cargarRentas
  });

  cargarRentas();
});
