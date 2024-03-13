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
});

const Point = mongoose.model("Point", pointSchema);