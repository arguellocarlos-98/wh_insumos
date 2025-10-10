# 🌐 REST API - WH INSUMOS

![GitHub stars](https://img.shields.io/github/stars/arguellocarlos-98/wh_insumos?style=social)
![GitHub forks](https://img.shields.io/github/forks/arguellocarlos-98/wh_insumos?style=social)
![License](https://img.shields.io/github/license/arguellocarlos-98/wh_insumos)
![Issues](https://img.shields.io/github/issues/arguellocarlos-98/wh_insumos)

## 📌 Descripción
Esta es una **REST API** construida con [Node.js](https://nodejs.org/) y [Express](https://expressjs.com/).  
Su objetivo es proporcionar un backend escalable y sencillo para manejar recursos de manera eficiente.  

## 🚀 Características
- CRUD completo de recursos 📄
- Manejo de errores centralizado ⚠️
- Documentación con Swagger 📘
- Autenticación con JWT 🔑
- Validación de datos 🛡️

## 🛠️ Tecnologías
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://mariadb.org/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)

## 📂 Estructura del proyecto
```bash
📦 WH_INSUMO
 ┣ 📂 src
 ┃ ┣ 📂 config           # Configuraciones de la API
 ┃ ┣ 📂 controllers      # Controladores de la API
 ┃ ┣ 📂 db               # Configuracion de conexion a la database de la API
 ┃ ┣ 📂 functions        # Funciones de datos
 ┃ ┣ 📂 logs             # Logs personalizados
 ┃ ┣ 📂 middlewares      # Middlewares personalizados
 ┃ ┣ 📂 models           # Modelos de la API
 ┃ ┣ 📂 queries          # Consultas a la database de la API
 ┃ ┣ 📂 routes           # Rutas de la API
 ┃ ┣ 📂 uploads          # Carpeta de archivos de la API
 ┃ ┣ 📂 utils            # Funciones Personalizadas de la API
 ┃ ┗ 📜 index.js         # Punto de entrada
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 .env.example.js
 ┣ 📜 .env.js
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 run.sh
