/** @format */

const Comment = require("../models/comment");

const options = {
  month: "numeric",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const formattedDate = new Date().toLocaleDateString("en-US", options);

exports.getCommentsByBorrowerMtgId = async (borrowerMtgId) => {
  try {
    const comments = await Comment.find({ borrowersMtg: borrowerMtgId });
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching comments");
  }
};

exports.addComment = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const { comment } = req.body;

    // Create a new comment
    const newComment = new Comment({
      // username --- Eventually
      comment,
      borrowersMtg: borrowerMtgId,
      createdAt: formattedDate, // Save the formatted date
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with a success message
    res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("Internal Server Error");
  }
};
