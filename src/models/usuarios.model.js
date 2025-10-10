import { errorFactory } from '../errors/errorFactory.js';
import { queryInsertarUsuario, queryLoginUsuario } from '../queries/usuarios,queries.js'
import { generarSQLLog } from '../utils/sql.helper.js';
import bcrypt from 'bcrypt';
import { insertarProcedure, mostrarProcedure } from '../db/operations.db.js';

export const modelInsertarUsuario = async (parametros) => {
    const bodyParameters = [parametros.nicknameUsuario, parametros.passwordUsuario];
    const bodyParametersHash = [
        parametros.nicknameUsuario,
        await bcrypt.hash(parametros.passwordUsuario, 10)
    ];
    try {
        const result = await insertarProcedure(queryInsertarUsuario, bodyParametersHash);
        if (!result.estado) return result;
        const codigoUsuario = result.data[0]?.codigoUsuario ?? null;
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
    const bodyParameters = [parametros.nicknameUsuario]
    try {
        const result = await mostrarProcedure(queryLoginUsuario, bodyParameters)
        if (!result.estado) { return result };
        const rows = result.data;

        if (!rows) throw errorFactory('auth', 'Usuario o contraseña incorrectos');

        const validarPassword = await bcrypt.compare(parametros.passwordUsuario, rows.passwordUsuario);
        const found = !!validarPassword;
        const data = found ? {
            codigoUsuario: rows.codigoUsuario,
            nicknameUsuario: rows.nicknameUsuario
        } : {}
        return {
            estado: true,
            found,
            data
        }
    } catch (error) {
        if (error.name?.endsWith('Error')) throw error;
        throw errorFactory('db', `Error al ejecutar login: ${error.message}`);
    }
};