// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const mongoose = require("mongoose");
require('dotenv').config();

const pointSchema = new mongoose.Schema(
  {
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
  },
  { collection: MONGODB_COLLECTION }
);

const Point = mongoose.model("Point", pointSchema);

const handler = async (event) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const requestBody = event.body;
    const newPoint = new Point(requestBody);
    await newPoint.save();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `inserted ${newPoint.insertedId}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
