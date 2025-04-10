import mongoose from "mongoose";

/**
 * Service responsible for handling database connections.
 * Uses Mongoose to manage connections to the MongoDB database.
 */
class DatabaseService {

        /**
         * Establishes a connection to the MongoDB database using the connection URL from environment variables.
         *
         * @throws {Error} Throws an error if the connection fails and exits the process.
         */
        async connect (){
                try {
                        await mongoose.connect(process.env.CONNECTION_URL);
                } catch (err) {
                        console.error("MongoDB connection error:", err);
                        process.exit(); // Exit the process on connection failure
                }
        }

        /**
         * Closes the connection to the MongoDB database.
         *
         * @throws {Error} Throws an error if disconnecting from the database fails.
         */
        async disconnect (){
                try {
                        await mongoose.disconnect();
                } catch (err){
                        console.error('Error closing the database connection:', err.message);
                        throw err; // Propagate the error if disconnect fails
                }
        }
}

// Export a singleton instance of DatabaseService to be used in other modules
export default new DatabaseService();

