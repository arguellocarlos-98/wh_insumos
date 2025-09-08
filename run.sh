#!/bin/bash
echo "Ejecutando Warehouse Productions Inputs Api Service"
cd src
pm2 start src/index.js --name "Warehouse Productions Inputs Api Service"