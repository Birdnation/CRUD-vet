const { constants } = require('os');
const recursos = require('./recursos');
const mascotas = require('./rutas/mascotas');
const veterinarios = require('./rutas/veterinarios');
const duenos = require('./rutas/duenos');
const consultas = require('./rutas/consultas');
let selectMascota;

module.exports = {
    ruta: {
        get: (data, cb)=>{
            cb(200,'esta es /ruta')
        }
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarios: veterinarios(recursos.veterinarios),
    duenos: duenos(recursos.duenos),
    consultas: consultas(recursos.consultas),
    noEncontrado: (data,cb)=>{
        cb(404,{mensaje: 'ruta desconocida'})
    }
}