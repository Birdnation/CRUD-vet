let mascotas = [{
    id: 1,
    tipo: "Gato",
    nombre: "Benito",
    dueno: "Rodrigo Dominguez",
    numChip: 33558998785
},{
    id: 2,
    tipo: "Perro",
    nombre: "Manchas",
    dueno: "Marcelo Henrriquez",
    numChip: 33658875845
}];
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
var auxOperacion;

const listarMascotas = ()=>{
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

let eliminar = (id) => {
    mascotas.find((mascota) => {
        if (mascota.id == id) {
            tituloModalEliminar.innerText = `¿Eliminar a ${mascota.nombre}?`;
        }
    })
    
    console.log(tituloModal[0].innerText)
    confirmDelete.onclick = () =>{
        mascotas.forEach((mascota) => {
            if (mascota.id == id) {
                mascotas.splice(mascotas.indexOf(mascota),1);
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


formulario.onsubmit = (e)=>{
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
            mascotas.push(newDatos)
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
                    selectMascota.nombre
                }
                
            })



            btnCerrar.click();
            listarMascotas();
            formulario.classList.remove('was-validated');
            formulario.reset();
        }
    }
    
}

nuevaMascotaBtn.onclick = () => {
    formulario.reset();
    tituloModal[0].innerText = `Agregar nueva mascota`;
    nombreDueno.removeAttribute('disabled');
    btnGuardar.innerText = 'Guardar';
    auxOperacion = 'agregar';
}
listarMascotas();