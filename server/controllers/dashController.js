/** @format */
const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

exports.dashSales = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find().sort({
    createdAt: "desc",
  });
  const locals = {
    title: "Dashboard",
    description: "Main Dashboard for Sales professionals",
  };
  res.render("mainDashboard/salesDashboard", {
    locals,
    borrowermtgs: borrowermtgs,
  });
};

exports.dashProcessing = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find().sort({
    createdAt: "desc",
  });
  const locals = {
    title: "Dashboard",
    description: "Main Dashboard for Sales professionals",
  };
  res.render("mainDashboard/processorDashboard", {
    locals,
    borrowermtgs: borrowermtgs,
  });
};

exports.dashSettings = async (req, res) => {
  try {
    const locals = {
      title: "Settings",
      description: "User Settings",
    };
    res.render("settings", { locals });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// add random other pages that are main like About, FAQ, Help
