import dotenv from "dotenv";

dotenv.config();

const {MONGODB_URI,PORT}=process.env

export { MONGODB_URI, PORT };