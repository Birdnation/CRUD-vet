module.exports = (consultas) => {return {
    get: (data, cb)=>{
        selectConsulta = null;
        if (data.id) {
            consultas.find((consulta) =>{
                if (consulta.id == data.id) {
                    selectConsulta = consulta;
                }
            })
            if(selectConsulta){
                return cb(200,selectConsulta)
            }
            return cb(404,{mensaje: `No se encontró la consulta con el indice ${data.id}`})
        }
        cb(200, consultas)
    },
    post: (data, cb)=>{
        data.payload.fechaCreacion = new Date();
        data.payload.fechaEdicion = new Date();
        consultas = [...consultas, data.payload]; //similar a push pero no muta el array
        cb(201, data.payload)
    },
    put: (data, cb)=>{
        selectConsulta = null;
        if (data.id) {
            consultas.find((consulta) =>{
                if (consulta.id == data.id) {
                    selectConsulta = consulta;
                    consulta.mascota = data.payload.mascota;
                    consulta.veterinario = data.payload.veterinario;
                    consulta.fechaEdicion = new Date();
                    consulta.diagnostico = data.payload.diagnostico;
                    consulta.comentarios = data.payload.comentarios;
                }
            })
            if(selectConsulta){
                return cb(200,selectConsulta)
            }
            return cb(404,{mensaje: `No se encontró la consulta con el indice ${data.id}`})
        }
        cb(200, consultas)
    },
    delete: (data, cb)=>{
        selectConsulta = null;
        if (data.id) {
            
            for (const consulta of consultas) {
                if (consulta.id == data.id) {
                    selectConsulta = consulta;
                    consultas.splice(consultas.indexOf(consulta),1);
                }
            }

            if(selectConsulta){
                return cb(204,{mensaje: "Eliminado con éxito."})
            }
            return cb(404,{mensaje: `No se encontró la consulta con el indice ${data.id}`})
        }
        cb(200, consultas)
    },
}
}