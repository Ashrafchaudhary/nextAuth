import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (name, token, email) => {
    const info = await transporter.sendMail({
        from: "chaudharyashraf54@gmail.com",
        to: email,
        subject: "Forget Password",
        html: `Hey, ${name},
        your forget password link is below click the link</br>
        <a href="http://localhost:8080/update-password?token=${token}">Click</a>`,
    });

    return info;
};
