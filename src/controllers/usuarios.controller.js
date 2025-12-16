import { modelEditarUsuario, modelInsertarUsuario, modelListarUsuario, modelLoginUsuario, modelMantenerUsuario } from "../models/usuarios.model.js";
import jwt from 'jsonwebtoken';
import { keys, environment } from '../../env.js';

export const insertarUsuario = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelInsertarUsuario(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const editarUsuario = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelEditarUsuario(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const listarUsuario = async (req, res, next) => {
    const parametros = req.params;
    try {
        const result = await modelListarUsuario(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const mantenerUsuario = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelMantenerUsuario(parametros);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const loginUsuario = async (req, res, next) => {
    const parametros = req.body;
    try {
        const result = await modelLoginUsuario(parametros);
        if (!result.found) {
            return res.status(401).json({
                estado: false,
                found: false,
                data: null,
                errorMessage: "Credenciales inválidas"
            });
        }
        const authToken = jwt.sign(
            {
                codigoUsuario: result.data.codigoUsuario,
                nicknameUsuario: result.data.nicknameUsuario
            },
            keys.SECRET_JWT_KEY,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { codigoUsuario: result.data.codigoUsuario },
            keys.SECRET_REFRESH_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("authToken", authToken, {
            httpOnly: true,
            secure: environment.prod ? true : false,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: environment.prod ? true : false,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({
            estado: true,
            found: true,
            data: result.data
        });
    } catch (error) {
        next(error);
    }
};

export const logoutUsuario = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: environment.prod ? true : false,
        sameSite: "none"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: environment.prod ? true : false,
        sameSite: "none"
    });

    res.json({
        estado: true,
        mensaje: "Sesión cerrada correctamente"
    });
};

export const refreshToken = (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ estado: false, errorMessage: "No autorizado" });
    try {
        const decoded = jwt.verify(token, keys.SECRET_REFRESH_KEY);
        const newAccessToken = jwt.sign(
            { codigoUsuario: decoded.codigoUsuario },
            keys.SECRET_JWT_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("authToken", newAccessToken, {
            httpOnly: true,
            secure: environment.prod ? true : false,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        res.json({ estado: true, mensaje: "Access token renovado" });
    } catch (err) {
        res.status(401).json({ estado: false, errorMessage: "Refresh token inválido o expirado" });
    }
};

export const checkToken = (req, res) => {
    const token = req.cookies?.authToken;

    if (!token) {
        return res.status(401).json({ estado: false, mensaje: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, keys.SECRET_JWT_KEY);
        // opcional: podés devolver info del usuario
        return res.json({ estado: true, usuario: decoded });
    } catch (err) {
        return res.status(401).json({ estado: false, mensaje: "Token inválido o expirado" });
    }
};