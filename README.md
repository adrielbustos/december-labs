# December Labs prueba tecnica - Adriel Bustos
Prueba técnica / Transacciones

## APILAYER
- Ya que se tiene en cuenta que las solicitudes a esta API son pagadas, se implemento un servicio que se encarga de actualizar las conversiones de las divisas cada cierto tiempo, para que no se tenga que hacer una solicitud a la API cada vez que se necesite una conversion.
- El servicio busca las conversiones cuando el servidor es levantado, y despues se actualiza cada x minutos que el usuario quiera configurar.
- Se puede configurar el tiempo de actualizacion de las conversiones en el archivo .env

## Usuarios
- Se implemento un servicio que se encarga de crear 3 usuarios por defecto, para que no sea necesario crear usuarios cada vez que se levanta el proyecto.
- El usuario por defecto loggeado es el usuario con el email: *user1@gmail.com*
- Cada usuario ya tiene varias cuentas con diferentes divisas para realizar las pruebas. Si quieren revisar esta info, pueden revisar el archivo *src\utils\_mockData.ts* en la propiedad privada *users*

## Transacciones
- La cuenta por defecto del sistema es: *admin@gmail.com* y solo contiene una cuenta en dolares.
- Cuando una transaccion es realizada entre cuentras de diferentes usuarios, la comision es intregrada a la cuenta del admin, el id es mostrado en consola cuando se inicia el servidor.
- Al realizar una transaccion, el usuario no podra enviar el dia de la transaccion, ya que este se calcula con la fecha actual del sistema al realizarse.

## Logs
- Se implemento un servicio que se encarga de guardar los logs de errores tanto del servicio HTTP o errores del sistema que se ejecutan en background.

## Pasos para levantar el proyecto

### 1. Crear en la raiz del proyecto el archivo .env y usar como referencia el archivo *.env.example*
- - Tener el cuenta si vas a dockerizar el proyecto
- - Para el uso de docker-compose, usar: *mongodb://mongo/december-labs*
- - Para el uso local, usar: *mongodb://mongo:27017/december-labs*

### 2. Ejecutar Docker Compose
- - Ejecutar el comando `docker-compose build`
- - Ejecutar el comando `docker-compose up -d`

### 3. Ejecutar localmente sin docker
- - Asegurarse de tener instalado mongodb y ejecutado en el puerto 27017
- - Ejecutar el comando `yarn install`
- - Ejecutar el comando `yarn run prod`

## Limitaciones
- No se implemento un sistema de autenticacion, por lo que se puede acceder a las rutas sin necesidad de autenticarse.
- No se implemento un sistema de paginacion, por lo que se muestran todos los resultados de las consultas.
- Las validaciones se limitan al uso de express-validator, por lo que no se implemento un sistema de validaciones personalizado.