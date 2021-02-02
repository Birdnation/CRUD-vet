let veterinarios = [{
    id: 1,
    rut: "15.336.987-6",
    nombre: "Marcelo",
    apellidos: "Toro Rodriguez",
    especialidad: "Fisioterapia",
    numCredencial: 33558998785
},{
    id: 2,
    rut: "13.998.713-6",
    nombre: "Erika",
    apellidos: "Saavedra Rodriguez",
    especialidad: "Cirujía",
    numCredencial: 33558998785
}];

//Constantes para el formulario de agregar
const tableBody = document.getElementById('bodyTable');
const idVeterinario = document.getElementById('id');
const rutVeterinario = document.getElementById('rut-veterinario');
const nombreVeterinario = document.getElementById('nombre-veterinario');
const apellidosVeterinario = document.getElementById('apellido-veterinario');
const especialidadVeterinario = document.getElementById('Especialidad');
const numCredencialVeterinario = document.getElementById('numero-credencial');
const formulario = document.getElementById('formulario');
//
//Boton Agregar nuevo
const nuevoVeterinarioBtn = document.getElementById('nuevo');
//boton cerrar modal agregar
const btnCerrar = document.getElementById('btn-cerrar');
//
const btnCerrarDelete = document.getElementById('btn-cerrar-modal');
const btnGuardar = document.getElementById('btn-guardar');
const tituloModal = document.getElementsByClassName('modal-title');
const tituloModalEliminar = document.getElementById('ModalEliminarMascotaLabel');
const confirmDelete = document.getElementById('confirm-delete');
const declineDelete = document.getElementById('decline-delete');
var auxOperacion;

//Función para actualizar las vistas.
const listarVeterinarios = ()=>{
    tableBody.innerHTML = '';
    let fillTable = veterinarios.map((veterinario) =>{
        tableBody.innerHTML += ` <tr>
                                    <th scope="row">${veterinario.id}</th>
                                    <td>${veterinario.rut}</td>
                                    <td>${veterinario.nombre}</td>
                                    <td>${veterinario.apellidos}</td>
                                    <td>${veterinario.especialidad}</td>
                                    <td>${veterinario.numCredencial}</td>
                                    <td>
                                        <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-warning" onclick="editar(${veterinario.id})" data-toggle="modal" data-target="#ModalAgregarMascota"><i class="fas fa-pencil-alt"></i></button>
                                                <button type="button" class="btn btn-danger" onclick="eliminar(${veterinario.id})" data-toggle="modal" data-target="#ModalEliminarMascota"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`;
    });
};

//Evento de enviar formulario de registro. (crea un nuevo objeto)
formulario.onsubmit = (e)=>{
    //Condición de agregar
    if (auxOperacion == 'agregar') {
        //elimina la clase verificado
        formulario.classList.remove('was-validated');
        //autoincremental para el id
        let contador = 1
        veterinarios.map((veterinario) => contador = veterinario.id);
        contador++;


        const newDatos = {
            id: contador,
            rut: rutVeterinario.value,
            nombre: nombreVeterinario.value,
            apellidos: apellidosVeterinario.value,
            especialidad: especialidadVeterinario.value,
            numCredencial: numCredencialVeterinario.value
        }

        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }

        if(formulario.className.indexOf('was-validated') > 0){
            veterinarios.push(newDatos)
            btnCerrar.click();
            listarVeterinarios();
            formulario.classList.remove('was-validated');
            formulario.reset();
        }

    //condición de actualizar    
    }else if (auxOperacion == 'editar'){
        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }
        if(formulario.className.indexOf('was-validated') > 0){
            veterinarios.find((veterinario) => {
                if (veterinario.id == idVeterinario.value) {
                    const selectVeterinario = veterinarios[veterinarios.indexOf(veterinario)];
                    selectVeterinario.rut = rutVeterinario.value
                    selectVeterinario.nombre = nombreVeterinario.value
                    selectVeterinario.apellidos = apellidosVeterinario.value
                    selectVeterinario.especialidad = especialidadVeterinario.value
                    selectVeterinario.numCredencial = numCredencialVeterinario.value
                }
            })
            
            btnCerrar.click();
            listarVeterinarios();
            formulario.classList.remove('was-validated');
            formulario.reset();
        }
    }
    
}


//Función para eliminar un registro, recibe como parámetro el id del objeto a eliminar.
let eliminar = (id) => {
    veterinarios.find((veterinario) => {
        if (veterinario.id == id) {
            tituloModalEliminar.innerText = `¿Eliminar a ${veterinario.nombre}?`;
        }
    })
    
    confirmDelete.onclick = () =>{
        veterinarios.forEach((veterinario) => {
            if (veterinario.id == id) {
                veterinarios.splice(veterinarios.indexOf(veterinario),1);
            }
        })
        btnCerrarDelete.click();
        listarVeterinarios();
    }

    declineDelete.onclick = ()=>{
        btnCerrarDelete.click();
    }
    listarVeterinarios();
}


//Función para editar un registro, recibe como parámetro el id del objeto a editar.
let editar = (id) => {
    veterinarios.find((veterinario) => {
        if(veterinario.id == id) {
            const selectVeterinario = veterinarios[veterinarios.indexOf(veterinario)];
            tituloModal[0].innerText = `Editar a ${selectVeterinario.nombre}...`;
            btnGuardar.innerText = 'Editar';
            idVeterinario.value = id;
            rutVeterinario.value = selectVeterinario.rut;
            nombreVeterinario.value = selectVeterinario.nombre;
            apellidosVeterinario.value = selectVeterinario.apellidos;
            especialidadVeterinario.value = selectVeterinario.especialidad;
            numCredencialVeterinario.value = selectVeterinario.numCredencial;
            rutVeterinario.setAttribute('disabled','');
            auxOperacion = 'editar';
        }
    })
}

//Evento para agregar una nueva mascota
nuevoVeterinarioBtn.onclick = () => {
    formulario.reset();
    tituloModal[0].innerText = `Agregar nuevo veterinario`;
    btnGuardar.innerText = 'Guardar';
    rutVeterinario.removeAttribute('disabled');
    auxOperacion = 'agregar';
}

listarVeterinarios();