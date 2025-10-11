import { errorFactory } from '../errors/errorFactory.js';
import { queryEditarUsuario, queryInsertarUsuario, queryLoginUsuario } from '../queries/usuarios,queries.js'
import { generarSQLLog } from '../utils/sql.helper.js';
import bcrypt from 'bcrypt';
import { actualizarProcedure, insertarProcedure, mostrarProcedure } from '../db/operations.db.js';

export const modelInsertarUsuario = async (parametros) => {
    const rolesString = Array.isArray(parametros.permisos) ? parametros.permisos.join(',') : '';
    const bodyParameters = [
        parametros.codigoSucursal,
        parametros.cinUsuario,
        parametros.razonSocial,
        parametros.nicknameUsuario,
        await bcrypt.hash(parametros.passwordUsuario, 10),
        parametros.usuario,
        rolesString
    ];
    try {
        const result = await insertarProcedure(queryInsertarUsuario, bodyParameters);
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
            cinUsuario: rows.cinUsuario,
            razonSocial: rows.razonSocial,
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

export const modelEditarUsuario = async (parametros) => {
    const rolesString = Array.isArray(parametros.permisos) ? parametros.permisos.join(",") : "";
    const hashedPassword = parametros.passwordUsuario ? await bcrypt.hash(parametros.passwordUsuario, 10) : parametros.passwordUsuario;
    const bodyParameters = [
        parametros.codigoSucursal,
        parametros.cinUsuario,
        parametros.razonSocial,
        parametros.nicknameUsuario,
        hashedPassword,
        parametros.usuario,
        rolesString,
        parametros.codigoUsuario
    ];

    try {
        const result = await actualizarProcedure(queryEditarUsuario, bodyParameters);
        if (!result.estado) return result;
        return {
            estado: true,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        return {
            estado: false,
            found: false,
            error: `Error en ${import.meta.url} ${error.sqlMessage || error.message}`,
            sql: generarSQLLog(queryEditarUsuario, bodyParameters)
        }
    }
};