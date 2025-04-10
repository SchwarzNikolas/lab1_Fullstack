import { app } from "./src/express.js";
import DatabaseService from "./src/service/DatabaseService.js";
import dotenv from "dotenv";

dotenv.config()

await DatabaseService.connect();

const port = process.env.PORT;

const server = app.listen(port, () => {
        console.log(`running on port ${port}`)
})

async function shutdown(){
        console.log("poweroff\n");
        server.close();
        DatabaseService.disconnect();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

