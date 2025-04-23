const boton = document.getElementById("btn");
const input = document.getElementById("avatar");

let archivosSubidos = [];

boton.addEventListener("click", function () {
    const archivos = input.files;
    if (archivos.length === 0) {
        alert("Por favor, selecciona al menos un archivo.");
        return;
    }
    for (let i = 0; i < archivos.length; i++) {
        archivosSubidos.push(archivos[i]);
    }
    const json = JSON.stringify(archivosSubidos);
    console.log(json);
    mostrarGaleria();

});

function mostrarGaleria() {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = ""; // Limpiar galería antes de mostrar
    
    archivosSubidos.forEach((archivo, index) => {
        // Crear elementos para mostrar cada imagen
        const divImagen = document.createElement("div");
        const img = document.createElement("img");
        const nombreArchivo = document.createElement("p");
        
        // Configurar la imagen (usando FileReader para mostrar preview)
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
            img.style.maxWidth = "200px";
            img.style.maxHeight = "200px";
        };
        reader.readAsDataURL(archivo);
        
        // Mostrar nombre del archivo
        nombreArchivo.textContent = archivo.name;
        
        // Agregar elementos al DOM
        divImagen.appendChild(img);
        divImagen.appendChild(nombreArchivo);
        galeria.appendChild(divImagen);
    });
}





function obtenerIDDesdeToken(token) {
    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64); // decodifica base64
        const payload = JSON.parse(payloadJson);
        return payload.id_user;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
}


