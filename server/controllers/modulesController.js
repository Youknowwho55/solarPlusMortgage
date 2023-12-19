/** @format */

const { BorrowerMtg, MortgageLoan } = require("../models/borrowerMtg");
const Condition = require("../models/condition");
const Partners = require("../models/partner");
const User = require("../models/user");
const Properties = require("../models/properties");

const commentsController = require("./commentController");

exports.getMessages = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Messages",
      description: "Check your messages",
    };
    res.render("sidebar/messages", { locals, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Analytics",
      description: "Compare statistically how the month has been.",
    };
    res.render("sidebar/analytics", { locals, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getGuides = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Guides",
      description: "lists of resources to help",
    };
    res.render("sidebar/guides", { locals, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getMarketData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("borrowerMtg");
    const locals = {
      title: "Market Data",
      description:
        "Daily market information about rate adjustments and market trends",
    };
    res.render("sidebar/marketData", { locals, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPartners = async (req, res) => {
  try {
    // Fetch all partners for the currently signed-in user
    const partners = await Partners.find({ createdBy: req.user.id });
    const user = await User.findById(req.user.id).populate("partners");

    // Create locals object with the necessary data
    const locals = {
      title: "Partners",
      description: "List of Partners to work with",
      partners: partners,
    };

    // Render the EJS template with the locals object
    res.render("sidebar/partners", { user, ...locals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getToDo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "To Do items",
      description: "List of items to be added",
    };
    res.render("sidebar/todo", { locals, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getWorkbookID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Workbook",
      description: "calculate te mortgage payment",
    };
    res.render("borrowersMtg/workbook", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPropertiesID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");
    const properties = await Properties.findById(req.user.id).populate(
      "borrowerMtg"
    );

    const locals = {
      title: "Properties",
      description: "All of the borrower's properties",
    };
    res.render("borrowersMtg/properties", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.postProperties = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const borrowerMtg = await BorrowerMtg.findById(borrowerMtgId).populate(
      "incomes"
    );

    // Check if req.params.id is present
    if (!borrowerMtgId) {
      return res.status(400).send("Invalid request: Missing borrower ID");
    }

    if (!borrowerMtg) {
      return res.status(404).json({ error: "BorrowerMtg not found" });
    }

    // Create a new income object
    const newProperty = {
      street: req.body.street,
      streetLine2: req.body.streetLine2,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };

    // Push the new income to the incomes array
    borrowerMtg.property.push(newProperty);

    // Associate user with borrowerMtg
    borrowerMtg.user = req.user.id;

    // Save the updated borrowerMtg
    await borrowerMtg.save();

    // Redirect to the income page
    res.redirect(`/properties/${borrowerMtg.id}`);
  } catch (error) {
    console.error("Error saving income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postWorkbookID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    // Assuming you have a model for Workbook, adjust this based on your actual model
    const newWorkbookData = {
      // Extract the data from the request body or any other source
      // Example: property1: req.body.property1,
      //          property2: req.body.property2,
      //          ...
    };

    // Assuming you have a model for Workbook, adjust this based on your actual model
    const newWorkbook = await Workbook.create(newWorkbookData);

    const locals = {
      title: "Workbook",
      description: "calculate te mortgage payment",
    };

    // Render the same EJS page or redirect to the workbook page as needed
    res.render("borrowersMtg/workbook", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
      newWorkbook: newWorkbook, // Pass the newWorkbook data to your EJS page if needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getConditionsID = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    // Find the BorrowerMtg by ID
    const borrowerMtg = await BorrowerMtg.findById(borrowerMtgId);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    if (!borrowerMtg) {
      return res.status(404).send("BorrowerMtg not found");
    }

    // Find the associated condition(s) based on the relationship
    const conditions = await Condition.find({ borrowersMtg: borrowerMtgId });

    const locals = {
      title: "Conditions",
      description: "Used to assist with conditions to close",
    };

    res.render("borrowersMtg/conditions", {
      locals,
      borrowerMtg: borrowerMtg,
      conditions,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getDocumentsID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Documents",
      description: "repository for documents used in the process",
    };
    res.render("borrowersMtg/documents", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.downloadGoogle = async function downloadFile(realFileId) {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app

  const { GoogleAuth } = require("google-auth-library");
  const { google } = require("googleapis");

  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const service = google.drive({ version: "v3", auth });

  fileId = realFileId;
  try {
    const file = await service.files.get({
      fileId: fileId,
      alt: "media",
    });
    return file.status;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
};

exports.getBenefitID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Benefit",
      description: "Breaks down the benefit to the borrower",
    };
    res.render("borrowersMtg/benefit", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getIncomeID = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const borrowerMtg = await BorrowerMtg.findById(borrowerMtgId).populate(
      "incomes"
    );

    if (!borrowerMtg) {
      return res.status(404).json({ error: "BorrowerMtg not found" });
    }

    const comments = await commentsController.getCommentsByBorrowerMtgId(
      borrowerMtgId
    );
    const user = await User.findById(req.user.id).populate("borrowerMtg");

    const locals = {
      title: "Income",
      description: "Calculates income",
    };

    // Pass the complete income data to the frontend
    // Pass the income variable as part of the data object
    res.render("borrowersMtg/income", {
      locals,
      borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
      user,
      income: req.flash("income")[0], // Assuming you're using express-flash for flash messages
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// POST Conditions
exports.postConditions = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;

    const newCondition = new Condition({
      condition: req.body.condition,
      description: req.body.description,
      borrowersMtg: borrowerMtgId,
    });

    await newCondition.save();

    let borrowerMtg = await BorrowerMtg.findById(borrowerMtgId);

    if (!borrowerMtg) {
      return res.status(404).json({ error: "BorrowerMtg not found" });
    }

    // Check if borrowerMtg.conditions is an array, and initialize it if not
    if (!Array.isArray(borrowerMtg.conditions)) {
      borrowerMtg.conditions = [];
    }

    borrowerMtg.conditions.push(newCondition);

    await borrowerMtg.save();

    res.redirect(`/conditions/${borrowerMtg.id}`);
  } catch (error) {
    console.error("Error adding condition:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT Conditions (Including Status Update)
// PUT Conditions (Including Status Update)
exports.putConditionsID = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const conditionId = req.params.conditionId;
    const updatedCondition = req.body;

    const borrowerMtg = await BorrowerMtg.findById(borrowerMtgId);

    // Find the condition by its unique identifier (_id)
    const conditionToUpdate = borrowerMtg.conditions.find(
      (condition) => condition._id.toString() === conditionId
    );

    if (!conditionToUpdate) {
      return res.status(404).json({ message: "Condition not found" });
    }

    conditionToUpdate.condition = updatedCondition.condition;
    conditionToUpdate.description = updatedCondition.description;

    // Handle status update
    const currentTime = new Date().toLocaleTimeString();
    const user = "John Doe"; // Replace with actual user data

    switch (updatedCondition.status) {
      case "Requested":
        conditionToUpdate.requestedDate = new Date();
        conditionToUpdate.requestedBy = user;
        break;
      case "Completed":
        conditionToUpdate.completedDate = new Date();
        conditionToUpdate.completedBy = user;
        break;
      case "Cleared":
        conditionToUpdate.clearedDate = new Date();
        conditionToUpdate.clearedBy = user;
        break;
      default:
        break;
    }

    await borrowerMtg.save();

    res.redirect(`/conditions/${borrowerMtg.id}`);
  } catch (error) {
    console.error("Error updating condition:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Example of updating incomes in the postAddIncome route
// Import necessary modules and models

exports.postAddIncome = async (req, res) => {
  try {
    const borrowerMtgId = req.params.id;
    const borrowerMtg = await BorrowerMtg.findById(borrowerMtgId).populate(
      "incomes"
    );

    // Check if req.params.id is present
    if (!borrowerMtgId) {
      return res.status(400).send("Invalid request: Missing borrower ID");
    }

    if (!borrowerMtg) {
      return res.status(404).json({ error: "BorrowerMtg not found" });
    }

    // Create a new income object
    const newIncome = {
      employerName: req.body.employerName,
      incomeType: req.body.incomeType,
      monthlyAmount: req.body.monthlyAmount,
    };

    // Push the new income to the incomes array
    borrowerMtg.incomes.push(newIncome);

    // Associate user with borrowerMtg
    borrowerMtg.user = req.user.id;

    // Save the updated borrowerMtg
    await borrowerMtg.save();

    // Set a flash message with the new income data
    req.flash("income", newIncome);

    // Redirect to the income page
    res.redirect(`/income/${borrowerMtg.id}`);
  } catch (error) {
    console.error("Error saving income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//dashboard search functino
exports.getDashSearch = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  // Implement your search logic here
  // You might query the database or perform any search operations

  // Example: rendering a search results page
  // res.render("searchResults", { searchTerm, results });
};

exports.postAddPartner = async (req, res) => {
  const locals = {
    title: "Create",
    description: "Create a new borrower",
  };
  try {
    // Assuming you have a user object in your request (e.g., req.user)
    const userId = req.user.id;

    const newPartner = new Partners({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      business: req.body.business,
      createdBy: req.user._id, // Assuming you have a user object in your request
    });

    await newPartner.save();

    res.redirect(`/partners`);
  } catch (error) {
    console.error(error);
    res.redirect(`/partners`, {
      locals: locals,
    });
  }
};
