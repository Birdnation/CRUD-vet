let selectMascota;
module.exports = {
    ruta: {
        get: (data, cb)=>{
            cb(200,'esta es /ruta')
        }
    },
    mascotas: {
        get: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                global.recursos.mascotas.find((mascota) =>{
                    if (mascota.id == data.id) {
                        selectMascota = mascota;
                    }
                })
                if(selectMascota){
                    return cb(200,selectMascota)
                }
                return cb(404,{mensaje: `No se encontró la mascota con el indice ${data.id}`})
            }
            cb(200, global.recursos.mascotas)
        },
        post: (data, cb)=>{
            global.recursos.mascotas.push(data.payload);
            cb(201, data.payload)
        },
        put: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                global.recursos.mascotas.find((mascota) =>{
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
            cb(200, global.recursos.mascotas)
        },
        delete: (data, cb)=>{
            selectMascota = null;
            if (data.id) {
                
                for (const mascota of global.recursos.mascotas) {
                    if (mascota.id == data.id) {
                        selectMascota = mascota;
                        global.recursos.mascotas.splice(global.recursos.mascotas.indexOf(mascota),1);
                    }
                }

                if(selectMascota){
                    return cb(200,selectMascota)
                }
                return cb(404,{mensaje: `No se encontró la mascota con el indice ${data.id}`})
            }
            cb(200, global.recursos.mascotas)
        },
    },
    noEncontrado: (data,cb)=>{
        cb(404,{mensaje: 'ruta desconocida'})
    }
}