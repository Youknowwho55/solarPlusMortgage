/** @format */

const {
  BorrowerMtg,
  MortgageLoan,
  Employer,
} = require("../models/borrowerMtg");

// , { borrowerMtg: new BorrowerMtg() }

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

//// Work from here

exports.getWorkbookID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);

    const locals = {
      title: "Workbook",
      description: "calculate te mortgage payment",
    };
    res.render("borrowersMtg/workbook", {
      locals,
      borrowerMtg: borrowerMtg,
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
    const locals = {
      title: "Conditions",
      description: "Used to assist with conditions to close",
    };
    res.render("borrowersMtg/conditions", { locals, borrowerMtg: borrowerMtg });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getDocumentsID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Documents",
      description: "repository for documents used in the process",
    };
    res.render("borrowersMtg/documents", { locals, borrowerMtg: borrowerMtg });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getBenefitID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);
    const locals = {
      title: "Benefit",
      description: "Breaks down the benefit to the borrower",
    };
    res.render("borrowersMtg/benefit", { locals, borrowerMtg: borrowerMtg });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getIncomeID = async (req, res) => {
  try {
    const borrowerMtg = await BorrowerMtg.findById(req.params.id);

    const locals = {
      title: "Income",
      description: "Calculates income",
    };
    res.render("borrowersMtg/income", {
      locals,
      borrowerMtg: borrowerMtg,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// // Route to edit or add Employer information
// router.get("/income/employer/:id", async (req, res) => {
//   try {
//     const borrowerMtg = await BorrowerMtg.findById(req.params.id)
//       .populate("employer")
//       .exec();
//     if (!borrowerMtg) {
//       return res.redirect("/");
//     }
//     res.render("income/edit-employer", { borrowerMtg: borrowerMtg });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to calculate and display income
// router.get("/income/calculate/:id", async (req, res) => {
//   try {
//     const borrowerMtg = await BorrowerMtg.findById(req.params.id)
//       .populate("employer")
//       .exec();
//     if (!borrowerMtg) {
//       return res.redirect("/");
//     }

//     // Perform income calculation based on hourly pay, etc.
//     const hourlyPay = borrowerMtg.employer.hourlyPay;
//     const hoursWorked = 40; // Example hours worked
//     const calculatedIncome = hourlyPay * hoursWorked;

//     res.render("income/calculate", {
//       borrowerMtg: borrowerMtg,
//       calculatedIncome: calculatedIncome,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//if borrower is selected

/// We are assuming the client is already on the borrowers page so dont need to search for ID again
