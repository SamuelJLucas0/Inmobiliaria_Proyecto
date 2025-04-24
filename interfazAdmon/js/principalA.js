window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }
}

window.onload = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/usuarios/validaciones");
      const container = document.getElementById("admin-container");
  
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "validation-card";
        card.innerHTML = `
          <div class="card-images">
            <img src = "http://localhost:3000${item.photo_user}" alt="Foto Usuario">
            <img src = "http://localhost:3000${item.ine_photo}" alt="Foto Ine">
          </div>
          <div class="card-info">
            <h3>${item.name}</h3>
            <p><strong>Email:</strong> ${item.mail2}</p>
            <p><strong>Tel:</strong> ${item.phone}</p>
            <p><strong>CURP:</strong> ${item.curp}</p>
            <p><strong>RFC:</strong> ${item.rfc}</p>
            <button class="access-btn" id = "Validar">Validar</button>
            <button class="access-btn" id = "Rechazar">Rechazar</button>
          </div>
        `;
        console.log(item.photo_user);
        console.log(item.ine_photo);

        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error al cargar validaciones:", error);
    }
  };
  