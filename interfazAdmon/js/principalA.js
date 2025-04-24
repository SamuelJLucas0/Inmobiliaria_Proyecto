window.onload = async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
    return;
  }

  try {
    const { data } = await axios.get("http://localhost:3000/usuarios/validaciones");
    const container = document.getElementById("admin-container");

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "validation-card";
      
      // Aquí agregamos el cambio de color según el estado
      const statusColor = getStatusColor(item.status); // Obtiene el color del estado

      card.innerHTML = `
        <div class="status-text" style="color: ${statusColor};">${item.status}</div>
        <div class="card-content">
          <div class="card-images">
            <img src="http://localhost:3000${item.photo_user}" alt="Foto Usuario">
          </div>
          <div class="card-info">
            <h3>${item.name}</h3>
            <p><strong>Email:</strong> ${item.mail2}</p>
            <p><strong>Tel:</strong> ${item.phone}</p>
            <p><strong>CURP:</strong> ${item.curp}</p>
            <p><strong>RFC:</strong> ${item.rfc}</p>
          </div>
          <div class="details-button">
            <button class="details-btn">Ver detalles</button>
          </div>
        </div>
      `;

      const verBtn = card.querySelector(".details-btn");
      verBtn.addEventListener("click", () => {
        localStorage.setItem("detalleUsuario", JSON.stringify(item));
        window.location.href = "detallesU.html";
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar validaciones:", error);
  }
};

// Función para obtener el color según el estado
function getStatusColor(status) {
  switch (status) {
    case 'En revisión':
      return 'orange';
    case 'Validado':
      return 'green';
    case 'Rechazado':
      return 'red';
    default:
      return 'black'; // Si el estado no es conocido, se asigna color negro
  }
}

// Línea para mostrar la foto del INE
// <img src="http://localhost:3000${item.ine_photo}" alt="Foto INE">
