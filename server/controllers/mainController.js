/** @format */
const models = require("../models/borrowerMtg");
const BorrowerMtg = models.BorrowerMtg;

exports.dashboardSales = async (req, res) => {
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
