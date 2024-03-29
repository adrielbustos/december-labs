# December Labs prueba tecnica - Adriel Bustos
Prueba técnica / Transacciones

## APILAYER
- Ya que se tiene en cuenta que las solicitudes a esta API son pagas, se implemento un servicio que se encarga de actualizar las conversiones de las divisas cada cierto tiempo, para que no se tenga que hacer una solicitud a la API cada vez que se necesite una conversion.
- El servicio busca las conversiones cuando el servidor es levantado, y despues se actualiza cada x minutos que el usuario quiera configurar.
- Se puede configurar el tiempo de actualizacion de las conversiones en el archivo .env

## Usuarios
- Se implemento un servicio que se encarga de crear 3 usuarios por defecto, para que no sea necesario crear usuarios al le levanta el proyecto.
- El usuario por defecto loggeado es el usuario con el email: *user1@gmail.com*
- Cada usuario ya tiene varias cuentas con diferentes divisas para realizar las pruebas. Si quieren revisar esta info, pueden ver el archivo **src\utils\_mockData.ts** en la propiedad privada *users*

## Transacciones
- La cuenta por defecto del sistema es: *admin@gmail.com* y solo contiene una cuenta en dolares.
- Cuando una transaccion es realizada entre cuentras de diferentes usuarios, la comision es intregrada a la cuenta del admin, el id es mostrado en consola cuando se inicia el servidor.
- Al realizar una transaccion, el usuario no podra enviar el dia de la transaccion, ya que este se calcula con la fecha actual del sistema al realizarse.

## Logs
- Se implemento un servicio que se encarga de guardar los logs de errores tanto del servicio HTTP o errores del sistema que se ejecutan en background.

## Pasos para levantar el proyecto

### 1. Crear en la raiz del proyecto el archivo .env y usar como referencia el archivo *.env.example*
- Tener el cuenta si vas a dockerizar el proyecto
- Para el uso de docker-compose, usar: *mongodb://mongo/december-labs*
- Para el uso local, usar: *mongodb://mongo:27017/december-labs*

### 2. Ejecutar Docker Compose
```
docker-compose build
docker-compose up
```

### 3. Ejecutar localmente sin docker
- Asegurarse de tener instalado mongodb y ejecutado en el puerto 27017
- Actualizar node en la version mas reciente para poder usar el comando `yarn`, en caso contrario usar `npm`
- Ejecutar el comando `yarn install`
- Ejecutar el comando `yarn run prod` / `yarn run dev`

## Limitaciones
- No se implemento un sistema de autenticacion, por lo que se puede acceder a las rutas sin necesidad de autenticarse.
- No se implemento un sistema de paginacion, por lo que se muestran todos los resultados de las consultas.
- Las validaciones se limitan al uso de express-validator, por lo que no se implemento un sistema de validaciones personalizado.

## Rutas
### User Account
- **GET** /api/v1/user/accounts
### User Transaction
- **GET** /api/v1/user/transactions?sourceAccountID=[ID]&from=[DATE]&to=[DATE]
- Date example: `2023-03-03T04:52:16.889Z`
- **POST** /api/v1/user/transfer
- Body example:
```
{
    "sourceAccountID": "5f9f1b9b0b5b1c0b8c1c1c1c",
    "destinationAccountID": "5f9f1b9b0b5b1c0b8c1c1c1d",
    "amount": 100,
    "description": "description"
}
```

### Mejoras
- Implementar un sistema de autenticacion por medio JWT
- Implementar un sistema de paginacion
- Implementar un sistema de validaciones personalizado (utlizando por ejemplo Jsonschema)
- Implementar un sistema de logs personalizado
- Implementar un sistema de cache para las conversiones de las divisas (utilizando por ejemplo Redis)
- Implementar un sistema de pagos por medio de Stripe
- Migrar el proyecto a una estructura de microservicios por medio de RabbitMQ
- Implementar un sistema de testing
- Agregar un servicio de documentacion de la API (Swagger)

## Notas
- El proyecto esta dockerizado, por lo que se puede ejecutar con docker-compose o sin docker.
- El proyecto esta configurado para ejecutarse en modo desarrollo, por lo que se puede usar nodemon para el desarrollo.
- El proyecto esta configurado para ejecutarse en modo produccion, por lo que se puede usar pm2 para el desarrollo.