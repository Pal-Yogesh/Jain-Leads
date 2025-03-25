import mongoose from "mongoose";

const EmeraldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: " " },
    email: { type: String, required: true, default: " " },
    mobile: { type: String, required: true, default: " " },
    field_class_looking_for: { type: String, required: true, default: " " },
    field_preferred_campus: { type: String, required: true, default: " " },
  },
  { timestamps: true }
);

// const EmeraldModel = mongoose.model("Emerald", EmeraldSchema);
const EmeraldModel = mongoose.models.Emerald || mongoose.model("Emerald", EmeraldSchema);

export default EmeraldModel;
