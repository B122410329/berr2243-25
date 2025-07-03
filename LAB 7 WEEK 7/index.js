const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function startServer() {
    try {
        await client.connect();
        db = client.db("eHailing"); // Pastikan nama DB betul
        console.log("✅ Connected to MongoDB");

        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
    }
}

// Root route
app.get("/", (req, res) => {
    res.send("API is running");
});

// Analytics route
app.get("/analytics/passengers", async (req, res) => {
    try {
        const users = db.collection("users");

        const result = await users.aggregate([
            {
                $lookup: {
                    from: "rides",
                    localField: "_id",          // Users._id
                    foreignField: "userId",     // Rides.userId
                    as: "rides"
                }
            },
            {
                $unwind: {
                    path: "$rides",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$name",
                    totalRides: { $sum: 1 },
                    totalFare: { $sum: "$rides.fare" },
                    avgDistance: { $avg: "$rides.distance" }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    totalRides: 1,
                    totalFare: 1,
                    avgDistance: 1
                }
            }
        ]).toArray();

         // 🟨 Tambah line ini untuk tengok hasil aggregation
        console.log("Aggregation result:", result);

        res.json(result);
    } catch (err) {
        console.error("❌ Aggregation error:", err);
        res.status(500).send("Internal Server Error");
    }
});

startServer();
