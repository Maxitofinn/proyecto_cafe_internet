document.addEventListener('DOMContentLoaded', () => {
  // menú activo
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.textContent.trim() === 'Productos') item.classList.add('active');
  });

  const tipoSelect    = document.getElementById('tipoProducto');
  const productoSelect= document.getElementById('producto');
  const ordenarSelect = document.getElementById('ordenar');
  const tbody         = document.querySelector('#tablaProductos tbody');

  let productos = [];

  // 1) Carga inicial de productos desde la API
  fetch('/api/productos-list')
    .then(r => r.json())
    .then(data => {
      productos = data;
      // Rellenar select de producto
      data.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre;
        productoSelect.appendChild(opt);
      });
      aplicarFiltros();
    })
    .catch(err => {
      console.error('Error cargando productos:', err);
      tbody.innerHTML = '<tr><td colspan="6">Error al cargar productos</td></tr>';
    });

  // 2) Listeners de filtros
  tipoSelect.addEventListener('change', aplicarFiltros);
  productoSelect.addEventListener('change', aplicarFiltros);
  ordenarSelect.addEventListener('change', aplicarFiltros);

  // 3) Función de filtrado y orden
  function aplicarFiltros() {
    let filtered = [...productos];
    const tipoVal = tipoSelect.value;
    const prodVal = productoSelect.value;
    const ordVal  = ordenarSelect.value;

    if (tipoVal)
      filtered = filtered.filter(p => p.tipo === tipoVal);

    if (prodVal)
      filtered = filtered.filter(p => p.id.toString() === prodVal);

    if (ordVal) {
      switch (ordVal) {
        case 'alfabetico':      filtered.sort((a,b)=>a.nombre.localeCompare(b.nombre)); break;
        case 'alfabetico-desc': filtered.sort((a,b)=>b.nombre.localeCompare(a.nombre)); break;
        case 'cantidad-asc':    filtered.sort((a,b)=>a.cantidad - b.cantidad); break;
        case 'cantidad-desc':   filtered.sort((a,b)=>b.cantidad - a.cantidad); break;
      }
    }
    mostrarProductos(filtered);
  }

  // 4) Renderizar tabla
  function mostrarProductos(list) {
    tbody.innerHTML = '';
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No se encontraron productos</td></tr>';
      return;
    }
    list.forEach(p => {
      const tr = document.createElement('tr');
      if (p.estado === 'Agotado')      tr.classList.add('agotado');
      else if (p.estado === 'Bajo Stock') tr.classList.add('bajo-stock');

      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.tipo.charAt(0).toUpperCase() + p.tipo.slice(1)}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.cantidad}</td>
        <td>${p.estado}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
