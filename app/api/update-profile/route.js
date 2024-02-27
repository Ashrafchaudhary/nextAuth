import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.model";
import { verifyToken } from "@/lib/service/token.service";
import { NextResponse } from "next/server";

connectDB();
export const PUT = async (request) => {
    const { name, email } = await request.json();
    const auth = request.cookies.get("token") || "";

    if (!auth) {
        return NextResponse.json(
            { msg: null, error: "Please login first." },
            {
                status: 401,
            }
        );
    }

    const { userId } = await verifyToken(auth.value);
    if (!userId) {
        return NextResponse.json(
            { msg: null, error: "Invalid token" },
            {
                status: 401,
            }
        );
    }

    const exsistUser = await UserModel.findByIdAndUpdate(userId, {
        $set: {
            name,
            email,
        },
    });

    if (!exsistUser) {
        return NextResponse.json(
            { msg: null, error: "User does not exists." },
            {
                status: 401,
            }
        );
    }

    return NextResponse.json(
        {
            error: null,
            msg: "Profile Updated",
            user: exsistUser,
        },
        {
            status: 200,
        }
    );
};
