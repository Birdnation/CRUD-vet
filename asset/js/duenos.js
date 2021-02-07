let duenos = [];

//Constantes para el formulario de agregar
const tableBody = document.getElementById('bodyTable');
const idDueno = document.getElementById('id');
const rutDueno = document.getElementById('rut-dueno');
const nombreDueno = document.getElementById('nombre-dueno');
const apellidosDueno = document.getElementById('apellido-dueno');
const ciudadDueno = document.getElementById('ciudad');
const direccionDueno = document.getElementById('direccion-dueno');
const formulario = document.getElementById('formulario');
//
//Boton Agregar nuevo
const nuevoBtn = document.getElementById('nuevo');
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
const urlDuenos = 'http://localhost:5000/duenos';

//Función para actualizar las vistas.
const listarDuenos = async ()=>{
    try {
        await solicitarDuenos();
    if (duenos.length > 0) {
        tableBody.innerHTML = '';
    let fillTable = duenos.map((dueno) =>{
        tableBody.innerHTML += ` <tr>
                                    <th scope="row">${dueno.id}</th>
                                    <td>${dueno.rut}</td>
                                    <td>${dueno.nombre}</td>
                                    <td>${dueno.apellidos}</td>
                                    <td>${dueno.direccion}</td>
                                    <td>${dueno.ciudad}</td>
                                    <td>
                                        <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-warning" onclick="editar(${dueno.id})" data-toggle="modal" data-target="#ModalAgregarMascota"><i class="fas fa-pencil-alt"></i></button>
                                                <button type="button" class="btn btn-danger" onclick="eliminar(${dueno.id})" data-toggle="modal" data-target="#ModalEliminarMascota"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`;
    });
    } else {
        tableBody.innerHTML = `<tr> <td> No hay dueños </td> </tr>`;
    }
    } catch (error) {
        $('.alert').show();
    }
    
};

solicitarDuenos = async () =>{
    await fetch(urlDuenos,{method: 'GET', mode: 'cors'})
        .then((data) => {if (data.ok) {
            return data.json();
        }})
        .then((respuesta) => {
            duenos = respuesta;
            return respuesta;
        });
}

const enviarDueno = async (data)=>{
    console.log(data);
    await fetch(urlDuenos,{
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
    });
};

const actualizarDueno = async (data, id)=>{
    await fetch(urlDuenos + "/" + parseInt(id),{
        method: 'PUT',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
    });
};

const eliminarDueno = async (id)=>{
    await fetch(urlDuenos + "/" + parseInt(id),{
        method: 'DELETE',
        mode: 'cors',
    });
};

//Evento de enviar formulario de registro. (crea un nuevo objeto)
formulario.onsubmit = async (e)=>{
    //Condición de agregar
    if (auxOperacion == 'agregar') {
        //elimina la clase verificado
        formulario.classList.remove('was-validated');
        //autoincremental para el id
        let contador = 1
        duenos.map((dueno) => contador = dueno.id);
        contador++;


        const newDatos = {
            id: contador,
            rut: rutDueno.value,
            nombre: nombreDueno.value,
            apellidos: apellidosDueno.value,
            direccion: direccionDueno.value,
            ciudad: ciudadDueno.value,
        }

        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }

        if(formulario.className.indexOf('was-validated') > 0){
            await enviarDueno(newDatos);
            btnCerrar.click();
            listarDuenos();
            formulario.classList.remove('was-validated');
            formulario.reset();
            location.reload();
        }

    //condición de actualizar    
    }else if (auxOperacion == 'editar'){
        e.preventDefault()
        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }
        if(formulario.className.indexOf('was-validated') > 0){
            await duenos.find((dueno) => {
                if (dueno.id == idDueno.value) {
                    const selectDueno = duenos[duenos.indexOf(dueno)];
                    selectDueno.rut = rutDueno.value
                    selectDueno.nombre = nombreDueno.value
                    selectDueno.apellidos = apellidosDueno.value
                    selectDueno.ciudad = ciudadDueno.value
                    selectDueno.direccion = direccionDueno.value
                    actualizarDueno(selectDueno,selectDueno.id);
                }
            })
            
            btnCerrar.click();
            listarDuenos();
            formulario.classList.remove('was-validated');
            formulario.reset();
            location.reload();
        }
    }
}


//Función para eliminar un registro, recibe como parámetro el id del objeto a eliminar.
let eliminar = async (id) => {
    duenos.find((dueno) => {
        if (dueno.id == id) {
            tituloModalEliminar.innerText = `¿Eliminar a ${dueno.nombre}?`;
        }
    })
    
    confirmDelete.onclick = () =>{
        duenos.forEach((dueno) => {
            if (dueno.id == id) {
                eliminarDueno(id);
            }
        })
        btnCerrarDelete.click();
        listarDuenos();
    }

    declineDelete.onclick = ()=>{
        btnCerrarDelete.click();
    }
    listarDuenos();
}


//Función para editar un registro, recibe como parámetro el id del objeto a editar.
let editar = (id) => {
    duenos.find((dueno) => {
        if(dueno.id == id) {
            const selectDueno = duenos[duenos.indexOf(dueno)];
            tituloModal[0].innerText = `Editar a ${selectDueno.nombre}...`;
            btnGuardar.innerText = 'Editar';
            idDueno.value = id;
            rutDueno.value = selectDueno.rut;
            nombreDueno.value = selectDueno.nombre;
            apellidosDueno.value = selectDueno.apellidos;
            ciudadDueno.value = selectDueno.ciudad;
            direccionDueno.value = selectDueno.direccion;
            rutDueno.setAttribute('disabled','');
            auxOperacion = 'editar';
        }
    })
}

//Evento para agregar una nueva mascota
nuevoBtn.onclick = () => {
    formulario.reset();
    tituloModal[0].innerText = `Agregar nuevo dueño`;
    btnGuardar.innerText = 'Guardar';
    rutDueno.removeAttribute('disabled');
    auxOperacion = 'agregar';
}

listarDuenos();