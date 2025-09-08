# 🌐 REST API - Proyecto

![GitHub stars](https://img.shields.io/github/stars/arguellocarlos-98/wh_insumos?style=social)
![GitHub forks](https://img.shields.io/github/forks/arguellocarlos-98/wh_insumos?style=social)
![License](https://img.shields.io/github/license/arguellocarlos-98/wh_insumos)
![Issues](https://img.shields.io/github/issues/rguellocarlos-98/wh_insumos)

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
 ┃ ┣ 📂 config      # Rutas de la API
 ┃ ┣ 📂 controllers      # Rutas de la API
 ┃ ┣ 📂 db # Lógica de negocio
 ┃ ┣ 📂 functions      # Modelos de datos
 ┃ ┣ 📂 logs # Middlewares personalizados
 ┃ ┣ 📂 middlewares # Middlewares personalizados
 ┃ ┣ 📂 models # Middlewares personalizados
 ┃ ┣ 📂 queries # Middlewares personalizados
 ┃ ┣ 📂 routes # Middlewares personalizados
 ┃ ┣ 📂 uploads # Middlewares personalizados
 ┃ ┣ 📂 utils # Middlewares personalizados
 ┃ ┗ 📜 index.js      # Punto de entrada
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 .env.example.js
 ┣ 📜 .env.js
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 run.sh
