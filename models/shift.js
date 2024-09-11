const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shiftSchema = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  claimed: { type: Number, trim: true, required: true },
  capacity: { type: Number, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  teamId: { type: String, required: true }
});

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
