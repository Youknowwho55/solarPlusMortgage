/** @format */
const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

const Comment = require("../models/comment");
const User = require("../models/user");

const commentsController = require("../controllers/commentController");

exports.getBorrowerMtgById = async (req, res) => {
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

    res.render("borrowersMtg/mainFile", locals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createBorrowerMtg = async (req, res) => {
  const locals = {
    title: "Create",
    description: "Create a new borrower",
  };

  await saveBorrowerMtgAndRender(req, res, locals);
};

exports.updateBorrowerMtg = async (req, res) => {
  const locals = {
    title: "Update",
    description: "Update borrower",
  };

  await updateBorrowerMtg(req, res, locals);
};

exports.updateBorrowerMtgModal = async (req, res) => {
  const borrowerId = req.params.id;
  try {
    // Fetch the existing document
    const borrowerMtg = await BorrowerMtg.findById(borrowerId);

    // Update the fields with the form data
    borrowerMtg.loanStatus = req.body.loanStatus;
    borrowerMtg.lender = req.body.lender;
    borrowerMtg.loanNumber = req.body.loanNumber;
    borrowerMtg.initialDocsSigned = req.body.initialDocsSigned;
    borrowerMtg.closingDocsSigned = req.body.closingDocsSigned;
    borrowerMtg.referral = req.body.referral;

    // Save the updated document
    await borrowerMtg.save();

    res.redirect("/"); // Redirect to the desired page after successful update
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBorrowerMtgModal = async (req, res) => {
  const borrowerId = req.params.id;

  try {
    // Fetch the existing document
    const borrowerMtg = await BorrowerMtg.findById(borrowerId);

    // Render the modal view and pass the borrowerMtg data
    res.render("mainDashboard/salesDashboard", { borrowerMtg });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatePeople = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Update",
      description: "Update people associated with the file",
    };
    res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
  } catch (error) {
    console.error(error);
    res.render("borrowersMtg/edit", { borrowerMtg: borrowerMtg });
  }
};

exports.deleteBorrowerMtg = async (req, res) => {
  try {
    await BorrowerMtg.findByIdAndDelete(req.params.id);
    const locals = {
      title: "Delete",
      description: "Delete the borrower",
    };
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

async function saveBorrowerMtgAndRender(req, res, locals) {
  let borrowerMtg;

  try {
    borrowerMtg = req.params.id
      ? await BorrowerMtg.findById(req.params.id)
      : new BorrowerMtg();

    borrowerMtg.firstName = req.body.firstName;
    borrowerMtg.lastName = req.body.lastName;
    borrowerMtg.phoneNumber = req.body.phoneNumber;
    borrowerMtg.email = req.body.email;
    borrowerMtg.loanOfficer = req.body.loanOfficer;

    // Associate user with borrowerMtg
    borrowerMtg.user = req.user.id;

    borrowerMtg = await borrowerMtg.save();

    res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/borrowersMtg/mainFile?id=${borrowerMtg.id}`);
  }
}

async function updateBorrowerMtg(req, res, locals) {
  try {
    // Find the existing BorrowerMtg by ID
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);

    if (!borrowerMtg) {
      // Handle the case where the BorrowerMtg is not found
      return res.status(404).send("BorrowerMtg not found");
    }

    // Update the fields based on the request body
    borrowerMtg.firstName = req.body.firstName;
    borrowerMtg.lastName = req.body.lastName;
    borrowerMtg.phoneNumber = req.body.phoneNumber;
    borrowerMtg.email = req.body.email;
    borrowerMtg.loanOfficer = req.body.loanOfficer;

    // Update address fields if needed
    if (
      req.body.zipCode ||
      req.body.state ||
      req.body.city ||
      req.body.street
    ) {
      borrowerMtg.address = {
        zipCode: req.body.zipCode || borrowerMtg.address.zipCode,
        state: req.body.state || borrowerMtg.address.state,
        city: req.body.city || borrowerMtg.address.city,
        street: req.body.street || borrowerMtg.address.street,
      };
    }

    // Save the updated BorrowerMtg
    await borrowerMtg.save();

    res.redirect(`/borrowersMtg/${borrowerMtg.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/borrowersMtg/mainFile`, {
      locals: locals,
    });
  }
}
