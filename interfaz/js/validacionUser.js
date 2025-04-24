window.onload = init;
function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById('enviar').addEventListener('click', Subir);
}

function Subir(event) {
    event.preventDefault(); // Evita el recargo del formulario

    const phone = document.getElementById("phone").value;
    const mail = document.getElementById("mail").value;
    const curp = document.getElementById("curp").value;
    const rfc = document.getElementById("rfc").value;
    const ine_photo = document.getElementById("ine_photo").files[0];
    const photo_user = document.getElementById("photo_user").files[0];

    if (!phone || !mail || !curp || !rfc || !ine_photo || !photo_user) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("mail", mail);
    formData.append("curp", curp);
    formData.append("rfc", rfc);
    formData.append("ine_photo", ine_photo);
    formData.append("photo_user", photo_user);

    const token = localStorage.getItem("token");

    axios.post("http://localhost:3000/usuarios/verificar", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    })
    .then(res => {
        alert("Datos enviados correctamente");
        document.getElementById("verificacion-form").reset();
    })
    .catch(err => {
        alert("Error al enviar los datos");
        console.error(err);
    });
}
