import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const PORT = 5555;
const uri =
  "mongodb+srv://brankam126:CXKsMP6smZKWqJhI@cluster0.whedd3h.mongodb.net/";
const client = new MongoClient(uri);

const app = express();
app.listen(PORT, () => {
  console.log("listening to port ", PORT);
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/points", (req, res) => {
  async function run() {
    try {
      const database = client.db("geoglossos");
      const points = database.collection("points");

      const result = await points.find({}).toArray();
      return result;
    } finally {
      // Close the MongoDB client connection
      await client.close();
    }
  }
  // Run the function and handle any errors
  return run().catch(console.dir);
});

app.post("/insertpoint", (req, res) => {
  async function run() {
    try {
      const database = client.db("geoglossos");
      const points = database.collection("points");

      // Insert the defined document into the "points" collection
      const result = await points.insertOne(req.body);
      // Print the ID of the inserted document
      console.log(`A document was inserted with the id: ${result.insertedId}`);
    } finally {
      // Close the MongoDB client connection
      await client.close();
    }
  }
  // Run the function and handle any errors
  run().catch(console.dir);
});

// insertPoint({
//   road: "Route de Champagne",
//   hamlet: "Champagne",
//   village: "Loisia",
//   municipality: "Lons-le-Saunier",
//   county: "Jura",
//   "ISO3166-2-lvl6": "FR-39",
//   state: "Bourgogne-Franche-Comté",
//   "ISO3166-2-lvl4": "FR-BFC",
//   region: "Metropolitan France",
//   postcode: "39320",
//   country: "France",
//   country_code: "fr",
//   lat: "46.49021572155833",
//   lng: "5.457235489105574",
//   langs: ["cat", "eng", "cym"],
//   date: "2024-03-12T19:49:09.706Z",
// });
