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

    // Configuración del calendario
    flatpickr("#fechaVenta", {
        dateFormat: "d/m/Y",
        locale: "es",
        allowInput: true,
        onChange: function(selectedDates, dateStr, instance) {
            aplicarFiltros();
        }
    });

    // Datos de ejemplo de ventas
    const ventas = [
        {
            id: 1001,
            fecha: "15/05/2023",
            empleado: "Juan Pérez",
            productos: ["Café Americano", "Sandwich de Jamón"],
            cantidad: 2,
            total: 45.00,
            formaPago: "Efectivo"
        },
        {
            id: 1002,
            fecha: "16/05/2023",
            empleado: "María García",
            productos: ["Té Verde", "Galletas"],
            cantidad: 2,
            total: 30.00,
            formaPago: "Tarjeta"
        },
        {
            id: 1003,
            fecha: "17/05/2023",
            empleado: "Carlos López",
            productos: ["Enchiladas", "Refresco"],
            cantidad: 2,
            total: 60.00,
            formaPago: "Efectivo"
        },
        {
            id: 1004,
            fecha: "18/05/2023",
            empleado: "Ana Martínez",
            productos: ["Café Americano", "Papas Fritas"],
            cantidad: 2,
            total: 35.00,
            formaPago: "Tarjeta"
        },
        {
            id: 1005,
            fecha: "19/05/2023",
            empleado: "Juan Pérez",
            productos: ["Mouse Inalámbrico"],
            cantidad: 1,
            total: 150.00,
            formaPago: "Tarjeta"
        },
        {
            id: 1006,
            fecha: "20/05/2023",
            empleado: "María García",
            productos: ["Cargador USB", "Café Americano"],
            cantidad: 2,
            total: 95.00,
            formaPago: "Efectivo"
        }
    ];

    // Mostrar todas las ventas al cargar la página
    mostrarVentas(ventas);

    // Event listeners para los filtros
    document.getElementById('ordenarVentas').addEventListener('change', aplicarFiltros);
    document.getElementById('buscarId').addEventListener('input', aplicarFiltros);

    function aplicarFiltros() {
        const fechaSeleccionada = document.getElementById('fechaVenta').value;
        const ordenSeleccionado = document.getElementById('ordenarVentas').value;
        const idBuscado = document.getElementById('buscarId').value;

        let ventasFiltradas = [...ventas];

        // Filtrar por fecha
        if (fechaSeleccionada) {
            ventasFiltradas = ventasFiltradas.filter(v => v.fecha === fechaSeleccionada);
        }

        // Filtrar por ID específico
        if (idBuscado) {
            ventasFiltradas = ventasFiltradas.filter(v => v.id.toString().includes(idBuscado));
        }

        // Ordenar
        if (ordenSeleccionado) {
            switch (ordenSeleccionado) {
                case 'id-asc':
                    ventasFiltradas.sort((a, b) => a.id - b.id);
                    break;
                case 'id-desc':
                    ventasFiltradas.sort((a, b) => b.id - a.id);
                    break;
            }
        }

        mostrarVentas(ventasFiltradas);
    }

    function mostrarVentas(ventasMostrar) {
        const tbody = document.querySelector('#tablaVentas tbody');
        tbody.innerHTML = '';

        if (ventasMostrar.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="7" style="text-align: center;">No se encontraron ventas</td>';
            tbody.appendChild(tr);
            return;
        }

        ventasMostrar.forEach(venta => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${venta.id}</td>
                <td>${venta.fecha}</td>
                <td>${venta.empleado}</td>
                <td>${venta.productos.join(", ")}</td>
                <td>${venta.cantidad}</td>
                <td>$${venta.total.toFixed(2)}</td>
                <td>${venta.formaPago}</td>
            `;
            tbody.appendChild(tr);
        });
    }
});