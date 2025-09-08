import Connection from '../config/connection.config.js';
import { queryInsertarUsuario, queryLoginUsuario } from '../queries/usuarios,queries.js'
import { generarSQLLog } from '../utils/sql.helper.js';
import bcrypt from 'bcrypt';

export const modelInsertarUsuario = async (parametros) => {
    const bodyParameters = [parametros.nicknameUsuario, parametros.passwordUsuario];
    const bodyParametersHash = [
        parametros.nicknameUsuario,
        await bcrypt.hash(parametros.passwordUsuario, 10)
    ];

    try {
        const connection = new Connection();
        const [rows] = await connection.query(queryInsertarUsuario, bodyParametersHash);
        const codigoUsuario = rows[0][0].codigoUsuario;
        return {
            estado: true,
            codigoUsuario
        }
    } catch (error) {
        return {
            estado: false,
            codigoUsuario: null,
            errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
            sql: generarSQLLog(queryInsertarUsuario, bodyParameters)
        }
    }
};

export const modelLoginUsuario = async (parametros) => {
    const bodyParameters = [
        parametros.nicknameUsuario
    ];
    try {
        const connection = new Connection();
        const [result] = await connection.query(queryLoginUsuario, bodyParameters);
        const rows = result?.[0]?.[0] ?? null;
        if (!rows) {
            return { estado: true, found: false, data: {} };
        }
        const validarPassword = await bcrypt.compare(parametros.passwordUsuario, rows.passwordUsuario);
        const found = !!validarPassword && !!rows;
        const data = found ? {
            codigoUsuario: rows.codigoUsuario,
            nicknameUsuario: rows.nicknameUsuario
        } : {};
        return {
            estado: true,
            found,
            data
        }
    } catch (error) {
        return {
            estado: false,
            found: false,
            data: null,
            errorMessage: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
            sql: generarSQLLog(queryLoginUsuario, bodyParameters)
        }
    }
};