window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }
    Ver();
}

function Ver() {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:3000/usuarios/getimg', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
        const resultadoDiv = document.getElementById('galeria');
        resultadoDiv.innerHTML = "<h2>Galería de Imágenes</h2>";

        if (response.data.code === 200 && response.data.imagenes.length > 0) {
            mostrarimagenes(response.data.imagenes);
        } else {
            resultadoDiv.innerHTML += "<p>No hay imágenes para mostrar.</p>";
        }
    })
    .catch(error => {
        const resultadoDiv = document.getElementById('galeria');
        resultadoDiv.innerHTML += "<p>Error al cargar imágenes.</p>";
        console.log(error);
    });
}

function mostrarimagenes(imagenes) {
    const resultadoDiv = document.getElementById('galeria');

    imagenes.forEach(ruta => {
        const contenedor = document.createElement('div');
        contenedor.className = "imagen-container";

        const imagenElement = document.createElement('img');
        imagenElement.src = `http://localhost:3000${ruta}`;
        imagenElement.style.maxWidth = "200px";
        imagenElement.style.margin = "10px";

        contenedor.appendChild(imagenElement);
        resultadoDiv.appendChild(contenedor);
    });
}
