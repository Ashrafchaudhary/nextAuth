import { NextResponse } from "next/server";

export const middleware = (request) => {
    const pathVariable = request.nextUrl.pathname;

    const publicPath = [
        "/register",
        "/update-password",
        "/forget-password",
        "/login",
        "/register",
    ];

    const auth = request.cookies.get("token") || "";

    if (publicPath.includes(pathVariable) && auth) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!publicPath.includes(pathVariable) && !auth) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
};

export const config = {
    matcher: [
        "/",
        "/update-profile",
        "/forget-password",
        "/update-password",
        "/register",
        "/login",
    ],
};
