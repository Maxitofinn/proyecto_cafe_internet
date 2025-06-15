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

  fetch('/api/productos')
    .then(r => r.json())
    .then(data => {
      productos = [
        ...data.papeleria.map(p => ({ ...p, tipo: 'papeleria' })),
        ...data.snacks   .map(s => ({ ...s, tipo: 'snack' }))
      ];
      productos.forEach(p => {
        const opt = document.createElement('option');
        opt.value       = `${p.tipo}|${p.tipo==='papeleria'?p.id_producto:p.id_snack}`;
        opt.textContent = `${p.nombre_producto} - $${p.precio_unitario}`;
        productoSelect.append(opt);
      });
    });

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

  // Agregar producto a la lista
  agregarBtn.addEventListener('click', () => {
    const val = productoSelect.value;
    if (!val) return;
    const [tipo, id] = val.split('|');
    const prod = productos.find(p =>
      (tipo==='papeleria' ? p.id_producto : p.id_snack).toString() === id
    );
    const qty = parseInt(cantidadInput.value, 10);
    const item = { ...prod, cantidad: qty };
    seleccionados.push(item);
    const li = document.createElement('li');
    li.textContent = `${item.nombre_producto} x${item.cantidad}`;
    listaUL.append(li);
    productoSelect.value = '';
    cantidadInput.value = 1;
  });

  // Realizar venta
  realizarBtn.addEventListener('click', () => {
    if (!empleadoSelect.value || !formaPagoSelect.value || !seleccionados.length) return;
    const payload = {
      id_empleado:    parseInt(empleadoSelect.value, 10),
      metodo_pago:    formaPagoSelect.value,
      items:          seleccionados.map(p => ({
        id_producto:     p.tipo==='papeleria' ? p.id_producto : null,
        id_snack:        p.tipo==='snack'    ? p.id_snack    : null,
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
    .then(r => r.json())
    .then(resp => alert(resp.message));

     // —————— Aquí empieza la limpieza ——————
      // Vaciamos el array que llevaba los ítems
      seleccionados.length = 0;
      // Vaciamos el UL donde se mostraban los productos
      listaUL.innerHTML = '';
      // Si quieres, también restablece selects y cantidad a valores por defecto:
      productoSelect.value   = '';
      cantidadInput.value    = 1;
      empleadoSelect.value   = '';
      formaPagoSelect.value  = '';
      // —————— Fin de la limpieza ——————
  });

});