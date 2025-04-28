document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-publicaciones');
  
    fetch('http://localhost:3000/usuarios/getpublicaciones')
      .then(res => res.json())
      .then(data => {
        data.forEach(publi => {
          const card = document.createElement('div');
          card.className = 'validation-card';
  
          const preview = JSON.parse(publi.imagenes)[0] || 'default.jpg';
  
          card.innerHTML = `
            <div class="card-content">
              <div class="card-images">
                <img src="http://localhost:3000${preview}" alt="Imagen de la propiedad">
              </div>
              <div class="card-info">
                <p><strong>Tipo de propiedad:</strong> ${publi.PRO}</p>
                <p><strong>Ubicación:</strong> ${publi.ESTADO}, ${publi.MUN}</p>
                <p><strong>Precio:</strong> $${publi.PRE}</p>
                <p><strong>Habitaciones:</strong> ${publi.HAB} | <strong>Baños:</strong> ${publi.BAN}</p>
              </div>
              <div class="details-button">
                <button class="details-btn">Ver detalles</button>
              </div>
            </div>
          `;
          console.log(preview);
          const verBtn = card.querySelector(".details-btn");
          verBtn.addEventListener("click", () => {
            localStorage.setItem("detallePubli", JSON.stringify(publi));
            window.location.href = "detallesP.html";
          });
          contenedor.appendChild(card);
        });
      });
  });
  
  