document.addEventListener('DOMContentLoaded', () => {
  // Cargar empleados
  const selectEmpleados = document.getElementById('renta-empleado');
  fetch('/api/rentas/empleados')
    .then(res => res.json())
    .then(list => {
      list.forEach(emp => {
        const opt = document.createElement('option');
        opt.value = emp.id;
        opt.textContent = emp.nombre;
        selectEmpleados.appendChild(opt);
      });
    });

  // Estructura para almacenar dispositivos
  let dispositivos = { computadoras: [], consolas: [], videojuegos: [] };

  // Obtener datos del servidor
  function fetchDispositivos() {
    fetch('/api/dispositivos')
      .then(resp => resp.json())
      .then(data => {
        dispositivos = data;
        cargarDispositivos();
      });
  }

  // Renderizar tarjetas según filtros
  function cargarDispositivos() {
    const tipoFilter = document.getElementById('filtro-tipo').value;
    const buscar = document.getElementById('buscar-dispositivo').value.toLowerCase();

    // Limpiar grids
    document.getElementById('grid-computadoras').innerHTML = '';
    document.getElementById('grid-consolas').innerHTML = '';
    document.getElementById('grid-videojuegos').innerHTML = '';

    // Computadoras
    dispositivos.computadoras.forEach(comp => {
      if ((tipoFilter === 'todos' || tipoFilter === 'computadoras') &&
          (comp.nombre.toLowerCase().includes(buscar) || String(comp.id).includes(buscar))) {
        crearTarjeta(comp, 'Computadora', document.getElementById('grid-computadoras'));
      }
    });

    // Consolas
    dispositivos.consolas.forEach(cons => {
      if ((['todos','consolas','disponibles','ocupados'].includes(tipoFilter)) &&
          (cons.nombre.toLowerCase().includes(buscar) || String(cons.id).includes(buscar))) {
        crearTarjeta(cons, 'Consola', document.getElementById('grid-consolas'));
      }
    });

    // Videojuegos
    dispositivos.videojuegos.forEach(juego => {
      if ((['todos','videojuegos','disponibles','ocupados'].includes(tipoFilter)) &&
          (juego.nombre.toLowerCase().includes(buscar) || String(juego.id).includes(buscar))) {
        crearTarjetaVideojuego(juego, document.getElementById('grid-videojuegos'));
      }
    });
  }

  // Tarjeta genérica para computadoras y consolas
  function crearTarjeta(dispositivo, tipo, contenedor) {
    const estado = dispositivo.estado;
    const card = document.createElement('div');
    card.className = `dispositivo-card ${tipo.toLowerCase()} ${estado}`;
    card.innerHTML = `
      <div class="dispositivo-header">
        <span class="dispositivo-id">${dispositivo.id}</span>
        <span class="dispositivo-estado ${estado}">
          ${estado === 'disponible' ? 'Disponible' : 'En renta'}
        </span>
      </div>
      <div class="dispositivo-info">
        <p><strong>${dispositivo.nombre}</strong></p>
      </div>
      <div class="dispositivo-acciones">
        ${estado === 'disponible'
          ? `<button class="btn-accion btn-iniciar" data-id="${dispositivo.id}" data-tipo="${tipo}">
               <i class="fas fa-play"></i> Iniciar renta
             </button>`
          : `<button class="btn-accion btn-detener" data-id="${dispositivo.id}" data-tipo="${tipo}">
               <i class="fas fa-stop"></i> Detener renta
             </button>`}
      </div>
    `;
    contenedor.appendChild(card);
  }

  // Tarjeta especializada para videojuegos (requiere consola)
  function crearTarjetaVideojuego(juego, contenedor) {
    const estado = juego.estado;
    const card = document.createElement('div');
    card.className = `dispositivo-card videojuego ${estado}`;
    const consolasDisponibles = dispositivos.consolas.filter(c => c.estado === 'disponible');
    let accionesHtml = '';

    if (estado === 'disponible') {
      if (consolasDisponibles.length > 0) {
        accionesHtml = `
          <select class="caja_productos" id="consola-${juego.id}">
            ${consolasDisponibles.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
          </select>
          <button class="btn-accion btn-iniciar" data-id="${juego.id}" data-tipo="Juego">
            <i class="fas fa-play"></i> Rentar juego
          </button>
        `;
      } else {
        accionesHtml = `<button class="btn-accion" disabled>No hay consolas disponibles</button>`;
      }
    } else {
      accionesHtml = `
        <button class="btn-accion btn-detener" data-id="${juego.id}" data-tipo="Juego">
          <i class="fas fa-stop"></i> Devolver juego
        </button>
      `;
    }

    card.innerHTML = `
      <div class="dispositivo-header">
        <span class="dispositivo-id">${juego.id}</span>
        <span class="dispositivo-estado ${estado}">
          ${estado === 'disponible' ? 'Disponible' : 'En renta'}
        </span>
      </div>
      <div class="dispositivo-info">
        <p><strong>${juego.nombre}</strong></p>
      </div>
      <div class="dispositivo-acciones">
        ${accionesHtml}
      </div>
    `;
    contenedor.appendChild(card);
  }

  // Delegación de eventos para Iniciar/Detener renta
  document.addEventListener('click', e => {
    const iniciar = e.target.closest('.btn-iniciar');
    const detener = e.target.closest('.btn-detener');

    if (iniciar) {
      const id = iniciar.dataset.id;
      const tipo = iniciar.dataset.tipo;
      const empleadoId = selectEmpleados.value;
      if (!empleadoId) {
        alert('Selecciona un empleado antes de iniciar la renta');
        return;
      }
      const body = { id, tipo, id_empleado: empleadoId };
      if (tipo === 'Juego') {
        body.consolaId = document.getElementById(`consola-${id}`).value;
      }
      fetch('/api/renta/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(() => fetchDispositivos());
    }

    if (detener) {
      const id = detener.dataset.id;
      const tipo = detener.dataset.tipo;
      fetch('/api/renta/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, tipo })
      }).then(() => fetchDispositivos());
    }
  });

  // Filtros de UI
  document.getElementById('filtro-tipo').addEventListener('change', cargarDispositivos);
  document.getElementById('buscar-dispositivo').addEventListener('input', cargarDispositivos);

  // Inicializar
  fetchDispositivos();
});