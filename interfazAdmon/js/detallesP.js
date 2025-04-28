document.addEventListener("DOMContentLoaded", () => {
    const datos = JSON.parse(localStorage.getItem("detallePubli"));
    if (!datos) {
      alert("No se encontraron datos de la publicación");
      return;
    }
  
    document.getElementById("estado").textContent = datos.ESTADO;
    document.getElementById("municipio").textContent = datos.MUN;
    document.getElementById("habitaciones").textContent = datos.HAB;
    document.getElementById("banos").textContent = datos.BAN;
    document.getElementById("est").textContent = datos.EST;
    document.getElementById("amueblado").textContent = datos.AMU;
    document.getElementById("tam").textContent = datos.TAM;
    document.getElementById("precio").textContent = datos.PRE;
    document.getElementById("descripcion").textContent = datos.DES;
    
    console.log(datos.imagenes);
    const imagenes = JSON.parse(datos.imagenes);
    const imagenPrincipal = imagenes[0];
    document.getElementById("imagenPrincipal").src = `http://localhost:3000${imagenPrincipal}`;
    console.log(imagenPrincipal);
    const galeria = document.getElementById("galeria");
    imagenes.slice(1).forEach(imagen => {
      const img = document.createElement("img");
      img.src = `http://localhost:3000${imagen}`;
      galeria.appendChild(img);
    });
  });
  