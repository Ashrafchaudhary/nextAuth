import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`The db is connected to ${mongoose.connection.host}`);
    } catch (error) {
        mongoose.disconnect();
        process.exit(1);
    }
};
