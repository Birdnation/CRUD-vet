module.exports = (mascotas) => {return {
        get: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                mascotas.find((mascota) =>{
                    if (mascota.id == data.id) {
                        selectMascota = mascota;
                    }
                })
                if(selectMascota){
                    return cb(200,selectMascota)
                }
                return cb(404,{mensaje: `No se encontró la mascota con el indice ${data.id}`})
            }
            cb(200, mascotas)
        },
        post: (data, cb)=>{
            mascotas.push(data.payload);
            cb(201, data.payload)
        },
        put: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                mascotas.find((mascota) =>{
                    if (mascota.id == data.id) {
                        selectMascota = mascota;
                        mascota.tipo = data.payload.tipo;
                        mascota.nombre = data.payload.nombre;
                        mascota.dueno = data.payload.dueno;
                        mascota.numChip = data.payload.numChip;
                    }
                })
                if(selectMascota){
                    return cb(200,selectMascota)
                }
                return cb(404,{mensaje: `No se encontró la mascota con el indice ${data.id}`})
            }
            cb(200, mascotas)
        },
        delete: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                
                for (const mascota of mascotas) {
                    if (mascota.id == data.id) {
                        selectMascota = mascota;
                        mascotas.splice(mascotas.indexOf(mascota),1);
                    }
                }

                if(selectMascota){
                    return cb(204,{mensaje: "Eliminado con éxito."})
                }
                return cb(404,{mensaje: `No se encontró la mascota con el indice ${data.id}`})
            }
            cb(200, mascotas)
        },
    }
}