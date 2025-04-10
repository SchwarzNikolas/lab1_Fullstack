import { app } from "./src/express.js";
import DatabaseService from "./src/service/DatabaseService.js";
import dotenv from "dotenv";

dotenv.config()

// Establish a connection to the database before starting the server
await DatabaseService.connect();

const port = process.env.PORT;

// Start the Express server on the specified port
const server = app.listen(port, () => {
        console.log(`running on port ${port}`)
})

/**
 * Gracefully shuts down the server and disconnects from the database.
 *
 * Triggered when the process receives a termination signal (e.g., SIGINT or SIGTERM).
 * Ensures all connections are properly closed before exiting.
 */
async function shutdown(){
        console.log("poweroff\n");
        server.close();
        DatabaseService.disconnect();
}

// Listen for system signals to initiate graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

