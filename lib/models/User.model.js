import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// MIDDLEWARE

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});

userSchema.methods.ConfirmPassword = async function (password) {
    const isMatch = bcrypt.compare(password, this.password);
    return isMatch;
};

export const UserModel =
    mongoose.models.user || mongoose.model("user", userSchema);
