import { connectDB } from "@/lib/config/db";
import { UserModel } from "@/lib/models/User.model";
import { verifyToken } from "@/lib/service/token.service";
import { NextResponse } from "next/server";

connectDB();
export const GET = async (request) => {
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

    const exsistUser = await UserModel.findById(userId).select("-password");

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
            msg: "data fetched",
            user: exsistUser,
        },
        {
            status: 200,
        }
    );
};
