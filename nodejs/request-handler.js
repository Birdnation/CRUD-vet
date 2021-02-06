const url = require('url');
const { StringDecoder } = require('string_decoder');
const enrutador = require('./enrutador');

module.exports = (peticion,respuesta) =>{
    //1.- Obtener url desde peticion http
    const myUrl = new URL(peticion.url, 'http://' + peticion.headers.host);
    //2.- Obtener la ruta
    const ruta = myUrl.pathname
    //3.- Limpiar la ruta
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    //4.- obtener el metodo http
    const metodo = peticion.method.toLowerCase();
    //5.- obtener el string query con las variables por parametro.
    const queryString = myUrl.searchParams;
    //6.- obtener los headers
    const {headers = {}} = peticion
    //7.- obtener payload
    const decoder = new StringDecoder('utf8');

    let buffer = "";
    peticion.on('data',(data)=>{
        buffer += decoder.write(data);
    });

    //8.- al terminar el decoder
    peticion.on('end',()=>{
        buffer += decoder.end();


        if (headers["content-type"] === "application/json") {
            buffer = JSON.parse(buffer);
        }

        //revisar si tiene subrutas en este caso es el indice del array
        if (rutaLimpia.indexOf("/") > -1) {
            var [rutaPrincipal, id] = rutaLimpia.split("/");
        }
        //Ordenar la data
        const data = {
            id,
            ruta: rutaPrincipal ||  rutaLimpia,
            queryString,
            metodo,
            headers,
            payload: buffer
        };

        //controlador de rutas y asignacion a la funcion de enrutador
        let handler;
        if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][data.metodo]) {
            handler = enrutador[data.ruta][data.metodo];
        }else{
            handler = enrutador.noEncontrado;
        }


        //ejecutar el controlador de rutas para enviar la respuesta
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const response = JSON.stringify(mensaje);
                respuesta.setHeader('Content-Type', 'application/json')
                respuesta.writeHead(statusCode);
                //enviando respuesta
                respuesta.end(response);
            })
        }
    });
};