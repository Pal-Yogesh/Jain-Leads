import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    student_name: { type: String, required: true, default: " " },
    email: { type: String, required: true, default: " " },
    mobile: { type: String, required: true, default: " " },
    country: { type: String, required: true, default: " " },
    state: { type: String, required: true, default: " " },
    city: { type: String, required: true, default: " " },
    grade: { type: String, required: true, default: " " },
    curriculum: { type: String, required: true, default: " " },
    dialcode: { type: String, required: true, default: " " },
  },
  { timestamps: true }
);

const LeadModel = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

// const LeadModel = mongoose.model("Lead", LeadSchema);

export default LeadModel;
