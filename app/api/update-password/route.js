import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.model";
import { verifyForgetToken } from "@/lib/service/token.service";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();
export const PUT = async (request) => {
    const { password, email, token, cpassword } = await request.json();

    if (cpassword !== password) {
        return NextResponse.json(
            { msg: null, error: "Password doen not match" },
            {
                status: 400,
            }
        );
    }

    if (!token) {
        return NextResponse.json(
            { msg: null, error: "Please login first." },
            {
                status: 400,
            }
        );
    }

    const { userId } = await verifyForgetToken(token, email);
    if (!userId) {
        return NextResponse.json(
            { msg: null, error: "Invalid token" },
            {
                status: 400,
            }
        );
    }

    const exsistUser = await UserModel.findById(userId);

    if (!exsistUser) {
        return NextResponse.json(
            { msg: null, error: "User does not exists." },
            {
                status: 400,
            }
        );
    }

    const hashPassword = await bcrypt.hash(password, 12);

    console.log("hashPassword", hashPassword);

    await UserModel.findByIdAndUpdate(userId, {
        $set: { password: hashPassword },
    });

    return NextResponse.json(
        {
            error: null,
            msg: "Password Updated",
        },
        {
            status: 200,
        }
    );
};
