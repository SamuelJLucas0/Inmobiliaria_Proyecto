window.onload = init;
const input = document.getElementById("avatar");

function init() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById('btn').addEventListener('click', Subir);
}

const tipoPropiedad = document.getElementById("tipo");
const estado = document.getElementById("estado");
const municipio = document.getElementById("municipio");
const habitaciones = document.getElementById("habitaciones");
const banios = document.getElementById("banios");
const estacionamiento = document.getElementById("estacionamiento");
const amueblado = document.getElementById("amueblado");
const tamanoTerreno = document.getElementById("tamano");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");

function Subir(){
    const archivos = input.files;

    const PRO = tipoPropiedad.value;
    const ESTADO = estado.value;
    const MUN = municipio.value;
    const HAB = habitaciones.value;
    const BAN = banios.value;
    const EST = estacionamiento.value;
    const AMU = amueblado.value;
    const TAM = tamanoTerreno.value;
    const PRE = precio.value;
    const DES = descripcion.value;

    if (
        archivos.length === 0 || PRO === "" || ESTADO === "" || MUN === "" ||
        HAB === "" || BAN === "" || EST === "" || AMU === "" ||
        TAM === "" || PRE === "" || DES === ""
    ) {
        alert("Favor de completar el formulario");
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
        formData.append("imagenes", archivos[i]);
    }

    formData.append("PRO", PRO);
    formData.append("ESTADO", ESTADO);
    formData.append("MUN", MUN);
    formData.append("HAB", HAB);
    formData.append("BAN", BAN);
    formData.append("EST", EST);
    formData.append("AMU", AMU);
    formData.append("TAM", TAM);
    formData.append("PRE", PRE);
    formData.append("DES", DES);


    const token = localStorage.getItem("token");

    axios.post('http://localhost:3000/usuarios/subirpubli', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => {
        if (res.status === 201) {
            alert("Publicación creada correctamente");
            limpiarFormulario();
        }
    })
    .catch(err => {
        alert("Error al subir publicación");
        console.log(err);
    });
}

function limpiarFormulario() {
    // Limpiar los valores de los campos de texto
    document.getElementById('tipo').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('municipio').value = '';
    document.getElementById('habitaciones').value = '';
    document.getElementById('banios').value = '';
    document.getElementById('estacionamiento').value = '';
    document.getElementById('amueblado').value = '';
    document.getElementById('tamano').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('descripcion').value = '';
    
    // Limpiar el campo de archivos (input de imágenes)
    document.getElementById('avatar').value = '';
}
