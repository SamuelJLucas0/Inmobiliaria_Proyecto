window.onload = async () => {
    const data = JSON.parse(localStorage.getItem("detalleUsuario"));
    if (!data) {
      alert("No hay datos para mostrar");
      window.location.href = "principal.html"; // o la vista anterior
      return;
    }
  
    // Mostrar los detalles del usuario
    document.getElementById("fotoUsuario").src = "http://localhost:3000" + data.photo_user;
    document.getElementById("fotoIne").src = "http://localhost:3000" + data.ine_photo;
    document.getElementById("nombre").textContent = data.name;
    document.getElementById("email").textContent = data.mail2;
    document.getElementById("telefono").textContent = data.phone;
    document.getElementById("curp").textContent = data.curp;
    document.getElementById("rfc").textContent = data.rfc;
    document.getElementById("status").textContent = data.status;
  
    // Botón para validar
    document.querySelector(".btn-verde").addEventListener('click', async () => {
      const userId = data.id_user; // Asegúrate de tener el ID del usuario en los datos
  
      try {
        const response = await axios.post(`http://localhost:3000/usuarios/validar/${userId}`);
        alert(response.data.message);
        window.location.href = "principalA.html"; // o la vista anterior para actualizar
      } catch (error) {
        alert("Error al validar usuario");
        console.error(error);
      }
    });
  
    // Botón para rechazar
    document.querySelector(".btn-rojo").addEventListener('click', async () => {
      const userId = data.id_user; // Asegúrate de tener el ID del usuario en los datos
  
      try {
        const response = await axios.post(`http://localhost:3000/usuarios/rechazar/${userId}`);
        alert(response.data.message);
        window.location.href = "principalA.html"; // o la vista anterior para actualizar
      } catch (error) {
        alert("Error al rechazar usuario");
        console.error(error);

      }
    });
  };
  