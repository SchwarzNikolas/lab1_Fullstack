import mongoose from "mongoose";

class DatabaseService {
        async connect (){
                try {
                        await mongoose.connect(process.env.CONNECTION_URL);
                } catch (err) {
                        console.error("MongoDB connection error:", err);
                        process.exit();
                }

        }

        async disconnect (){
                try {
                        await mongoose.disconnect();
                } catch (err){
                        console.error('Error closing the database connection:', err.message);
                        throw err;
                }

        }
}

export default new DatabaseService();
