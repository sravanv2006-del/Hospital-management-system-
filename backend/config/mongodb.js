import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    const cleanUri = process.env.MONGODB_URI.replace(/\/$/, '');
    await mongoose.connect(`${cleanUri}/prescripto`);

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.