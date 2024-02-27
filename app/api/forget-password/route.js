import { UserModel } from "@/lib/models/User.model";
import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { generateForgetToken } from "@/lib/service/token.service";
import { sendEmail } from "@/lib/service/mail.service";

connectDB();

export const POST = async (request) => {
    const { email } = await request.json();

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
        return NextResponse.json(
            { msg: null, error: "User not exists" },
            {
                status: 400,
            }
        );
    }

    const token = await generateForgetToken(existUser, email);

    const mailResponse = await sendEmail(existUser.name, token, email);

    const response = NextResponse.json(
        { error: null, msg: "Email sent successfully" },
        {
            status: 201,
        }
    );

    return response;
};
