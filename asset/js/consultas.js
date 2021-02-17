let consultas = [];
let pacientes = [];
let veterinarios = [];

//Constantes para el formulario de agregar
const tableBody = document.getElementById('bodyTable');
const idConsulta = document.getElementById('id');
const mascota = document.getElementById('mascota');
const veterinario = document.getElementById('veterinario');
const diagnostico = document.getElementById('diagnostico');
const comentarios = document.getElementById('comentarios');
const formulario = document.getElementById('formulario');
//
//Boton Agregar nuevo
const nuevoBtn = document.getElementById('nuevo');

//boton cerrar modal agregar
const btnCerrar = document.getElementById('btn-cerrar');
const btnGuardar = document.getElementById('btn-guardar');
const tituloModal = document.getElementsByClassName('modal-title');

var auxOperacion;
const urlConsultas = 'https://vetbackend.vercel.app/consultas';

//Función para actualizar las vistas.
const listarConsultas = async ()=>{
    
    try {
        await solicitarConsultas();
        await llenarSelectPaciente();
        await llenarSelectVeterinario();
        if (consultas.length > 0) {
        tableBody.innerHTML = '';
        let fillTable = consultas.map((consulta) =>{
        tableBody.innerHTML += ` <tr>
                                    <th scope="row">${consulta.id}</th>
                                    <td>${consulta.mascota.nombre}</td>
                                    <td>${consulta.veterinario.nombre} ${consulta.veterinario.apellidos}</td>
                                    <td>${consulta.fechaCreacion}</td>
                                    <td>${consulta.fechaEdicion}</td>
                                    <td>${consulta.diagnostico}</td>
                                    <td>${consulta.comentarios}</td>
                                    <td>
                                        <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                            <div class="btn-group" role="group" aria-label="First group">
                                                <button type="button" class="btn btn-warning" onclick="editar(${consulta.id})" data-toggle="modal" data-target="#ModalAgregarMascota"><i class="fas fa-pencil-alt"></i></button>
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

const llenarSelectPaciente = async()=>{
    mascota.innerHTML = '';
    try {
        await solicitarPaciente();
        if (pacientes.length > 0) {
            pacientes.forEach(paciente => {
                mascota.innerHTML += `<option value="${paciente.id}">${paciente.nombre}</option>`
            });
        }else{
            mascota.innerHTML = `<option selected disabled value="">No hay mascotas en registro...</option>`
        }
    } catch (error) {
        
    }
}

const llenarSelectVeterinario = async()=>{
    veterinario.innerHTML = '';
    try {
        await solicitarVeterinarios();
        if (veterinarios.length > 0) {
            veterinarios.forEach(vet => {
                veterinario.innerHTML += `<option value="${vet.id}">${vet.nombre} ${vet.apellidos}</option>`
            });
        }else{
            veterinario.innerHTML = `<option selected disabled value="">No hay veterinarios en registro...</option>`
        }
    } catch (error) {
        
    }
}

solicitarConsultas = async () =>{
    await fetch(urlConsultas,{method: 'GET', mode: 'cors'})
        .then((data) => {if (data.ok) {
            return data.json();
        }})
        .then((respuesta) => {
            consultas = respuesta;
            return respuesta;
        });
}

solicitarPaciente = async () =>{
    await fetch('https://vetbackend.vercel.app/mascotas',{method: 'GET', mode: 'cors'})
        .then((data) => {if (data.ok) {
            return data.json();
        }})
        .then((respuesta) => {
            pacientes = respuesta;
            return respuesta;
        });
}

solicitarVeterinarios = async () =>{
    await fetch('https://vetbackend.vercel.app/veterinarios',{method: 'GET', mode: 'cors'})
        .then((data) => {if (data.ok) {
            return data.json();
        }})
        .then((respuesta) => {
            veterinarios = respuesta;
            return respuesta;
        });
}

solicitarVeterinario = async () =>{
    await fetch('https://vetbackend.vercel.app/veterinarios',{method: 'GET', mode: 'cors'})
    .then((data) => {if (data.ok) {
        return data.json();
    }})
    .then((respuesta) => {
        veterinarios = respuesta;
        return respuesta;
    });
}

const enviarConsulta = async (data)=>{
    await fetch(urlConsultas,{
        method: 'POST',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
    });
};

const actualizarConsulta = async (data, id)=>{
    await fetch(urlConsultas + "/" + parseInt(id),{
        method: 'PUT',
        mode: 'cors',
        headers: {"Content-Type": "application/json"},
        body: [JSON.stringify(data)]
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
        consultas.map((consulta) => contador = consulta.id);
        contador++;


        const newDatos = {
            id: contador,
            mascota: mascota.value,
            veterinario: veterinario.value,
            diagnostico: diagnostico.value,
            comentarios: comentarios.value,
        }

        if (formulario.checkValidity() === false) {
            e.preventDefault();
        }else{
            formulario.classList.add('was-validated');
        }

        if(formulario.className.indexOf('was-validated') > 0){
            await enviarConsulta(newDatos);
            btnCerrar.click();
            listarConsultas();
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
            await consultas.find((consulta) => {
                if (consulta.id == idConsulta.value) {
                    const selectConsulta = consultas[consultas.indexOf(consulta)];
                    console.log(selectConsulta);
                    selectConsulta.mascota = mascota.value
                    selectConsulta.veterinario = veterinario.value
                    selectConsulta.fechaEdicion = new Date()
                    selectConsulta.diagnostico = diagnostico.value
                    selectConsulta.comentarios = comentarios.value
                    actualizarConsulta(selectConsulta,selectConsulta.id);
                }
            })
            
            btnCerrar.click();
            listarConsultas();
            formulario.classList.remove('was-validated');
            formulario.reset();
            location.reload();
        }
    }
}



//Función para editar un registro, recibe como parámetro el id del objeto a editar.
let editar = (id) => {
    consultas.find((consulta) => {
        if(consulta.id == id) {
            const selectConsulta = consultas[consultas.indexOf(consulta)];
            tituloModal[0].innerText = `Editar a ${selectConsulta.mascota}...`;
            btnGuardar.innerText = 'Editar';    
            idConsulta.value = id;
            mascota.value = selectConsulta.mascota.id;
            veterinario.value = selectConsulta.veterinario.id;
            diagnostico.value = selectConsulta.diagnostico;
            comentarios.value = selectConsulta.comentarios;
            auxOperacion = 'editar';
        }
    })
}

//Evento para agregar una nueva mascota
nuevoBtn.onclick = () => {
    formulario.reset();
    llenarSelectPaciente();
    llenarSelectVeterinario();
    tituloModal[0].innerText = `Agregar nuevo dueño`;
    btnGuardar.innerText = 'Guardar';
    auxOperacion = 'agregar';
}

listarConsultas();