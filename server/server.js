import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import helmet from "helmet";
import config from "./db/config.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js"
dotenv.config()


const app = express()
const port = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))


app.use(express.json())
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

app.use("/api/user",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/file",uploadRoutes)
app.use("/api/subcategory",subCategoryRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)


app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`)
    config();
})