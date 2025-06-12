document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la API para obtener los productos
    fetch('http://127.0.0.1:5000/productos')
        .then(response => response.json())
        .then(data => {
            // Obtiene el contenedor de la lista
            const productosLista = document.getElementById('productosLista');
            // Recorre los productos y agrega cada uno como un elemento de lista
            data.forEach(producto => {
                const item = document.createElement('li');
                item.textContent = `Productos: ${producto.Nombre_producto} - Precio: $${producto.Precio_unitario}`;
                productosLista.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });
});
