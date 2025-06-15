document.addEventListener('DOMContentLoaded', () => {
    // Configuración del menú de navegación
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((navItem, i) => {
        navItem.addEventListener("click", () => {
            navItems.forEach((item, j) => {
                item.className = "nav-item";
            });
            navItem.className = "nav-item active";
        });
    });

    // Datos de ejemplo (en un caso real, estos vendrían de una API)
    const productos = [
        { id: 1, nombre: "Café Americano", tipo: "bebida", precio: 15.00, cantidad: 50, estado: "Disponible" },
        { id: 2, nombre: "Sandwich de Jamón", tipo: "comida", precio: 30.00, cantidad: 25, estado: "Disponible" },
        { id: 3, nombre: "Papas Fritas", tipo: "snack", precio: 20.00, cantidad: 15, estado: "Bajo Stock" },
        { id: 4, nombre: "Mouse Inalámbrico", tipo: "accesorio", precio: 150.00, cantidad: 8, estado: "Disponible" },
        { id: 5, nombre: "Té Verde", tipo: "bebida", precio: 18.00, cantidad: 35, estado: "Disponible" },
        { id: 6, nombre: "Enchiladas", tipo: "comida", precio: 45.00, cantidad: 12, estado: "Disponible" },
        { id: 7, nombre: "Galletas", tipo: "snack", precio: 12.00, cantidad: 0, estado: "Agotado" },
        { id: 8, nombre: "Cargador USB", tipo: "accesorio", precio: 80.00, cantidad: 5, estado: "Bajo Stock" }
    ];

    // Cargar productos en el select
    const productoSelect = document.getElementById('producto');
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        productoSelect.appendChild(option);
    });

    // Mostrar todos los productos al cargar la página
    mostrarProductos(productos);

    // Event listeners para los filtros
    document.getElementById('tipoProducto').addEventListener('change', aplicarFiltros);
    document.getElementById('producto').addEventListener('change', aplicarFiltros);
    document.getElementById('ordenar').addEventListener('change', aplicarFiltros);

    function aplicarFiltros() {
        const tipoSeleccionado = document.getElementById('tipoProducto').value;
        const productoSeleccionado = document.getElementById('producto').value;
        const ordenSeleccionado = document.getElementById('ordenar').value;

        let productosFiltrados = [...productos];

        // Filtrar por tipo
        if (tipoSeleccionado) {
            productosFiltrados = productosFiltrados.filter(p => p.tipo === tipoSeleccionado);
        }

        // Filtrar por producto específico
        if (productoSeleccionado) {
            productosFiltrados = productosFiltrados.filter(p => p.id.toString() === productoSeleccionado);
        }

        // Ordenar
        if (ordenSeleccionado) {
            switch (ordenSeleccionado) {
                case 'alfabetico':
                    productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                    break;
                case 'alfabetico-desc':
                    productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                    break;
                case 'cantidad-asc':
                    productosFiltrados.sort((a, b) => a.cantidad - b.cantidad);
                    break;
                case 'cantidad-desc':
                    productosFiltrados.sort((a, b) => b.cantidad - a.cantidad);
                    break;
                case 'id-asc':
                    productosFiltrados.sort((a, b) => a.id - b.id);
                    break;
                case 'id-desc':
                    productosFiltrados.sort((a, b) => b.id - a.id);
                    break;
            }
        }

        mostrarProductos(productosFiltrados);
    }

    function mostrarProductos(productosMostrar) {
        const tbody = document.querySelector('#tablaProductos tbody');
        tbody.innerHTML = '';

        if (productosMostrar.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="6" style="text-align: center;">No se encontraron productos</td>';
            tbody.appendChild(tr);
            return;
        }

        productosMostrar.forEach(producto => {
            const tr = document.createElement('tr');
            
            // Asignar clase según el estado para cambiar el color
            if (producto.estado === "Agotado") {
                tr.classList.add('agotado');
            } else if (producto.estado === "Bajo Stock") {
                tr.classList.add('bajo-stock');
            }

            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.estado}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});