import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"; // import rate limiter
import Complaint from "./models/complaint.js";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Rate limiter middleware
// Limits each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

// Apply limiter to all requests
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Complaint API is running...");
});

// Unique Complaint Code generator
function generateComplaintCode() {
	const randomPart = Math.floor(100000 + Math.random() * 900000);
	return `CMP-${randomPart}`;
}

// POST request for entering the data to the database
app.post("/api/complaints", async (req, res) => {
	try {
		const {studentName, studentUSN, complaintDescription} = req.body;
		
		if(!studentName || !studentUSN || !complaintDescription){
			return res.status(400).json({message: "All fields are required"});
		}
		
		const complaintCode = generateComplaintCode();
		
		const newComplaint = new Complaint({
			complaintCode,
			studentName,
			studentUSN,
			complaintDescription
		});
		
		await newComplaint.save();
		
		res.status(201).json({message: "Complaint sumitted Successfully", complaint: newComplaint});
	} catch(err){
		console.log(err);
		res.status(500).json({message: "Server Error."});
	}
});

app.get("/api/complaints", async(req, res) => {
	try{
		const complaints = await Complaint.find().sort({ dateOfComplaint: -1});
		res.status(200).json({success: true, complaints});
	}catch(err){
		console.error(err);
		res.status(500).json({ success: false, message: "Failed to fetch complaints."});
	}
});

app.get("/api/admin/home", verifyToken, async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome ${req.user.userId}, you're authenticated.`,
  });
});

app.put("/api/complaints/:id/upvote", async(req, res) => {
	try{
		const complaint = await Complaint.findById(req.params.id);
		if(!complaint) return res.status(404).json({message: "Complaint not found"});

		complaint.upvotes += 1;
		await complaint.save();

		res.status(200).json({message: "Upvoted Sucessfully", upvote: complaint.upvotes});
	}catch(err){
		console.error(err);
		res.status(500).json({message:"Server error during upvote"});
	}
});

// admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { userId, password1, password2 } = req.body;

    if (!userId || !password1 || !password2) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS1 = process.env.ADMIN_PASS1;
    const ADMIN_PASS2 = process.env.ADMIN_PASS2;

    if (userId === ADMIN_USER && password1 === ADMIN_PASS1 && password2 === ADMIN_PASS2) {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

      console.log("JWT Created:", token); // DEBUG LINE — should print long JWT

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token, // send token back
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
});

// Delete a complaint
app.delete("/api/complaints/:id", verifyToken, async(req, res) => {
	try{
		const {id} = req.params;
		const deleted = await Complaint.findByIdAndDelete(id);
		if(!deleted){
			return res.status(404).json({success: false, message: "Complaint not found"});
		}
		res.status(200).json({success: true, message: "Complaint marked as solved and removed"});
	}catch(err){
		console.error("Error deleting complaint");
		res.status(500).json({success: false, message:"Server error deleting complaint"});
	}
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

