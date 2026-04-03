import Complaint from "../models/complaint.js";

// Citizen - Submit complaint
export const submitComplaint = async (req, res) => {
  try {
    const { title, description, category, ward, location } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      ward,
      location,
      citizen: req.user.id, // protect middleware se aayega
    });

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Citizen - Get own complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizen: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin - Get all complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("citizen", "name email") // citizen ka name aur email bhi aayega
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin - Update complaint status
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ success: true, complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
