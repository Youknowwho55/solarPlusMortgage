/** @format */

const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

const User = require("../models/user");

exports.getW2 = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    let numberOfProperties = 2;

    const locals = {
      title: "Edit",
      description: "Edit the borrower's information",
      borrowerMtg,
      comments,
      user,
      numberOfProperties, // Pass the numberOfProperties to the template
      layout: "../views/layouts/dashboardLayout",
    };

    res.render("borrowersMtg/income/w2", locals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
