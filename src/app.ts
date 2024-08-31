import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ErrorMiddleware } from "./core/middlewares/error-middleware";
import userRoutes from "./features/user/routes/user.route";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

// Middlewares
app.use(ErrorMiddleware);

export default app;