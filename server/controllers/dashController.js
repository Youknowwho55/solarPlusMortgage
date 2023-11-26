/** @format */
const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

const User = require("../models/user");

const statusOrder = [
  "new",
  "nos",
  "sold",
  "doco",
  "awc",
  "und",
  "ctc",
  "fun",
  "comp",
];

exports.dashSales = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find();
  const user = await User.findById(req.user.id).populate("borrowerMtg");

  const locals = {
    title: "Dashboard",
    description: "View your personalized Sales dashboard",
    user: user,
  };
  const filteredBorrowerMtg = borrowermtgs.filter(
    (borrowerMtg) =>
      borrowerMtg.user && borrowerMtg.user.toString() === user._id.toString()
  );

  // Sort the borrowermtgs based on the specified order
  const sortedBorrowerMtg = borrowermtgs.sort((a, b) => {
    const statusAIndex = statusOrder.indexOf(a.loanStatus);
    const statusBIndex = statusOrder.indexOf(b.loanStatus);

    if (statusAIndex === -1) {
      return 1; // move items with unknown status to the end
    }

    if (statusBIndex === -1) {
      return -1; // move items with unknown status to the end
    }

    return statusAIndex - statusBIndex;
  });

  res.render("mainDashboard/salesDashboard", {
    locals,
    sortedBorrowerMtg: sortedBorrowerMtg,
    filteredBorrowerMtg: filteredBorrowerMtg,

    user: user,
    borrowermtgs: user.borrowerMtg,
  });
};

exports.dashSolar = async (req, res) => {
  const borrowermtgs = await BorrowerMtg.find();
  const locals = {
    title: "Dashboard",
    description: "Main Dashboard for Sales professionals",
  };
  // Sort the borrowermtgs based on the specified order
  const sortedBorrowerMtg = borrowermtgs.sort((a, b) => {
    const statusAIndex = statusOrder.indexOf(a.loanStatus);
    const statusBIndex = statusOrder.indexOf(b.loanStatus);

    if (statusAIndex === -1) {
      return 1; // move items with unknown status to the end
    }

    if (statusBIndex === -1) {
      return -1; // move items with unknown status to the end
    }

    return statusAIndex - statusBIndex;
  });
  res.render("mainDashboard/solarDashboard", {
    locals,
    borrowermtgs: borrowermtgs,
    sortedBorrowerMtg: sortedBorrowerMtg,
  });
};

//Direct to the Admin Dashboard
exports.getAdmin = async (req, res) => {
  const users = await User.find().sort({
    createdAt: "desc",
  });
  const locals = {
    title: "Admin",
    description: "Admin Dashboard",
  };
  res.render("mainDashboard/adminDashboard", {
    locals,
    users: users,
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
