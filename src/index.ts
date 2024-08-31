import app from "./app";
import { dataSource } from "./config/data-source";
import { PORT } from "./config/env";

async function createDb() {
    try {
        dataSource.initialize();
        console.log("Database connection successfully.");
    } catch (error: any) {
        console.log("Unable to connect to the database:");
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await createDb();

    app.listen(process.env.PORT, () => {
        console.log(`Server is started on PORT: ${PORT}`);
    });
}

init();