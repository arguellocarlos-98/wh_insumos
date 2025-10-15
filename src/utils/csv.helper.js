import fs from "fs";
import csv from "csv-parser";

/**
 * Lee un archivo CSV en modo streaming y devuelve las filas como arrays.
 * @param {string} rutaCSV - Ruta del archivo CSV
 * @returns {Promise<object[]>} - Promesa con los registros parseados
 */
export const leerCSV = (rutaCSV) => {
  return new Promise((resolve, reject) => {
    const resultados = [];
    fs.createReadStream(rutaCSV)
      .pipe(csv({ separator: ";" })) // ajusta si tu CSV usa ',' u otro separador
      .on("data", (data) => resultados.push(data))
      .on("end", () => resolve(resultados))
      .on("error", reject);
  });
};
