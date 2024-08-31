import app from "./app";
import { dataSource } from "./config/data-source";
import { PORT } from "./config/env";

async function createDb() {
    try {
        await dataSource.initialize();
        console.log("Database connection successfully.");
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}

async function init() {
    await createDb();

    app.listen(PORT, () => {
        console.log(`Server is started on PORT: ${PORT}`);
    });
}

init();