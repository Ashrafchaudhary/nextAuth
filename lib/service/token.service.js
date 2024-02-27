import jwt from "jsonwebtoken";

const AUTH = process.env.AUTH_JWT || "EFF";
const FORGET = process.env.FORGET_JWT || "wefw";

export const generateToken = async (user) => {
    const token = await jwt.sign({ userId: user._id }, AUTH, {
        expiresIn: "2d",
    });

    return token;
};

export const verifyToken = async (token) => {
    const verified = await jwt.verify(token, AUTH);
    return verified;
};

export const generateForgetToken = async (user, email) => {
    const token = await jwt.sign({ userId: user._id }, `${FORGET}${email}`, {
        expiresIn: "5h",
    });

    return token;
};

export const verifyForgetToken = async (token, email) => {
    const verified = await jwt.verify(token, `${FORGET}${email}`);
    return verified;
};
