function loadMenu() {
  const menuHTML =  `
   <nav class="main-menu">
            <h1>Café Internet</h1>
            <img class="logo" src="https://www.flaticon.es/icono-gratis/internet_2721688?term=internet&page=1&position=18&origin=search&related_id=2721688" alt="">
            <ul>
                <li class="nav-item active">
                    <b></b>
                    <b></b>
                   <a href="/">
                        <i class="fa fa-house nav-icon"></i>
                        <span class="nav-text">Inicio</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                     <a href="/historial">
                        <i class="fas fa-history nav-icon"></i>
                        <span class="nav-text">Historial Ventas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="/productos">
                        <i class="fas fa-box-open nav-icon"></i>
                        <span class="nav-text">Productos</span>
                    </a>
                </li>
               
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="/registrar">
                        <i class="fas fa-cash-register nav-icon"></i>
                        <span class="nav-text">Realizar venta</span>
                    </a>
                </li>

                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="/renta">
                        <i class="fas fa-cash-register nav-icon"></i>
                        <span class="nav-text">Realizar renta</span>
                    </a>
                </li>

                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="/historial-rentas">
                        <i class="fas fa-history nav-icon"></i>
                        <span class="nav-text">Historial Rentas</span>
                    </a>
                </li>
            </ul>
        </nav>

    `;

  document.querySelector('main').insertAdjacentHTML('afterbegin', menuHTML);

  // 1) Obtén la ruta completa actual
  const currentPath = window.location.pathname;  // e.g. "/productos"

  // 2) Marca sólo el <li> cuyo <a> coincide exactamente con la ruta
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const a = item.querySelector('a');
    // Usamos a.pathname para comparar rutas absolutas
    if (new URL(a.href).pathname === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
    // 3) Limpio: sólo escucho clicks en los enlaces, no en el li
    a.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', loadMenu);
