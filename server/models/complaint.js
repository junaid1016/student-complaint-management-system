import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
	complaintCode: {type: String, required: true, unique: true},
	studentName: {type: String, required: true},
	studentUSN: {type: String, required: true},
	dateOfComplaint: {type: Date, default: Date.now},
	complaintDescription: {type: String, required: true},
	upvotes: {type: Number, default: 0},
});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
