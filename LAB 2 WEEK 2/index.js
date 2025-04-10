const { MongoClient } = require('mongodb');

const drivers = [
    {
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.5
    }
];

// show the data in the console
console.log("Drivers:", drivers);

// TODO: show the all the drivers name in the console
console.log("Driver Names:", drivers.map(driver => driver.name)); // Extracts only the name property from each object in the drivers array.

// TODO: add additional driver to the drivers array
drivers.push({
    name: "Najwa",
    vehicleType: "Myvi",
    isAvailable: true,
    rating: 4.5
});

console.log("Updated Drivers List:", drivers);

//TASK 3-6
async function main() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");

        //TASK 3: INSERT DRIVERS
        for (const driver of drivers) {
            const result = await driversCollection.insertOne(driver);
            console.log(`New driver created with ID: ${result.insertedId}`);
        }

        //TASK 4: QUERY AVAILABLE DRIVERS WITH RATING >= 4.5
        const availableDrivers = await driversCollection.find({
            isAvailable: true,
            rating: { $gte: 4.5 }
        }).toArray();
        console.log("Available drivers with rating >= 4.5:", availableDrivers);

        //TASK 5: UPDATE JOHN DOE'S RATING
        const updateResult = await driversCollection.updateOne(
            { name: "John Doe" },
            { $inc: { rating: 0.1 } }
        );
        console.log(`Driver updated: ${updateResult.modifiedCount} document(s)`);

        //TASK 6: DELETE DRIVER ALICE SMITH
        const deleteResult = await driversCollection.deleteOne({ name: "Alice Smith" });
        console.log(`Driver deleted: ${deleteResult.deletedCount} document(s)`);
    
    } catch (error) {
        console.error("An error occurred:", error); // 
    } finally {
        await client.close();
    }
}

main().catch(console.error);
