

let mascotas = [];


const tableBody = document.getElementById('bodyTable');
const tipoMascota = document.getElementById('tipo-mascota');
const nombreMascota = document.getElementById('nombre-mascota');
const nombreDueno = document.getElementById('nombre-dueno');
const numeroChip = document.getElementById('numero-chip');
const formulario = document.getElementById('formulario');
const btnCerrar = document.getElementById('btn-cerrar');
const btnCerrarDelete = document.getElementById('btn-cerrar-modal');
const btnGuardar = document.getElementById('btn-guardar');
const idMascota = document.getElementById('id');
const nuevaMascotaBtn = document.getElementById('nuevo');
const tituloModal = document.getElementsByClassName('modal-title');
const tituloModalEliminar = document.getElementById('ModalEliminarMascotaLabel');
const confirmDelete = document.getElementById('confirm-delete');
const declineDelete = document.getElementById('decline-delete');
const urlMascota = 'http://localhost:5000/mascotas';
var auxOperacion;

//Función para actualizar las vistas.
const listarMascotas = async () => {
    await solicitarMascotas();
    tableBody.innerHTML = '';
    let fillTable = mascotas.map((mascota) =>{
        tableBody.innerHTML += ` <tr>
                                    <th scope="row">${mascota.id}</th>
                                    <td>${mascota.tipo}</td>
                                    <td>${mascota.nombre}</td>
                                    <td>${mascota.dueno}</td>
                                    <td>${mascota.numChip}</td>
                                    <td>
                                        <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-warning" onclick="editar(${mascota.id})" data-toggle="modal" data-target="#ModalAgregarMascota"><i class="fas fa-pencil-alt"></i></button>
                                                <button type="button" class="btn btn-danger" onclick="eliminar(${mascota.id})" data-toggle="modal" data-target="#ModalEliminarMascota"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`;
    });
};

solicitarMascotas = async () =>{
    await fetch(urlMascota,{method: 'GET', mode: 'cors'})
        .then((data) => {if (data.ok) {
            return data.json();
        }})
        .then((respuesta) => {
            mascotas = respuesta;
            return respuesta;
        });
}

//Función para eliminar un registro, recibe como parámetro el id del objeto a eliminar.
let eliminar = (id) => {
    mascotas.find((mascota) => {
        if (mascota.id == id) {
            tituloModalEliminar.innerText = `¿Eliminar a ${mascota.nombre}?`;
        }
    })
    
    confirmDelete.onclick = () =>{
        mascotas.forEach((mascota) => {
            if (mascota.id == id) {
                eliminarMascota(id);
            }
        })
        btnCerrarDelete.click();
        listarMascotas();
    }

    declineDelete.onclick = ()=>{
        btnCerrarDelete.click();
    }
    listarMascotas();
}


//Función para editar un registro, recibe como parámetro el id del objeto a editar.
let editar = (id) => {
    mascotas.find((mascota) => {
        if(mascota.id == id) {
            const selectMascota = mascotas[mascotas.indexOf(mascota)];
            tituloModal[0].innerText = `Editar a ${selectMascota.nombre}...`;
            btnGuardar.innerText = 'Editar';
            idMascota.value = id;
            tipoMascota.value = selectMascota.tipo;
            nombreMascota.value = selectMascota.nombre;
            nombreDueno.value = selectMascota.dueno;
            numeroChip.value = selectMascota.numChip;
            nombreDueno.setAttribute('disabled','');
            auxOperacion = 'editar';
        }
    })
}

//Evento de enviar formulario de registro. (crea un nuevo objeto)
formulario.onsubmit = async (e)=>{
    if (auxOperacion == 'agregar') {
        let contador = 1
        formulario.classList.remove('was-validated');
        mascotas.map((mascota) => contador = mascota.id);
        contador++;
        const newDatos = {
            id: contador,
            tipo: tipoMascota[tipoMascota.selectedIndex].text,
            nombre: nombreMascota.value,
            dueno: nombreDueno.value,
            numChip: numeroChip.value
        }

        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }

        if(formulario.className.indexOf('was-validated') > 0){
            await enviarMascota(newDatos);
            btnCerrar.click();
            listarMascotas();
            formulario.classList.remove('was-validated');
            formulario.reset();
        }
    }else if (auxOperacion == 'editar'){
        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }

        if(formulario.className.indexOf('was-validated') > 0){
            mascotas.find((mascota) => {
                if (mascota.id == idMascota.value) {
                    const selectMascota = mascotas[mascotas.indexOf(mascota)];
                    selectMascota.tipo = tipoMascota.value
                    selectMascota.nombre = nombreMascota.value
                    selectMascota.numChip = numeroChip.value
                    actualizarMascota(selectMascota, selectMascota.id);
                }
            })
            btnCerrar.click();
            listarMascotas();
            formulario.classList.remove('was-validated');
            formulario.reset();
        }
    }
};

const enviarMascota = async (data)=>{
    await fetch(urlMascota,{
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
    });
};

const actualizarMascota = async (data, id)=>{
    await fetch(urlMascota + "/" + parseInt(id),{
        method: 'PUT',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
    });
};

const eliminarMascota = async (id)=>{
    await fetch(urlMascota + "/" + parseInt(id),{
        method: 'DELETE',
        mode: 'cors',
    });
};


//Evento para agregar una nueva mascota
nuevaMascotaBtn.onclick = () => {
    formulario.reset();
    tituloModal[0].innerText = `Agregar nueva mascota`;
    nombreDueno.removeAttribute('disabled');
    btnGuardar.innerText = 'Guardar';
    auxOperacion = 'agregar';
}
listarMascotas();