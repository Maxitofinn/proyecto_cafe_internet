window.addEventListener('DOMContentLoaded', () => {
  let productos = [];
  const productoSelect   = document.getElementById('producto');
  const cantidadInput    = document.getElementById('quantity');
  const agregarBtn       = document.getElementById('agregarProducto');
  const listaUL          = document.getElementById('listaProductos');
  const empleadoSelect   = document.getElementById('empleado');
  const formaPagoSelect  = document.getElementById('formaPago');
  const realizarBtn      = document.getElementById('realizarVenta');
  const seleccionados    = [];

  // Cargar productos de la API
  fetch('/api/productos')
    .then(r => r.json())
    .then(data => {
      productos = [
        ...data.papeleria.map(p => ({ ...p, tipo: 'papeleria' })),
        ...data.snacks   .map(s => ({ ...s, tipo: 'snack' }))
      ];

      productos.forEach(p => {
        const opt = document.createElement('option');
        // p.tipo === 'papeleria' usa id_producto, si no usa id_snack
        const idValor = p.tipo === 'papeleria' ? p.id_producto : p.id_snack;
        opt.value       = `${p.tipo}|${idValor}`;
        opt.textContent = `${p.nombre_producto} - $${p.precio_unitario}`;
        productoSelect.append(opt);
      });
    });

  // Cargar empleados y formas de pago (igual que antes)
  fetch('/api/empleados')
    .then(r => r.json())
    .then(list => {
      list.forEach(e => {
        const opt = document.createElement('option');
        opt.value       = e.id_empleado;
        opt.textContent = e.nombre;
        empleadoSelect.append(opt);
      });
    });
  ['Efectivo','Tarjeta'].forEach(m => {
    const opt = document.createElement('option');
    opt.value       = m;
    opt.textContent = m;
    formaPagoSelect.append(opt);
  });

  // Agregar producto seleccionado a la lista
  agregarBtn.addEventListener('click', () => {
    const val = productoSelect.value;
    if (!val) return;
    const [tipo, idStr] = val.split('|');
    // Buscamos el objeto cuyo id coincide (asegurándonos de comparar strings)
    const prod = productos.find(p => {
      const pid = p.tipo === 'papeleria' ? p.id_producto : p.id_snack;
      return pid.toString() === idStr;
    });
    if (!prod) {
      console.warn('Producto no encontrado para', val);
      return;
    }

    const qty = parseInt(cantidadInput.value, 10) || 1;
    const item = { ...prod, cantidad: qty };
    seleccionados.push(item);

    // Renderizamos en la lista
    const li = document.createElement('li');
    li.textContent = `${item.nombre_producto} x${item.cantidad}`;
    listaUL.append(li);

    // Restablecer inputs
    productoSelect.value = '';
    cantidadInput.value  = 1;
  });

  // Realizar venta (igual que antes)
  realizarBtn.addEventListener('click', () => {
    if (!empleadoSelect.value || !formaPagoSelect.value || seleccionados.length === 0) return;
    const payload = {
      id_empleado: parseInt(empleadoSelect.value, 10),
      metodo_pago: formaPagoSelect.value,
      items: seleccionados.map(p => ({
        id_producto:     p.tipo === 'papeleria' ? p.id_producto : null,
        id_snack:        p.tipo === 'snack'    ? p.id_snack    : null,
        nombre_producto: p.nombre_producto,
        precio_unitario: p.precio_unitario,
        cantidad:        p.cantidad
      }))
    };

    fetch('/api/ventas', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    })
    .then(r => r.json().then(data => {
      if (!r.ok) throw data;
      return data;
    }))
    .then(data => {
      alert(`${data.message} (ID: ${data.id_venta})`);

      // Limpiar todo tras venta
      seleccionados.length = 0;
      listaUL.innerHTML    = '';
      productoSelect.value = '';
      cantidadInput.value  = 1;
      empleadoSelect.value = '';
      formaPagoSelect.value= '';
    })
    .catch(err => {
      console.error('Error al registrar venta:', err);
      alert(err.error || 'Ocurrió un error al registrar la venta.');
    });
  });
});
