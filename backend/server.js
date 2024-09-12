import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
import userRoute from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use('/api/user', userRoute);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log('server running on http://localhost:' + port);
})

