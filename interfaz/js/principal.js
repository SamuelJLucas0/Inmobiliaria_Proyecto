window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "inicio.html";
        return;
    }
  
    cargarPublicaciones(); // Llamamos a la función para cargar publicaciones
}

function cargarPublicaciones() {
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
            // Token inválido o expirado
            localStorage.removeItem("token");
            window.location.href = "inicio.html";
            return;
        }
        return res.json();
    })
    .then(data => {
        if (!data) return; // Si no hay datos, salimos

        data.forEach(publi => {
            const resultado = document.createElement('div');
            resultado.className = 'resultado';

            const preview = JSON.parse(publi.imagenes)[0] || 'default.jpg';

            resultado.innerHTML = `
                <div class="imagen">
                    <img src="http://localhost:3000${preview}" alt="Imagen del producto" class="imagen-producto">
                </div>
                <div class="info">
                    <div class="desc">
                        <h3>MXN $${publi.PRE}</h3>
                        <p>${publi.PRO} en ${publi.ESTADO}, ${publi.MUN}.</p>
                        <p>${publi.TAM}m².</p>
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

