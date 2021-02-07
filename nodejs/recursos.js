
module.exports = {
    mascotas: [
        {id: 1, tipo: 'Gato', nombre: 'Benito', dueno: 'Rodrigo Dominguez', numChip: 1125458},
        {id: 2, tipo: 'Perro', nombre: 'Juanito', dueno: 'Marcelo Henrriquez', numChip: 33548778},
        {id: 3, tipo: 'Pez', nombre: 'Nemo', dueno: 'Ignacio Sepulveda', numChip: 'No Aplica'},
    ],
    veterinarios: [
        {id: 1, rut: "15.336.987-6", nombre: "Marcelo", apellidos: "Toro Rodriguez", especialidad: "Fisioterapia", numCredencial: 33558998785},
        {id: 2, rut: "13.998.713-6", nombre: "Erika", apellidos: "Saavedra Rodriguez", especialidad: "Cirujía", numCredencial: 33558998785}
    ],
    duenos: [
        {id: 1, rut: "18.336.758-9", nombre: "Raul", apellidos: "Alvarez Zepeda", direccion: "Av. Croacia 225", ciudad: 'Antofagasta'},
        {id: 2, rut: "21.998.758-K", nombre: "Felipe", apellidos: "Rojas Rojas", direccion: "Calle Circulo 2268", ciudad: "Calama"}

    ],
    consultas: [
        {id: 1, mascota: 1, veterinario: 1, fechaCreacion: new Date(), fechaEdicion: new Date(), diagnostico: "", comentarios:""},
        {id: 2, mascota: 2, veterinario: 1, fechaCreacion: new Date(), fechaEdicion: new Date(), diagnostico: "", comentarios:""}
    ]
}
