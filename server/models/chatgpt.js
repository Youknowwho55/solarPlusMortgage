/** @format */

const user = new mongoose.Schema({
  _id: ObjectId, // MongoDB-generated unique ID
  username: String,
  email: String,
  password: String, // Hashed and salted password
});

const homebuyerSchema = new mongoose.Schema({
  _id: ObjectId,
  user_id: ObjectId, // Reference to the user who created this lead
  name: String,
  address: String,
  employment_history: {
    employer: String,
    position: String,
    start_date: Date,
    end_date: Date,
  },
  conditions: [String], // Array of conditions
  income: {
    monthly_income: Number,
    other_income: Number,
  },
});

const CommentsSchema = new mongoose.Schema({
  _id: ObjectId,
  lead_id: ObjectId, // Reference to the associated homebuyer lead
  user_id: ObjectId, // Reference to the user who left the comment
  username: String,
  comment: String,
  date: Date,
});

///how to reference
//   {
//     "_id": ObjectId,
//     "lead_id": ObjectId("5f7f231b5a17f21578998e3a"), // Reference to the associated homebuyer lead
//     "user_id": ObjectId,   // Reference to the user who left the comment
//     "username": String,
//     "comment": String,
//     "date": Date
//   }
//   db.comments.find({ "lead_id": ObjectId("5f7f231b5a17f21578998e3a") });

//   <!-- comments.ejs -->

// <h1>Comments for Homebuyer Lead: <%= lead_id %></h1>

// <ul>
//   <% comments.forEach(function(comment) { %>
//     <li>
//       <p><strong><%= comment.username %></strong> said on <%= comment.date %>:</p>
//       <p><%= comment.comment %></p>
//     </li>
//   <% }); %>
// </ul>

// const express = require('express');
// const app = express();
// const comments = ...; // Retrieve comments data from MongoDB
// const lead_id = ...; // Retrieve the lead_id

// app.get('/comments', (req, res) => {
//   res.render('comments', { lead_id, comments });
// });

// <!-- comments.ejs -->

// <h1>Comments for Homebuyer Lead: <%= lead_id %></h1>

// <ul>
//   <% comments
//     .filter(function(comment) {
//       return comment.username === specificUsername; // Replace specificUsername with the username you want
//     })
//     .forEach(function(comment) { %>
//     <li>
//       <p><strong><%= comment.username %></strong> said on <%= comment.date %>:</p>
//       <p><%= comment.comment %></p>
//     </li>
//   <% }); %>
// </ul>
