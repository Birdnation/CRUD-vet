module.exports = (veterinarios) => {return {
    get: (data, cb)=>{
        selectVeterinario = null;
        if (data.id) {
            veterinarios.find((veterinario) =>{
                if (veterinario.id == data.id) {
                    selectVeterinario = veterinario;
                }
            })
            if(selectVeterinario){
                return cb(200,selectVeterinario)
            }
            return cb(404,{mensaje: `No se encontró la veterinario con el indice ${data.id}`})
        }
        cb(200, veterinarios)
    },
    post: (data, cb)=>{
        veterinarios.push(data.payload);
        cb(201, data.payload)
    },
    put: (data, cb)=>{
        selectVeterinario = null;
        if (data.id) {
            veterinarios.find((veterinario) =>{
                if (veterinario.id == data.id) {
                    selectVeterinario = veterinario;
                    veterinario.rut = data.payload.rut;
                    veterinario.nombre = data.payload.nombre;
                    veterinario.apellidos = data.payload.apellidos;
                    veterinario.especialidad = data.payload.especialidad;
                    veterinario.numCredencial = data.payload.numCredencial;
                }
            })
            if(selectVeterinario){
                return cb(200,selectVeterinario)
            }
            return cb(404,{mensaje: `No se encontró la veterinario con el indice ${data.id}`})
        }
        cb(200, veterinarios)
    },
    delete: (data, cb)=>{
        selectVeterinario = null;
        if (data.id) {
            
            for (const veterinario of veterinarios) {
                if (veterinario.id == data.id) {
                    selectVeterinario = veterinario;
                    veterinarios.splice(veterinarios.indexOf(veterinario),1);
                }
            }

            if(selectVeterinario){
                return cb(204,{mensaje: "Eliminado con éxito."})
            }
            return cb(404,{mensaje: `No se encontró la veterinario con el indice ${data.id}`})
        }
        cb(200, veterinarios)
    },
}
}