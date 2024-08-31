import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ErrorMiddleware } from "./core/middlewares/error-middleware";
import userRoutes from "./features/user/routes/user.route";
import bookRoutes from "./features/book/routes/book.route";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);

// Middlewares
app.use(ErrorMiddleware);

export default app;