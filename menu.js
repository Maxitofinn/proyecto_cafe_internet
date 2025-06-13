// menu.js
function loadMenu() {
    const menuHTML = `
   <nav class="main-menu">
            <h1>Café Internet</h1>
            <img class="logo" src="https://www.flaticon.es/icono-gratis/internet_2721688?term=internet&page=1&position=18&origin=search&related_id=2721688" alt="">
            <ul>
                <li class="nav-item active">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i class="fa fa-house nav-icon"></i>
                        <span class="nav-text">Registro Venta</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i class="fa fa-cash-register nav-icon"></i>
                        <span class="nav-text">Historial Ventas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i class="fa fa-box nav-icon"></i>
                        <span class="nav-text">Productos</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i class="fa fa-users nav-icon"></i>
                        <span class="nav-text">Empleados</span>
                    </a>
                </li>
                <li class="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i class="fa fa-gear nav-icon"></i>
                        <span class="nav-text">Configuración</span>
                    </a>
                </li>
            </ul>
        </nav>

    `;
    
    // Insertar el menú al inicio del main
    document.querySelector('main').insertAdjacentHTML('afterbegin', menuHTML);
    
    // Marcar la página activa
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.querySelector('a').getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
        
        // Manejar clics
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Llamar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadMenu);