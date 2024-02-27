import { UserModel } from "@/lib/models/User.model";
import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
        return NextResponse.json(
            { msg: null, error: "User Already registered" },
            {
                status: 400,
            }
        );
    }

    await UserModel.create({ name, email, password });

    return NextResponse.json(
        { error: null, msg: "User registered successfully" },
        {
            status: 201,
        }
    );
};
