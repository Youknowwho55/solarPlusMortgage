/** @format */

const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");
const Comment = require("../models/comment");
const commentsController = require("./commentController");

exports.getMessages = async (req, res) => {
  try {
    const locals = {
      title: "Messages",
      description: "Check your messages",
    };
    res.render("sidebar/messages", { locals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const locals = {
      title: "Analytics",
      description: "Compare statistically how the month has been.",
    };
    res.render("sidebar/analytics", { locals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getGuides = async (req, res) => {
  try {
    const locals = {
      title: "Guides",
      description: "lists of resources to help",
    };
    res.render("sidebar/guides", { locals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getMarketData = async (req, res) => {
  try {
    const locals = {
      title: "Market Data",
      description:
        "Daily market information about rate adjustments and market trensd",
    };
    res.render("sidebar/marketData", { locals });
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
    const locals = {
      title: "Workbook",
      description: "calculate te mortgage payment",
    };
    res.render("borrowersMtg/workbook", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getConditionsID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const locals = {
      title: "Conditions",
      description: "Used to assist with conditions to close",
    };
    res.render("borrowersMtg/conditions", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
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
    const locals = {
      title: "Documents",
      description: "repository for documents used in the process",
    };
    res.render("borrowersMtg/documents", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBenefitID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const locals = {
      title: "Benefit",
      description: "Breaks down the benefit to the borrower",
    };
    res.render("borrowersMtg/benefit", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getIncomeID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id)
      .populate("mortgageLoan")
      .populate("employer")
      .populate("mtgConditions");
    const comments = await commentsController.getCommentsByBorrowerMtgId(
      req.params.id
    );
    const locals = {
      title: "Income",
      description: "Calculates income",
    };
    res.render("borrowersMtg/income", {
      locals,
      borrowerMtg: borrowerMtg,
      comments,
      layout: "../views/layouts/dashboardLayout",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
