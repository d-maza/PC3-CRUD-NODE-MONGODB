![Logo](https://raw.githubusercontent.com/d-maza/static_web_react_demo/main/src/assets/DiveCodeHitHub.png)

# CRUD con Express y Mongo

Aplicacion CRUD construida con Node.js, Express, EJS y MongoDB.

![My etiqueta](https://img.shields.io/badge/David%20Maza-DiveCode%F0%9F%90%99-blue) ![Node Version](https://img.shields.io/badge/Node-v22-green) ![GitHub repo size](https://img.shields.io/github/repo-size/d-maza/mystrore_back-MEAN) ![GitHub repo licence](https://img.shields.io/github/license/d-maza/mystrore_back-MEAN) ![Codigoutil](https://img.shields.io/badge/Co--Founder-CodigoUtil%F0%9F%92%A1-orange)

## Modos de ejecucion

Este proyecto puede ejecutarse de dos formas:

### 1. Modo local

Usa este modo si Node.js y MongoDB corren en tu propia maquina.

- La app se ejecuta con `npm start`
- MongoDB corre fuera de Docker
- En `.env` el valor normal es `MONGO_HOST=localhost`

Pasos:

```bash
git clone https://github.com/d-maza/PC3-CRUD-NODE-MONGODB.git
cd PC3-CRUD-NODE-MONGODB
npm install
copy .env.example .env
npm start
```

### 2. Modo contenedor

Usa este modo si quieres levantar la app y MongoDB con Docker.

- `docker-compose.yml` levanta `app` y `mongo`
- `Dockerfile` construye la imagen de Node
- `.devcontainer/` sirve para abrir el proyecto dentro de un entorno de desarrollo en contenedor

Comando:

```bash
docker compose up --build
```

En este caso hay dos escenarios de host para Mongo:

- Si `app` y `mongo` corren ambos dentro de Docker Compose, la app debe usar `MONGO_HOST=mongo`
- Si la app corre en tu maquina y solo Mongo corre en Docker con puerto publicado `27017:27017`, la app debe usar `MONGO_HOST=localhost`

## Configuracion

Variables principales:

- `PORT`: puerto HTTP de Express
- `MONGO_HOST`: host de MongoDB
- `MONGO_PORT`: puerto de MongoDB, por defecto `27017`
- `MONGO_DBNAME`: nombre de la base de datos
- `MONGO_USER`: usuario de Mongo
- `MONGO_PASSWORD`: password de Mongo
- `MONGO_URI`: cadena completa opcional; si se define, tiene prioridad sobre el resto

Ejemplos rapidos:

- Local: `MONGO_HOST=localhost`
- Docker app + mongo: `MONGO_HOST=mongo`

## Comandos utiles

```bash
npm install
npm start
npm audit
npm outdated
```

## Stack

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- Dotenv
- Bootstrap

## Referencias

- [MongoDB](https://www.mongodb.com/docs/)
- [Bootstrap](https://getbootstrap.com/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Pull requests and issues are welcome

If you find anything that can be improved, please submit a pull request.

## Authors

- [@D-MAZA](https://github.com/d-maza)






