import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kiettqgcd210125:Panda102903@cluster0.scmdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-del').then(() => console.log("DB Connected"));
}