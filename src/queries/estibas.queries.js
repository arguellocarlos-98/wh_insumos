// ABM de Estibas
// Listar Estibas
export const queryListarEstiba = "call `sp_listarEstiba`(?,?);";
// Insertar Estibas
export const queryInsertarEstiba = "call `sp_insertarEstiba`(?,?,?,?,?,?);";
// Editar Estibas
export const queryEditarEstiba = "call `sp_editarEstiba`(?,?,?,?,?,?,?);";
// Mantener Estibas
export const queryMantenerEstiba = "call `sp_mantenerEstiba`(?,?,?);";
// Insertar SKU por CDV
export const queryInsertarCsv = `
LOAD DATA LOCAL INFILE ?
	INTO TABLE estibas_template
	FIELDS TERMINATED BY ';' 
	OPTIONALLY ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(sku,producto);
`;