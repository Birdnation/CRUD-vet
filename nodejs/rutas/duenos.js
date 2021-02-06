module.exports = (duenos) => {return {
    get: (data, cb)=>{
        selectDueno = null;
        if (data.id) {
            duenos.find((dueno) =>{
                if (dueno.id == data.id) {
                    selectDueno = dueno;
                }
            })
            if(selectDueno){
                return cb(200,selectDueno)
            }
            return cb(404,{mensaje: `No se encontró el dueno con el indice ${data.id}`})
        }
        cb(200, duenos)
    },
    post: (data, cb)=>{
        duenos.push(data.payload);
        cb(201, data.payload)
    },
    put: (data, cb)=>{
        selectDueno = null;
        if (data.id) {
            duenos.find((dueno) =>{
                if (dueno.id == data.id) {
                    selectDueno = dueno;
                    dueno.rut = data.payload.rut;
                    dueno.nombre = data.payload.nombre;
                    dueno.apellidos = data.payload.apellidos;
                    dueno.direccion = data.payload.direccion;
                    dueno.ciudad = data.payload.ciudad;
                }
            })
            if(selectDueno){
                return cb(200,selectDueno)
            }
            return cb(404,{mensaje: `No se encontró el dueno con el indice ${data.id}`})
        }
        cb(200, duenos)
    },
    delete: (data, cb)=>{
        selectDueno = null;
        if (data.id) {
            
            for (const dueno of duenos) {
                if (dueno.id == data.id) {
                    selectDueno = dueno;
                    duenos.splice(duenos.indexOf(dueno),1);
                }
            }

            if(selectDueno){
                return cb(204,{mensaje: "Eliminado con éxito."})
            }
            return cb(404,{mensaje: `No se encontró el dueno con el indice ${data.id}`})
        }
        cb(200, duenos)
    },
}
}