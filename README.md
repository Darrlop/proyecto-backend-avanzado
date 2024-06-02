

---
---
# <center>Proyecto Backend Avanzado</center>
---
---

>David Arrarás López

### Introducción

El objetivo de este proyecto es la ampliación del desarrollo básico de una API que se realizó anteriormente (y a la que se tiene acceso aquí: https://github.com/Darrlop/Ejercicio-Node-mongodb) que ee ejecutará en el servidor de un servicio de compra-venta de artículos de segunda mano llamado Chollopop.

Se utilizará Node, express y mongoDB como herramientas base. A esto se sumarán una serie de librerías para tareas complementatias

El objetivo principal es adquirir un conocimiento básico de dichas herramientas y librerías, así como la elaboración de las funcionalidades más habituales de una api de este tipo. A las realizadas en la 1º fase se le suma ahora autenticación, internacionalización y uso de mnicroservicios.

Concretamente, lo que debe poder realizarse con la API sería:
  - Internacionalización de la parte website (es/en)
  - Autenticación mediante JWT, que protegerá el acceso a la api a los acceso a api/anuncios
  - Encriptación de las contraseñas usadas en los usuarios
  - Obtener listado de anuncios:
    - Listado general por website
    - Listado por api unicamente de aquellos anuncios que sean del usuario logeado (a partir de ahora esto se mantendrá si no se indica lo contrario)
    - Listado de un anuncio concreto (por medio de su id)
  - Lista de anuncios por filtro:
    - Opciones de filtrado, que pueden usarse individualmente o en grupo:
      - Filtros por tag
      - Filtros por tipo de anuncio (venta/compra)
      - Filtros por rango de precio 
      - Filtro por nombre: se muestran los anuncios que empiecen por dicho nombre
      - Filtro de ordenación por el campo que indiquemos
  - Lista de tags existentes
  - Posibilidad de paginación en el listado de la información
  - Creación de un anuncio, con la posibilidad de incluir un fichero de imagen
  - Elaboración de un microservicio para la creación de thumbnail a partir de la imagen del anuncio
  - Borrado de un anuncio y de los archivos de imágenes relacioandos con él

# <br><center>DOCUMENTACIÓN</center>

## Instalación y arranque

#### · Requisitos previos:
- Tener instalado en el equipo: 
  - Node
  - Express
  - MongoDB
  - Postman (para la simulación de peticiones post, delete, etc.)
- Clonado del repositorio en nuestro equipo
  
#### · Instalación de dependencias:

Dentro del directorio:
```sh
mpn install
```
Verificación de que estén instaladas las siguientes herramientas:
  - Express validator
  - Mongoose
  - Nodemon
  - bcrypt
  - i18n
  - jimp
  - jsonwebtoken
  - multer
  - express-validator
  - cote


#### · Inicialización y arranque:

 ·· *Inicialización de la base de datos:*

**¡ATENCIÓN! La ejecución de este comando elimina todo el contenido previo de la BD**. Ha de usarse sólo una vez, en la inicialización de la BD. 

```sh
npm run initDB
```
> **Importante:** se nos pedirá confirmación de inicialización: "s" para aceptar 

Con ello formateamos la BD y cargamos unos datos mínimos para su correcto funcionamiento.  

·· *Arranque aplicación:*
  - Arranque en modo producción: ```npm start```
  - Arranque en modo desarrollo: ```npm run dev```
    
    > En modo desarrollo, ***nodemon*** monitorizará la app y reinicia el servidor automáticamente cuando detecte cambios guardados, para quitarnos esa tarea a nosotros y poder asegurarnos de ejecutar la app con el código más reciente
  
  - Es necesario arrancar el microservicio de manera separada en otro terminal mediante ```node ./libthumbnailImageService.js```

## <br>GUÍA DE LA API


### Autenticación mediante JWT
- Acceso mediante este endpoint que retornará un token 

  - ``` http://localhost:3000/api/authenticate``` 

  post /api/Authenticate (body)

La petición post se hace por medio de Postman.

- Pestaña body de la aplicación -> marcarmos x-www-form-urlencoded
- POST url ```localhost:3000/api/authenticate```
- Campos:
  - email: string -- Usado como nombre de usuario
  - password: string -- contraseña que será encriptada por bcrypt


- Respuesta
```
{
 "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVjN2ZjNmU1YTk1MGJiZjg0ZTczNDIiLCJpYXQiOjE3MTczMzgwODIsImV4cCI6MTcxNzM0ODg4Mn0.haU0zRsVtHMkmaaWZY_jNWTIHK_wHQbew5wSYqDQ_gk"
}
```
En la documentación adjuntamos, se indica el uso del tokenJWT en Headers con el nombre de campo Authorization.

No obstante, también puede incluirse en Body o en la misma url, en ambos casos con el nombre jwt

### ACCESO
- Acceso a la API usando postman (para uso de token JWT), con la información de respuesta en formato Json.
  - ``` http://localhost:3000/api/anuncios``` 
- Acceso directamente a Nodepop por medio del navegador, sin necesidad de autenticación, siendo la información de respuesta renderizada en una vista.
  - ``` http://localhost:3000/``` 

La documentación se centrará en el API, y se mostrará los ejemplos de respuesta en formato Json. El acceso a Chollopop se realiza de igual manera, pero variando la url de acceso como se indica arriba.


### PETICIONES

### Obtener anuncio concreto

GET /api/anuncios/:id  (headers)

Se obtiene un listado del anuncio con la id indicada

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT


### Obtener anuncios

GET /api/anuncios  (headers)
 
Se obtiene un listado general de todos los anuncios

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT

### Obtener anuncios (con filtros)

GET /api/anuncios/? (headers)

Se obtiene un listado de los anuncios que cumplen el filtro indicado

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT

- Filtros:
  - **nombre**: muestra los anuncios que empiezan por la cadena indicada
    - ```http://localhost:3000/api/anuncios?nombre=silla```
  - **venta**: indica si se vende (true) o si se compra(false) el articulo del anuncio
    - ```http://localhost:3000/api/anuncios?venta=true```
  - **sort**: el campo por el que se ordenarán los anuncios:
    - ```http://localhost:3000/api/anuncios?sort=precio```
  - **tag**: campo de agrupación de anuncios -> work, motor, mobile y lifestyle
    - Puede filtrarse por varios, añadiendo un tag por campo
    - ```http://localhost:3000/api/anuncios?tag=mobile&tag=motor```
  - **Precio**: rango de precios. Formato numérico.
    - precio=50 -> aquellos productos que valen exactamente 50€
    - precio=-50 -> aquellos productos hasta 50€
    - precio=50- -> aquellos productos de 50€ en adelante
    - precio=50-100 -> aquellos productos situados en un rango de 50 a 100 €
    - ```http://localhost:3000/api/anuncios?precio:50-100```
  - **skip** **limit**: paginación del resultado. Datos numéricos. Skip indica el número de anuncios que ha de saltarse. Limit el máximo que mostrará
    - ``` http://localhost:3000/api/anuncios?skip=0&limit=5``` 
    - Muestra desde el inicio hasta el 5º anuncio

  - Ejemplo: ```http://localhost:3000/api/anuncios?skip=0&limit=5&tag=mobile&precio=10-200&sort=precio```
  - Respuesta:
    ```json
    {
      "resultado": [
          {
              "_id": "65e31e89d916977beff352be",
              "nombre": "funda movil",
              "venta": false,
              "precio": 10,
              "foto": "funda.png",
              "tags": [
                  "lifestyle",
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c3",
              "nombre": "soporte movil",
              "venta": true,
              "precio": 35,
              "foto": "soporte.png",
              "tags": [
                  "mobile",
                  "motor"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c4",
              "nombre": "pantalla iphone",
              "venta": false,
              "precio": 90,
              "foto": "pantalla.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c6",
              "nombre": "apple pencil",
              "venta": true,
              "precio": 99.99,
              "foto": "pencil.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          },
          {
              "_id": "65e31e89d916977beff352c0",
              "nombre": "samsung a52",
              "venta": true,
              "precio": 190,
              "foto": "a52.png",
              "tags": [
                  "mobile"
              ],
              "__v": 0
          }
      ]
    }

### Obtener tags
GET /api/anuncios/tags (headers)

Devuelve el listado de tags que hay en la BD

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT

  - ```http://localhost:3000/api/anuncios/tags```
  - Respuesta:
    ```json
    {
      "result": [
          "lifestyle",
          "mobile",
          "motor",
          "work"
      ]
    }
    ```


### Creación de un anuncio
post /api/anuncios (body, headers)

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT

- Pestaña body de la aplicación -> marcarmos form-data
- POST url ```127.0.0.1:3000/api/anuncios/```
- Campos:
  - nombre: string -- Nombre del anuncio
  - venta: boolean -- true venta, false compra
  - precio: number -- en euros con o sin decimales
  - foto: file -- archivo de imagen  -- opcional
  - tags: [string] --  arrays de tags: work, lifestyle, moto y/o mobile
  - owner: string -- id del propietario del anuncio

- Respuesta
```json
{
    "result": {
        "nombre": "Dibujo",
        "venta": false,
        "precio": 11,
        "foto": "Item-1717347785915-kame_sennin_lucha.png",
        "tags": [
            "work",
            "lifestyle"
        ],
        "owner": [
            "665c7fc6e5a950bbf84e7342"
        ],
        "_id": "665ca5c9ab3bd4d0071a7638",
        "__v": 0
    }
}
```
La creación de un anuncio tiene vinculado un microservicio que genera un thumbnail a partir del archivo de imagen subido 

### Borrado de un anuncio
delete /api/anuncios/:id

La petición post se hace por medio de Postman.

- Pestaña Headers
- Campos:
  - Authorization: string -- token JWT

- DELETE url ```127.0.0.1:3000/api/anuncios/65e4ce5661ed9743c551d499```
- Respuesta
```json
{
    "estado": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```
Este endpoint también borra del directorio public/assets/img el archivo del anuncio y su thumbnail

### MICROSERVICIOS

se ha implementado, por medio de la librería cote, un microservicio compuesto por 2 ficheros:

- thumbnailImageRequester.js
  - Actua como el peticionario del servicio
- thumbnailImageService.js
  - Actua como la parte suministradora del servicio
  - Este debe ser ejecutada de manera separada como se indica en el apartado de ejecución de la aplicación

Este microservicio crea un thumbnail a partir del archivo de imagen que se adjunta en la creación de un anuncio. 

Ambos son almacenados en public/assets/img

### INTERNACIONALIZACIÓN

Por medio de la librería i18n se ofrece la parte frontend con la cobertura de idioma español e inglés

Por defecto se usa el idioma español, pero la website tiene un selector que permite el cambio de idioma.

![alt text](image.png)
![alt text](image-1.png)

## Opciones de desarrollo futuro

Algunas propuestas:

- Control de mayúsculas/minúsculas en el manejo de los datos de los anuncios
- Realizar documentación con aplicaciones especializadas como Swagger o similar
- Incluir testing.



