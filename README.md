# http-client
Http client libraries consiste en una librería que se puede utilizar para hacer peticiones tipo http y https

## Instalación
Este es un proyecto de tipo librería por lo que para utilizarla deberá agregar el repositorio como dependencia

A pesar de no utilizar ningún tipo de dependencia, es recomendable utilizar este comando para la instalación:

```
npm i
```


## Uso
Para usar la librería dentro de un proyecto, se debe agregar como dependencia la librería (esto en package.json), tal como se muestra a continuación:
```
    "dependencies": {
        "http-client": "git+https://github.com/hugomontero/http-client.git
    }
```

Para hacer uso ya dentro del código se deben importar las funciones de la librería, tal como se muestra a continuación
```
const { http, https } = require("http-client")

```


## Funciones
Las funciones que se pueden utilizar en cada caso (http o https) son las siguientes:
 * get
 * post
 * put
 * delete
 * patch
 
>Todas estas funciones tienen como parámetros de entrada los siguientes elementos: 
> * host : nombre del dominio a solicitar
> * port : puerto del dominio (puede ir nulo, en https default 443, en http default 80)
> * path : el path de la url que desea consultarse 
> * body : en caso de post put y patch, es la información que irá en el cuerpo de la petición, para delete y get este elemento se omite
> * headers : aquí se indica el content-type, cors entre otros
> * options: {timeout, rejectUnauthorized}


## Ejemplo de uso:
```
    const { https } = require("http-client")
    
    const main = (async ()=>{
      let response = await https.get({host:"www.google.com"})
      console.log(response)     
    })()
```
