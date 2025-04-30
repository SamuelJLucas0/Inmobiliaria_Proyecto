window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "inicio.html";
        return;
    }
  
    cargarPublicaciones(); // Cargar todas las publicaciones al inicio
    
    // Event listener para el botón de búsqueda
    document.getElementById('btn-buscar').addEventListener('click', function() {
        aplicarFiltros();
    });







    
}

function aplicarFiltros() {
    // Obtener todos los valores de los filtros
    const filtros = {
        tipo: document.getElementById('tipo').value,
        estado: document.getElementById('estado').value,
        habitaciones: document.getElementById('habitaciones').value,
        banios: document.getElementById('banios').value,
        estacionamiento: document.getElementById('estacionamiento').value,
        amueblado: document.getElementById('amueblado').value,
        tamano: document.getElementById('tamano').value,
        precio: document.getElementById('precio').value,
        extras: obtenerExtrasSeleccionados()
    };
    
    cargarPublicaciones(filtros);
}

function obtenerExtrasSeleccionados() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function cargarPublicaciones(filtros = {}) {
    const contenedor = document.querySelector('.resultados');
    const token = localStorage.getItem("token");

    fetch('http://localhost:3000/usuarios/getpublicaciones', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "inicio.html";
            return;
        }
        return res.json();
    })
    .then(data => {
        if (!data) return;
        
        // Limpiar contenedor antes de mostrar nuevos resultados
        contenedor.innerHTML = '';
        
        // Filtrar publicaciones según los criterios
        const publicacionesFiltradas = filtrarPublicaciones(data, filtros);
        
        // Mostrar resultados filtrados
        if (publicacionesFiltradas.length === 0) {
            contenedor.innerHTML = '<p class="no-resultados">No se encontraron propiedades con los filtros seleccionados.</p>';
            return;
        }
        
        publicacionesFiltradas.forEach(publi => {
            const resultado = document.createElement('div');
            resultado.className = 'resultado';

            const preview = JSON.parse(publi.imagenes)[0] || 'default.jpg';

            resultado.innerHTML = `
                <div class="imagen">
                    <img src="http://localhost:3000${preview}" alt="Imagen del producto" class="imagen-producto">
                </div>
                <div class="info">
                    <div class="desc">
                        <h3>MXN $${publi.PRE.toLocaleString()}</h3>
                        <p>${publi.PRO} en ${publi.ESTADO}, ${publi.MUN}.</p>
                        <p>${publi.TAM}m², ${publi.HAB} hab., ${publi.BAN} baños.</p>
                        <p>${publi.phone}</p>
                    </div>
                    <input type="button" value="Ver más" class="boton-ver-mas">
                </div>
            `;

            const verBtn = resultado.querySelector('.boton-ver-mas');
            verBtn.addEventListener('click', () => {
                localStorage.setItem('detallePubli', JSON.stringify(publi));
                localStorage.removeItem('detalleUsuario');
                window.location.href = 'detalles.html';
            });

            contenedor.appendChild(resultado);
        });
    })
    .catch(error => {
        console.error('Error al cargar publicaciones:', error);
    });
}

function filtrarPublicaciones(publicaciones, filtros) {
    return publicaciones.filter(publi => {
        // Filtrar por tipo de propiedad
        if (filtros.tipo && publi.PRO !== filtros.tipo) return false;
        
        // Filtrar por estado
        if (filtros.estado && publi.ESTADO !== filtros.estado) return false;
        
        // Filtrar por número de habitaciones
        if (filtros.habitaciones && parseInt(publi.HAB) < parseInt(filtros.habitaciones)) return false;
        
        // Filtrar por número de baños
        if (filtros.banios && parseInt(publi.BAN) < parseInt(filtros.banios)) return false;
        
        // Filtrar por estacionamiento
        if (filtros.estacionamiento && publi.EST !== filtros.estacionamiento) return false;
        
        // Filtrar por amueblado
        if (filtros.amueblado && publi.AMU !== filtros.amueblado) return false;
        
        // Filtrar por tamaño mínimo
        if (filtros.tamano && parseInt(publi.TAM) < parseInt(filtros.tamano)) return false;
        
        // Filtrar por precio mínimo
        if (filtros.precio && parseInt(publi.PRE) < parseInt(filtros.precio)) return false;
        
        // Filtrar por extras
        if (filtros.extras && filtros.extras.length > 0) {
            const extrasPubli = JSON.parse(publi.Extras);
            const todosExtrasPresentes = filtros.extras.every(extra => 
                extrasPubli.includes(extra)
            );
            if (!todosExtrasPresentes) return false;
        }
        
        return true;
    });
}