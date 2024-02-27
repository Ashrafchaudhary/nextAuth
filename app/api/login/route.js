import { UserModel } from "@/lib/models/User.model";
import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/service/token.service";

connectDB();

export const POST = async (request) => {
    const { email, password } = await request.json();

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
        return NextResponse.json(
            { msg: null, error: "User not exists" },
            {
                status: 400,
            }
        );
    }

    const isMatch = await existUser.ConfirmPassword(password);
    if (!isMatch) {
        return NextResponse.json(
            { msg: null, error: "Invalid credentials" },
            {
                status: 401,
            }
        );
    }

    const token = await generateToken(existUser);

    const response = NextResponse.json(
        { error: null, msg: "User login successfully" },
        {
            status: 201,
        }
    );

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
    });

    return response;
};
