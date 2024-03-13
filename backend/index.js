const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    unique: true,
  },
  langs: {
    type: Array,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  county: {
    type: String,
    required: false,
  },
  town: {
    type: String,
    required: false,
  },
  village: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  "ISO3166-2-lvl4": {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
  },
}, {collection: 'points'});

const Point = mongoose.model("Point", pointSchema);

mongoose.connect(
  "mongodb+srv://testuser:YbE0dBIUD6vlNmNM@cluster0.whedd3h.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());

const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB database connection established successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB database connection error:", err);
});

app.use(cors()); // This will enable all CORS requests


//endpoints
app.get("/", (req, res) => {
  res.send("Geoglossos API");
});

app.post("/addpoint", async (req, res) => {
  try {
    console.log(req.body);
    const newPoint = new Point(req.body);
    await newPoint.save();
    res.status(201).send(newPoint);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/points", async (req, res) => {
  try {
    Point.find({}).then(function (points) {
      res.send(points);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});