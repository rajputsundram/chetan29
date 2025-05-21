
import mongoose from "mongoose"
const mongoURI=process.env.DB_URL;
export const ConnectDB=async()=>{
    await mongoose.connect(mongoURI);

    console.log("DB connetced")
}

