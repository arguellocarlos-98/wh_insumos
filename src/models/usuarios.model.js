import * as Sentry from '@sentry/node';
import { queryEditarUsuario, queryInsertarUsuario, querylistarUsuario, queryLoginUsuario, queryMantenerUsuario } from '../queries/usuarios,queries.js'
import bcrypt from 'bcrypt';
import { actualizarProcedure, insertarProcedure, listarProcedure, mostrarProcedure } from '../db/operations.db.js';

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
        const codigoUsuario = result.data[0]?.codigoUsuario ?? null;
        return {
            estado: true,
            codigoUsuario
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelLoginUsuario = async (parametros) => {
    const bodyParameters = [
        parametros.nicknameUsuario
    ]
    try {
        const result = await mostrarProcedure(queryLoginUsuario, bodyParameters)
        const rows = result.data;

        if (!rows) return { estado: true, found: false, data: null };

        const validarPassword = await bcrypt.compare(parametros.passwordUsuario, rows.passwordUsuario);
        const found = !!validarPassword;

        const permisos = found && rows.permisos ? rows.permisos.split('#').map((rol) => {
            const [codigoRol, nombreRol] = rol.split('$');
            return { codigoRol, nombreRol };
        }) : [];
        const data = found ? {
            codigoUsuario: rows.codigoUsuario,
            codigoSucursal: rows.codigoSucursal,
            nombreSucursal: rows.nombreSucursal,
            cinUsuario: rows.cinUsuario,
            razonSocial: rows.razonSocial,
            nicknameUsuario: rows.nicknameUsuario,
            permisos
        } : {};

        return {
            estado: true,
            found,
            data
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelEditarUsuario = async (parametros) => {
    const rolesString = Array.isArray(parametros.permisos) ? parametros.permisos.join(",") : "";
    const hashedPassword = parametros.passwordUsuario ? await bcrypt.hash(parametros.passwordUsuario, 10) : null;

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
        Sentry.captureException(error);
        throw error;
    }
};

export const modelListarUsuario = async (parametros) => {
    const paramsQuery = [
        parametros.codigoSucursal,
        parametros.filtro
    ];

    try {
        const result = await listarProcedure(querylistarUsuario, paramsQuery);
        if (!result.estado) return result;

        const rows = result.data;
        const found = result.found;

        const data = found ? rows.map(({ codigoUsuario, codigoSucursal, nombreSucursal, cinUsuario, razonSocial, nicknameUsuario, permisos, estadoUsuario }) => ({
            codigoUsuario,
            codigoSucursal,
            nombreSucursal,
            cinUsuario,
            razonSocial,
            nicknameUsuario,
            permisos: permisos ? permisos.split('#').map((rol) => {
                const [codigoRol, nombreRol] = rol.split('$');
                return { codigoRol, nombreRol };
            }) : [],
            estadoUsuario : estadoUsuario === 1
        })) : [];

        return {
            estado: true,
            found,
            data
        }
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};

export const modelMantenerUsuario = async (parametros) => {
    const paramsQuery = [
        parametros.estadoUsuario,
        parametros.usuario,
        parametros.codigoUsuario
    ];

    try {
        const result = await actualizarProcedure(queryMantenerUsuario, paramsQuery);
        if (!result.estado) return result;
        return {
            estado: true,
            found: result.found,
            data: result.data
        };
    } catch (error) {
        Sentry.captureException(error);
        throw error;
    }
};