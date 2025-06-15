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

    // Llamada a la API para obtener los productos
    fetch('http://127.0.0.1:5000/productos')
        .then(response => response.json())
        .then(data => {
            const productoSelect = document.getElementById('producto');
            
            // Limpiar opciones existentes (excepto la primera)
            while (productoSelect.options.length > 1) {
                productoSelect.remove(1);
            }
            
            // Agregar productos al select
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id; // Asumiendo que hay un campo id
                option.textContent = `${producto.Nombre_producto} - $${producto.Precio_unitario}`;
                productoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });

    // Manejar agregar producto
    const agregarProductoBtn = document.getElementById('agregarProducto');
    const listaProductos = document.getElementById('listaProductos');
    
    agregarProductoBtn.addEventListener('click', () => {
        const productoSelect = document.getElementById('producto');
        const cantidadInput = document.getElementById('quantity');
        
        if (productoSelect.value === "") {
            alert("Por favor selecciona un producto");
            return;
        }
        
        const productoTexto = productoSelect.options[productoSelect.selectedIndex].text;
        const cantidad = cantidadInput.value;
        
        // Crear elemento de lista
        const item = document.createElement('li');
        item.textContent = `${productoTexto} x ${cantidad}`;
        item.style.margin = '10px 0';
        item.style.padding = '8px';
        item.style.backgroundColor = '#fff';
        item.style.borderRadius = '5px';
        item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        
        listaProductos.appendChild(item);
        
        // Resetear valores
        productoSelect.value = "";
        cantidadInput.value = 1;
    });

    // Manejar realizar venta
    const realizarVentaBtn = document.getElementById('realizarVenta');
    
    realizarVentaBtn.addEventListener('click', () => {
        const empleadoSelect = document.getElementById('empleado');
        const formaPagoSelect = document.getElementById('formaPago');
        
        if (empleadoSelect.value === "") {
            alert("Por favor selecciona un empleado");
            return;
        }
        
        if (formaPagoSelect.value === "") {
            alert("Por favor selecciona una forma de pago");
            return;
        }
        
        if (listaProductos.children.length === 0) {
            alert("Por favor agrega al menos un producto");
            return;
        }
        
        // Aquí iría la lógica para procesar la venta
        alert("Venta realizada con éxito");
        
        // Limpiar lista de productos
        listaProductos.innerHTML = "";
    });
});